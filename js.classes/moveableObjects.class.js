class MoveableObject extends DrawableObject {

    otherDirection = false;
    speedY = 0;
    speed = 0.15;
    acceleration = 2.5;
    lastHit = 0;
    collectedCoins = 0;
    applyGravitiyIntervall = null;

    applyGravity() {
        this.applyGravitiyIntervall = setInterval(() => {
            if (intervallsStarted === true) {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
       }   }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable Object should always fall
            return true
        } else {
            return this.y < 180;
        }
    }


    moveRight() {
        if (!this.isDead()) {
            this.x += this.speed;
        }
    }


    moveLeft() {
        if(!this.isDead()){
        this.x -= this.speed;
    }}


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        if(!this.isDead()){
        this.speedY = 30;
    }}

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    isJumpingOn(mo) {
        const yTolerance = 17;
        const xTolerance = -17;
        const isAbove = (this.y + this.height) >= mo.y - yTolerance &&
            (this.y + this.height) <= mo.y + yTolerance;
        const isJumpingDown = this.speedY < 0; const isWithinXRange = this.x + this.width >= mo.x - xTolerance &&
            this.x <= mo.x + mo.width + xTolerance;
        return isAbove && isJumpingDown && isWithinXRange;
    }


    hit(enemy) {
        if (!enemy.dead) {
            this.energy -= 2;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
        console.log('Energy after hit:', this.energy);
    }


    endbossHit(enemy) {
        if (!enemy.isDead()) {
            this.energy -= 6;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
        console.log('Energy after endbossHit:', this.energy);
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    stopIntervals() {
        clearInterval(this.movingIntervalChicken);
        clearInterval(this.walkingIntervalChicken);
        clearInterval(this.walkingIntervalChick);
        clearInterval(this.movingIntervalChick);
    }


}