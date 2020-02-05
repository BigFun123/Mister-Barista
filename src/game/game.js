import MenuScene from "./scene_menu.js";
import MainScene from "./scene_main.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    /*scene: {
        preload: preload,
        create: create
    },*/
    scene : [MenuScene,MainScene,GameServer],
    audio: {
        disableWebAudio: false
    }
};

var game = new Phaser.Game(config);

/*class Game extends Phaser.Game {
    constructor() {
        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);
    }
}

new Game(config);
*/

