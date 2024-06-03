/**
 * @class MoveableObject
 * @extends DrawableObject
 * @description Represents an object that can move and be affected by gravity, with properties and methods for movement, collision detection, and state management.
 */
class MoveableObject extends DrawableObject {

    /**
     * @property {boolean} otherDirection - Indicates if the object is moving in the other direction.
     * @default false
     */
    otherDirection = false;

    /**
     * @property {number} speedY - The vertical speed of the object.
     * @default 0
     */
    speedY = 0;

    /**
     * @property {number} speed - The horizontal speed of the object.
     * @default 0.15
     */
    speed = 0.15;

    /**
     * @property {number} acceleration - The acceleration due to gravity.
     * @default 2.5
     */
    acceleration = 2.5;

    /**
     * @property {number} lastHit - The timestamp of the last hit the object took.
     * @default 0
     */
    lastHit = 0;

    /**
     * @property {number} collectedCoins - The number of coins collected by the object.
     * @default 0
     */
    collectedCoins = 0;

    /**
     * @property {number|null} applyGravitiyIntervall - The interval ID for applying gravity to the object.
     */
    applyGravitiyIntervall = null;

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        this.applyGravitiyIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
        }
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        if (!this.isDead()) {
            this.x -= this.speed;
        }
    }

    /**
     * Plays an animation using the provided array of images.
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        if (intervallsStarted === true) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        if (!this.isDead()) {
            this.speedY = 30;
        }
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * @param {MoveableObject} mo - The other moveable object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width >= mo.x &&
            this.y + this.height >= mo.y &&
            this.x <= mo.x + mo.width &&
            this.y <= mo.y + mo.height;
    }

    /**
     * Checks if the object is jumping on another moveable object.
     * @param {MoveableObject} mo - The other moveable object.
     * @returns {boolean} True if the object is jumping on the other object, false otherwise.
     */
    isJumpingOn(mo) {
        const yTolerance = 10;
        const xTolerance = 5;
        const isAbove = (this.y + this.height) >= mo.y - yTolerance &&
            (this.y + this.height) <= mo.y + yTolerance;
        const isJumpingDown = this.speedY < 0;
        const isWithinXRange = this.x + this.width >= mo.x - xTolerance &&
            this.x <= mo.x + mo.width + xTolerance;
        return isAbove && isJumpingDown && isWithinXRange;
    }

    /**
     * Handles the object taking a hit from an enemy.
     * @param {MoveableObject} enemy - The enemy object.
     */
    hit(enemy) {
        if (!enemy.dead) {
            this.energy -= 2;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Handles the object taking a hit from the end boss.
     * @param {MoveableObject} enemy - The end boss object.
     */
    endbossHit(enemy) {
        if (!enemy.isDead()) {
            this.energy -= 6;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Stops all movement and walking intervals.
     */
    stopIntervals() {
        clearInterval(this.movingIntervalChicken);
        clearInterval(this.walkingIntervalChicken);
        clearInterval(this.walkingIntervalChick);
        clearInterval(this.movingIntervalChick);
    }
}
