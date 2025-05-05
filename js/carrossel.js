const container = document.getElementById('container');
const totalSlides = container.children.length;
let index = 0;

document.getElementById('avancar').addEventListener('click', () => {
    index = (index + 1) % totalSlides;
    updateSlide();
});

document.getElementById('voltar').addEventListener('click', () => {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
});

function updateSlide() {
    container.style.transform = `translateX(-${index * 100}%)`;
}