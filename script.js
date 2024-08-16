let words = [
    { word: "talk", hint: "chat" },
    { word: "spring", hint: "season" },
    { word: "yellow", hint: "color" },
    { word: "rose", hint: "flower" },
    { word: "monkey", hint: "animal" },
    { word: "rain", hint: "weather" },
    { word: "jacket", hint: "clothing" },
    { word: "rainbow", hint: "nature" },
    { word: "football", hint: "sport" },
    { word: "strawberry", hint: "fruit" }
];

let currentWord = "";
let guessedLetters = [];
let score = 0;
let time = 60;

let startButton = document.querySelector(".start");
let nextWordButton = document.querySelector(".nextWord");
let grayDiv = document.querySelector(".gray");
let letterButtons = document.querySelectorAll(".letter button");
let taymerx = document.querySelector(".taymerx");
let scoreElement = document.querySelector(".score");
let hintButton = document.querySelector(".hint");
let hintText = document.querySelector(".hint-text");
let interval;

startButton.addEventListener("click", function () {
    startGame();
    grayDiv.style.backgroundColor = "inherit";
    letterButtons.forEach(button => button.style.boxShadow = "0px 0px 16px 5px rgb(233 241 248 / 72%)");
});

nextWordButton.addEventListener("click", function () {
    loadNewWord();
});

function startGame() {
    resetGame();
    taymerx.style.backgroundColor = "#09f209";
    interval = setInterval(updateTimer, 1000);
    loadNewWord();
}

function loadNewWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let selectedWord = words[randomIndex];
    currentWord = selectedWord.word;
    guessedLetters = Array(currentWord.length).fill("");
    grayDiv.innerHTML = "";

    for (let i = 0; i < currentWord.length; i++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.textContent = ""; 
        grayDiv.appendChild(square);
    }

    hintText.textContent = "";
    hintButton.removeEventListener("click", showHint); 
    hintButton.addEventListener("click", showHint); 

    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "";
        button.addEventListener("click", checkLetter);
    });

    function showHint() {
        hintText.textContent = selectedWord.hint;
    }
}

function checkLetter(event) {
    let letter = event.target.textContent;
    let found = false;

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            guessedLetters[i] = letter;
            grayDiv.children[i].textContent = letter; 
            found = true;
        }
    }

    if (found) {
        event.target.style.backgroundColor = "#09f209";
        score += 10;

        if (guessedLetters.join("") === currentWord) {
            clearInterval(interval);
            setTimeout(() => {
                alert(`Təbriklər! Sözü tapdınız! Xal: ${score}`);
                resetGame(); 
            }, 100);
        }
    } else {
        event.target.style.backgroundColor = "#ff0000";
        score -=10;
    }

    event.target.disabled = true;
    scoreElement.textContent = `Score: ${score}`;
}

function updateTimer() {
    time--;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    taymerx.textContent = `Time ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (time === 0) {
        clearInterval(interval);
        endGame();
    }
}

function endGame() {
    let resultMessage = "";

    if (guessedLetters.join('') === currentWord) {
        resultMessage = `Təbriklər! Sözü tapdınız! Xal: ${score}`;
    } else {
        resultMessage = `Siz məğlub oldunuz! Söz: ${currentWord}. Xal: ${score}`;
    }

    alert(resultMessage);
    resetGame();
}

function resetGame() {
    clearInterval(interval);
    time = 60;
    taymerx.textContent = "Time 01:00";
    taymerx.style.backgroundColor = "";
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    grayDiv.innerHTML = "";
    letterButtons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "";
    });
    hintText.textContent = "";
}