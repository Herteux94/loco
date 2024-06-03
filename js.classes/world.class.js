/**
 * @class World
 * @description Represents the game world, managing the character, enemies, items, and game state.
 */
class World {
    /**
     * @property {Character} character - The main character of the game.
     */character = new Character();

    /**
     * @property {Endboss} endboss - The end boss of the game.
     */endboss = new Endboss();

    /**
     * @property {Chicken} chicken - A chicken enemy in the game.
     */chicken = new Chicken();

    /**
     * @property {Chick} chick - A chick enemy in the game.
     */chick = new Chick();

    /**
     * @property {Level} level - The current level of the game.
     */level = level1;

    /**
     * @property {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     */canvas;

    /**
     * @property {CanvasRenderingContext2D} ctx - The rendering context for the canvas.
     */ctx;

    /**
     * @property {Keyboard} keyboard - The keyboard input for controlling the game.
     */keyboard;

    /**
     * @property {HTMLImageElement} fullscreen - The fullscreen icon image.
     */fullscreen = new Image('img/icons/icons8-fullscreen-50.png');

    /**
     * @property {number} camera_x - The x-coordinate for the camera position.
     */camera_x = 0;

    /**
     * @property {StatusBar} statusBar - The status bar for the character's health.
     */statusBar = new StatusBar();

    /**
     * @property {StatusBarCoins} statusBarCoins - The status bar for the collected coins.
     */statusBarCoins = new StatusBarCoins();

    /**
     * @property {StatusBarBottles} statusBarBottles - The status bar for the collected bottles.
     */statusBarBottles = new StatusBarBottles();

    /**
     * @property {StatusBarBoss} statusBarBoss - The status bar for the end boss's health.
     */statusBarBoss = new StatusBarBoss();

    /**
     * @property {Array} throwableObjects - The array of throwable objects in the game.
     */throwableObjects = [];

    /**
     * @property {number} collectedCoins - The number of collected coins.
     * @default 0
     */collectedCoins = 0;

    /**
     * @property {boolean} intervallsStopped - Indicates if intervals are stopped.
     * @default false
     */intervallsStopped = false;

    /**
     * @property {number} collectedBottles - The number of collected bottles.
     * @default 0
     */collectedBottles = 0;

    /**
     * @property {number|null} checkCollisionIntervall - The interval ID for checking collisions.
     */checkCollisionIntervall = null;

    /**
     * @property {number|null} checkThrowObjectsIntervall - The interval ID for checking thrown objects.
     */checkThrowObjectsIntervall = null;

    /**
     * @property {number|null} alertEndbossIntervalId - The interval ID for alerting the end boss.
     */alertEndbossIntervalId = null;

    /**
     * @property {number|null} attackEndbossIntervalId - The interval ID for the end boss's attacks.
     */attackEndbossIntervalId = null;

    /**
     * @property {number|null} bossIsAlertedIntervall - The interval ID for checking if the end boss is alerted.
     */bossIsAlertedIntervall = null;

    /**
     * @property {Audio} dead_chicken - The audio for the dead chicken sound effect.
     */dead_chicken = new Audio('sounds/chicken-single-alarm-call-6056.mp3');

    /**
     * @property {Audio} collect_coin - The audio for the coin collection sound effect.
     */collect_coin = new Audio('sounds/coin_c_02-102844.mp3');

    /**
     * @property {Audio} collect_bottle - The audio for the bottle collection sound effect.
     */collect_bottle = new Audio('sounds/paper-collect-9-186723.mp3');

