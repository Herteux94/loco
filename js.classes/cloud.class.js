class Cloud extends MoveableObject {
    y = 20;
    width = 1000;
    height = 400;
    speed = 0.15;
    x = 0;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50);
    }


}

