//import MenuScene from "scene_menu"

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
    scene : [MenuScene,MainScene],
    audio: {
        disableWebAudio: false
    }
};

var game = new Phaser.Game(config);

function init() {
    console.log("init");


    
    Phaser.GameObjects.GameObjectFactory.register('cup', function (x, y)
    {
        let sprite = new Cup(this.scene, x, y);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        return sprite;
    });
    
}
init();

