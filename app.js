let words = [
    { word: "summer", hint: "season" },
    { word: "red", hint: "color" },
    { word: "rose", hint: "flower" },
    { word: "apple", hint: "fruit" },
    { word: "successful", hint: " the opposite of 'unsuccessful'" },
    { word: "football", hint: "sport" }
];
let letterButton = document.querySelectorAll(".letter button")
let start = document.querySelector(".start")
let taymerx = document.querySelector(".taymerx")
let hint = document.querySelector(".hint")
let hintBox = document.querySelector(".hint-box")
let next = document.querySelector(".nextWord")
let grayBox = document.querySelector(".gray")
let selectedWord = "";
let selectedHint= "";
let wordNumber = 0;
let score = 0;
let scores = document.querySelector(".score")
let interval;
function taymerFunc(){
    taymerx.style.backgroundColor = "green"
    let time = 50;
    taymerx.innerHTML = `Time : ${time}`
    interval = setInterval(()=>{
        time--;
        taymerx.innerHTML = `Time : ${time}`
        if (time<=0) {
            clearInterval(interval);
            taymerx.style.backgroundColor = "red";
            next.removeEventListener("click",getNextWord)
            hint.removeEventListener("click",showHint)
            letterButton.forEach(letters=>letters.removeEventListener("click",fillWord))
            getNextWord()
        }
    },1000)    
}
function showHint(){
    hintBox.innerHTML = "";
    let hintText = document.createElement("div")
    hintText.style.width = "96px"
    hintText.innerHTML = selectedHint;
    hintBox.appendChild(hintText)
}
function createLetterBox(){
    grayBox.innerHTML="";
    hintBox.innerHTML=""
    for (let i = 0; i < selectedWord.length; i++) {
        wordBox = document.createElement("div");
        wordBox.classList.add("wordbox");
        grayBox.appendChild(wordBox);
    }  
}
function onStartGame(){
     selectedWord = words[0].word;
     selectedHint = words[0].hint;
     grayBox.style.backgroundColor = "inherit";  
     wordNumber=0
     createLetterBox()
}
function getNextWord() {
    letterButton.forEach(item=>item.style.backgroundColor="aqua")
    wordNumber++;
    selectedWord = words[wordNumber].word
    selectedHint = words[wordNumber].hint
    createLetterBox()
}
function changeScore(point){
    score+=point;
    scores.innerHTML = `Score : ${score}`
}
function fillWord(e){
    if (selectedWord.includes(e.target.textContent)) {
        let wordBox = document.querySelectorAll(".wordbox")
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === e.target.textContent) {
                wordBox[i].innerHTML= e.target.textContent;
                e.target.style.backgroundColor = "green";
                changeScore(10);   
                if (checkBox()) {
                    setTimeout(() => getNextWord(), 100);
                    resetGame()
                } 
            }              
        }
    }
    else{
        e.target.style.backgroundColor = "red";
        changeScore(-10)
    } 
}
function checkBox() {
    let boxes = document.querySelectorAll(".wordbox")
    for (let i = 0; i < selectedWord.length; i++) {
        if (boxes[i].innerHTML === "") {
            return false
    }
}
    return true
}
function resetGame() {
    hintBox.innerHTML="";
    score = 0;
    scores.innerHTML = `Score : ${score}`;
    letterButton.forEach(element=>element.style.backgroundColor="aqua")
}
function playGame(){
    clearInterval(interval)
    taymerFunc()
    wordNumber = 0;
    onStartGame()
    letterButton.forEach(letters => {
        letters.addEventListener("click",fillWord)
        letters.style.boxShadow = "0px 0px 16px 5px rgb(233 241 248 / 72%)"
    });
    resetGame()
    hint.addEventListener("click",showHint)
    next.addEventListener("click",getNextWord) 
}
start.addEventListener("click",playGame)
