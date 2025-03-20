let customFont;
let angleOffset = 0.05; // initialize the angle offset for the swaying motion

function preload() {
  customFont = loadFont('./iterations/Bebas.ttf');
}

function setup() {
  createCanvas(400, 400);
  textSize(100);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  fill(255);
  
  let txt = "cat";
  
  // get the points of the text, now centered in the middle of the canvas
  let points = customFont.textToPoints(txt, width / 2 - textWidth(txt) / 2.5, height / 2 + 1, 190, {
    sampleFactor: 0.3, // density of points (lower for more points)
    simplifyThreshold: 0
  });
  
  // draw the furry edges based on the generated points of the text
  drawFurryEdges(points);
  
  // update the tail motion
  angleOffset += 0.08; // control the speed of the swaying
}

function drawFurryEdges(points) {
  for (let i = 0; i < points.length; i++) {
    let x = points[i].x;
    let y = points[i].y;
    
    for (let j = 0; j < 5; j++) { // number of fur strands per point
      let angle = noise(x * 0.05, y * 0.05) * TWO_PI; // perlin noise based on position
      let r = noise(x * 0.05, y * 0.05) * 10; // fur length varies based on noise
      
      let x1 = x + random(-1, 1);  // slight random displacement
      let y1 = y + random(-1, 12);
      
      // apply interaction based on mouse position
      let distance = dist(x, y, mouseX, mouseY); //distance from mouse to the text point
      let sway = sin(angleOffset + distance * 0.1) * 20; // Sway based on mouse distance
      
      let x2 = x1 + cos(angle) * r + sway; // add swaying offset to the x position
      let y2 = y1 + sin(angle) * r; // calculate the end point of the fur strand in the y direction

      stroke(255, 255, 255, 90); // softer white for the fur effect
      line(x1, y1, x2, y2);
    }
  }
}

