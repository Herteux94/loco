class StatusBarBoss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];


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
