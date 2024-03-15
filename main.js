// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "myspl",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  pepole: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Gandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Random Property
let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let letterAndSpace = Array.from(randomValueValue);

// Craet Spans Depened On Word
letterAndSpace.forEach((letter) => {
  // Creat Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === " ") {
    // Add Class To Span
    emptySpan.className = "with-space";
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Worng Attempts
let worngAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handel Cliking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;

        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      worngAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${worngAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (worngAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is: "${randomValueValue}"`
  );

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = "popup";

  // Append To The Body
  document.body.appendChild(div);
}

// Get reference to the play again button
let playAgainButton = document.createElement("button");
let buttonText = document.createTextNode("Play Again");
playAgainButton.className = "btn-play";
playAgainButton.appendChild(buttonText);
document.body.appendChild(playAgainButton);

// Add event listener to the play again button
playAgainButton.addEventListener("click", () => {
  resetGame();
});

// Function to reset the game
function resetGame() {
  window.location.reload();
}
