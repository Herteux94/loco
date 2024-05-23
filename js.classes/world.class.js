class World {

    character = new Character();
    endboss = new Endboss();
    chicken = new Chicken();
    chick = new Chick();

    level = level1;
    canvas;
    ctx;
    keyboard;
    fullscreen = new Image('img/icons/icons8-fullscreen-50.png');
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarBoss = new StatusBarBoss();
    throwableObjects = [];
    collectedCoins = 0;

    collectedBottles = 0;
    checkCollisionIntervall = null;
    checkThrowObjectsIntervall = null;
    alertEndbossIntervalId = null;
    attackEndbossIntervalId = null;
    checkCollisionIntervall = null;
    checkThrowObjectsIntervall = null;
    bossIsAlertedIntervall = null;
    tenders_sound = new Audio('sounds/chicken-tenders-184781.mp3');
    dead_chicken = new Audio('sounds/chicken-single-alarm-call-6056.mp3');
    collect_coin = new Audio('sounds/coin_c_02-102844.mp3');
    collect_bottle = new Audio('sounds/paper-collect-9-186723.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }




    setWorld() {
        this.character.world = this; //sieht seltsam aus, dient dazu, die Element aus world auch in character nutzen zu können (hier gehts ums keyboard)7
        this.endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    }


    run() {
        this.checkCollisionIntervall = setInterval(() => {
            this.checkCollisions();
        }, 50)
        this.checkThrowObjectsIntervall = setInterval(() => {
            this.checkThrowObjects();
        }, 125)
        this.bossIsAlertedIntervall = setInterval(() => {
            this.bossIsAlerted();
        }, 200)
        this.checkDistanceCharacterEndboss();

    }


    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw(bottle.x, bottle.y);
            this.collectedBottles -= 10;
            this.statusBarBottles.setPercentage(this.collectedBottles);
        }
    }


    checkAttackBottle() {
        this.throwableObjects.forEach((throwableObject) => {
            this.level.enemies.forEach((enemy) => {
                if (throwableObject.isColliding(enemy)) {
                    this.handleBottleHitEnemy(enemy, throwableObject);
                }
            });
        });
    }



    handleBottleHitEnemy(enemy, throwableObject) {
         if (enemy instanceof Chick && !this.chick.isDead()) {
             this.deadEnemy(enemy);
             this.dead_chicken.play();
         }
         else if (enemy instanceof Chicken && !this.chicken.isDead()) {
             this.deadEnemy(enemy);
             this.dead_chicken.play();
         }
         else if (enemy instanceof Endboss) {
        this.handleBottleHitEndboss(enemy);
        this.speedY = 0;
        throwableObject.explodeBottle();
        }
    }


    handleBottleHitEndboss(endboss) {
        endboss.energy -= 2;
        if (endboss.energy < 0) {
            endboss.energy = 0;
        } else {
            endboss.lastHit = new Date().getTime();
        }
        this.statusBarBoss.setPercentage(endboss.energy);
    }


    deadEnemy(enemy) {
        enemy.img.src = enemy.IMAGES_DEAD[0];
        enemy.speed = 0;
        enemy.stopIntervals();
        enemy.dead = true;
        setTimeout(() => {
            this.removeEnemy(enemy)
        }, 500)
    }

    removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        if (index > -1) {
            this.level.enemies.splice(index, 1);
        }
    }

    deadEndboss(enemy) {
        enemy.img.src = enemy.IMAGES_DEAD[0];
        enemy.speed = 0;
        enemy.stopIntervals();
        enemy.dead = true;
    }


    checkCollisions() {
        this.checkCollisionEnemy();
        this.checkCollisionCoin();
        this.checkCollisionBottle();
        this.checkAttackBottle();
    }


    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                this.deadEnemy(enemy);
                enemy.dead = true;
                if (!mute) {
                    this.dead_chicken.play();
                }
            }
            else if (this.character.isColliding(enemy)) {
                this.collisionEnemy(enemy);
            }
        });
    }


    checkCollisionCoin() {
        this.level.coins.forEach((coin, indexOfCoins) => {
            if (this.character.isColliding(coin)) {
                this.collisionCoin();
                this.removeCoins(indexOfCoins);
            }
        });
    }


    checkCollisionBottle() {
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle)) {
                this.collisionBottle();
                this.removeBottles(indexOfBottles);
            }
        });
    }


    collisionEnemy(enemy) {
        if ((enemy instanceof Endboss)) {
            this.character.endbossHit(enemy);
            this.statusBar.setPercentage(this.character.energy);
        }
        else {
            this.character.hit(enemy);
            this.statusBar.setPercentage(this.character.energy);
        }
    }


    collisionCoin() {
        this.collectCoin();
        this.statusBarCoins.setPercentage(this.collectedCoins);
        if (!mute) {
            this.collect_coin.play();
        }
    }


    collisionBottle() {
        this.collectBottle();
        this.statusBarBottles.setPercentage(this.collectedBottles);
    }


    removeCoins(indexOfCoins) {
        this.level.coins.splice(indexOfCoins, 1);
    }


    removeBottles(indexOfBottles) {
        this.level.bottles.splice(indexOfBottles, 1);
    }


    collectCoin() {
        if (this.collectedCoins < 100) {
            this.collectedCoins += 20;
        }
    }


    collectBottle() {
        if (this.collectedBottles < 100) {
            this.collectedBottles += 10;
            if (!mute) {
                this.collect_bottle.play();
            }
        }
    }


    draw() {
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


    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0);
    }

    drawMoveableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
    // Überprüft, ob der Endboss alarmiert ist und angreifen soll
    // Überprüft, ob der Endboss alarmiert ist und angreifen soll
    bossIsAlerted() {
        if (this.isEndbossAlertable()) {
            this.playAlertSound();
            this.playAlertAnimation();
            this.startEndbossAttacks();
        }
    }

    // Überprüft, ob der Endboss alarmiert werden kann (Endboss und Character nah genug)
    isEndbossAlertable() {
        return Math.abs(this.endboss.x - this.character.x) < 300 && !this.endboss.alertAnimationPlayed;
    }

    // Spielt den Alarm-Sound ab
    playAlertSound() {
        if (!mute) {
            this.tenders_sound.play();
        }
    }

    // Spielt die Alert-Animation ab
    playAlertAnimation() {
        const animationInterval = 180; // Intervall zwischen den Bildern der Alert-Animation
        let currentIndex = 0;

        this.alertEndbossIntervalId = setInterval(() => {
            this.endboss.img = this.endboss.imageCache[this.endboss.IMAGES_ALERT[currentIndex]];
            currentIndex++;
            if (currentIndex >= this.endboss.IMAGES_ALERT.length) {
                clearInterval(this.alertEndbossIntervalId); // Animation beenden, wenn alle Bilder durchlaufen wurden
            }
        }, animationInterval);
        this.endboss.alertAnimationPlayed = true;
    }

    // Startet den Endboss-Angriff in einem Intervall
    startEndbossAttacks() {
        setTimeout(() => {
            const attackInterval = 200; // Intervall für die Endboss-Angriffe in Millisekunden
            this.attackEndbossIntervalId = setInterval(() => {
                if (Math.abs(this.endboss.x - this.character.x) < 250 && this.endboss.alertAnimationPlayed) {
                    this.endbossAttacks();
                }
                else { 
                    this.endboss.playAnimation(this.endboss.IMAGES_WALKING);
                    this.endboss.moveLeft(); }
            }, attackInterval);
        }, 2000)
    }




    endbossAttacks() {
        if (!this.endboss.deadBoss) {
            this.endboss.playAttackAnimation(this.endboss.IMAGES_ATTACK);
        }
    }

    stopAllIntervals() {
        intervallsStarted = false;
    }

    endGame() {
        document.getElementById('restart').classList.remove('dNone');
        document.getElementById('endscreen').classList.remove('dNone'); 
        document.getElementById('headline').classList.add('dNone');
        // document.getElementById('muteIcon').classList.remove('muteIconInGame');
        // document.getElementById('unmuteIcon').classList.remove('muteIconInGame');
        // document.getElementById('fullscreenIcon').classList.remove('fullscreenIconInGame');
        // document.getElementById('muteIcon').classList.add('muteIcon');
        // document.getElementById('unmuteIcon').classList.add('muteIcon');
        // document.getElementById('fullscreenIcon').classList.add('fullscreenIcon');
    }

    winningGame() {
        document.getElementById('headline').classList.add('dNone');
        document.getElementById('restart').classList.remove('dNone');
        document.getElementById('homescreen').classList.remove('dNone');
        document.getElementById('canvas').classList.add('dNone');
        document.getElementById('privacyPolicy').classList.remove('dNone');
        document.getElementById('impressum').classList.remove('dNone');
        document.getElementById('muteIcon').classList.remove('muteIconInGame');
        document.getElementById('unmuteIcon').classList.remove('muteIconInGame');
        document.getElementById('fullscreenIcon').classList.remove('fullscreenIconInGame');
        document.getElementById('muteIcon').classList.add('muteIcon');
        document.getElementById('unmuteIcon').classList.add('muteIcon');
        document.getElementById('fullscreenIcon').classList.add('fullscreenIcon');
    }

    clearIntervallsForRestart() {
        clearInterval(this.checkCollisionIntervall);
        clearInterval(this.checkThrowObjectsIntervall);
        clearInterval(this.bossIsAlertedIntervall);
        clearInterval(this.alertEndbossIntervalId);
        clearInterval(this.attackEndbossIntervalId);

        // clearInterval(this.endbossMovementsIntervall);
        // clearInterval(this.endbossAttackIntervall);
        // clearInterval(this.endbossMovementAnimationsIntervall);
        // clearInterval(this.endbossAttackAnimationsIntervall);

        clearInterval(this.endboss.animateEndbossIntervall);
        clearInterval(this.character.characterMovementsIntervall);
        clearInterval(this.character.characterMovementAnimationsIntervall);
        clearInterval(this.character.characterNoMovementAnimationsIntervall);
    }


    checkDistanceCharacterEndboss() {
        this.checkDistanceCharacterEndbossIntervall = setInterval(() => {
            if (Math.abs(this.endboss.x - this.character.x) < 450) {
 
                this.statusBarBoss.width = 200;
                this.statusBarBoss.height = 60;
            }
        }, 200)
    }
}

