/**
 * @class Chicken
 * @extends MoveableObject
 * @description Represents a chicken enemy in the game, with properties and methods for animations, movements, and resetting.
 */
class Chicken extends MoveableObject {

    /**
     * @property {number} height - The height of the chicken.
     * @default 55
     */
    height = 55;

    /**
     * @property {number} width - The width of the chicken.
     * @default 70
     */
    width = 70;

    /**
     * @property {number} y - The y-coordinate position of the chicken.
     * @default 380
     */
    y = 380;

    /**
     * @property {number|null} walkingIntervalChicken - The interval ID for the chicken's walking animation.
     */
    walkingIntervalChicken = null;

    /**
     * @property {number|null} movingIntervalChicken - The interval ID for the chicken's movement.
     */
    movingIntervalChicken = null;

    /**
     * @property {boolean} dead - The status of whether the chicken is dead.
     * @default false
     */
    dead = false;

    /**
     * @property {boolean} intervallsStarted - Indicates whether the intervals have started.
     * @default false
     */
    intervallsStarted = false;

    /**
     * @property {string[]} IMAGES_WALKING - The array of image paths for the chicken's walking animation.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * @property {string[]} IMAGES_DEAD - The array of image paths for the chicken's dead animation.
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chicken.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3000;
        this.speed = 0.15 + Math.random() * 8;
        this.animate();
    }

    /**
     * Starts the animation intervals for the chicken.
     */
    animate() {
        if (!this.dead) {
            this.movingIntervalChicken = setInterval(() => {
                if (intervallsStarted === true) {
                    this.moveLeft();
                }
            }, 1000 / 60);
            this.walkingIntervalChicken = setInterval(() => {
                if (intervallsStarted === true) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 90);
        }
    }

    /**
     * Resets the chicken to its initial state.
     */
    reset() {
        this.x = 1000 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 8;
        this.height = 55;
        this.width = 70;
        this.y = 380;
        this.dead = false;
        this.startResetFunctionsChicken();
    }

    /**
     * Resets the chicken's images and intervals.
     */
    startResetFunctionsChicken() {
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        if (this.walkingIntervalChicken) {
            clearInterval(this.walkingIntervalChicken);
        }
        if (this.movingIntervalChicken) {
            clearInterval(this.movingIntervalChicken);
        }
        this.animate();
    }
}