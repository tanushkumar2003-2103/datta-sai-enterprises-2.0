/* =========================================================
   DATTA SAI ENTERPRISES
   VANILLA JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 400);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("siteHeader");

    function handleHeaderScroll() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("mobileMenuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuButton.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Close mobile menu after navigation */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


    /* =====================================================
       HERO CAROUSEL
    ===================================================== */

    const slides =
        document.querySelectorAll(".hero-slide");

    const dotsContainer =
        document.getElementById("sliderDots");

    const nextButton =
        document.getElementById("nextSlide");

    const prevButton =
        document.getElementById("prevSlide");

    let currentSlide = 0;

    let autoplay;

    const AUTOPLAY_TIME = 6500;


    /* Create dots */

    slides.forEach((_, index) => {

        const dot =
            document.createElement("button");

        dot.className =
            "slider-dot";

        dot.type =
            "button";

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );

        dot.addEventListener(
            "click",
            () => goToSlide(index)
        );

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(".slider-dot");


    function goToSlide(index) {

        slides[currentSlide].classList.remove("active");

        dots[currentSlide].classList.remove("active");

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        dots[currentSlide].classList.add("active");

    }


    function nextSlide() {

        const next =
            (currentSlide + 1) % slides.length;

        goToSlide(next);

    }


    function previousSlide() {

        const previous =
            (currentSlide - 1 + slides.length)
            % slides.length;

        goToSlide(previous);

    }


    function startAutoplay() {

        stopAutoplay();

        autoplay =
            setInterval(
                nextSlide,
                AUTOPLAY_TIME
            );

    }


    function stopAutoplay() {

        if (autoplay) {
            clearInterval(autoplay);
        }

    }


    nextButton.addEventListener(
        "click",
        () => {

            nextSlide();

            startAutoplay();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            previousSlide();

            startAutoplay();

        }
    );


    /* Initial state */

    dots[0].classList.add("active");


    /* Pause on hover */

    const hero =
        document.querySelector(".hero");

    hero.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    hero.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /* Keyboard accessibility */

    hero.addEventListener("keydown", event => {

        if (event.key === "ArrowRight") {
            nextSlide();
            startAutoplay();
        }

        if (event.key === "ArrowLeft") {
            previousSlide();
            startAutoplay();
        }

    });


    /* Touch swipe */

    let touchStartX = 0;

    let touchEndX = 0;


    hero.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    hero.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;

            if (Math.abs(distance) < 50) {
                return;
            }

            if (distance < 0) {
                nextSlide();
            } else {
                previousSlide();
            }

            startAutoplay();

        },
        { passive: true }
    );


    startAutoplay();


    /* =====================================================
       SMOOTH CATEGORY NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            });

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    navLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                threshold: 0.2
            }
        );


    sections.forEach(section => {
        observer.observe(section);
    });


    /* =====================================================
       SERVICE CARD ACCESSIBILITY
    ===================================================== */

    document
        .querySelectorAll(".service-card")
        .forEach(card => {

            card.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        card.click();

                    }

                }
            );

        });


    /* =====================================================
       THEME CONTROLLER (LIGHT / DARK MODE)
    ===================================================== */

    const themeToggleBtn =
        document.getElementById("themeToggle");

    const mobileThemeToggleBtn =
        document.getElementById("mobileThemeToggle");

    const mobileThemeStatus =
        document.getElementById("mobileThemeStatus");

    function getInitialTheme() {
        const saved =
            localStorage.getItem("dse_theme");

        if (saved === "dark" || saved === "light") {
            return saved;
        }

        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) ? "dark" : "light";
    }

    function setTheme(theme) {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "dse_theme",
            theme
        );

        const isDark = theme === "dark";

        if (themeToggleBtn) {
            themeToggleBtn.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
            themeToggleBtn.setAttribute(
                "title",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        }

        if (mobileThemeStatus) {
            mobileThemeStatus.textContent =
                isDark ? "Dark" : "Light";
        }
    }

    function toggleTheme() {
        const current =
            document.documentElement.getAttribute("data-theme") ||
            getInitialTheme();

        const nextTheme =
            current === "dark" ? "light" : "dark";

        setTheme(nextTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }

    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Sync button state on page load
    setTheme(
        document.documentElement.getAttribute("data-theme") ||
        getInitialTheme()
    );

    // Sync system changes if user hasn't explicitly set localStorage preference
    if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", e => {
                if (!localStorage.getItem("dse_theme")) {
                    setTheme(e.matches ? "dark" : "light");
                }
            });
    }

});


/* =========================================================
   WHATSAPP FUNCTION
========================================================= */

function openWhatsApp(serviceName) {

    const phoneNumber =
        "918885898355";

    let message =
        `Hello Datta Sai Enterprises, I am interested in ${serviceName} service. Please provide me with more details and service availability.`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}