    /*** Creates an instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input for controlling the game.
     */constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkInRange();
    }

    /*** Checks if the character is in range of the end boss and starts intervals if true.
     */checkInRange() {
        setInterval(() => {
            if (Math.abs(this.endboss.x - this.character.x) < 450) {
                this.endboss.inRange = true;
            }
        }, 100);
    }

    /*** Sets the world property for the character and finds the end boss in the level enemies.
     */setWorld() {
        this.character.world = this;
        this.chicken.world = this;
        this.chick.world = this;
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    /*** Runs the main game loop by setting intervals for various checks and actions.
     */run() {
        this.checkCollisionIntervall = setInterval(() => {
            this.checkCollisions();
        }, 50);
        this.checkThrowObjectsIntervall = setInterval(() => {
            this.checkThrowObjects();
        }, 125);
        this.bossIsAlertedIntervall = setInterval(() => {
            this.bossIsAlerted();
        }, 200);
        this.checkDistanceCharacterEndboss();
    }

    /*** Checks if a throwable object should be thrown and handles the throw action.
     */checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw(bottle.x, bottle.y);
            this.collectedBottles -= 10;
            this.statusBarBottles.setPercentage(this.collectedBottles);
        }
    }

    /*** Checks if thrown bottles hit any enemies and handles the collision.
     */checkAttackBottle() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    this.handleBottleHitEnemy(enemy, throwableObject);
                }
            });
        });
    }

    /*** Handles what happens when a thrown bottle hits an enemy.
     * @param {MoveableObject} enemy - The enemy that was hit.
     * @param {ThrowableObject} throwableObject - The bottle that was thrown.
     */handleBottleHitEnemy(enemy, throwableObject) {
        if (enemy instanceof Chick && !this.chick.isDead()) {
            this.bottleHitChick(enemy);
        } else if (enemy instanceof Chicken && !this.chicken.isDead()) {
            this.bottleHitChicken(enemy);
        } else if (enemy instanceof Endboss) {
            this.bottleHitEndboss(throwableObject);
        }
    }

    /*** Handles what happens when a bottle hits a chick.
     */bottleHitChick(enemy) {
        this.deadEnemy(enemy);
        this.dead_chicken.play();
    }

    /*** Handles what happens when a bottle hits a chicken.
     */bottleHitChicken(enemy) {
        this.deadEnemy(enemy);
        this.dead_chicken.play();
    }

    /*** Handles what happens when a bottle hits the end boss.
     * @param {ThrowableObject} throwableObject - The bottle that was thrown.
     */bottleHitEndboss(throwableObject) {
        this.handleBottleHitEndboss(this.enemy);
        this.speedY = 0;
        throwableObject.explodeBottle();
    }

    /*** Reduces the end boss's energy when hit by a bottle.
     * @param {Endboss} endboss - The end boss that was hit.
     */handleBottleHitEndboss() {
        this.endboss.energy -= 2;
        if (this.endboss.energy < 0) {
            this.endboss.energy = 0;
        } else {
            this.endboss.lastHit = new Date().getTime();
        }
        this.statusBarBoss.setPercentage(this.endboss.energy);
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
     */removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    /*** Marks the end boss as dead.
     * @param {Endboss} enemy - The end boss that was killed.
     */deadEndboss(enemy) {
        this.enemy.img.src = enemy.IMAGES_DEAD[0];
        this.enemy.speed = 0;
        this.enemy.stopIntervals();
        this.enemy.dead = true;
    }

    /*** Checks for collisions between the character and enemies, coins, and bottles.
     */checkCollisions() {
        this.checkCollisionEnemy();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
        this.checkAttackBottle();
    }

    /*** Checks for collisions between the character and enemies.
     */checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                this.characterJumpsOnEnemy(enemy);
            } else if (this.character.isColliding(enemy)) {
                this.collisionEnemy(enemy);
            }
        });
    }

    /*** Handles what happens when the character jumps on an enemy.
     * @param {MoveableObject} enemy - The enemy that was jumped on.
     */characterJumpsOnEnemy(enemy) {
        this.deadEnemy(enemy);
        enemy.dead = true;
        if (!mute) {
            this.dead_chicken.play();
        }
    }

    /*** Checks for collisions between the character and coins.
     */checkCollisionCoin() {
        this.level.coins.forEach((coin, indexOfCoins) => {
            if (this.character.isColliding(coin)) {
                this.collisionCoin();
                this.removeCoins(indexOfCoins);
            }
        });
    }

    /*** Checks for collisions between the character and bottles.
     */checkCollisionBottle() {
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle)) {
                this.collisionBottle();
                this.removeBottles(indexOfBottles);
            }
        });
    }

    /*** Handles what happens when the character collides with an enemy.
     * @param {MoveableObject} enemy - The enemy that was collided with.
     */collisionEnemy(enemy) {
        if ((enemy instanceof Endboss)) {
            this.character.endbossHit(enemy);
            this.statusBar.setPercentage(this.character.energy);
        } else {
            this.character.hit(enemy);
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /*** Handles what happens when the character collides with a coin.
     */collisionCoin() {
        this.collectCoin();
        this.statusBarCoins.setPercentage(this.collectedCoins);
        if (!mute) {
            this.collect_coin.play();
        }
    }

    /*** Handles what happens when the character collides with a bottle.
     */collisionBottle() {
        this.collectBottle();
        this.statusBarBottles.setPercentage(this.collectedBottles);
    }

    /*** Removes a coin from the level's coins array.
     * @param {number} indexOfCoins - The index of the coin to remove.
     */removeCoins(indexOfCoins) {
        this.level.coins.splice(indexOfCoins, 1);
    }

    /*** Removes a bottle from the level's bottles array.
     * @param {number} indexOfBottles - The index of the bottle to remove.
     */removeBottles(indexOfBottles) {
        this.level.bottles.splice(indexOfBottles, 1);
    }

    /*** Increases the collected coins count.
     */collectCoin() {
        if (this.collectedCoins < 100) {
            this.collectedCoins += 20;
        }
    }

    /*** Increases the collected bottles count.
     */collectBottle() {
        if (this.collectedBottles < 100) {
            this.collectedBottles += 20;
            if (!mute) {
                this.collect_bottle.play();
            }
        }
    }

    /*** Draws the game world on the canvas.
     */draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackgroundObjects();
        this.drawFixedObjects();
        this.addToMap(this.character);
        this.drawMoveableObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /*** Draws the background objects.
     */drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /*** Draws the fixed objects.
     */drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0);
    }

    /*** Draws the moveable objects.
     */drawMoveableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    /*** Adds multiple objects to the map.
     * @param {Array} objects - The objects to add to the map.
     */addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /*** Adds a moveable object to the map.
     * @param {MoveableObject} mo - The moveable object to add to the map.
     */addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /*** Flips the image horizontally.
     * @param {MoveableObject} mo - The moveable object to flip.
     */flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /*** Flips the image back to its original state.
     * @param {MoveableObject} mo - The moveable object to flip back.
     */flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /*** Checks if the end boss is alerted and starts its attack if so.
     */bossIsAlerted() {
        if (this.isEndbossAlertable()) {
            this.endboss.playAlertSound();
            this.playAlertAnimation();
            this.startEndbossAttacks();
        }
    }

    /*** Checks if the end boss can be alerted.
     * @returns {boolean} True if the end boss can be alerted, false otherwise.
     */isEndbossAlertable() {
        return Math.abs(this.endboss.x - this.character.x) < 450 && !this.endboss.alertAnimationPlayed;
    }

    /*** Plays the alert animation for the end boss.
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

    /*** Starts the end boss's attacks after a delay.
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

    /*** Handles the end boss's attack animation.
     */endbossAttacks() {
        if (!this.endboss.deadBoss) {
            this.endboss.playAttackAnimation(this.endboss.IMAGES_ATTACK);
        }
    }

    /*** Checks the distance between the character and the end boss and updates the boss's status bar.
     */checkDistanceCharacterEndboss() {
        this.checkDistanceCharacterEndbossIntervall = setInterval(() => {
            if (Math.abs(this.endboss.x - this.character.x) < 450) {
                this.statusBarBoss.width = 200;
                this.statusBarBoss.height = 60;
            }
        }, 200);
    }
}