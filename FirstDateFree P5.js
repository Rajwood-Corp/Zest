let backgroundImage;
let startScreenImage, questionScreenImage, endScreenImage;

let questions = [
  "Question 1?",
  "Question 2?",
  "Question 3?",
  "Question 4?",
  "Question 5?",
  "Question 6?",
  "Question 7?",
  "Question 8?",
  "Question 9?",
  "Question 10?",
  "Question 11?",
  "Question 12?",
  "Question 13?",
  "Question 14?",
  "Question 15?",
  "Question 16?",
  "Question 17?",
  "Question 18?",
  "Question 19?",
  "Question 20?",
  "Question 21?",
  "Question 22?",
  "Question 23?",
  "Question 24?",
  "Question 25?",
  "Question 26?",
  "Question 27?",
  "Question 28?",
  "Question 29?",
  "Question 30?",
  "Question 31?",
  "Question 32?",
  "Question 33?",
  "Question 34?",
  "Question 35?",
  "Question 36?",
  "Question 37?",
  "Question 38?",
  "Question 39?",
  "Question 40?",
  "Question 41?",
  "Question 42?",
  "Question 43?",
  "Question 44?",
  "Question 45?",
  "Question 46?",
  "Question 47?",
  "Question 48?",
  "Question 49?",
  "Question 50?",
  "Question 51?",
  "Question 52?",
  "Question 53?",
  "Question 54?",
  "Question 55?",
  "Question 56?",
  "Question 57?",
  "Question 58?",
  "Question 59?",
  "Question 60?"
];

let shuffledQuestions;
let currentQuestion = 0;
let totalQuestionsToShow = 20; // Change this to modify the number of questions to show

let startButton, prevButton, nextButton, continueButton;
let gameStarted = false;
let gameOver = false;

function preload() {
  backgroundImage = loadImage('Images/1stDate.png');
}

function customShuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function setup() {
  createCanvas(1600, 900); // Set the canvas size to 16:9 aspect ratio
  angleMode(DEGREES); // Use degrees for rotation
  rotate(-90); // Rotate the canvas 90 degrees counter-clockwise
  translate(-height, 0); // Offset the translation after rotation
  textSize(24);
  textAlign(CENTER, CENTER);

  startScreenImage = backgroundImage;
  questionScreenImage = backgroundImage;
  endScreenImage = backgroundImage;

  // Create Start Game button
  startButton = createButton('Start Game');
  startButton.position(width / 2 - 100, height / 2 - 25);
  startButton.size(200, 50);
  startButton.mousePressed(startGame);

  // Create Previous Question button
  prevButton = createButton('Previous Question');
  prevButton.position(20, 20);
  prevButton.hide();

  // Create Next Question button
  nextButton = createButton('Next Question');
  nextButton.position(width - 160, 20);
  nextButton.hide();

  // Create Continue button
  continueButton = createButton('Continue');
  continueButton.position(width / 2 - 50, height / 2 + 150);
  continueButton.size(100, 30);
  continueButton.mousePressed(endGame);
  continueButton.hide();

  shuffledQuestions = customShuffle(questions).slice(0, totalQuestionsToShow);
}

function draw() {
  if (gameStarted) {
    if (currentQuestion < shuffledQuestions.length) {
      background(questionScreenImage);
      drawRoundedBox(width / 2, height / 2, shuffledQuestions[currentQuestion]);
    } else if (currentQuestion === shuffledQuestions.length && !gameOver) {
      // Show the End Game screen when all questions are shown
      gameOver = true;
      background(endScreenImage);
      hideButtons();
      textSize(32);
      drawRoundedBox(width / 2, height / 2, "Game Over");
      textSize(24);
      drawRoundedBox(width / 2, height / 2 + 80, "Press 'Continue' to finish.");
      continueButton.show();
    }
  } else {
    background(startScreenImage);
    textSize(32);
    drawRoundedBox(width / 2, height / 2 - 100, "Welcome to the Game!");
    textSize(24);
    drawRoundedBox(width / 2, height / 2 + 80, "Press 'Start Game' to begin.");
  }
}

function drawRoundedBox(x, y, textContent) {
  fill(color(255, 127.5)); // White color with 50% transparency
  noStroke(); // Remove border
  let padding = 20;
  let boxWidth = textWidth(textContent) + 2 * padding;
  let boxHeight = textSize() + 2 * padding;
  let cornerRadius = 10; // Adjust the corner radius as needed
  rectMode(CENTER);
  rect(x, y, boxWidth, boxHeight, cornerRadius);
  fill(0); // Black color for the text
  text(textContent, x, y);
}

function startGame() {
  gameStarted = true;
  startButton.hide();
  prevButton.show();
  nextButton.show();

  // Hide Continue button on game restart
  continueButton.hide();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion > shuffledQuestions.length) {
    currentQuestion = shuffledQuestions.length;
  }
}

function previousQuestion() {
  currentQuestion--;

  if (currentQuestion < 0) {
    currentQuestion = 0;
  }
}

function mousePressed() {
  // Check if the game is over and then disable buttons
  if (gameOver) {
    hideButtons();
  } else {
    // If the game is still running, handle the button clicks
    if (mouseX < width / 2) {
      previousQuestion();
    } else {
      nextQuestion();
    }
  }
}

function hideButtons() {
  prevButton.hide();
  nextButton.hide();
}

function endGame() {
  // Add any additional logic to perform when the game truly ends
  // For now, just reset the game state
  gameStarted = false;
  gameOver = false;
  currentQuestion = 0;

  // Hide Continue button on game restart
  continueButton.hide();

  // Hide buttons at the end of the game
  hideButtons();

  // Show Start Game button again
  startButton.show();
}
