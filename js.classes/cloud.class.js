class Cloud extends MoveableObject {
    y = 20;
    width = 1000;
    height = 400;
    speed = 0.15;
    x = 0;
    animateClouds = null;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    animate() {

        this.animateClouds = setInterval(() => {
            if (intervallsStarted === true) {
                this.moveLeft();
            }
        }, 50);
    }


}

