// Variables for modal

const rules = document.querySelector('[data-rules]');
const rulesInfo = document.querySelector('[data-rules-info]');
const rulesExit = document.querySelector('[data-rules-exit]');
const behind = document.querySelector('.wrapper');

// MODAL


const showModal = () => {
    rulesInfo.style.display='block';
    behind.style.background='black';
}

const closeModal = () => {
    rulesInfo.style.display='none';
    behind.style.background="radial-gradient(#1F3756,#141539)";
}

rules.addEventListener('click',showModal);
rulesExit.addEventListener('click',closeModal);


// GAME

// Variables for game
const options = [...document.querySelectorAll('.object')];
const divs = [...document.querySelectorAll('.wrapper__middle__container')];
const rounds = document.querySelector('.roundGame');
const triangle = document.querySelector('.triangle');
const playerHandDiv = document.querySelector('.playerHandResult');
const aiHandDiv = document.querySelector('.aiHandResult');
const result = document.querySelector('.result');
const buttonRestart = document.querySelector('.gameRestart');

let activeGame = true;

let imageAi = document.createElement('img');
let imagePlayer = document.createElement('img');

rounds.innerHTML=0;
let round = 0;
let playerHand;
let aiHand;
// Function counter round 

const roundGame = (round) => {
    rounds.innerHTML=round;
}
// Function who win


const checkWin = (playerHand,aiHand) => {
    if(playerHand===aiHand){
        return 'Draw';
    }else if(playerHand==="paper" && aiHand==="rock" || playerHand==="rock" && aiHand==="scissors" || playerHand==="scissors" && aiHand==="paper"){
        round++;
        return 'You Win';
    }else{
        round--;
        return 'You Lose';
    }
}
// Function initial game
const game = (e) => {
    if(activeGame && e.target){
        divs.forEach((div) => div.style.opacity="0");
        triangle.style.opacity="0";
        playerHand=e.target.dataset.options;
        aiHand=options[Math.floor(Math.random() * options.length)].dataset.options;
        let gameResult = checkWin(playerHand,aiHand);
        aiHandDiv.style.transform="translate(-50%,-50%) scale(1)";
        playerHandDiv.style.transform="translate(-50%,-50%) scale(1)";
        playerHandResult();
        aiHandResult();
        result.innerHTML=gameResult;
        buttonRestart.style.transform="translate(-50%,-50%) scale(1)";
        roundGame(round);
        activeGame=false;
    }
}
// Player hand in DIV result
const playerHandResult = () => {
    let playersrc = `./images/icon-${playerHand}.svg`;
    imagePlayer.setAttribute('src',playersrc);
    playerHandDiv.appendChild(imagePlayer);
}
// Ai hand in DIV result
const aiHandResult = () => {
    let aisrc = `./images/icon-${aiHand}.svg`;
    imageAi.setAttribute('src',aisrc);
    aiHandDiv.appendChild(imageAi);
}

// Click event on options
options.forEach((option) => {
    option.addEventListener('click',game)
})

// Click event on restart game button
buttonRestart.addEventListener('click',() => {
    activeGame=true;
    divs.forEach((div) => div.style.opacity="1");
    triangle.style.opacity="1";
    aiHandDiv.style.transform="translate(-50%,-50%) scale(0)";
    playerHandDiv.style.transform="translate(-50%,-50%) scale(0)";
    buttonRestart.style.transform="translate(-50%,-50%) scale(0)";
    result.innerHTML = '';
    game();
})