let video;
let detector;
let hands = [];
let synth1, synth2;
let reverb, distortion, formantFilter, compressor;
let fft;
let spectrum = [];

let effects = {
  pitchShift: 2,
  reverb: 0,
  modFreq: 1,
  synthType: 'square',
  colorShift: 0,
  distortionAmount: 0,
};

function setup() {
  createCanvas(640, 480, WEBGL);
  

  if (typeof p5.FFT === "undefined") {
    console.error("p5.sound.js is missing! Make sure to include p5.sound.min.js.");
    return;
  }

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();


  synth1 = new p5.MonoSynth();
  synth2 = new p5.MonoSynth();

  fft = new p5.FFT();
  fft.setInput(synth1); 

  console.log("✅ FFT initialized:", fft);
}


  synth1 = new p5.MonoSynth();
  synth2 = new p5.MonoSynth();

  reverb = new p5.Reverb();
  distortion = new p5.Distortion();
  formantFilter = new p5.Filter('bandpass');
  compressor = new p5.Compressor();

  reverb.process(synth1, 2, 3);
  reverb.process(synth2, 2, 3);
  distortion.process(synth1, 0.2);
  distortion.process(synth2, 0.2);

  formantFilter.freq(1200);
  formantFilter.res(10);
  synth1.connect(formantFilter);
  synth2.connect(formantFilter);

  compressor.set(0.6, 0.2, 8, -18, 0.5);
  synth1.connect(compressor);
  synth2.connect(compressor);

  fft = new p5.FFT();
  fft.setInput(synth1);

  const model = handPoseDetection.SupportedModels.MediaPipeHands;
  detector = await handPoseDetection.createDetector(model, {
    runtime: 'mediapipe',
    modelType: 'full',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
  });

  detectHands();
}

async function detectHands() {
  if (detector && video.elt.readyState === 4) {
    hands = await detector.estimateHands(video.elt);
  }
  requestAnimationFrame(detectHands);
}

function draw() {
  background(0);

  // Check if video is ready
  console.log("Video Ready State:", video.elt.readyState);

  if (video.elt.readyState === 4) {
    push();
    translate(-width / 2, -height / 2, 0);
    texture(video);
    plane(width, height);
    pop();
  } else {
    console.log("Video not ready");
  }

  drawHands();
  spectrum = fft.analyze();
  drawVisualizer();
}

function drawVisualizer() {
  push();
  translate(0, 0, -100);
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, -width / 2, width / 2);
    let y = map(spectrum[i], 0, 255, height / 2, -height / 2);
    let w = width / spectrum.length;
    fill(map(i, 0, spectrum.length, 0, 255), map(spectrum[i], 0, 255, 0, 255), map(i, 0, spectrum.length, 255, 0), 150);
    push();
    translate(x, y, 0);
    box(w, 10, 10);
    pop();
  }
  pop();
}

function drawHands() {
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let keypoint of hand.keypoints) {
      let x = keypoint.x - width / 2;
      let y = keypoint.y - height / 2;
      let z = keypoint.z * 500;
      fill(255, 255, 0);
      noStroke();
      push();
      translate(x, y, z);
      sphere(5);
      pop();
    }
    processGestures(hand, i);
  }
}

function processGestures(hand, handIndex) {
  let synth = handIndex === 0 ? synth1 : synth2;

  let indexFinger = hand.keypoints[8];
  let thumb = hand.keypoints[4];
  let pinky = hand.keypoints[20];

  let pinchDist = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);
  let fistClosed = pinchDist < 50 && dist(indexFinger.x, indexFinger.y, pinky.x, pinky.y) < 10;
  let openHand = pinchDist > 50 && dist(indexFinger.x, indexFinger.y, pinky.x, pinky.y) > 100;

  if (pinchDist < 50) {
    let targetPitchShift = map(pinchDist, 0, 50, -12, 22);
    effects.pitchShift = lerp(effects.pitchShift, targetPitchShift, 0.6);
    synth.play(`C${3 + int(effects.pitchShift / 12)}`, 0.4, 0.1);
    effects.colorShift = map(pinchDist, 0, 50, 255, 0);
  }

  if (openHand) {
    effects.reverb = lerp(effects.reverb, 30, 0.5);
    reverb.amp(map(effects.reverb, 0, 50, 0.5, 20));
  }

  if (fistClosed) {
    let targetDistortionAmount = map(pinchDist, 0, 50, 0.2, 0.8);
    effects.distortionAmount = lerp(effects.distortionAmount, targetDistortionAmount, 0.1);
    distortion.amp(effects.distortionAmount);
  }

  formantFilter.freq(map(pinchDist, 0, 50, 400, 2500));
}
