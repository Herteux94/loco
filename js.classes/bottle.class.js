class Bottle extends ThrowableObject {
    width = 75;
    height = 75;

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super();
        // Wähle ein zufälliges Bild aus den IMAGES aus
        const randomImage = this.getRandomImage(this.IMAGES);
        // Lade das zufällige Bild
        this.loadImage(randomImage);
        // Setze den Startpunkt
        this.x = 375 + Math.random() * 1500;
        this.y = 370 - Math.random() * 10; 
           // Animation starten
    }

    reset() {
        this.x = 375 + Math.random() * 1500;
        this.y = 370 - Math.random() * 10;
        const randomImage = this.getRandomImage(this.IMAGES);
        this.loadImage(randomImage); // Setze das Bild zurück
    }
}