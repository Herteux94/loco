let canvas;
let world;
let level;
let keyboard = new Keyboard();
let background_sound = new Audio('sounds/fiesta-forever-165168.mp3');
const fullscreenIcon = document.getElementById('fullscreenIcon');
intervallsStarted = false;
mute = false;


window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);


function init() {
    canvas = document.getElementById('canvas', 'keyboard');
    world = new World(canvas, keyboard);
    level = level1;
    addTouchListeners();
    checkOrientation();
}

function runBackgroundMusic() {

    background_sound.play();

}

background_sound.addEventListener('ended', function () {
    background_sound.currentTime = 0;

    setInterval(() => {
        if (!mute) {
            background_sound.play();
        }
    }, 1000)
}
);

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

})


document.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }

})


function addTouchListeners() {
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnUp = document.getElementById('btnUp');
    const btnD = document.getElementById('btnD');

    btnLeft.addEventListener('touchstart', () => { keyboard.LEFT = true; });
    btnLeft.addEventListener('touchend', () => { keyboard.LEFT = false; });

    btnRight.addEventListener('touchstart', () => { keyboard.RIGHT = true; });
    btnRight.addEventListener('touchend', () => { keyboard.RIGHT = false; });

    btnUp.addEventListener('touchstart', () => { keyboard.SPACE = true; });
    btnUp.addEventListener('touchend', () => { keyboard.SPACE = false; });

    btnD.addEventListener('touchstart', () => { keyboard.D = true; });
    btnD.addEventListener('touchend', () => { keyboard.D = false; });
}


function fullscreen() {
    const fullscreenElement = document.getElementById('canvas');
    if (fullscreenElement) {
        enterFullscreen(fullscreenElement);
    } else {
        console.log('Fullscreen element not found');
    }
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    } else {
        console.log('Fullscreen not supported');
    }
}


function startGame() {
    document.getElementById('start').classList.add('dNone');
    document.getElementById('homescreen').classList.add('dNone');
    document.getElementById('headline').classList.remove('dNone');
    document.getElementById('canvas').classList.remove('dNone');
    document.getElementById('fullscreenIcon').classList.remove('dNone');
    document.getElementById('muteIcon').classList.remove('dNone');
    intervallsStarted = true;
    runBackgroundMusic();
}

function muteSounds() {
    mute = true;
    background_sound.pause();
    document.getElementById('muteIcon').classList.add('dNone');
    document.getElementById('unmuteIcon').classList.remove('dNone');
}

function unmuteSounds() {
    mute = false;
    background_sound.play();
    document.getElementById('muteIcon').classList.remove('dNone');
    document.getElementById('unmuteIcon').classList.add('dNone');
}

function restartGame() {
    disableRestartButtonForFiveSeconds();
    document.getElementById('restart').classList.add('dNone');

    clearAllIntervalls();


    // Reset character position and energy
    world.character.reset();

    // Reset endboss position and energy
    world.endboss.reset();

    world.chicken.reset();
    resetLevel();
    // Reset collected coins and bottles
    world.collectedCoins = 0;
    world.collectedBottles = 0;

    // Reset status bars
    world.statusBar.setPercentage(world.character.energy);
    world.statusBarCoins.setPercentage(world.collectedCoins);
    world.statusBarBottles.setPercentage(world.collectedBottles);
    world.statusBarBoss.setPercentage(world.endboss.energy);

    // Hide end screen
    document.getElementById('endscreen').classList.add('dNone');
    document.getElementById('homescreen').classList.add('dNone');
    document.getElementById('canvas').classList.remove('dNone');



    // world.character.startIntervals();
    // world.endboss.startIntervals();
    // Start the game again
    world.run();


}

function clearAllIntervalls() {
    world.clearIntervallsForRestart()
}

function disableRestartButtonForFiveSeconds() {
    // Den Restart-Button deaktivieren
    document.getElementById('restart').disabled = true;

    // Nach 5 Sekunden den Restart-Button wieder aktivieren
    setTimeout(() => {
        document.getElementById('restart').disabled = false;
    }, 1000);
}


function checkOrientation() {
    const message = document.getElementById('orientationMessage');
    if (window.innerHeight > window.innerWidth) {
        message.style.display = 'block';
    } else {
        message.style.display = 'none';
    }
}