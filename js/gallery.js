const slides = document.querySelectorAll('.slide');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    const nextIndex = (currentSlide + 1) % slides.length;
    slides[prevIndex].classList.add('prev');
    slides[nextIndex].classList.add('next');
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

showSlide(currentSlide);
startAutoPlay();

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
                block: 'start'
            });
        }, 10);
        
    } else {
        console.log("Nie znaleziono sekcji o ID: " + sectionId);
    }
}
function handleHashNavigation() {
    const hash = window.location.hash;

    if (hash) {
        const sectionId = hash.substring(1);
        scrollToSection(sectionId);
    }
}
window.addEventListener('load', handleHashNavigation);
window.addEventListener('hashchange', handleHashNavigation);