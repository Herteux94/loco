/**
 * @class MoveableObject
 * @extends DrawableObject
 * @description Represents an object that can move and be affected by gravity, with properties and methods for movement, collision detection, and state management.
 */
class MoveableObject extends DrawableObject {
    world;
    collectedBottles = 0;
    throwableObjects = [];
    dead_chicken = new Audio('sounds/chicken-single-alarm-call-6056.mp3');
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

        /*** Checks if thrown bottles hit any enemies and handles the collision.
     */   checkAttackBottle() {
        this.world.throwableObjects.forEach((throwableObject) => {
            this.world.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    this.handleBottleHitEnemy(enemy, throwableObject);
                }
            });
        });
    }

    /*** Handles what happens when a thrown bottle hits an enemy.
     * @param {MoveableObject} enemy - The enemy that was hit.
     * @param {ThrowableObject} throwableObject - The bottle that was thrown.
     */ handleBottleHitEnemy(enemy, throwableObject) {
        if (enemy instanceof Chick && !enemy.isDead()) {
            this.bottleHitChick(enemy);
        } else if (enemy instanceof Chicken && !enemy.isDead()) {
            this.bottleHitChicken(enemy);
        } else if (enemy instanceof Endboss) {
            this.bottleHitEndboss(throwableObject);
        }
    }

    /*** Handles what happens when a bottle hits a chick.
     */ bottleHitChick(enemy) {
        this.deadEnemy(enemy);
        if (!mute) {
            this.dead_chicken.play();
        }
    }

    /*** Handles what happens when a bottle hits a chicken.
     */    bottleHitChicken(enemy) {
        this.deadEnemy(enemy);
        if (!mute) {
            this.dead_chicken.play();
        }
    }

    /*** Handles what happens when a bottle hits the end boss.
     * @param {ThrowableObject} throwableObject - The bottle that was thrown.
     */bottleHitEndboss(throwableObject) {
        this.handleBottleHitEndboss(this.world.endboss);
        throwableObject.explodeBottle();
    }

    /*** Reduces the end boss's energy when hit by a bottle.
     * @param {Endboss} endboss - The end boss that was hit.
     */handleBottleHitEndboss(endboss) {
        endboss.energy -= 2;
        if (endboss.energy < 0) {
            endboss.energy = 0;
        } else {
            endboss.lastHit = new Date().getTime();
        }
        this.world.statusBarBoss.setPercentage(endboss.energy);
    }

    /*** Marks an enemy as dead and removes it after a delay.
     * @param {MoveableObject} enemy - The enemy that was killed.
     */deadEnemy(enemy) {
        enemy.img.src = enemy.IMAGES_DEAD[0];
        enemy.speed = 0;
        enemy.stopIntervals();
        enemy.dead = true;
        setTimeout(() => {
            this.removeEnemy(enemy);
        }, 500);
    }

    /*** Removes an enemy from the level's enemies array.
     * @param {MoveableObject} enemy - The enemy to remove.
     */ removeEnemy(enemy) {
        const index = this.world.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }

    /*** Marks the end boss as dead.
     * @param {Endboss} enemy - The end boss that was killed.
     */deadEndboss(enemy) {
        enemy.img.src = enemy.IMAGES_DEAD[0];
        enemy.speed = 0;
        enemy.stopIntervals();
        enemy.dead = true;
    }

      /*** Checks if a throwable object should be thrown and handles the throw action.
     */checkThrowObjects() {
        if (this.world.keyboard.D && this.world.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.world.character.x + 100, this.world.character.y + 100);
            this.world.throwableObjects.push(bottle);
            bottle.throw(bottle.x, bottle.y);
            this.world.collectedBottles -= 10;
            this.world.statusBarBottles.setPercentage(this.world.collectedBottles);
        }
    }
}