let font;
let points = [];
let fallingPoints = [];

function preload() {
  font = loadFont('./iterations/Bebas.ttf'); // Corrected variable name
}

function setup() {
  createCanvas(400, 400);
  textSize(100);
  textAlign(CENTER, CENTER);
  points = font.textToPoints('LIGHT', 150, 150, 150, { sampleFactor: 0.2 }); // Added missing comma
  
  for (let p of points) {
    fallingPoints.push({ x: p.x, y: p.y, speed: random(1, 3), glow: random(100, 255) });
  }
}

function draw() {
  background(0);
  noStroke();
  
  for (let i = 0; i < fallingPoints.length; i++) {
    let p = fallingPoints[i];
    let glowColor = color(0, 255, 200, sin(frameCount * 0.1 + i * 0.1) * 128 + 128);
    fill(glowColor);
    ellipse(p.x, p.y, 5, 5);
    
    p.y += p.speed;
    if (p.y > height) {
      p.y = random(-50, 0);
    }
  }
}

