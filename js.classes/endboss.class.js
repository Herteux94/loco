class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 55;
    energy = 100;
    deadBoss = false;
    alertAnimationPlayed = false;


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
        this.x = 3200;
        this.speed = 10;
        this.animate();
    }


    animate() {

        setInterval(() => {

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else
                if (!this.isDead() && !this.alertAnimationPlayed) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.moveLeft();
                }
                else if (this.isDead() && !this.deadBoss) {
                    this.bossIsDead();
                    this.deadBoss = true;
                }
        }, 150);
    }


    bossIsDead() {
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        setTimeout(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[1]];
            setTimeout(() => {
                this.img = this.imageCache[this.IMAGES_DEAD[2]];
            }, 250);
        }, 250);
    }

    playAttackAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;

        // Verwenden Sie die neue Methode, um den Sprung auszuführen, wenn das spezielle Bild angezeigt wird
        this.checkForSpecialAttackImage(path);
    }

    checkForSpecialAttackImage(path) {
        if (path === 'img/4_enemie_boss_chicken/3_attack/G18.png') {
            // Die Sprungbewegung ausführen
            this.x -= 150; // 50px auf der x-Achse nach links
            this.speedY = 100; // Hochsprung mit der vorhandenen Sprungkraft
        }
    }

}