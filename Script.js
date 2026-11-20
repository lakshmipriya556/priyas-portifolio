// AI Interactive Background

const canvas = document.createElement("canvas");

canvas.id = "ai-background";

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
    x: null,
    y: null
};

// Canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

// Create particles
for (let i = 0; i < 70; i++) {

    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7
    });

}

// Mouse movement
window.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener("mouseout", function() {
    mouse.x = null;
    mouse.y = null;
});

// Animation
function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -1;
        }

        // Particle dots
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#b66cff";

        ctx.fill();

        // Connecting lines
        for (let j = index + 1; j < particles.length; j++) {

            let other = particles[j];

            let dx = particle.x - other.x;
            let dy = particle.y - other.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.moveTo(particle.x, particle.y);

                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    "rgba(168, 85, 247, 0.25)";

                ctx.stroke();

            }

        }

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {

            let dx = particle.x - mouse.x;
            let dy = particle.y - mouse.y;

            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.moveTo(particle.x, particle.y);

                ctx.lineTo(mouse.x, mouse.y);

                ctx.strokeStyle =
                    "rgba(192, 132, 252, 0.5)";

                ctx.stroke();

            }

        }

    });

    requestAnimationFrame(animate);

}

animate();
// TYPING EFFECT

const typingElement = document.getElementById("typing");

const words = [
    "B.Tech Student",
    "AI & ML Enthusiast",
    "Python Programmer",
    "Future Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        typingElement.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(() => {
            typingElement.textContent = "";
            charIndex = 0;
            wordIndex = (wordIndex + 1) % words.length;
            typeEffect();
        }, 1500);
    }
}

typeEffect();
// SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
});

revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
});