let questions = [
  {
    q: "1. What do you do when faced with a challenge?",
    options: [
      { text: "I fight back aggressively.", type: "Hardcore Punk" },
      { text: "I try to be creative and find a solution.", type: "Riot Grrrl" },
      { text: "I analyze and plan carefully.", type: "Crust Punk" },
      { text: "I tend to avoid conflict or difficulty.", type: "Pop Punk" }
    ]
  },
  {
    q: "2. How do you approach new projects?",
    options: [
      { text: "I dive in without thinking too much.", type: "Hardcore Punk" },
      { text: "I research and plan everything first.", type: "Crust Punk" },
      { text: "I look for creative inspiration.", type: "Riot Grrrl" },
      { text: "I try to avoid new projects.", type: "Pop Punk" }
    ]
  },
  {
    q: "3. What’s your general approach to rules and authority?",
    options: [
      { text: "I like to challenge them and push boundaries.", type: "Riot Grrrl" },
      { text: "I respect rules but bend them when necessary.", type: "Pop Punk" },
      { text: "I prefer to follow them strictly.", type: "Crust Punk" },
      { text: "I fight them head-on.", type: "Hardcore Punk" }
    ]
  },
  {
    q: "4. How do you express yourself creatively?",
    options: [
      { text: "Through writing or art.", type: "Riot Grrrl" },
      { text: "Through performance or action.", type: "Hardcore Punk" },
      { text: "Through structure and organization.", type: "Crust Punk" },
      { text: "I don’t really express myself creatively.", type: "Pop Punk" }
    ]
  },
  {
    q: "5. How do you feel about change?",
    options: [
      { text: "I embrace change and look for new experiences.", type: "Pop Punk" },
      { text: "I adapt when necessary, but I prefer stability.", type: "Crust Punk" },
      { text: "I resist change and prefer things to stay the same.", type: "Hardcore Punk" },
      { text: "I get overwhelmed by change.", type: "Riot Grrrl" }
    ]
  },
  {
    q: "6. How do you typically solve problems?",
    options: [
      { text: "I take immediate action and deal with things as they come.", type: "Hardcore Punk" },
      { text: "I carefully plan and analyze all options.", type: "Crust Punk" },
      { text: "I look for unconventional solutions.", type: "Riot Grrrl" },
      { text: "I avoid confronting the problem until absolutely necessary.", type: "Pop Punk" }
    ]
  },
  {
    q: "7. What is your social style?",
    options: [
      { text: "I love to be in the spotlight and lead others.", type: "Pop Punk" },
      { text: "I prefer to support others from behind the scenes.", type: "Crust Punk" },
      { text: "I enjoy being alone or with a close-knit group.", type: "Hardcore Punk" },
      { text: "I like to socialize but also need a lot of personal space.", type: "Riot Grrrl" }
    ]
  },
  {
    q: "8. How do you view the future?",
    options: [
      { text: "I’m excited and ready to take on whatever comes.", type: "Pop Punk" },
      { text: "I’m cautiously optimistic but prefer to stay grounded.", type: "Crust Punk" },
      { text: "I’m uncertain and a bit anxious about what’s ahead.", type: "Riot Grrrl" },
      { text: "I try to avoid thinking about the future.", type: "Hardcore Punk" }
    ]
  }
];

let descriptions = {
  "Hardcore Punk": "You are Hardcore Punk: raw, intense, and all about action. You never back down from a fight and you wear your convictions like a battle cry.",
  "Crust Punk": "You are Crust Punk: gritty, anarchic, and fiercely independent. You dig deep, plan smart, and live off the grid, fighting for your beliefs.",
  "Riot Grrrl": "You are Riot Grrrl: bold, expressive, and revolutionary. You channel your voice through art, music, and zines to spark change.",
  "Pop Punk": "You are Pop Punk: playful, emotional, and full of catchy chaos. You ride life’s rollercoaster with a mix of angst and optimism."
};

let currentQuestion = 0;
let answers = {};
let showResult = false;
let resultType = "";

let hoveredOption = -1; // To track which option is being hovered
let inStartScreen = true; // To determine if the user is on the start screen

function setup() {
  createCanvas(800, 600);
  textAlign(LEFT, TOP);
  textSize(20);
}

function draw() {
  background(20);
  fill(255);

  if (inStartScreen) {
    // Starting screen
    textAlign(CENTER, CENTER);
    textSize(32);
    text("What type of punk are you?", width / 2, height / 2 - 100);

    // Start button
    fill(100);
    rect(width / 2 - 100, height / 2 + 50, 200, 50, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Start", width / 2, height / 2 + 75);
    
    return;
  }

  if (showResult) {
    // Result screen
    textAlign(CENTER, CENTER);
    textSize(28);
    text("You are", width / 2, height / 2 - 160);

    textSize(32);
    text(resultType, width / 2, height / 2 - 110);

    textSize(18);
    textAlign(CENTER, TOP);
    text(descriptions[resultType], width / 2 - 250, height / 2 - 60, 500, 300);

    // "Return" Button
    fill(100);
    rect(width / 2 - 100, height - 100, 200, 50, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Return", width / 2, height - 90);

    return;
  }

  // Question screen
  let q = questions[currentQuestion];
  textAlign(LEFT, TOP);
  textSize(24);
  text(q.q, 40, 40, width - 100);

  textSize(18);
  for (let i = 0; i < q.options.length; i++) {
    let y = 120 + i * 60;
    let isHovered = (mouseX > 50 && mouseX < width - 50 && mouseY > y && mouseY < y + 50);
    if (isHovered) {
      hoveredOption = i;
    }

    fill(isHovered ? 200 : 50);
    rect(50, y, width - 100, 50, 10);

    fill(255);
    text(q.options[i].text, 60, y + 15);
  }
}

function mousePressed() {
  if (inStartScreen) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 50 && mouseY < height / 2 + 100) {
      inStartScreen = false;
      return;
    }
  }

  if (showResult) {
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 100 && mouseY < height - 50) {
      currentQuestion = 0;
      answers = {};
      showResult = false;
      inStartScreen = true;
      return;
    }
    return;
  }

  let q = questions[currentQuestion];
  for (let i = 0; i < q.options.length; i++) {
    let y = 120 + i * 60;
    if (mouseX > 50 && mouseX < width - 50 && mouseY > y && mouseY < y + 50) {
      let type = q.options[i].type;
      if (!answers[type]) answers[type] = 0;
      answers[type]++;
      currentQuestion++;

      if (currentQuestion >= questions.length) {
        showResult = true;
        resultType = getResult();
      }
    }
  }
}

function getResult() {
  let max = 0;
  let result = "";
  for (let type in answers) {
    if (answers[type] > max) {
      max = answers[type];
      result = type;
    }
  }
  localStorage.setItem("punkResult", result); // Save it
  return result;
}
