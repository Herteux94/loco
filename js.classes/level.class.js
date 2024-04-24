class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_end_x = 3200;

    constructor(enemies, clouds, coins, bottles, backgroundObjects){
        this.enemies = enemies;
        this.coins = coins;
        this.clouds = clouds;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}