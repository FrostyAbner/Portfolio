
    const togglebtn = document.querySelector(".togglebtn");
    const nav = document.querySelector(".navlinks");
    const navLinks = document.querySelectorAll(".navlinks a");
    const sections = document.querySelectorAll("section, .hero-header");

    /* Mobile menu toggle */
    togglebtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        togglebtn.classList.toggle("click");

        /* 🔒 Scroll lock */
        document.body.classList.toggle("menu-open", isOpen);
    });

    /* CLICK: set active immediately */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            /* close mobile menu */
            nav.classList.remove("open");
            togglebtn.classList.remove("click");

            /* 🔓 Unlock scroll */
            document.body.classList.remove("menu-open");
        });
    });

    /* SCROLL: update active nav + reveal sections */
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                pageYOffset >= sectionTop &&
                pageYOffset < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

            /* reveal animation */
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

    /* Show hero on load */
    document.querySelector(".hero-header").classList.add("show");
