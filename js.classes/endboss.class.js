class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 55;
    x = 3200;
    speed = 10;
    energy = 100;
    deadBoss = false;
    alertAnimationPlayed = false;
    animateEndbossIntervall = null;
    dead_endboss = new Audio('sounds/rooster-cry-173621.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }


    animate() {

        this.animateEndbossIntervall = setInterval(() => {
            if (intervallsStarted === true) {

                if (this.isHurt() && !this.deadBoss) {
                    setTimeout(() => {
                        this.playAnimation(this.IMAGES_HURT);
                    }, 450);
                } else
                    if (!this.isDead() && !this.alertAnimationPlayed && !this.deadBoss) {
                        this.playAnimation(this.IMAGES_WALKING);
                        this.moveLeft();
                    }
                    else if (this.isDead() && !this.deadBoss) {
                        this.bossIsDead();
                    }
            }
        }, 150);
    }


    reset() {
        this.height = 400;
        this.width = 250;
        this.y = 55;
        this.energy = 100;
        this.deadBoss = false;
        this.alertAnimationPlayed = false;
        this.animateEndbossIntervall = null;
        this.x = 3200;
        this.speed = 10;
    }

    bossIsDead() {
        setTimeout(() => {
            world.stopAllIntervals();
        }, 450);
        if (intervallsStarted) {
            this.img = this.imageCache[this.IMAGES_DEAD[0]];
            setTimeout(() => {
                this.img = this.imageCache[this.IMAGES_DEAD[1]];
                setTimeout(() => {
                    this.img = this.imageCache[this.IMAGES_DEAD[2]];
                }, 250);
            }, 250);
            if (!mute) {
                this.dead_endboss.play();
            }

        }

            world.stopAllIntervals();

            setTimeout(() => {
                world.winningGame();
            },5000)
    }


    playAttackAnimation(images) {
        if (intervallsStarted) {

            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;

            // Verwenden Sie die neue Methode, um den Sprung auszuführen, wenn das spezielle Bild angezeigt wird
            this.checkForSpecialAttackImage(path);
        }
    }

    checkForSpecialAttackImage(path) {
        if (path === 'img/4_enemie_boss_chicken/3_attack/G18.png') {
            // Die Sprungbewegung ausführen
            this.x -= 50; // 50px auf der x-Achse nach links
            this.speedY = 50; // Hochsprung mit der vorhandenen Sprungkraft
        }
    }

}