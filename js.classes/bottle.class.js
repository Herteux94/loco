/**
 * @class Bottle
 * @extends ThrowableObject
 * @description Represents a bottle object in the game, which can be thrown by the player.
 */
class Bottle extends ThrowableObject {
    /**
     * @property {number} width - The width of the bottle object.
     * @default 75
     */
    width = 75;

    /**
     * @property {number} height - The height of the bottle object.
     * @default 75
     */
    height = 75;

    /**
     * @property {string[]} IMAGES - The array of image paths for the bottle object.
     */
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates an instance of Bottle.
     */
    constructor() {
        super();
        const randomImage = this.getRandomImage(this.IMAGES);
        this.loadImage(randomImage);
        this.x = 375 + Math.random() * 1500;
        this.y = 370 - Math.random() * 10;
    }

    /**
     * Resets the position and image of the bottle object.
     */
    reset() {
        this.x = 375 + Math.random() * 5500;
        this.y = 370 - Math.random() * 10;
        const randomImage = this.getRandomImage(this.IMAGES);
        this.loadImage(randomImage);
    }

    /**
     * Returns a random image from the provided array of images.
     * @param {string[]} images - The array of image paths.
     * @returns {string} The path of the randomly selected image.
     */
    getRandomImage(images) {
        return images[Math.floor(Math.random() * images.length)];
    }
}
