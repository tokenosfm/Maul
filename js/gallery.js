const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => {
    slide.classList.remove('active');
    });
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    slides[currentSlide].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlide + n);
    resetAutoPlay();
}

let slideInterval;

function startAutoPlay() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000); 
}
function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
}
startAutoPlay();

