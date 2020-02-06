import ToggleButton from '../components/togglebutton.js';
import GameState from '../state.js';

/*******************************
 *     Menu and Settings       *
 *******************************/
class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.setBaseURL('../../assets/');
        this.load.image("sky2", "sky.jpg");
        this.load.image("play", "play64b.png");
        this.load.image('logo2', 'logo.png');
        this.load.image('smoke', 'smoke.png');
        this.load.image('scores', 'scores.png');
        this.load.image('soundOff', 'sound_off.png');
        this.load.image('soundOn', 'sound_on.png');
        this.load.audio('theme', [
            './audio/myrobot_karllilje.ogg',
            './audio/myrobot_karllilje.mp3'
        ]);
        this.load.audio('slide', [
            './audio/slide.ogg',
            './audio/slide.mp3'
        ]);
    }

    create() {
        if ((this.music == null) && (GameState.AudioEnabled)) {
            this.music = this.sound.add('theme', { volume: 0.01 });
            this.music.play();
        }

        this.audioSlide = this.sound.add('slide', { volume: 0.1 });

        this.menuNumber = 0;
        this.add.image(400, 300, 'sky2');

        var particles = this.add.particles('smoke');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.41, end: 0 },
            blendMode: 'ADD'
        });

        //add the logo and some steam
        var logo = this.physics.add.image(400, 100, 'logo2').setInteractive();
        logo.setVelocity(300, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        emitter.startFollow(logo);

        let play = this.add.image(400, 300, 'play')
            .setInteractive()
            .on('pointerdown', () => this.startGame());

        this.tweens.add({
            targets: play,
            y: 320,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: 30,
            delay: 100
        });

        this.scores = new ToggleButton(this, 400, 460, 'scores', this.showScores);
        this.add.existing(this.scores);

        this.soundControlOn = new ToggleButton(this, 400, 500, 'soundOn', this.toggleAudio);
        this.add.existing(this.soundControlOn);
        this.soundControlOff = new ToggleButton(this, 400, 500, 'soundOff', this.toggleAudio);
        this.add.existing(this.soundControlOff);
        if (GameState.AudioEnabled) {
            this.soundControlOff.setVisible(false);
            this.soundControlOn.setVisible(true);
        }
        else {
            this.soundControlOff.setVisible(true);
            this.soundControlOn.setVisible(false);
        }
    }

    toggleAudio(context) {
        GameState.AudioEnabled = !GameState.AudioEnabled;
        console.log("sound Toggle " + context.music);
        if (GameState.AudioEnabled) {
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

    showScores(context) {
        context.scene.start("ScoreScene", "from_menu");
    }

    startGame() {
        if (GameState.AudioEnabled) {
            this.audioSlide.play();
        }
        this.scene.start("MainScene", "from_menu");
    }

    clickHandler(pointer, box) {
        this.scene.start("MainScene", "from_menu");
    }

    update() {
    }
}

export default MenuScene;