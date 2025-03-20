let video;
let w = 320;
let h = 240;

let thresholdVal = 100; // Threshold for red color intensity
let t = "interactive"; // Text to be animated
let customFont;
let points = [];

function preload() {
  customFont = loadFont('./iterations/Bebas.ttf');
}

function setup() {
  createCanvas(w, h);
  video = createCapture(VIDEO);
  video.size(w, h);
  video.hide();
  
  textSize(64);
  textFont(customFont);
  points = customFont.textToPoints(t, width / 6, height / 2, 64, {
    sampleFactor: 0.2,
  }).map(pt => new LetterPoint(pt.x, pt.y));
}

function draw() {
  image(video, 0, 0, width, height);
  video.loadPixels();
  
  let redIntensity = 0;
  let pixelCount = 0;

  for (let i = 0; i < video.width; i++) {
    for (let j = 0; j < video.height; j++) {
      let index = (i + j * video.width) * 4;
      let r = video.pixels[index];
      redIntensity += r;
      pixelCount++;
    }
  }

  let avgRedIntensity = redIntensity / pixelCount;
  
  if (avgRedIntensity > thresholdVal) {
    for (let point of points) {
      point.move();
    }
  }

  fill(255, 0, 0);
  noStroke();
  for (let point of points) {
    ellipse(point.x, point.y, 6, 6);
  }
}

class LetterPoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.origX = x;
    this.origY = y;
  }

  move() {
    this.x = this.origX + random(-1, 1);
    this.y = this.origY + random(-1, 1);
  }
}

