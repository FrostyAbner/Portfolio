const togglebtn = document.querySelector(".togglebtn");
const nav = document.querySelector(".navlinks");
const navLinks = document.querySelectorAll(".navlinks a");
const sections = document.querySelectorAll("section, .hero-header");
const header = document.querySelector("header"); // sticky header

/* ================= MOBILE MENU TOGGLE ================= */
togglebtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    togglebtn.classList.toggle("click");

    /* 🔒 Lock scroll when menu is open */
    document.body.classList.toggle("menu-open", isOpen);
});

/* ================= NAV LINK CLICK ================= */
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        nav.classList.remove("open");
        togglebtn.classList.remove("click");

        /* 🔓 Unlock scroll */
        document.body.classList.remove("menu-open");
    });
});

/* ================= SCROLL EVENTS ================= */
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    /* Sticky navbar effect trigger */
    if (scrollY > 20) { // Trigger slightly earlier for a smoother feel
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    /* Active link + section reveal */
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }

        /* Reveal animation */
        if (section.getBoundingClientRect().top < window.innerHeight - 120) {
            section.classList.add("show");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* Show hero on page load */
document.querySelector(".hero-header").classList.add("show");
