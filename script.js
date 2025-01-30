// Make the birthday wish draggable
let draggableElement = document.getElementById("birthday-wish");
let closeButton = document.getElementById("close-btn");

let isDragging = false;
let offsetX, offsetY;

draggableElement.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - draggableElement.offsetLeft;
  offsetY = e.clientY - draggableElement.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    draggableElement.style.left = e.clientX - offsetX + "px";
    draggableElement.style.top = e.clientY - offsetY + "px";
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Close the birthday wish when the close button is clicked
closeButton.addEventListener("click", () => {
  draggableElement.style.display = "none";
});

// Fireworks animation
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to the full window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fireworks settings
const fireworks = [];

class Firework {
  constructor(x, y, color, velocity) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
    this.size = 3;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.size += 0.1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.alpha})`;
    ctx.fill();
    ctx.closePath();
  }

  isDead() {
    return this.alpha <= 0;
  }
}

// Generate random fireworks
function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const color = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
  const velocity = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
  };
  fireworks.push(new Firework(x, y, color, velocity));
}

// Update fireworks and redraw the canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.isDead()) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Create a new firework every 100 milliseconds
setInterval(createFirework, 100);
animate();

// Function to change background color randomly
function changeBackgroundColor() {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  document.body.style.backgroundColor = randomColor;
}

// Change background color every 5 seconds
setInterval(changeBackgroundColor, 5000);
