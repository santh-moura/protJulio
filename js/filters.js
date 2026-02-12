class PortfolioFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll(".filter-btn");
        this.grid = document.getElementById("portfolio-grid");
        this.items = [];
        this.currentFilter = "all";

        this.init();
    }

    init() {
        this.renderItems();
        this.bindEvents();
    }

    renderItems() {
        this.grid.innerHTML = portfolioData
            .map((item) => this.createItemHTML(item))
            .join("");
        this.items = document.querySelectorAll(".portfolio-item");
    }

    createItemHTML(item) {
        const categoryLabel = categoryLabels[item.category] || item.category;

        return `
            <div class="portfolio-item" data-category="${item.category}" data-id="${item.id}">
                <img src="${item.image}" 
                     alt="${item.title}" 
                     class="w-full h-full object-cover image-hover"
                     loading="lazy">
                <div class="overlay"></div>
                <div class="content">
                    <span class="category">${categoryLabel}</span>
                    <h3 class="title">${item.title}</h3>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => this.handleFilterClick(e));
        });
    }

    handleFilterClick(e) {
        const btn = e.target;
        const filterValue = btn.getAttribute("data-filter");

        // Update active state
        this.filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        this.filterItems(filterValue);
    }

    filterItems(category) {
        this.currentFilter = category;

        this.items.forEach((item) => {
            const itemCategory = item.getAttribute("data-category");

            if (category === "all" || itemCategory === category) {
                this.showItem(item);
            } else {
                this.hideItem(item);
            }
        });
    }

    showItem(item) {
        item.classList.remove("hidden");
        // Trigger reflow for animation
        void item.offsetWidth;
        item.classList.add("filtered");
    }

    hideItem(item) {
        item.classList.add("hidden");
        item.classList.remove("filtered");
    }

    // Public method to get current filter
    getCurrentFilter() {
        return this.currentFilter;
    }

    // Public method to filter programmatically
    setFilter(category) {
        const btn = document.querySelector(`[data-filter="${category}"]`);
        if (btn) {
            btn.click();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    window.portfolioFilter = new PortfolioFilter();
});

