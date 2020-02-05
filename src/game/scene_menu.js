/*******************************
 *     Menu and Settings       *
 *******************************/
class MenuScene extends Phaser.Scene {    
        
    constructor ()
    {
        super('MenuScene');
    }

    preload ()
    {
        this.load.setBaseURL('../../assets/');
        this.load.image("sky2", "sky.jpg");
        this.load.image("play", "play64b.png");
        this.load.image('logo2', 'logo.png');
        this.load.image('smoke', 'smoke.png');
        this.load.audio('theme', [
            './audio/myrobot_karllilje.ogg',
            './audio/myrobot_karllilje.mp3'
        ]);
    }

    create ()
    {
        this.music = this.sound.add('theme', {volume:0.01});     
        this.music.play(); 
        this.menuNumber = 0;
                this.add.image(400, 300, 'sky2');

        let play = this.add.image(400, 300, 'play');

        // on mouse click, goto scene B
        this.input.on('pointerup', () => {
            console.log("menudown");        
            //game.scene.start("MainScene", "from_menu");                    
            
            this.scene.start("MainScene", "from_menu");
        }, this);

        var particles = this.add.particles('smoke');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.41, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo2');

        logo.setVelocity(300, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

    //    this.input.on('gameobjectup', this.clickHandler, this)
    }

    clickHandler (pointer, box)
    {
        //  Disable our box
        //box.input.enabled = false;
        //box.setVisible(false);

        this.scene.start("MainScene", "from_menu");
        //  Dispatch a Scene event
        //this.events.emit('addScore');
    }

    update( ) {        
    }
}

export default MenuScene;