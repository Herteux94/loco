class DrawableObject{
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;


        // loadImage('hier den Pfad eintragen, um Bild hinzuzufügen')
        loadImage(path) {
            this.img = new Image(); // Image() ersetzt nur die html Schreibweise von <img src...>
            this.img.src = path;
        }


        loadImages(arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }


        draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

            getRandomImage(images) {
        // Wähle einen zufälligen Index aus
        const randomIndex = Math.floor(Math.random() * images.length);
        // Gib das zufällige Bild aus den IMAGES zurück
        return images[randomIndex];
    }
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin || this instanceof Bottle || this instanceof Chick || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'none';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];        
    }



    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80){
            return 4;
        }
        else if (this.percentage >= 60){
            return 3;
        }
        else if (this.percentage >= 40){
            return 2;
        }
        else if (this.percentage >= 20){
            return 1;
        }
        else  {
            return 0;
        }
    }


    }