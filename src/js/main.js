// select game screens

const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');


gameStart.addEventListener('click', onGameStart);


function onGameStart() {
    gameStart.classList.add('hide');
    console.log('hi!');

    const wizardElement = document.createElement('div');
    wizardElement.classList.add('wizard');
    wizardElement.style.top = '200px';
    wizardElement.style.left ='200px';
    gameArea.appendChild(wizardElement);
}


//global key listeners

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(e) {
    keys[e.code] = true;
    console.log(keys);
}
function onKeyUp(e) {
    keys[e.code] = false;
    console.log(keys);
}

let keys = {};



function gameAction() {
    console.log('action');
    window.requestAnimationFrame(gameAction);
}