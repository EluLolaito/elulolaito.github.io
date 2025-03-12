const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width; // Random position
        this.y = Math.random() * canvas.height - canvas.height; // Start from top
        this.size = Math.random() * 15 + 5; // Random size
        this.speedY = Math.random() * 1 + 0.5; // Vertical velocity
        this.speedX = (Math.random() - 0.5) * 2; // Horizontal velocity
        this.angle = Math.random() * Math.PI * 2; // Angle
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();

        // ctx.moveTo(10, 10);
        // ctx.bezierCurveTo(-10, 95, 70, 130, 80, 80);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.moveTo(80, 80);
        // ctx.bezierCurveTo(130, 70, 95, -10, 10, 10);
        // ctx.stroke();
        
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-this.size / 2, -this.size / 2, this.size / 2, -this.size / 2, 0, 0);
        ctx.bezierCurveTo(this.size / 2, this.size / 2, -this.size / 2, this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

function createPetals() {
    for (let i = 0; i < 60; i++) {
        petals.push(new Petal());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate);
}

createPetals();
animate();
