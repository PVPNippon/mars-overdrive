const alienChars = ["⟇", "⏚", "⌰", "⊑", "⊔", "⏃", "⎔", "⏁", "⋔", "⟟", "⊕", "⏦"];

// Smooth Scroll Dampening
let targetScroll = 0;
let currentScroll = 0;
let isTicking = false;

window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
    requestTick();
});

function requestTick() {
    if (!isTicking) {
        requestAnimationFrame(updateScroll);
        isTicking = true;
    }
}

function updateScroll() {
    currentScroll += (targetScroll - currentScroll) * 0.07;
    triggerEffects(currentScroll);

    if (Math.abs(targetScroll - currentScroll) > 0.5) {
        requestAnimationFrame(updateScroll);
    } else {
        isTicking = false;
    }
}

// Main Scroll-based Effects
function triggerEffects(scrollY) {
    let viewportHeight = window.innerHeight;
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollY / totalHeight;

    // Galaxy to Mars Transition (Purple to Red)
    let startColor = [58, 13, 97];
    let midColor = [90, 24, 154];
    let endColor = [139, 44, 16];

    let newColor = startColor.map((start, i) =>
        Math.floor(start + (endColor[i] - start) * scrollPercent)
    );
    let newMidColor = midColor.map((start, i) =>
        Math.floor(start + (endColor[i] - start) * scrollPercent)
    );

    document.body.style.background = `linear-gradient(to bottom, 
        rgb(${newColor.join(",")}), 
        rgb(${newMidColor.join(",")})
    )`;

    // Text Block English Zone Logic
    const textBlocks = document.querySelectorAll(".text-block");
    const englishZoneTop = viewportHeight * 0.4;
    const englishZoneBottom = viewportHeight * 0.6;

    textBlocks.forEach((block) => {
        const blockTop = block.getBoundingClientRect().top;
        const blockBottom = block.getBoundingClientRect().bottom;

        // If the block is inside the English zone
        if (blockTop < englishZoneBottom && blockBottom > englishZoneTop) {
            // Flip to English and keep it
            if (!block.dataset.isEnglish) {
                flipToEnglish(block);
            }
            block.style.opacity = 1;
            block.style.transform = `translateY(0px)`;
        } else {
            // Flip back to cryptic if not in zone
            if (block.dataset.isEnglish) {
                scrambleLetters(block);
                block.dataset.isEnglish = "";
            }
            // Optional: you can keep fade-in/out if needed
            block.style.opacity = 0.5;
            block.style.transform = `translateY(30px)`;
        }
    });
}

function flipToEnglish(element) {
    element.classList.add("flipping");
    setTimeout(() => {
        const text = element.dataset.english || element.textContent;
        element.dataset.english = text; // Store original text if not already
        element.textContent = text;
        element.dataset.isEnglish = "true"; // Mark it as English now
        element.classList.remove("glowing");
        element.classList.remove("flipping");
    }, 300); // Duration should match your CSS transition
}

// Letter Scramble Effect
function scrambleLetters(element) {
    element.classList.add("flipping");
    setTimeout(() => {
        const text = element.dataset.english || element.textContent;
        element.dataset.english = text;
        const scrambledText = text.split("").map(char =>
            char === " " ? " " : alienChars[Math.floor(Math.random() * alienChars.length)]
        ).join("");
        element.textContent = scrambledText;
        element.classList.add("glowing");
        element.classList.remove("flipping");
    }, 300); // Duration should match your CSS transition
}


// DOM Content Loaded Setup
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Setup
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");
    const menuItems = mobileMenu.querySelectorAll("li");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove("opacity-0", "translate-x-10");
            }, index * 150);
        });
    });

    function closeDrawer() {
        menuItems.forEach((item) => {
            item.classList.add("opacity-0", "translate-x-10");
        });
        setTimeout(() => {
            mobileMenu.classList.add("translate-x-full");
        }, 300);
    }

    closeMenu.addEventListener("click", closeDrawer);

    // Starfield Generation
    const starContainer = document.querySelector(".stars");
    for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * window.innerWidth}px`;
        star.style.top = `${Math.random() * window.innerHeight}px`;
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starContainer.appendChild(star);
    }

     // Scramble all text blocks initially
     const textBlocks = document.querySelectorAll(".text-block");
     textBlocks.forEach(block => {
         scrambleLetters(block);
     });

    // Mini Ship Visibility Toggle
    const miniShip = document.getElementById("mini-ship");
    const marsSection = document.querySelector(".mars-overdrive");

    function checkVisibility() {
        const sectionRect = marsSection.getBoundingClientRect();
        miniShip.style.opacity = sectionRect.bottom < window.innerHeight * 0.5 ? "1" : "0";
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});