class MenuScene extends Phaser.Scene {    
        
    constructor ()
    {
        super('MenuScene');
    }

    preload ()
    {
        this.load.setBaseURL('../../assets/');
        this.load.image("sky2", "sky.jpg");
        this.load.image("play", "play64.png");
    }

    create ()
    {
        this.menuNumber = 0;
                this.add.image(400, 300, 'sky2');

        let play = this.add.image(400, 300, 'play');

        // on mouse click, goto scene B
        this.input.on('pointerup', () => {
            console.log("menudown");        
            //game.scene.start("MainScene", "from_menu");        
            this.scene.start("MainScene", "from_menu");
        }, this);

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