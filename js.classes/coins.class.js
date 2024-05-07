class Coin extends MoveableObject {
    width = 125;
    height = 125;
    animateCoinsIntervall = null;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 375 + Math.random() * 1500;
        this.y = 300 - Math.random() * 220;
        this.animate();
    }

    animate() {
        this.animateCoinsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
            this.playAnimation(this.IMAGES);
     } }, 200);
    }
}