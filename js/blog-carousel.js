// Carousel functionality
class BlogCarousel {
    constructor() {
        this.galleries = document.querySelectorAll('.image-gallery');
        this.currentIndices = new Map();
        this.isMobile = window.innerWidth < 768;

        this.init();
        window.addEventListener('resize', () => this.handleResize());
    }

    init() {
        this.galleries.forEach(gallery => {
            const section = gallery.dataset.section;
            const carousel = gallery.querySelector('.carousel');
            const images = carousel.querySelectorAll('img');

            if (images.length === 0) return;

            // Initialize current index
            this.currentIndices.set(section, 0);

            // Set first image as active
            images[0].classList.add('active');

            // Create dots
            this.createDots(gallery, images.length);

            // Add event listeners
            const prevBtn = gallery.querySelector('.carousel-prev');
            const nextBtn = gallery.querySelector('.carousel-next');

            if (prevBtn) prevBtn.addEventListener('click', () => this.prev(section));
            if (nextBtn) nextBtn.addEventListener('click', () => this.next(section));

            // Keyboard navigation
            document.addEventListener('keydown', (e) => this.handleKeyboard(e, section));

            // Touch support
            this.addTouchSupport(gallery, section);
        });

        // Desktop: convert carousels to grids
        this.convertToGrid();
    }

    createDots(gallery, count) {
        const dotsContainer = gallery.querySelector('.carousel-dots');
        if (!dotsContainer) return;

        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                const section = gallery.dataset.section;
                this.goToSlide(section, i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    prev(section) {
        const current = this.currentIndices.get(section);
        const carousel = this.getCarousel(section);
        const imageCount = carousel.querySelectorAll('img').length;
        this.goToSlide(section, (current - 1 + imageCount) % imageCount);
    }

    next(section) {
        const current = this.currentIndices.get(section);
        const carousel = this.getCarousel(section);
        const imageCount = carousel.querySelectorAll('img').length;
        this.goToSlide(section, (current + 1) % imageCount);
    }

    goToSlide(section, index) {
        const carousel = this.getCarousel(section);
        const images = carousel.querySelectorAll('img');
        const gallery = document.querySelector(`[data-section="${section}"]`);
        const dots = gallery.querySelectorAll('.carousel-dot');

        // Remove active class from all images and dots
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current image and dot
        images[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');

        // Update current index
        this.currentIndices.set(section, index);
    }

    getCarousel(section) {
        return document.querySelector(`[data-section="${section}"] .carousel`);
    }

    handleKeyboard(e, section) {
        if (e.key === 'ArrowLeft') this.prev(section);
        if (e.key === 'ArrowRight') this.next(section);
    }

    addTouchSupport(gallery, section) {
        const carousel = gallery.querySelector('.carousel');
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(section, touchStartX, touchEndX);
        });
    }

    handleSwipe(section, startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (diff > swipeThreshold) this.next(section);
        else if (diff < -swipeThreshold) this.prev(section);
    }

    convertToGrid() {
        if (window.innerWidth < 768) return;

        this.galleries.forEach(gallery => {
            const carousel = gallery.querySelector('.carousel');
            const controls = gallery.querySelector('.carousel-controls');
            const images = carousel.querySelectorAll('img');

            // Hide carousel and controls on desktop
            carousel.style.display = 'none';
            if (controls) controls.style.display = 'none';

            // Create grid
            const grid = document.createElement('div');
            const imageCount = images.length;

            // Determine grid columns based on image count
            if (imageCount === 1) {
                grid.className = 'image-grid';
            } else if (imageCount <= 4) {
                grid.className = 'image-grid two-columns';
            } else if (imageCount <= 6) {
                grid.className = 'image-grid two-columns';
            } else {
                grid.className = 'image-grid three-columns';
            }

            // Clone images into grid
            images.forEach(img => {
                const clone = img.cloneNode(true);
                clone.classList.remove('active');
                clone.style.display = 'block';
                grid.appendChild(clone);
            });

            // Insert grid after carousel
            carousel.parentNode.insertBefore(grid, controls || carousel.nextSibling);
        });
    }

    handleResize() {
        const newIsMobile = window.innerWidth < 768;

        if (newIsMobile !== this.isMobile) {
            this.isMobile = newIsMobile;
            // Reinitialize on resize
            location.reload();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogCarousel();
});
