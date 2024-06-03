/**
 * @file game.js
 * @description Contains the main game logic, including initialization, event listeners, and game control functions.
 */

let canvas;
let world;
let level;
let keyboard = new Keyboard();
let background_sound = new Audio('sounds/fiesta-forever-165168.mp3');
const fullscreenIcon = document.getElementById('fullscreenIcon');
intervallsStarted = false;
mute = false;
gameStarted = false;

window.addEventListener('resize', this.checkOrientation());
window.addEventListener('orientationchange', this.checkOrientation());

/**
 * Handles the winning game scenario by calling functions to update the UI elements.
 */
function winningGame() {
    winningGameAdd();
    winningGameRemove();
    gameStarted = false;
    intervallsStarted = false;
}

/**
 * Adds necessary classes to the UI elements when the game is won.
 */
function winningGameAdd() {
    document.getElementById('canvas').classList.add('dNone');
    document.getElementById('muteIcon').classList.add('muteIcon');
    document.getElementById('unmuteIcon').classList.add('muteIcon');
    document.getElementById('fullscreenIcon').classList.add('fullscreenIcon');
    document.getElementById('winningScreen').classList.add('dNone');
    document.getElementById('winningScreenH1').classList.add('dNone');
}

/**
 * Removes unnecessary classes from the UI elements when the game is won.
 */
function winningGameRemove() {
    document.getElementById('restart').classList.remove('dNone');
    document.getElementById('homescreen').classList.remove('dNone');
    document.getElementById('privacyPolicy').classList.remove('dNone');
    document.getElementById('impressum').classList.remove('dNone');
    document.getElementById('muteIcon').classList.remove('muteIconInGame');
    document.getElementById('unmuteIcon').classList.remove('muteIconInGame');
    document.getElementById('fullscreenIcon').classList.remove('fullscreenIconInGame');
}

/**
 * Handles the end game scenario by updating the UI elements.
 */
function endGame() {
    document.getElementById('restart').classList.remove('dNone');
    document.getElementById('endscreen').classList.remove('dNone');
    document.getElementById('headline').classList.add('dNone');
    gameStarted = false;
}

/**
 * Initializes the game by setting up the canvas, world, and level.
 */
function init() {
    canvas = document.getElementById('canvas', 'keyboard');
    world = new World(canvas, keyboard);
    level = level1;
    addTouchListeners();
}

/**
 * Plays the background music.
 */
function runBackgroundMusic() {
    background_sound.play();
}

background_sound.addEventListener('ended', function () {
    background_sound.currentTime = 0;
    setInterval(() => {
        if (!mute) {
            background_sound.play();
        }
    }, 1000);
});

/**
 * Event listener for keydown events to control the keyboard inputs.
 * @param {KeyboardEvent} event - The keydown event.
 */
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
});

/**
 * Event listener for keyup events to control the keyboard inputs.
 * @param {KeyboardEvent} event - The keyup event.
 */
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
});

/**
 * Adds touch listeners for mobile controls.
 */
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

/**
 * Toggles fullscreen mode for the game.
 */
function fullscreen() {
    const fullscreenElement = document.getElementById('canvas');
    if (fullscreenElement) {
        enterFullscreen(fullscreenElement);
    } else {
        console.log('Fullscreen element not found');
    }
}

/**
 * Enters fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to set to fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else {
        console.log('Fullscreen not supported');
    }
}

/**
 * Starts the game by updating the UI and playing background music.
 */
function startGame() {
    removeStartGame();
    addStartGame();
    intervallsStarted = true;
    gameStarted = true;
    runBackgroundMusic();
}

/**
 * Removes classes and updates the UI elements for restarting the game.
 */
function removeStartGame() {

    document.getElementById('canvas').classList.remove('dNone');
    document.getElementById('fullscreenIcon').classList.remove('dNone');
    document.getElementById('muteIcon').classList.remove('dNone');
    document.getElementById('muteIcon').classList.remove('muteIcon');
    document.getElementById('unmuteIcon').classList.remove('muteIcon');
    document.getElementById('fullscreenIcon').classList.remove('fullscreenIcon');
}

/**
 * Adds classes and updates the UI elements for restarting the game.
 */
function addStartGame() {
    document.getElementById('muteIcon').classList.add('muteIconInGame');
    document.getElementById('unmuteIcon').classList.add('muteIconInGame');
    document.getElementById('fullscreenIcon').classList.add('fullscreenIconInGame');
    document.getElementById('start').classList.add('dNone');
    document.getElementById('homescreen').classList.add('dNone');
    document.getElementById('privacyPolicy').classList.add('dNone');
    document.getElementById('impressum').classList.add('dNone');
}

/**
 * Mutes all game sounds.
 */
