const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
const timelineContents = document.querySelectorAll('.timeline-content');
timelineContents.forEach((content) => {
    observer.observe(content);
});
