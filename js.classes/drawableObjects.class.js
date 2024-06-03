/**
 * @class DrawableObject
 * @description Represents an object that can be drawn on the canvas, with properties and methods for managing images and drawing.
 */
class DrawableObject {
    /**
     * @property {number} x - The x-coordinate position of the drawable object.
     * @default 120
     */
    x = 120;

    /**
     * @property {number} y - The y-coordinate position of the drawable object.
     * @default 280
     */
    y = 280;

    /**
     * @property {number} height - The height of the drawable object.
     * @default 150
     */
    height = 150;

    /**
     * @property {number} width - The width of the drawable object.
     * @default 100
     */
    width = 100;

    /**
     * @property {HTMLImageElement} img - The image element of the drawable object.
     */
    img;

    /**
     * @property {Object} imageCache - A cache of loaded images.
     */
    imageCache = {};

    /**
     * @property {number} currentImage - The index of the current image in the image cache.
     * @default 0
     */
    currentImage = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths.
     * @param {string[]} arr - An array of paths to image files.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image on the specified canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Returns a random image path from the provided array of images.
     * @param {string[]} images - An array of image paths.
     * @returns {string} The path of the randomly selected image.
     */
    getRandomImage(images) {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    /**
     * Sets the current image based on the specified percentage.
     * @param {number} percentage - The percentage to determine the current image.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage.
     * @returns {number} The index of the image to use.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

        /**
     * Checks if the end boss is alerted and starts its attack if so.
     */bossIsAlerted() {
        if (this.isEndbossAlertable()) {
            this.playAlertSound();
            this.playAlertAnimation();
            this.startEndbossAttacks();
        }
    }

    /**
     * Checks if the end boss can be alerted.
     * @returns {boolean} True if the end boss can be alerted, false otherwise.
     */isEndbossAlertable() {
        return Math.abs(this.endboss.x - this.character.x) < 450 && !this.endboss.alertAnimationPlayed;
    }

    /**
     * Plays the alert sound for the end boss.
     */playAlertSound() {
        if (!mute) {
            this.tenders_sound.play();
        }
    }
    /**
     * Plays the alert animation for the end boss.
     */playAlertAnimation() {
        const animationInterval = 180;
        let currentIndex = 0;
        this.alertEndbossIntervalId = setInterval(() => {
            this.endboss.img = this.endboss.imageCache[this.endboss.IMAGES_ALERT[currentIndex]];
            currentIndex++;
            if (currentIndex >= this.endboss.IMAGES_ALERT.length) {
                clearInterval(this.alertEndbossIntervalId);
            }
        }, animationInterval);
        this.endboss.alertAnimationPlayed = true;
    }
    /**
     * Starts the end boss's attacks after a delay.
     */startEndbossAttacks() {
        setTimeout(() => {
            const attackInterval = 200;
            this.attackEndbossIntervalId = setInterval(() => {
                if (Math.abs(this.endboss.x - this.character.x) < 350 && this.endboss.alertAnimationPlayed) {
                    this.endbossAttacks();
                } else {
                    this.endboss.playAnimation(this.endboss.IMAGES_WALKING);
                    this.endboss.moveLeft();
                }
            }, attackInterval);
        }, 2000);
    }
    /**
     * Handles the end boss's attack animation.
     */endbossAttacks() {
        if (!this.endboss.deadBoss) {
            this.endboss.playAttackAnimation(this.endboss.IMAGES_ATTACK);
        }
    }
    /**
     * Checks the distance between the character and the end boss and updates the boss's status bar.
     */checkDistanceCharacterEndboss() {
        this.checkDistanceCharacterEndbossIntervall = setInterval(() => {
            if (Math.abs(this.endboss.x - this.character.x) < 450) {
                this.statusBarBoss.width = 200;
                this.statusBarBoss.height = 60;
            }
        }, 200);
    }
}
