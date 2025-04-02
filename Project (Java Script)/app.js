let gameSeq = [];
let userSeq = [];

let colors = ["red" , "green" , "yellow" , "blue"];

let started = false;
let level = 0;
let highScore = 0;

let heading = document.querySelector("h2");

document.addEventListener("keypress" , function () {
    if(started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout( function () {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout( function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp () {
    userSeq = [];
    level++;
    heading.innerText = `Level ${level}`;

    let idx = Math.floor(Math.random() * 4);
    let ranColor =  colors[idx];
    let ranBtn = document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);

    console.log(gameSeq);

    gameFlash(ranBtn);
}

function checkAns (idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp , 1000);
        }
    }else {
        heading.innerText = `Game Over!!! Your Score is ${level-1}\nPress any to restart the game\n\nThe Highest Score is ${highScore}`;
        if(highScore < level){
            highScore = level-1;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click" , btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
    highScore = highScore;
}