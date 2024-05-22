class Coin extends MoveableObject {
    width = 75;
    height = 75;
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
        this.y = 75;
        this.animate();
    }

    animate() {
        this.animateCoinsIntervall = setInterval(() => {
            if (intervallsStarted === true) {
                this.playAnimation(this.IMAGES);
            }
        }, 200);
    }
    reset() {
        this.x = 375 + Math.random() * 1500;
        this.y = 300 - Math.random() * 220;
        this.loadImage('img/8_coin/coin_1.png'); // Setze das Bild zurück
        if (this.animateCoinsIntervall) {
            clearInterval(this.animateCoinsIntervall);
        }
        this.animate();
    }

}