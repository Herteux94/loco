class ThrowableObject extends MoveableObject {

    thrown = false;

    height = 60;
    speedY = 30;
    width = 50;
    throwIntervall = null;
    throw_sound = new Audio('sounds/movement-swipe-whoosh-3-short.wav')
    splash_sound = new Audio('sounds/glass-bottle-shatter-short.wav')

    BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.BOTTLE_ROTATION);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.thrown = true;
        this.applyGravity();

        this.throwIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                if (this.y > 380) {
                    this.playAnimation(this.BOTTLE_SPLASH);
                    this.speedY = 0;
                    setTimeout(() => {
                        this.y = 500;

                    }, 250)
                } else {
                    this.playAnimation(this.BOTTLE_ROTATION);
                    this.x += 10;
                }
            }
        }, 50);
        if(!mute){
        this.throw_sound.play();
    }}


    explodeBottle() {
        this.playAnimation(this.BOTTLE_SPLASH);
        this.speedY = 0;
        if(!mute){
        this.splash_sound.play();
    }}
}