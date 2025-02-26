const alienChars = ["⟇", "⏚", "⌰", "⊑", "⊔", "⏃", "⎔", "⏁", "⋔", "⏏", "⟟", "⊕", "⏦"];

document.addEventListener("scroll", function () {
    let scrollPosition = window.scrollY;
    let viewportHeight = window.innerHeight;
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPosition / totalHeight; // Get percentage of scroll

    // Galaxy to Mars Transition (Purple to Red)
    let startColor = [58, 13, 97];   // Deep Purple (#3a0d61)
    let midColor = [90, 24, 154];    // Cosmic Magenta (#5a189a)
    let endColor = [139, 44, 16];    // Mars Red (#8b2c10)

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

    // Text Block Fade-in Effect
    let textBlocks = document.querySelectorAll(".text-block");

    textBlocks.forEach((block) => {
        let blockTop = block.getBoundingClientRect().top;
        let triggerStart = viewportHeight * 0.65;
        let triggerEnd = viewportHeight * 0.35;

        if (blockTop < triggerStart && blockTop > triggerEnd) {
            let opacity = 1 - Math.abs(blockTop - viewportHeight / 2) / (viewportHeight * 0.3);
            block.style.opacity = Math.max(0, Math.min(1, opacity));
            block.style.transform = `translateY(${(1 - opacity) * 50}px)`;
            animateLetterFlip(block);
        } else {
            block.style.opacity = 0;
            scrambleLetters(block);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const starContainer = document.querySelector(".stars");

    for (let i = 0; i < 200; i++) { // Number of stars
        let star = document.createElement("div");
        star.classList.add("star");

        // Random positions
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let size = Math.random() * 3 + 1; // Random size

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random animation delay to make twinkling effect look natural
        star.style.animationDelay = `${Math.random() * 2}s`;

        starContainer.appendChild(star);
    }

    const miniShip = document.getElementById("mini-ship");
    const marsSection = document.querySelector(".mars-overdrive"); // Add class to section

    function checkVisibility() {
        const sectionRect = marsSection.getBoundingClientRect();

        if (sectionRect.bottom < window.innerHeight * 0.5) {
            // 🚀 If scrolled past section, make the mini-ship visible
            miniShip.style.opacity = "1";
        } else {
            // 🌑 Hide mini-ship when inside section
            miniShip.style.opacity = "0";
        }
    }

    // Run function on scroll
    window.addEventListener("scroll", checkVisibility);

    // Run once on load in case user starts below section
    checkVisibility();
});

function scrambleLetters(element) {
    let text = element.dataset.english || element.textContent;
    element.dataset.english = text; // Store original text if not stored
    let scrambledText = text.split("").map(char => (char === " " ? " " : alienChars[Math.floor(Math.random() * alienChars.length)])).join("");
    element.textContent = scrambledText;
    element.classList.add("glowing"); // Add glow effect
}

function animateLetterFlip(element) {
    let text = element.dataset.english;
    let iterations = 5; // Reduce iterations for a faster flip
    let interval = 100; // Increase delay for slower effect
    let count = 0;

    let flipInterval = setInterval(() => {
        scrambleLetters(element);
        count++;
        if (count >= iterations) {
            clearInterval(flipInterval);
            setTimeout(() => {
                element.textContent = text;
                element.classList.remove("glowing"); // Remove glow after flip
            }, 1000); // Keep English visible for 1 second
        }
    }, interval);
}