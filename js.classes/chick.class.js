class Chick extends MoveableObject {

    height = 25;
    width = 35;
    y = 400;
    walkingIntervalChick = null;
    movingIntervalChick = null;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

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
                this.moveLeft();
            }, 1000 / 60);

            this.walkingIntervalChick = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
            }, 100);
        }
    }
}

