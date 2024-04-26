class Chicken extends MoveableObject {
    height = 55;
    width = 70;
    y = 380;
    walkingInterval = null;
    movingInterval = null;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    // Variablen, um die Intervalle zu speichern


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 5;

        this.animate();
    }

    animate() {
        this.movingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}


