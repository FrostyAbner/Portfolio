/* ================= SELECTORS ================= */
const togglebtn = document.querySelector(".togglebtn");
const nav = document.querySelector(".navlinks");
const navLinks = document.querySelectorAll(".navlinks a");
const sections = document.querySelectorAll("section, .hero-header");
const header = document.querySelector("header");
const contactForm = document.getElementById("contact-form");

/* ================= MOBILE MENU TOGGLE ================= */
togglebtn.addEventListener("click", () => {
    togglebtn.classList.toggle("click");
    nav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
});

/* ================= CLOSE MENU ON LINK CLICK ================= */
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        togglebtn.classList.remove("click");
        document.body.classList.remove("menu-open");
    });
});

/* ================= SCROLL LOGIC ================= */
function handleScrollEffects() {
    const scrollY = window.scrollY;

    /* Sticky Header */
    if (scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    let currentSection = "";

    sections.forEach(section => {
        const sectionId = section.id;
        if (!sectionId) return; // 🔥 FIX: ignore hero-header

        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }

        /* Reveal animation */
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });

    /* NAV UNDERLINE UPDATE */
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.onscroll = function() { updateScrollProgress() };

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

/* ================= EVENTS ================= */
window.addEventListener("scroll", handleScrollEffects);

window.addEventListener("DOMContentLoaded", () => {
    handleScrollEffects();
    document.querySelector(".hero-header")?.classList.add("show");
});

/* ================= EMAILJS ================= */
emailjs.init("pyCWll2g_uIE4JRlz");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = this.querySelector(".submit-btn");
        const originalText = btn.textContent;

        btn.textContent = "Sending...";
        btn.disabled = true;

        emailjs
            .sendForm("service_r2s7ncu", "template_ywsachu", this)
            .then(() => {
                btn.textContent = "Message Sent!";
                btn.style.backgroundColor = "#28a745";
                this.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                    btn.disabled = false;
                }, 3000);
            })
            .catch(err => {
                console.error(err);
                btn.textContent = "Error!";
                btn.style.backgroundColor = "#dc3545";
                btn.disabled = false;
            });
    });
}
