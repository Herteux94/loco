class Chicken extends MoveableObject {
    height = 55;
    width = 70;
    y = 360;
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
    walkingInterval = null;
    movingInterval = null;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 3000;
        this.speed = 0.15 + Math.random() * 5;

        this.animate();
    }

    animate() {
        // Überprüfe, ob das Chicken tot ist
        if (this.dead) {
            // Beende die Funktion, um weitere Animationen und Bewegungen zu stoppen
            return;
        }

        // Starte die Intervalle
        this.movingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    
    stopIntervals() {
        clearInterval(this.movingInterval);
        clearInterval(this.walkingInterval);
        console.log('Intervals stopped')
    }
}


