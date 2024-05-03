class World {

    character = new Character();
    endboss = new Endboss
    level = level1;
    canvas;
    ctx;
    keyboard;
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
    bossIsAlertedIntervall = null;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this; //sieht seltsam aus, dient dazu, die Element aus world auch in character nutzen zu können (hier gehts ums keyboard)
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
    }



    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.throw(bottle.x, bottle.y);
            this.collectedBottles -= 20;
            this.statusBarBottles.setPercentage(this.collectedBottles);
        }
    }


    checkAttackBottle() {
        // Iteriere durch die Liste der geworfenen Flaschen (throwableObjects)
        this.throwableObjects.forEach((throwableObject) => {
            // Iteriere durch die Liste der Gegner (enemies)
            this.level.enemies.forEach((enemy) => {
                // Überprüfe, ob die Flasche den Gegner getroffen hat
                if (throwableObject.isColliding(enemy)) {
                    // Rufe handleBottleHitEnemy mit throwableObject und enemy auf
                    this.handleBottleHitEnemy(enemy, throwableObject);
                }
            });
        });
    }



    handleBottleHitEnemy(enemy, throwableObject) {
        if (enemy instanceof Chick) {
            this.deadEnemy(enemy);
        }
        else if (enemy instanceof Chicken) {
            this.deadEnemy(enemy);
        }
        else if (enemy instanceof Endboss) {
            this.handleBottleHitEndboss(enemy);
            this.speedY = 0;
            throwableObject.explodeBottle();
        }
    }


    handleBottleHitEndboss(endboss) {
        endboss.energy -= 9;
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
        this.collectCoin(); // Aktualisiert den Charakterzustand
        // Entfernt den Coin aus der Liste
        this.statusBarCoins.setPercentage(this.collectedCoins);
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
            this.collectedBottles += 20;
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

        let self = this; //draw() wird immer wieder aufgerufen - this kennt requestAnimationFrame nicht, daher die Variable, um das zu umgehen
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawBackgroundObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0); // Back
        // ------- space for fixed objects --------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarBoss);
        this.ctx.translate(this.camera_x, 0); // Forwards
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
        if (mo.otherDirection) {//hiermit wird der Character gespiegelt, wenn otherDirection = true
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


    bossIsAlerted() {
        // Überprüfen, ob der Abstand zwischen endboss und character weniger als 400 beträgt
        if (Math.abs(this.endboss.x - this.character.x) < 400 && !this.endboss.alertAnimationPlayed) {
            console.log('Abstand zwischen endboss und character:', Math.abs(this.endboss.x - this.character.x));

            // Funktion zum Abspielen der Alert-Animation mit einer Verzögerung zwischen den Bildern
            const playAlertAnimation = () => {
                // Verwenden Sie let, um die Animation reihenweise auszuführen
                for (let i = 0; i < this.endboss.IMAGES_ALERT.length; i++) {
                    setTimeout(() => {
                        // Setzen Sie das aktuelle Bild
                        this.endboss.img = this.endboss.imageCache[this.endboss.IMAGES_ALERT[i]];
                        console.log('Aktuelles Bild:', this.endboss.img);
                    }, i * 250); // Verzögerung von 250 ms zwischen jedem Bild
                }
                // Setzen Sie die Eigenschaft auf true, nachdem die Animation abgespielt wurde
                this.endboss.alertAnimationPlayed = true;
            };

            // Starten Sie die Alert-Animation
            playAlertAnimation();
        }
        if (this.endboss.alertAnimationPlayed) {
            this.endbossAttacks();
        }
    }

    endbossAttacks() {
        // setInterval(() => {
        // Verwenden Sie die Methode playAnimation des endboss-Objekts
        console.log(this.endboss.deadBoss)
        if(!this.endboss.deadBoss){
         this.endboss.playAttackAnimation(this.endboss.IMAGES_ATTACK);
        //   }, 1200)
    }}



}