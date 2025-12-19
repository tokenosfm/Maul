const activeLink = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    if (link.getAttribute("href") === activeLink) {
        link.classList.add("active");
    }
});