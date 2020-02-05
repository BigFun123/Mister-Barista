import MenuScene from "./scene_menu.js";
import MainScene from "./scene_main.js";
import ScoreScene from "./scenes/scene_scores.js";

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
    scene : [MenuScene,MainScene,GameServer, ScoreScene],
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

