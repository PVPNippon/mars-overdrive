document.addEventListener("DOMContentLoaded", function () {
    const numAsteroids = 10; // Number of asteroids
    const container = document.getElementById("asteroid-container");
    const asteroidImages = [
        "asteroid1.png",
        "asteroid2.png",
        "asteroid3.png",
        "asteroid4.png",
        "asteroid5.png",
        "asteroid6.png",
        "asteroid7.png"
    ]; // Add more if needed

    for (let i = 0; i < numAsteroids; i++) {
        const asteroid = document.createElement("img");
        asteroid.src = `/images/${asteroidImages[Math.floor(Math.random() * asteroidImages.length)]}`;
        asteroid.classList.add("asteroid");

        // ✅ Random size (30px - 110px)
        const size = Math.random() * 80 + 30; 
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;

        // ✅ Random start position
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        asteroid.style.left = `${x}px`;
        asteroid.style.top = `${y}px`;

        // ✅ Random movement speed
        const speedX = (Math.random() - 0.5) * 2; // Random speed between -1 and 1
        const speedY = (Math.random() - 0.5) * 2;

        // ✅ Random rotation speed
        let rotation = Math.random() * 360; // Initial rotation angle
        const rotationSpeed = (Math.random() - 0.5) * 2; // Random slow rotation

        // ✅ Move & Rotate function
        function moveAsteroid() {
            x += speedX;
            y += speedY;
            rotation += rotationSpeed;

            // Wrap around if asteroid moves out of bounds
            if (x > window.innerWidth) x = -size;
            if (x < -size) x = window.innerWidth;
            if (y > window.innerHeight) y = -size;
            if (y < -size) y = window.innerHeight;

            // Apply transformation
            asteroid.style.left = `${x}px`;
            asteroid.style.top = `${y}px`;
            asteroid.style.transform = `rotate(${rotation}deg)`;

            requestAnimationFrame(moveAsteroid); // Keep moving & rotating smoothly
        }

        // Start movement and rotation
        requestAnimationFrame(moveAsteroid);

        // Add to container
        container.appendChild(asteroid);
    }
});