/**
 * @class Cloud
 * @extends MoveableObject
 * @description Represents a cloud object in the game, with properties and methods for animations and movements.
 */
class Cloud extends MoveableObject {
    /**
     * @property {number} y - The y-coordinate position of the cloud.
     * @default 20
     */
    y = 20;

    /**
     * @property {number} width - The width of the cloud.
     * @default 1000
     */
    width = 1000;

    /**
     * @property {number} height - The height of the cloud.
     * @default 400
     */
    height = 400;

    /**
     * @property {number} speed - The speed at which the cloud moves.
     * @default 0.15
     */
    speed = 0.15;

    /**
     * @property {number} x - The x-coordinate position of the cloud.
     * @default 0
     */
    x = 0;

    /**
     * @property {number|null} animateClouds - The interval ID for the cloud's animation.
     */
    animateClouds = null;

    /**
     * Creates an instance of Cloud.
     * @param {string} imagePath - The path to the image representing the cloud.
     * @param {number} x - The x-coordinate position of the cloud.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    /**
     * Starts the animation interval for the cloud.
     */
    animate() {
        this.animateClouds = setInterval(() => {
            if (intervallsStarted === true) {
                this.moveLeft();
            }
        }, 50);
    }
}
