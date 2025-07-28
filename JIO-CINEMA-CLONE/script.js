document.addEventListener("DOMContentLoaded", function() {
    const carousels = ["continue-watching", "popular-movies", "tv-shows", "sports", "kids"];
    carousels.forEach(id => initCarousel(id));
    
    const contentCards = document.querySelectorAll(".content-card");
    contentCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.05)";
            this.style.zIndex = "5";
            this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.5)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1)";
            this.style.zIndex = "1";
            this.style.boxShadow = "none";
        });
    });
    
    const searchInput = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
    
    const userIcon = document.querySelector(".user");
    userIcon.addEventListener("click", function() {
        alert("User profile clicked! Login/signup functionality would go here.");
    });
    
    const watchNowBtn = document.querySelector(".watch-now-btn");
    watchNowBtn.addEventListener("click", function() {
        alert("Starting live stream of Premier League...");
    });
    
    const seeAllLinks = document.querySelectorAll(".see-all");
    seeAllLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const sectionTitle = this.parentElement.querySelector("h2").textContent;
            alert(`Showing all content for: ${sectionTitle}`);
        });
    });

    carousels.forEach(id => {
        const carousel = document.getElementById(id);
        if (carousel) {
            const prevBtn = carousel.querySelector(".prev");
            const nextBtn = carousel.querySelector(".next");
            
            prevBtn.addEventListener("click", () => moveCarousel(id, 1));
            nextBtn.addEventListener("click", () => moveCarousel(id, -1));
        }
    });
});

function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const container = carousel.querySelector(".carousel-container");
    const items = container.querySelectorAll(".content-card");
    if (items.length === 0) return;
    const itemCount = items.length;
    const itemWidth = items[0].offsetWidth + 20;
    
    let currentPosition = 0;
    const visibleItems = Math.min(6, itemCount);
    container.style.transform = `translateX(${currentPosition}px)`;
}

function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const container = carousel.querySelector(".carousel-container");
    const items = container.querySelectorAll(".content-card");
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 20;
    const itemCount = items.length;
    
    let currentPosition = parseInt(container.style.transform.replace("translateX(", "").replace("px)", "")) || 0;
    const visibleItems = Math.min(6, itemCount);
    const maxPosition = 0;
    const minPosition = -((itemCount - visibleItems) * itemWidth);
    
    let itemsToMove;
    if (window.innerWidth >= 1200) {
        itemsToMove = 4;
    } else if (window.innerWidth >= 992) {
        itemsToMove = 3;
    } else if (window.innerWidth >= 768) {
        itemsToMove = 2;
    } else {
        itemsToMove = 1;
    }
    
    currentPosition += direction * (itemsToMove * itemWidth);
    
    if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
    } else if (currentPosition < minPosition) {
        currentPosition = minPosition;
    }
    
    container.style.transform = `translateX(${currentPosition}px)`;
    
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    
    prevBtn.style.opacity = currentPosition === maxPosition ? "0.5" : "1";
    nextBtn.style.opacity = currentPosition === minPosition ? "0.5" : "1";
    prevBtn.style.cursor = currentPosition === maxPosition ? "not-allowed" : "pointer";
    nextBtn.style.cursor = currentPosition === minPosition ? "not-allowed" : "pointer";
}

function performSearch() {
    const searchInput = document.querySelector(".search input");
    const query = searchInput.value.toLowerCase();
    const allContentCards = document.querySelectorAll(".content-card");

    allContentCards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p") ? card.querySelector("p").textContent.toLowerCase() : "";
        
        if (title.includes(query) || description.includes(query)) {
            card.style.display = "block"; 
        } else {
            card.style.display = "none";
        }
    });

    // Reset search input after search
    searchInput.value = "";
}

window.addEventListener("resize", function() {
    const carousels = ["continue-watching", "popular-movies", "tv-shows", "sports", "kids"];
    carousels.forEach(id => {
        const carousel = document.getElementById(id);
        if (carousel) {
            const container = carousel.querySelector(".carousel-container");
            container.style.transition = "none";
            container.style.transform = "translateX(0px)";
            setTimeout(() => {
                container.style.transition = "transform 0.5s ease";
            }, 10);
        }
    });
});

