// select game screens

const gameStart = document.querySelector('.game-start');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameScore = document.querySelector('.game-score');
const gamePoints = document.querySelector('.points');


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
let scene = {
    score: 0
}

// game actions

function gameAction() {
    const wizardElement = document.querySelector('.wizard');

    // Borders
    if(keys.KeyW && player.y > 0) {
        player.y -= game.speed * game.movingMultiplier;
    }
    if(keys.KeyS && gameArea.offsetHeight > player.y + player.height + 15) {
        player.y += game.speed * game.movingMultiplier;
    }
    if(keys.KeyA && player.x > 0) {
        player.x -= game.speed * game.movingMultiplier;
    }
    if(keys.KeyD && gameArea.offsetWidth > player.x + player.width + 10) {
        player.x += game.speed * game.movingMultiplier;
    }

    // Fireball Shooting
    if(keys.Space) {
        wizardElement.classList.add('wizard-fire');
        addFireBall();

    } else {
        wizardElement.classList.remove('wizard-fire');
    }
    // Modify fireballs positions

    let fireBalls = document.querySelectorAll('.fire-ball');
    fireBalls.forEach(fireBall => {
        fireBall.x +=game.speed;
        fireBall.style.left = fireBall.x + 'px';

        if(fireBall.x + fireBall.offsetWidth > gameArea.offsetWidth) {
            fireBall.parentElement.removeChild(fireBall);
        }
    })

    // Apply gravitation

    let isInAir = (player.y + player.height) <= gameArea.offsetHeight;

    if(isInAir) {
        player.y += game.speed;
    }

    scene.score ++;
    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';

    gamePoints.textContent = scene.score;
    window.requestAnimationFrame(gameAction);
}

function addFireBall() {
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    
    fireBall.style.top = (player.y + player.height /3 - 5) + 'px';
    fireBall.x = player.x + player.width;
    fireBall.style.left = fireBall.x + 'px';
    gameArea.appendChild(fireBall);
}