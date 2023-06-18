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