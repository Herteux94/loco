/**
 * @class Level
 * @description Represents a game level, containing enemies, clouds, coins, bottles, and background objects.
 */
class Level {
    /**
     * @property {Array} enemies - The array of enemies in the level.
     */
    enemies;

    /**
     * @property {Array} clouds - The array of clouds in the level.
     */
    clouds;

    /**
     * @property {Array} coins - The array of coins in the level.
     */
    coins;

    /**
     * @property {Array} bottles - The array of bottles in the level.
     */
    bottles;

    /**
     * @property {Array} backgroundObjects - The array of background objects in the level.
     */
    backgroundObjects;

    /**
     * @property {number} level_end_x - The x-coordinate where the level ends.
     * @default 3400
     */
    level_end_x = 3400;

    /**
     * Creates an instance of Level.
     * @param {Array} enemies - The array of enemies.
     * @param {Array} clouds - The array of clouds.
     * @param {Array} coins - The array of coins.
     * @param {Array} bottles - The array of bottles.
     * @param {Array} backgroundObjects - The array of background objects.
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}
