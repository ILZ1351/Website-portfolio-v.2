let video;
let detector;
let hands = [];
let synth1, synth2;
let reverb;
let noteOn = false;
let effects = {
  pitchShift: 0,
  reverb: 0,
  synthType: 'sine'
};

async function setup() {
  createCanvas(640, 480, WEBGL);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  synth1 = new p5.MonoSynth();
  synth2 = new p5.MonoSynth();
  reverb = new p5.Reverb();
  reverb.process(synth1, 3, 2);
  reverb.process(synth2, 3, 2);

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
  background(20);
  image(video, -width / 2, -height / 2, width, height);
  drawHands();
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
  let fistClosed = pinchDist < 30 && dist(indexFinger.x, indexFinger.y, pinky.x, pinky.y) < 50;
  let openHand = pinchDist > 50 && dist(indexFinger.x, indexFinger.y, pinky.x, pinky.y) > 100;

  if (pinchDist < 30) {
    effects.pitchShift = map(pinchDist, 0, 30, -12, 12);
    synth.play(`C${4 + int(effects.pitchShift / 4)}`);
  } else if (openHand) {
    effects.reverb = 1;
    reverb.amp(1);
  } else if (fistClosed) {
    effects.synthType = effects.synthType === 'sine' ? 'square' : 'sawtooth';
    synth.setType(effects.synthType);
  }
}