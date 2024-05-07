class Character extends MoveableObject {
    height = 250;
    y = 180;
    speed = 10;
    characterMovementsIntervall = null;
    characterMovementAnimationsIntervall = null;
    characterNoMovementAnimationsIntervall = null;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]


    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]



    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',

    ]
    world;
    walking_sound = new Audio('sounds/running-in-grass-short.wav');
    jumping_sound = new Audio('sounds/cartoon-jump-short.wav');
    snoring_sound = new Audio('sounds/snoring-short.wav');
    ouch_sound = new Audio('sounds/ouchmp3-14591.mp3');
    dead_character = new Audio('sounds/man-death-scream-186763.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.previousX = this.x;
    }


    animate() {
        this.characterMovements();
        this.characterMovementAnimations();
        this.characterNoMovementAnimations();
    }


    characterMovements() {
        this.characterMovementsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    if (!this.isAboveGround()) {
                        this.walking_sound.play();
                    }
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    if (!this.isAboveGround()) {
                        this.walking_sound.play();
                    }
                    this.otherDirection = true;
                }
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    this.jumping_sound.play();
                }
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }


    characterMovementAnimations() {
        this.characterMovementAnimationsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.dead_character.play();
                    setTimeout(() => {
                        world.stopAllIntervals();
                        world.endGame();
                    }, 2000);
                }
                else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                }
                else if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    this.ouch_sound.play();
                } else {
                    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                        this.playAnimation(this.IMAGES_WALKING);
                    }
                }
            }
        }, 50);
    }


    characterNoMovementAnimations() {
        let timeAtY180 = null;
        this.characterNoMovementAnimationsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                if (this.y === 180 && !this.isDead() && !this.isHurt() && this.x === this.previousX) {

                    this.playAnimation(this.IMAGES_STANDING);
                    if (timeAtY180 === null) {
                        timeAtY180 = new Date().getTime();
                    }
                    const durationAtY180 = new Date().getTime() - timeAtY180;
                    if (durationAtY180 >= 3000) {
                        this.playAnimation(this.IMAGES_SLEEPING);
                        this.snoring_sound.play();
                    }
                } else {
                    timeAtY180 = null;
                }
                this.previousX = this.x;
            }
        }, 250);
    }
}