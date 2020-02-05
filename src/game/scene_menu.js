import ToggleButton from './togglebutton.js';
import GameState from './state.js';

/*******************************
 *     Menu and Settings       *
 *******************************/
class MenuScene extends Phaser.Scene {    
        
    constructor ()
    {
        super('MenuScene');      
        //this.musicEnabled = true;  
    }

    preload ()
    {
        this.load.setBaseURL('../../assets/');
        this.load.image("sky2", "sky.jpg");
        this.load.image("play", "play64b.png");
        this.load.image('logo2', 'logo.png');
        this.load.image('smoke', 'smoke.png');
        this.load.image('soundOff', 'sound_off.png');
        this.load.image('soundOn', 'sound_on.png');
        this.load.audio('theme', [
            './audio/myrobot_karllilje.ogg',
            './audio/myrobot_karllilje.mp3'
        ]);
    }

    create ()
    {
        if (( this.music == null )  && ( GameState.AudioEnabled)){
            this.music = this.sound.add('theme', {volume:0.01});
            this.music.play(); 
        }
        
        this.menuNumber = 0;
        this.add.image(400, 300, 'sky2');

        this.add.image(400, 300, 'play')
            .setInteractive()
            .on('pointerdown', ()=>this.startGame());

        // on mouse click
        this.input.on('pointerup', () => {
            console.log("menudown");                    
        }, this);

        var particles = this.add.particles('smoke');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.41, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo2').setInteractive();
        

        logo.setVelocity(300, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        this.soundControlOn = new ToggleButton(this, 400, 500, 'soundOn', this.toggleAudio); 
        this.add.existing(this.soundControlOn);
        this.soundControlOff = new ToggleButton(this, 400, 500, 'soundOff', this.toggleAudio); 
        this.add.existing(this.soundControlOff);
        this.soundControlOff.setVisible(false);
    }

    toggleAudio(context) {
        GameState.AudioEnabled = !GameState.AudioEnabled;
        //context.musicEnabled = !context.musicEnabled;
        console.log("sound Toggle " + context.music);    
        //context.soundControl.setVisible(false);
        if ( GameState.AudioEnabled ) {
            context.music.play();
            context.soundControlOn.setVisible(true);
            context.soundControlOff.setVisible(false);
        }
        else {
            context.music.stop();
            context.soundControlOn.setVisible(false);
            context.soundControlOff.setVisible(true);
        }
        
    }

    startGame() {
        this.scene.start("MainScene", "from_menu");
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