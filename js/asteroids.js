document.addEventListener("DOMContentLoaded", function () {
    const asteroids = document.querySelectorAll("#asteroid-container .asteroid");

    asteroids.forEach(asteroid => {
        // ✅ Random size
        const size = Math.random() * 80 + 30; 
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        asteroid.style.position = "absolute";

        // ✅ Random start position
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        asteroid.style.left = `${x}px`;
        asteroid.style.top = `${y}px`;

        // ✅ Random movement speed
        const speedX = (Math.random() - 0.5) * 2;
        const speedY = (Math.random() - 0.5) * 2;

        // ✅ Random rotation speed
        let rotation = Math.random() * 360;
        const rotationSpeed = (Math.random() - 0.5) * 2;

        // ✅ Movement function
        function moveAsteroid() {
            x += speedX;
            y += speedY;
            rotation += rotationSpeed;

            // Wrap around screen
            if (x > window.innerWidth) x = -size;
            if (x < -size) x = window.innerWidth;
            if (y > window.innerHeight) y = -size;
            if (y < -size) y = window.innerHeight;

            asteroid.style.left = `${x}px`;
            asteroid.style.top = `${y}px`;
            asteroid.style.transform = `rotate(${rotation}deg)`;

            requestAnimationFrame(moveAsteroid);
        }

        requestAnimationFrame(moveAsteroid);
    });
});
