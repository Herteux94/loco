/**
 * @class StatusBarBottles
 * @extends DrawableObject
 * @description Represents the status bar for the bottles in the game, showing the player's collected bottles.
 */
class StatusBarBottles extends DrawableObject {

    /**
     * @property {string[]} IMAGES - The array of image paths for the status bar at different bottle collection levels.
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates an instance of StatusBarBottles.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }
}
