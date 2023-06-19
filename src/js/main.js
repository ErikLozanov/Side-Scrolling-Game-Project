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

    player.width = wizardElement.offsetWidth;
    player.height = wizardElement.offsetHeight;

    window.requestAnimationFrame(gameAction);
}


//global key listeners

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(e) {
    keys[e.code] = true;

}
function onKeyUp(e) {
    keys[e.code] = false;

}

let keys = {};
let player = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    width: 0,
    height: 0
};
let game = {
    speed: 2,
    movingMultiplier: 4
};



function gameAction() {
    const wizardElement = document.querySelector('.wizard');

    // Borders
    if(keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if(keys.KeyS && gameArea.offsetHeight > player.y + player.height) {
        player.y += game.speed * game.movingMultiplier;
    }
    if(keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if(keys.KeyD && gameArea.offsetWidth > player.x + player.width) {
        player.x += game.speed * game.movingMultiplier;
    }

    // Apply gravitation

    let isInAir = (player.y + player.height) <= gameArea.offsetHeight;

    if(isInAir) {
        player.y += game.speed;
    }

    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';
    window.requestAnimationFrame(gameAction);
}