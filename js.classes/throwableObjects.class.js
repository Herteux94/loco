/**
 * @class ThrowableObject
 * @extends MoveableObject
 * @description Represents a throwable object in the game, such as a bottle, with properties and methods for throwing, animating, and exploding.
 */
class ThrowableObject extends MoveableObject {

    /**
     * @property {boolean} thrown - Indicates if the object has been thrown.
     * @default false
     */
    thrown = false;

    /**
     * @property {boolean} hasExploded - Indicates if the object has exploded.
     * @default false
     */
    hasExploded = false;

    /**
     * @property {number} height - The height of the throwable object.
     * @default 60
     */
    height = 60;

    /**
     * @property {number} speedY - The vertical speed of the throwable object.
     * @default 30
     */
    speedY = 30;

    /**
     * @property {number} width - The width of the throwable object.
     * @default 50
     */
    width = 50;

    /**
     * @property {number|null} throwIntervall - The interval ID for the throw animation.
     */
    throwIntervall = null;

    /**
     * @property {Audio} throw_sound - The audio for the throw sound effect.
     */
    throw_sound = new Audio('sounds/movement-swipe-whoosh-3-short.wav');

    /**
     * @property {Audio} splash_sound - The audio for the splash sound effect.
     */
    splash_sound = new Audio('sounds/glass-bottle-shatter-short.wav');

    /**
     * @property {string[]} BOTTLE_ROTATION - The array of image paths for the bottle rotation animation.
     */
    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    /**
     * @property {string[]} BOTTLE_SPLASH - The array of image paths for the bottle splash animation.
     */
    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
     * Creates an instance of ThrowableObject.
     * @param {number} x - The initial x-coordinate position of the throwable object.
     * @param {number} y - The initial y-coordinate position of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
    }

    /**
     * Throws the object to the specified position and starts the throw animation.
     * @param {number} x - The x-coordinate position to throw the object to.
     * @param {number} y - The y-coordinate position to throw the object to.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.thrown = true;
        this.applyGravity();
        this.throwIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.throwIntervallStarted();
            }
        }, 50);
        if (!mute) {
            this.throw_sound.play();
        }
    }

    /**
     * Handles the throw animation and checks for explosion.
     */
    throwIntervallStarted() {
        if (this.y > 380) {
            this.explodeBottle();
            setTimeout(() => {
                this.y = 500;
            }, 250);
        } else {
            this.playAnimation(this.BOTTLE_ROTATION);
            this.x += 10;
        }
    }

    /**
     * Plays the bottle explosion animation and sound.
     */
    explodeBottle() {
        if (!this.hasExploded) {
            this.playAnimation(this.BOTTLE_SPLASH);
            this.speedY = 0;
            if (!mute) {
                this.splash_sound.play();
            }
            this.hasExploded = true;
        }
    }
}
