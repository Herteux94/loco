/**
 * @class Endboss
 * @extends MoveableObject
 * @description Represents the end boss enemy in the game, with properties and methods for animations, movements, attacks, and resetting.
 */
class Endboss extends MoveableObject {

    /**
     * @property {number} height - The height of the end boss.
     * @default 400
     */
    height = 400;

    /**
     * @property {number} width - The width of the end boss.
     * @default 250
     */
    width = 250;

    /**
     * @property {number} y - The y-coordinate position of the end boss.
     * @default 55
     */
    y = 55;

    /**
     * @property {number} x - The x-coordinate position of the end boss.
     * @default 3620
     */
    x = 3620;

    /**
     * @property {number} speed - The speed at which the end boss moves.
     * @default 10
     */
    speed = 11;

    /**
     * @property {number} energy - The energy level of the end boss.
     * @default 100
     */
    energy = 100;

    /**
     * @property {boolean} deadBoss - Indicates if the end boss is dead.
     * @default false
     */
    deadBoss = false;

    /**
     * @property {boolean} alertAnimationPlayed - Indicates if the alert animation has been played.
     * @default false
     */
    alertAnimationPlayed = false;

    /**
     * @property {number|null} animateEndbossIntervall - The interval ID for the end boss's animation.
     */
    animateEndbossIntervall = null;

    /**
     * @property {Audio} dead_endboss - The audio for the end boss's death sound.
     */
    dead_endboss = new Audio('sounds/rooster-cry-173621.mp3');

    /**
     * @property {Audio} winning - The audio for the winning sound.
     */
    winning = new Audio('sounds/495829__dbdarby__arriba.wav');

    /**
     * @property {boolean} inRange - Indicates if the end boss is in range to attack.
     * @default false
     */
    inRange = false;

    /**
     * @property {string[]} IMAGES_ALERT - The array of image paths for the alert animation.
     */
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

    /**
     * @property {string[]} IMAGES_WALKING - The array of image paths for the walking animation.
     */
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * @property {string[]} IMAGES_ATTACK - The array of image paths for the attack animation.
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * @property {string[]} IMAGES_HURT - The array of image paths for the hurt animation.
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * @property {string[]} IMAGES_DEAD - The array of image paths for the dead animation.
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**
     * @property {Audio} tenders_sound - The audio for the tenders sound effect.
     */tenders_sound = new Audio('sounds/chicken-tenders-184781.mp3');


    /**
     * Creates an instance of Endboss.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Starts the animation intervals for the end boss.
     */
    animate() {
        this.animateEndbossIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.startAnimationIntervallBoss();
            }
        }, 150);
    }

    /**
     * Handles the end boss's animation based on its state.
     */
    startAnimationIntervallBoss() {
        if (this.isHurt() && !this.deadBoss) {
            this.bossIsHurtAnimation();
        } else if (!this.isDead() && !this.alertAnimationPlayed && !this.deadBoss && this.inRange) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        } else if (this.isDead() && !this.deadBoss) {
            this.bossIsDead();
        }
    }

    /**
     * Plays the hurt animation for the end boss.
     */
    bossIsHurtAnimation() {
        if (!this.deadBoss) {
            setTimeout(() => {
                this.playAnimation(this.IMAGES_HURT);
            }, 450);
        }
    }

    /**
     * Handles the end boss's death, including stopping intervals and playing animations.
     */
    bossIsDead() {
        this.deadBoss = true;
        setTimeout(() => {
            intervallsStarted = false;
        }, 450);
        if (intervallsStarted) {
            this.startBossIsDeadAnimation();
        }
        document.getElementById('winningScreen').classList.remove('dNone');
        document.getElementById('winningScreenH1').classList.remove('dNone');
        setTimeout(() => {
            winningGame();
        }, 2500);
    }

    /**
     * Starts the dead animation for the end boss.
     */
    startBossIsDeadAnimation() {
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        setTimeout(() => {
            this.img = this.imageCache[this.IMAGES_DEAD[1]];
            setTimeout(() => {
                this.img = this.imageCache[this.IMAGES_DEAD[2]];
            }, 250);
        }, 250);
        if (!mute) {
            this.dead_endboss.play();
            this.winning.play();
        }
    }

    /**
     * Plays the attack animation for the end boss.
     * @param {string[]} images - The array of image paths for the attack animation.
     */
    playAttackAnimation(images) {
        if (intervallsStarted && !this.deadBoss) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.checkForSpecialAttackImage(path);
        }
    }

    /**
     * Checks if the current attack image is a special attack and adjusts position accordingly.
     * @param {string} path - The path of the current attack image.
     */
    checkForSpecialAttackImage(path) {
        if (path === 'img/4_enemie_boss_chicken/3_attack/G18.png') {
            this.x -= 145;
            this.speedY = 35;
        }
    }

    /**
     * Resets the end boss to its initial state.
     */
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

        /**
     * Plays the alert sound for the end boss.
     */playAlertSound() {
        if (!mute) {
            this.tenders_sound.play();
        }
    }
}
