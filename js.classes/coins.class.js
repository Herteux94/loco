/**
 * @class Coin
 * @extends MoveableObject
 * @description Represents a coin object in the game, with properties and methods for animations and movements.
 */
class Coin extends MoveableObject {
    /**
     * @property {number} width - The width of the coin.
     * @default 25
     */
    width = 25;

    /**
     * @property {number} height - The height of the coin.
     * @default 25
     */
    height = 25;

    /**
     * @property {number|null} animateCoinsIntervall - The interval ID for the coin's animation.
     */
    animateCoinsIntervall = null;

    /**
     * @property {Array<string>} IMAGES - The array of image paths for the coin's animation.
     */
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates an instance of Coin.
     */
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 375 + Math.random() * 1500;
        this.y = 120;
        this.animate();
    }

    /**
     * Starts the animation interval for the coin.
     */
    animate() {
        this.animateCoinsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.playAnimation(this.IMAGES);
            }
        }, 200);
    }

    /**
     * Resets the coin to a new random position and restarts the animation.
     */
    reset() {
        this.x = 375 + Math.random() * 1500;
        this.y = 300 - Math.random() * 220;
        this.loadImage('img/8_coin/coin_1.png'); 
        if (this.animateCoinsIntervall) {
            clearInterval(this.animateCoinsIntervall);
        }
        this.animate();
    }
}
