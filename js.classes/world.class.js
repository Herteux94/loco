class World {

    character = new Character();
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
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50)

        setInterval(() => {
            this.checkThrowObjects();
        }, 125)
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





    handleBottleHitEndboss(enemy) {
        enemy.energyBoss -= 7.5;
        if (enemy.energyBoss < 0) {
            enemy.energyBoss = 0;
        } else {
            enemy.lastHit = new Date().getTime();
        }
        this.statusBarBoss.setPercentage(enemy.energyBoss);
    }


    deadEnemy(enemy) {
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

}