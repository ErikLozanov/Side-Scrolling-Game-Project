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

// GAME OBJECTS
let keys = {};
let player = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    width: 0,
    height: 0,
    lastFiredFireball: 0,
};
let game = {
    speed: 2,
    movingMultiplier: 2,
    fireBallMultiplier: 5,
    fireRate: 1000,
    cloudSpawningRate: 3000,
    pointsAddingSpeed: 300,
    lastAddedPoint: 0,
    bugSpawningInterval: 2000,
};
let scene = {
    score: 0,
    lastSpawnedCloud: 0,
    lastSpawnedBug: 0,
    isActiveGame: true
}


// game actions

function gameAction(timestamp) {
    const wizardElement = document.querySelector('.wizard');
    const clouds = document.createElement('div');
    const bug = document.createElement('div');
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

    // Clouds
    if(timestamp - scene.lastSpawnedCloud > game.cloudSpawningRate) {
        clouds.classList.add('clouds');
        addClouds();
        scene.lastSpawnedCloud = timestamp;
    }
    // Modify moving clouds
    let allClouds = document.querySelectorAll('.clouds');
    allClouds.forEach(cloud => {
        cloud.x -= game.speed;
        cloud.style.left = cloud.x + 'px';

        if(cloud.x + clouds.offsetWidth <= -200) {
            cloud.parentElement.removeChild(cloud);
        }
    })
    // Fireball Shooting
    if(keys.Space) {
        wizardElement.classList.add('wizard-fire');
    } else {
        wizardElement.classList.remove('wizard-fire');
    }
    if(keys.Space && timestamp - player.lastFiredFireball > game.fireRate) {
        addFireBall();
        player.lastFiredFireball = timestamp;
        isCollision(wizardElement, wizardElement);
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
    if(timestamp - game.lastAddedPoint > game.pointsAddingSpeed) {
        scene.score ++;
        game.lastAddedPoint = timestamp;
    }
    wizardElement.style.top = player.y + 'px';
    wizardElement.style.left = player.x + 'px';

    gamePoints.textContent = scene.score;

    // BUGS 
    if(timestamp - scene.lastSpawnedBug > game.bugSpawningInterval) {
        bug.classList.add('bugs');
        addBugs();
        scene.lastSpawnedBug = timestamp;
    }
    // MODIFY MOVING BUGS
    let bugs = document.querySelectorAll('.bugs');
    bugs.forEach(bug=>{
        if(isCollision(wizardElement,bug)) {
            console.log('collision');
        }
        bug.x -= game.speed;
        bug.style.left = bug.x + 'px';

        if(bug.x + bug.offsetWidth <= -100) {
            bug.parentElement.removeChild(bug);
        }
    })
    window.requestAnimationFrame(gameAction);
}




// FUNCTIONS
function addFireBall() {
    let fireBall = document.createElement('div');
    fireBall.classList.add('fire-ball');

    
    fireBall.style.top = (player.y + player.height /3 - 5) + 'px';
    fireBall.x = player.x + player.width;
    fireBall.style.left = fireBall.x + 'px';
    gameArea.appendChild(fireBall);
}

function addClouds() {
    let cloud = document.createElement('div');
    cloud.classList.add('clouds');
    cloud.style.top = Math.floor(Math.random() * 100) + 'px';
    cloud.x = gameArea.offsetWidth;
    cloud.style.left = cloud.x + 'px';
    gameArea.appendChild(cloud);
}

function addBugs() {
    let bug = document.createElement('div');
    bug.classList.add('bugs');
    bug.style.top = Math.floor(Math.random() * 1080) + 'px';
    bug.x = gameArea.offsetWidth;
    bug.style.left = bug.x + 'px';
    gameArea.appendChild(bug);
}

function isCollision(firstElement, secondElement) {
    let firstRect = firstElement.getBoundingClientRect();
    let secondRect = secondElement.getBoundingClientRect();
    
    return !(
      firstRect.top > secondRect.bottom ||
      firstRect.bottom < secondRect.top ||
      firstRect.right < secondRect.left ||
      firstRect.left > secondRect.right
    );
}