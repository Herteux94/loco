const cloudWidth = 1000;
const cloudSpacing = 500;

const level1 = new Level(

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Chick(),
            new Endboss()
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/full.png', 0),
            new Cloud('img/5_background/layers/4_clouds/full.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/full.png', 2000),
            new Cloud('img/5_background/layers/4_clouds/full.png', 3000),
            new Cloud('img/5_background/layers/4_clouds/full.png', 4000),
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],
        [
            new BackgroundObject('img/9_intro_outro_screens/start/startscreen_1.png', 2 * -719),
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2 * 719),
            new BackgroundObject('img/5_background/layers/air.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3 * 719),
            new BackgroundObject('img/5_background/layers/air.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4 * 719),
            new BackgroundObject('img/5_background/layers/air.png', 5 * 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 5 * 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 5 * 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 5 * 719),
        ]
    );


function resetLevel() {
    level1.enemies.length = 0; // Leert das Array
    level1.coins.length = 0; // Leert das Array
    level1.bottles.length = 0; // Leert das Array

    const character = world.character; // Referenz auf den bestehenden Character

    level1.enemies.push(
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Endboss(character)
    );

    level1.coins.push(
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    );

    level1.bottles.push(
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    );

    const endboss = level1.enemies.find(enemy => enemy instanceof Endboss);
    world.endboss = endboss;
}


