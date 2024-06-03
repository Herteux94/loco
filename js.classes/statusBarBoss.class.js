/**
 * @class StatusBarBoss
 * @extends DrawableObject
 * @description Represents the status bar for the end boss in the game, showing the boss's health.
 */
class StatusBarBoss extends DrawableObject {

    /**
     * @property {string[]} IMAGES - The array of image paths for the status bar at different health levels.
     */
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    /**
     * Creates an instance of StatusBarBoss.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 0;
        this.height = 0;
        this.x = 500;
        this.y = 5;
        this.setPercentage(100);
    }
}
