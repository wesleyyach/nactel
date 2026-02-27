document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const slides = container.getElementsByTagName('img');
    const btnVoltar = document.getElementById('voltar');
    const btnAvancar = document.getElementById('avancar');
    let currentIndex = 0;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;
    const descriptions = Array.from(slides).map((img) => {
        const fromData = img.getAttribute('data-description');
        if (fromData && fromData.trim()) return fromData.trim();
        const fromAlt = img.getAttribute('alt');
        if (fromAlt && fromAlt.trim()) return fromAlt.trim();
        return '';
    });

    // Criar container para descrições
    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'slide-description';
    descriptionContainer.setAttribute('aria-live', 'polite');
    container.parentElement.appendChild(descriptionContainer);

    // Criar indicadores
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carrossel-indicators';
    
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        indicator.setAttribute('tabindex', '0');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            if (!isTransitioning) {
                goToSlide(i);
            }
        });
        indicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!isTransitioning) {
                    goToSlide(i);
                }
            }
        });
        indicatorsContainer.appendChild(indicator);
    }
    
    container.parentElement.appendChild(indicatorsContainer);

    function updateIndicators() {
        const indicators = document.getElementsByClassName('indicator');
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
            indicators[i].setAttribute('aria-selected', 'false');
        }
        indicators[currentIndex].classList.add('active');
        indicators[currentIndex].setAttribute('aria-selected', 'true');
    }

    function updateDescription() {
        descriptionContainer.textContent = descriptions[currentIndex] || '';
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        if (index === currentIndex) {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateIndicators();
            updateDescription();
            return;
        }
        isTransitioning = true;
        
        // Adicionar classe de fade out
        slides[currentIndex].classList.add('fade-out');
        
        setTimeout(() => {
            currentIndex = index;
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Remover classe de fade out e adicionar fade in
            slides[currentIndex].classList.remove('fade-out');
            slides[currentIndex].classList.add('fade-in');
            
            updateIndicators();
            updateDescription();

            setTimeout(() => {
                slides[currentIndex].classList.remove('fade-in');
                isTransitioning = false;
            }, 300);
        }, 300);
    }

    function nextSlide() {
        if (!isTransitioning) {
            const nextIndex = (currentIndex + 1) % slides.length;
            goToSlide(nextIndex);
        }
    }

    function prevSlide() {
        if (!isTransitioning) {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            goToSlide(prevIndex);
        }
    }

    // Adicionar eventos aos botões
    btnAvancar.addEventListener('click', nextSlide);
    btnVoltar.addEventListener('click', prevSlide);

    // Melhorar acessibilidade dos botões
    btnAvancar.setAttribute('aria-label', 'Próximo slide');
    btnVoltar.setAttribute('aria-label', 'Slide anterior');

    // Auto-play com pause ao hover
    let autoPlayInterval = setInterval(nextSlide, 5000);
    let isPaused = false;

    container.parentElement.addEventListener('mouseenter', () => {
        isPaused = true;
        clearInterval(autoPlayInterval);
    });

    container.parentElement.addEventListener('mouseleave', () => {
        isPaused = false;
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Suporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Suporte para touch
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Pausar auto-play quando a página não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(autoPlayInterval);
        } else if (!isPaused) {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
    });

    // Inicializar
    goToSlide(0);
    updateDescription();
});