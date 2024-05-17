class Chick extends MoveableObject {
    height = 25;
    width = 35;
    y = 400;
    walkingIntervalChick = null;
    movingIntervalChick = null;
    dead = false;
    intervallsStarted = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2000 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 10;
        this.animate();
    }

    animate() {
        if (!this.dead) {
            this.movingIntervalChick = setInterval(() => {
                if (intervallsStarted === true) {
                    this.moveLeft();
                }
            }, 1000 / 60);
            this.walkingIntervalChick = setInterval(() => {
                if (intervallsStarted === true) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }, 100);
        }
    }

    reset() {
        this.x = 2000 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 10;
        this.height = 25;
        this.width = 35;
        this.y = 400;
        this.dead = false;
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        if (this.walkingIntervalChick) {
            clearInterval(this.walkingIntervalChick);
        }
        if (this.movingIntervalChick) {
            clearInterval(this.movingIntervalChick);
        }
        this.animate();
    }
}
