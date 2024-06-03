/**
 * @class Character
 * @extends MoveableObject
 * @description Represents the main character in the game, with properties and methods for animations, movements, and actions.
 */
class Character extends MoveableObject {
    /**
     * @property {number} height - The height of the character.
     * @default 250
     */
    height = 250;

    /**
     * @property {number} y - The y-coordinate position of the character.
     * @default 180
     */
    y = 180;

    /**
     * @property {number} hitboxHeight - The height of the character's hitbox.
     * @default 100
     */
    hitboxHeight = 100;

    /**
     * @property {number} speed - The speed of the character.
     * @default 10
     */
    speed = 10;

    /**
     * @property {number} energy - The energy level of the character.
     * @default 100
     */
    energy = 100;

    /**
     * @property {number|null} characterMovementsIntervall - The interval ID for character movements.
     */
    characterMovementsIntervall = null;

    /**
     * @property {number|null} characterMovementAnimationsIntervall - The interval ID for character movement animations.
     */
    characterMovementAnimationsIntervall = null;

    /**
     * @property {number|null} characterNoMovementAnimationsIntervall - The interval ID for character no movement animations.
     */
    characterNoMovementAnimationsIntervall = null;

    /**
     * @property {string[]} IMAGES_WALKING - The array of image paths for walking animations.
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * @property {string[]} IMAGES_JUMPING - The array of image paths for jumping animations.
     */
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
    ];

    /**
     * @property {string[]} IMAGES_DEAD - The array of image paths for dead animations.
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * @property {string[]} IMAGES_HURT - The array of image paths for hurt animations.
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * @property {string[]} IMAGES_STANDING - The array of image paths for standing animations.
     */
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
    ];

    /**
     * @property {string[]} IMAGES_SLEEPING - The array of image paths for sleeping animations.
     */
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
    ];

    /**
     * @property {Audio} walking_sound - The audio for the walking sound effect.
     */
    walking_sound = new Audio('sounds/running-in-grass-short.wav');

    /**
     * @property {Audio} jumping_sound - The audio for the jumping sound effect.
     */
    jumping_sound = new Audio('sounds/cartoon-jump-short.wav');

    /**
     * @property {Audio} snoring_sound - The audio for the snoring sound effect.
     */
    snoring_sound = new Audio('sounds/snoring-short.wav');

    /**
     * @property {Audio} ouch_sound - The audio for the hurt sound effect.
     */
    ouch_sound = new Audio('sounds/ouchmp3-14591.mp3');

    /**
     * @property {Audio} dead_character - The audio for the death sound effect.
     */
    dead_character = new Audio('sounds/man-death-scream-186763.mp3');

    /**
     * Creates an instance of Character.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.energy = 100;
        this.applyGravity();
        this.animate();
        this.previousX = this.x;
    }

    /**
     * Starts the animation intervals for the character.
     */
    animate() {
        this.characterMovements();
        this.characterMovementAnimations();
        this.characterNoMovementAnimations();
    }

    /**
     * Resets the character to its initial state.
     */
    reset() {
        this.x = 120;
        this.y = 180;
        this.speed = 10;
        this.energy = 100;
        this.speedY = 0;
        this.currentImage = 0;
        this.previousX = this.x;
        this.animate();
        intervallsStarted = true;
    }

    /**
     * Sets up the interval for character movements.
     */
    characterMovements() {
        this.characterMovementsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.characterStartsMovingintervall();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Handles the character movements based on keyboard input.
     */
    characterStartsMovingintervall() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.characterMovesRight();
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.characterMovesLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.characterIsJumping();
        }
    }

    /**
     * Moves the character to the right.
     */
    characterMovesRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            if (!mute) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left.
     */
    characterMovesLeft() {
        this.moveLeft();
        if (!this.isAboveGround()) {
            if (!mute) {
                this.walking_sound.play();
            }
        }
        this.otherDirection = true;
    }

    /**
     * Makes the character jump.
     */
    characterIsJumping() {
        this.jump();
        if (!mute) {
            this.jumping_sound.play();
        }
    }

    /**
     * Sets up the interval for character movement animations.
     */
    characterMovementAnimations() {
        this.characterMovementAnimationsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.characterStartsMovingAnimationIntervall();
            }
        }, 50);
    }

    /**
     * Handles the character's movement animation based on its state.
     */
    characterStartsMovingAnimationIntervall() {
        if (this.isDead()) {
            this.characterIsDeadAnimation();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.isHurt()) {
            this.characterIsHurtAnimation();
        } else {
            this.characterIsMovingAnimation();
        }
    }

    /**
     * Plays the dead animation and stops the game.
     */
    characterIsDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!mute) {
            this.dead_character.play();
        }
        setTimeout(() => {
            this.intervallsStarted = false;
            endGame();
        }, 20);
    }

    /**
     * Plays the hurt animation.
     */
    characterIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (!mute) {
            this.ouch_sound.play();
        }
    }

    /**
     * Plays the walking animation if the character is moving.
     */
    characterIsMovingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Sets up the interval for character no movement animations.
     */
    characterNoMovementAnimations() {
        this.characterNoMovementAnimationsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.characterStanding();
            }
            this.previousX = this.x;
        }, 250);
    }

    /**
     * Plays the standing animation if the character is not moving.
     */
    characterStanding() {
        if (this.y === 180 && !this.isDead() && !this.isHurt() && this.x === this.previousX) {
            this.playAnimation(this.IMAGES_STANDING);
            if (this.timeAtY180 === null) {
                this.timeAtY180 = new Date().getTime();
            }
            const durationAtY180 = new Date().getTime() - this.timeAtY180;
            if (durationAtY180 >= 7000) {
                this.characterSleeping();
            }
        } else {
            this.timeAtY180 = null;
        }
    }

    /**
     * Plays the sleeping animation.
     */
    characterSleeping() {
        this.playAnimation(this.IMAGES_SLEEPING);
        if (!mute && intervallsStarted) {
            this.snoring_sound.play();
        }
    }
}
