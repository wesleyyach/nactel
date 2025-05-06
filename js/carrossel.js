document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const slides = container.getElementsByTagName('img');
    const btnVoltar = document.getElementById('voltar');
    const btnAvancar = document.getElementById('avancar');
    let currentIndex = 0;
    let isTransitioning = false;

    // Criar indicadores
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carrossel-indicators';
    
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            if (!isTransitioning) {
                goToSlide(i);
            }
        });
        indicatorsContainer.appendChild(indicator);
    }
    
    container.parentElement.appendChild(indicatorsContainer);

    function updateIndicators() {
        const indicators = document.getElementsByClassName('indicator');
        for (let i = 0; i < indicators.length; i++) {
            indicators[i].classList.remove('active');
        }
        indicators[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex = index;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
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

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pausar auto-play quando o mouse estiver sobre o carrossel
    container.parentElement.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    // Retomar auto-play quando o mouse sair do carrossel
    container.parentElement.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Adicionar suporte para teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Inicializar
    goToSlide(0);
});