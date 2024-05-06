let canvas;
let world;
let level;
let keyboard = new Keyboard();
let background_sound = new Audio('sounds/fiesta-forever-165168.mp3');
const fullscreenIcon = document.getElementById('fullscreenIcon');


function init() {
    canvas = document.getElementById('canvas', 'keyboard');
    world = new World(canvas, keyboard);
    level = level1;
    runBackgroundMusic();
}

function runBackgroundMusic() {

    background_sound.play();

}

background_sound.addEventListener('ended', function () {
    background_sound.currentTime = 0;
    background_sound.play();
});

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
