class Endboss extends MoveableObject {

    height = 400;
    width = 250;
    y = 55;
    


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 3200;
        this.speed = 10;
        this.animate();
    }


    animate() {
        const alertInterval = 200; // Intervall für IMAGES_ALERT
        const walkingInterval = 200; // Intervall für IMAGES_WALKING
        const loopInterval = 1000; // Gesamtloopintervall
    
        const loop = () => {
            // Führe die IMAGES_ALERT-Animation für den festgelegten Zeitraum aus
            const alertTimeout = setTimeout(() => {
                this.playAnimation(this.IMAGES_ALERT);
    
                // Nach dem Alert-Intervall führe die IMAGES_WALKING-Animation aus
                const walkingIntervalId = setInterval(() => {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.moveLeft();
                }, walkingInterval);
    
                // Stoppe die IMAGES_WALKING-Animation nach einem Zyklus und starte den Loop von vorne
                setTimeout(() => {
                    clearInterval(walkingIntervalId);
                    loop(); // Starte den Loop von vorne
                }, loopInterval - alertInterval);
    
            }, alertInterval);
        };
    
        loop(); // Starte den Loop
    }
}