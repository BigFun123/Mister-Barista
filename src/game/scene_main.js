class MainScene extends Phaser.Scene {
    constructor ()
    {
        super('MainScene');
    }

    preload ()
    {
        //this.load.setBaseURL('http://labs.phaser.io');
    this.load.setBaseURL('../../assets/');
    this.load.image("sky2", "sky.jpg");
    this.load.image('logo2', 'logo.jpg');
    this.load.image('smoke', 'smoke.png');

    //this.load.image('sky', 'assets/skies/space3.png');
    //this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    //this.load.image('red', 'assets/particles/red.png');
    //InitAudio(this);   
    this.load.audio('theme', [
        'audio/myrobot_karllilje.ogg',
        'audio/myrobot_karllilje.mp3'
    ]);
    }

    init(data) {
        console.log(data);
    }

    create ()
    {
        this.music = game.sound.add('theme', {volume:0.15});        
    
        this.add.image(400, 300, 'sky2');

        var particles = this.add.particles('smoke');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.51, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo2');

        logo.setVelocity(300, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        this.input.on('pointerdown', function(pointer) {
            console.log("down");
            this.add.image(pointer.x, pointer.y, 'smoke').setInteractive();
            if ( !this.music.isPlaying ){
                this.music.play();
            }
            
            
        }, this);

        this.input.on('gameobjectup', this.clickHandler, this);

    // this.add.cup(200, 200);
    }

    clickHandler (pointer, box)
    {
        console.log("clicked");
        //  Disable our box
        box.input.enabled = false;
        box.setVisible(false);

        //  Dispatch a Scene event
        this.events.emit('addScore');
    }
}