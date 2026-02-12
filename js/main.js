/**
 * Main Application Entry Point
 * Initializes all modules and handles global functionality
 */

class TattooPortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initSmoothScroll();
        this.initLoadMore();
        this.initMobileNav();
        this.initImageLoading();
        this.consoleGreeting();
    }

    // Smooth scroll for anchor links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                e.preventDefault();
                const target = document.querySelector(
                    this.getAttribute("href"),
                );

                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav

                    window.scrollTo({
                        top: offsetTop,
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    // Load more functionality
    initLoadMore() {
        const loadMoreBtn = document.querySelector(".load-more button");

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                // Simulate loading more items
                loadMoreBtn.textContent = "CARREGANDO...";
                loadMoreBtn.disabled = true;

                setTimeout(() => {
                    // In a real app, this would fetch more data
                    loadMoreBtn.textContent = "NÃO HÁ MAIS ITENS";
                    loadMoreBtn.style.opacity = "0.5";
                }, 1500);
            });
        }
    }

    // Mobile navigation toggle
    initMobileNav() {
        // Add mobile menu functionality if needed
        const nav = document.querySelector(".nav-links");

        // Create mobile menu button if it doesn't exist
        if (!document.querySelector(".mobile-menu-btn")) {
            const mobileBtn = document.createElement("button");
            mobileBtn.className = "mobile-menu-btn md:hidden text-white";
            mobileBtn.innerHTML = "☰";
            mobileBtn.setAttribute("aria-label", "Toggle menu");

            mobileBtn.addEventListener("click", () => {
                nav.classList.toggle("hidden");
                nav.classList.toggle("flex");
                nav.classList.toggle("flex-col");
                nav.classList.toggle("absolute");
                nav.classList.toggle("top-full");
                nav.classList.toggle("left-0");
                nav.classList.toggle("w-full");
                nav.classList.toggle("bg-ink");
                nav.classList.toggle("p-6");
            });

            document.querySelector("nav").appendChild(mobileBtn);
        }
    }

    // Lazy loading for images
    initImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add("loaded");
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach((img) => imageObserver.observe(img));
        }
    }

    // Console greeting
    consoleGreeting() {
        console.log(
            "%c Alexandre Costa Tattoo Portfolio ",
            "background: #0a0a0a; color: #fff; font-size: 20px; padding: 10px;",
        );
        console.log(
            "%c Desenvolvido com ♥ para arte na pele ",
            "color: #a1a1a1; font-size: 12px;",
        );
    }

    // Utility: Scroll to section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Utility: Get URL parameters
    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
}

// Initialize app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        window.app = new TattooPortfolioApp();
    });
} else {
    window.app = new TattooPortfolioApp();
}

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.body.classList.add("tab-inactive");
    } else {
        document.body.classList.remove("tab-inactive");
    }
});
