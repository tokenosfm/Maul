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
    }, 6000); 
}
function resetAutoPlay() {
    clearInterval(slideInterval);
    startAutoPlay();
}
startAutoPlay();

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start' });
    } else {
        console.log("Nie znaleziono sekcji o ID: " + sectionId);
    }
}
function scrollToSection(sectionId) {
    const allSections = document.querySelectorAll('.img-text');
    
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    const element = document.getElementById(sectionId);
    
    if (element) {

        element.style.display = 'block';

        setTimeout(() => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 10);
        
    } else {
        console.log("Nie znaleziono sekcji o ID: " + sectionId);
    }
}