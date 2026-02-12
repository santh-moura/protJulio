class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        };

        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            this.observerOptions,
        );
        this.elements = document.querySelectorAll(".scroll-reveal");

        this.init();
    }

    init() {
        this.observeElements();
        this.initParallax();
        this.initNavbarScroll();
    }

    observeElements() {
        this.elements.forEach((el) => {
            this.observer.observe(el);
        });
    }

    handleIntersect(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.revealElement(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    revealElement(element) {
        element.classList.add("revealed");

        // Add stagger effect if parent has stagger class
        if (element.classList.contains("stagger-children")) {
            element.classList.add("revealed");
        }
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll(".parallax");

        if (parallaxElements.length === 0) return;

        let ticking = false;

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax(parallaxElements);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax(elements) {
        const scrolled = window.pageYOffset;

        elements.forEach((el) => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }

    initNavbarScroll() {
        const navbar = document.getElementById("navbar");
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;

            // Add/remove background
            if (currentScroll > 50) {
                navbar.classList.add("bg-ink/95", "shadow-lg");
            } else {
                navbar.classList.remove("bg-ink/95", "shadow-lg");
            }

            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = "translateY(-100%)";
            } else {
                navbar.style.transform = "translateY(0)";
            }

            lastScroll = currentScroll;
        });
    }

    // Utility: Reveal all elements immediately (for reduced motion preference)
    revealAll() {
        this.elements.forEach((el) => {
            el.classList.add("revealed");
            this.observer.unobserve(el);
        });
    }

    // Utility: Check for reduced motion preference
    checkReducedMotion() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    const animations = new ScrollAnimations();

    // Respect reduced motion preference
    if (animations.checkReducedMotion()) {
        animations.revealAll();
    }

    window.scrollAnimations = animations;
});
