/**
 * @class BackgroundObject
 * @extends MoveableObject
 * @description Represents a background object in the game, which is a type of moveable object.
 */
class BackgroundObject extends MoveableObject {
    /**
     * @property {number} width - The width of the background object.
     * @default 720
     */
    width = 720;

    /**
     * @property {number} height - The height of the background object.
     * @default 480
     */
    height = 480;

    /**
     * Creates an instance of BackgroundObject.
     * @param {string} imagePath - The path to the image representing the background.
     * @param {number} x - The x-coordinate position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}
