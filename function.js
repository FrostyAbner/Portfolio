/* ================= SELECTORS ================= */
const togglebtn = document.querySelector(".togglebtn");
const nav = document.querySelector(".navlinks");
const navLinks = document.querySelectorAll(".navlinks a");
const sections = document.querySelectorAll("section, .hero-header");
const header = document.querySelector("header");
const contactForm = document.getElementById('contact-form');

/* ================= MOBILE MENU TOGGLE ================= */
togglebtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    togglebtn.classList.toggle("click");
    document.body.classList.toggle("menu-open", isOpen);
});

/* ================= NAV LINK CLICK ================= */
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // Smooth scroll handling is already handled by CSS scroll-behavior: smooth
        nav.classList.remove("open");
        togglebtn.classList.remove("click");
        document.body.classList.remove("menu-open");
    });
});

/* ================= SCROLL & REVEAL LOGIC ================= */
const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    // 1. Sticky Header
    if (scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // 2. Section Reveal & Active Link Highlight
    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        // Determine which section is currently in view for the Nav highlight
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }

        // Reveal animation: Trigger when element enters the viewport
        const sectionBounds = section.getBoundingClientRect();
        if (sectionBounds.top < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });

    // Update Nav Active State
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + currentSectionId) {
            link.classList.add("active");
        }
    });
};

/* ================= EVENT LISTENERS ================= */

// Run on Scroll
window.addEventListener("scroll", handleScrollEffects);

// Run on Page Load (Fixes the "Refresh Lag/Blank Screen" bug)
window.addEventListener("DOMContentLoaded", () => {
    handleScrollEffects();
    // Ensure hero shows up even if scroll is 0
    document.querySelector(".hero-header").classList.add("show");
});

/* ================= EMAILJS CONTACT FORM ================= */
// Initialize EmailJS
emailjs.init("pyCWll2g_uIE4JRlz");

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;

        emailjs.sendForm('service_r2s7ncu', 'template_ywsachu', this)
            .then(() => {
                btn.textContent = 'Message Sent!';
                btn.style.backgroundColor = '#28a745'; 
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = ""; 
                    btn.disabled = false;
                }, 3000);
            }, (err) => {
                btn.textContent = 'Error!';
                btn.style.backgroundColor = '#dc3545';
                console.error("EmailJS Error:", err);
                alert("Failed to send message. Please try again later.");
                btn.disabled = false;
            });
    });
}