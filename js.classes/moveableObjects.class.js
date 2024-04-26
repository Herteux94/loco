class MoveableObject extends DrawableObject {

    otherDirection = false;
    speedY = 0;
    speed = 0.15;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable Object should always fall
            return true
        } else {
            return this.y < 180;
        }
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    isJumpingOn(mo) {
        // Passe die y- und x-Toleranzwerte an
        const yTolerance = 20; // Erhöhe den y-Toleranzbereich für mehr Sensitivität
        const xTolerance = -20; // Passe den x-Toleranzbereich an

        // Berechne die Bedingungen für die Y-Position, X-Position und Bewegung nach unten
        const isAbove = (this.y + this.height) >= mo.y - yTolerance &&
            (this.y + this.height) <= mo.y + yTolerance;
        const isJumpingDown = this.speedY < 0; // Überprüfe, ob sich der Character nach unten bewegt
        const isWithinXRange = this.x + this.width >= mo.x - xTolerance &&
            this.x <= mo.x + mo.width + xTolerance;

        // Debugging-Meldungen, um die überprüften Werte anzuzeigen
        console.log('this.y + this.height:', this.y + this.height);
        console.log('mo.y - yTolerance:', mo.y - yTolerance);
        console.log('mo.y + yTolerance:', mo.y + yTolerance);
        console.log('isAbove:', isAbove);
        console.log('this.speedY:', this.speedY);
        console.log('isJumpingDown:', isJumpingDown);
        console.log('isWithinXRange:', isWithinXRange);

        // Gib die berechneten Bedingungen zurück
        return isAbove && isJumpingDown && isWithinXRange;
    }





    hit(enemy) {
        console.log(this.dead);
        if (!enemy.dead) {
            this.energy -= 2;
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
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
        clearInterval(this.movingInterval);
        clearInterval(this.walkingInterval);
        console.log('Intervals stopped')
    }

}