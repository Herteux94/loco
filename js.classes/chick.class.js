/**
 * @class Chick
 * @extends MoveableObject
 * @description Represents a chick enemy in the game, with properties and methods for animations, movements, and resetting.
 */
class Chick extends MoveableObject {
    /**
     * @property {number} height - The height of the chick.
     * @default 25
     */
    height = 25;

    /**
     * @property {number} width - The width of the chick.
     * @default 35
     */
    width = 35;

    /**
     * @property {number} y - The y-coordinate position of the chick.
     * @default 400
     */
    y = 400;

    /**
     * @property {number|null} walkingIntervalChick - The interval ID for the chick's walking animation.
     */
    walkingIntervalChick = null;

    /**
     * @property {number|null} movingIntervalChick - The interval ID for the chick's movement.
     */
    movingIntervalChick = null;

    /**
     * @property {boolean} dead - The status of whether the chick is dead.
     * @default false
     */
    dead = false;

    /**
     * @property {boolean} intervallsStarted - Indicates whether the intervals have started.
     * @default false
     */
    intervallsStarted = false;

    /**
     * @property {string[]} IMAGES_WALKING - The array of image paths for the chick's walking animation.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * @property {string[]} IMAGES_DEAD - The array of image paths for the chick's dead animation.
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates an instance of Chick.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2000 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 5;
        this.animate();
    }

    /**
     * Starts the animation intervals for the chick.
     */
    animate() {
        if (!this.dead) {
            this.movingIntervalChick = setInterval(() => {
                if (intervallsStarted === true) {
                    this.moveLeft();
                }
            }, 1000 / 60);
            this.walkingIntervalChick = setInterval(() => {
                if (intervallsStarted === true) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 100);
        }
    }

    /**
     * Resets the chick to its initial state.
     */
    reset() {
        this.x = 3000;
        this.speed = 0.15 + Math.random() * 1000;
        this.height = 25;
        this.width = 35;
        this.y = 400;
        this.dead = false;
        this.startResetFunctionsChick();
    }

    /**
     * Resets the chick's images and intervals.
     */
    startResetFunctionsChick() {
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        if (this.walkingIntervalChick) {
            clearInterval(this.walkingIntervalChick);
        }
        if (this.movingIntervalChick) {
            clearInterval(this.movingIntervalChick);
        }
        this.animate();
    }
}
