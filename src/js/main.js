// select game screens

const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');


gameStart.addEventListener('click', onGameStart);


function onGameStart() {
    gameStart.classList.add('hide');

    const wizardElement = document.createElement('div');
    wizardElement.classList.add('wizard');
    wizardElement.style.top = player.x +'px';
    wizardElement.style.left =player.y +'px';
    gameArea.appendChild(wizardElement);

    window.requestAnimationFrame(gameAction);
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

}

let keys = {};
let player = {
    x: 150,
    y: 100
};
let game = {
    speed: 2
};



function gameAction() {
    const wizardElement = document.querySelector('.wizard');
    if(keys.KeyW) {
        player.y -= game.speed;
    }
    if(keys.KeyS) {
        player.y += game.speed;
    }
    if(keys.KeyA) {
        player.x -= game.speed;
    }
    if(keys.KeyD) {
        player.x += game.speed;
    }
    if(player.y < 0|| player.x < 0) {

    }
    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';
    window.requestAnimationFrame(gameAction);
}