function muteSounds() {
    mute = true;
    background_sound.pause();
    document.getElementById('muteIcon').classList.add('dNone');
    document.getElementById('unmuteIcon').classList.remove('dNone');
}

/**
 * Unmutes all game sounds.
 */
function unmuteSounds() {
    mute = false;
    background_sound.play();
    document.getElementById('muteIcon').classList.remove('dNone');
    document.getElementById('unmuteIcon').classList.add('dNone');
}

/**
 * Restarts the game by resetting all necessary elements and statuses.
 */
function restartGame(world) {
    clearAllIntervalls(world);
    disableRestartButtonForFiveSeconds();
    world.endboss.reset();
    resetLevel();
    world.character.reset();
    world.chicken.reset();
    world.collectedCoins = 0;
    world.collectedBottles = 0;
    removeRestartGame();
    setPercentagesStatusBars();
    addRestartGame();
    gameStarted = true;
    world.run();
}

/**
 * Removes classes and updates the UI elements for restarting the game.
 */
function removeRestartGame() {
    document.getElementById('canvas').classList.remove('dNone');
    document.getElementById('muteIcon').classList.remove('muteIcon');
    document.getElementById('unmuteIcon').classList.remove('muteIcon');
    document.getElementById('fullscreenIcon').classList.remove('fullscreenIcon');
}

/**
 * Adds classes and updates the UI elements for restarting the game.
 */
function addRestartGame() {
    document.getElementById('endscreen').classList.add('dNone');
    document.getElementById('homescreen').classList.add('dNone');
    document.getElementById('privacyPolicy').classList.add('dNone');
    document.getElementById('impressum').classList.add('dNone');
    document.getElementById('muteIcon').classList.add('muteIconInGame');
    document.getElementById('unmuteIcon').classList.add('muteIconInGame');
    document.getElementById('fullscreenIcon').classList.add('fullscreenIconInGame');
    document.getElementById('restart').classList.add('dNone');
}

/**
 * Sets the percentages of the status bars.
 */
function setPercentagesStatusBars() {
    world.statusBar.setPercentage(world.character.energy);
    world.statusBarCoins.setPercentage(world.collectedCoins);
    world.statusBarBottles.setPercentage(world.collectedBottles);
    world.statusBarBoss.setPercentage(world.endboss.energy);
}

/**
 * Clears all intervals set for the game.
 */
function clearAllIntervalls() {
    clearIntervallsForRestart(world);
}

/**
 * Disables the restart button for five seconds.
 */
function disableRestartButtonForFiveSeconds() {
    document.getElementById('restart').disabled = true;
    setTimeout(() => {
        document.getElementById('restart').disabled = false;
    }, 1000);
}

/**
 * Checks the screen orientation and updates the UI accordingly.
 */
function checkOrientation() {
    setInterval(() => {
        const message = document.getElementById('orientationMessage');
        const startButton = document.getElementById('start');
        const restartButton = document.getElementById('restart');
        if (window.innerHeight > window.innerWidth) {
            heightBiggerWidth(message, startButton, restartButton);
        } else {
            widthBiggerHeight(message, startButton, restartButton);
        }
    }, 200);
}

/**
 * Handles the case when the height of the window is greater than the width.
 */
function heightBiggerWidth(message, startButton, restartButton) {
    message.style.display = 'block';
    startButton.disabled = true;
    restartButton.disabled = true;
    intervallsStarted = false;
}

/**
 * Handles the case when the width of the window is greater than the height.
 */
function widthBiggerHeight(message, startButton, restartButton) {
    if (window.innerHeight < window.innerWidth) {
        message.style.display = 'none';
        startButton.disabled = false;
        restartButton.disabled = false;
        if (gameStarted) {
            intervallsStarted = true;
        }
    }
}

/**
 * Starts all intervals.
 */
function startAllIntervals() {
    world.chick.intervallsStarted = true;
    world.chicken.intervallsStarted = true;
    world.endboss.intervallsStarted = true;
    world.character.intervallsStarted = true;
}

/**
 * Clears all intervals for restarting the game.
 */
function clearIntervallsForRestart(world) {
    clearInterval(world.checkCollisionIntervall);
    clearInterval(world.checkThrowObjectsIntervall);
    clearInterval(world.bossIsAlertedIntervall);
    clearInterval(world.alertEndbossIntervalId);
    clearInterval(world.attackEndbossIntervalId);
    clearInterval(world.endboss.animateEndbossIntervall);
    clearInterval(world.character.characterMovementsIntervall);
    clearInterval(world.character.characterMovementAnimationsIntervall);
    clearInterval(world.character.characterNoMovementAnimationsIntervall);
}


/**
* Stops all intervals.
*/
function stopAllIntervals() {
    intervallsStarted = false;
}