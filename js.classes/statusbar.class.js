/**
 * @class StatusBar
 * @extends DrawableObject
 * @description Represents a status bar in the game, which shows the player's health.
 */
class StatusBar extends DrawableObject {

    /**
     * @property {string[]} IMAGES - The array of image paths for the status bar at different health levels.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Creates an instance of StatusBar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}
