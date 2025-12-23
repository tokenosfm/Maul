const activeLink = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    if (link.getAttribute("href") === activeLink) {
        link.classList.add("active");
    }
});
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-content a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        if (linkHref === pageName) {
            link.classList.add('active');
            const dropdownContent = link.closest('.dropdown-content');
            if (dropdownContent) {
                const parentBtn = dropdownContent.previousElementSibling;
                if (parentBtn && parentBtn.classList.contains('dropbtn')) {
                    parentBtn.classList.add('active');
                }
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', highlightActivePage);