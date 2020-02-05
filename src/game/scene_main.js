import Cup from './cup.js';
import Constants from './const.js';
import ToggleButton from './togglebutton.js';
import GameState from './state.js';

/*******************************
 *         Main Scene          *
 *******************************/ 
var WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },    
    google: {
      families: ['Fontdiner Swanky']
    }
};

class MainScene extends Phaser.Scene {
   
    constructor ()
    {
        super('MainScene');
        this.lockInput =true; //when true, the scene is locked for input
    }

    preload ()
    {        
        this.load.setBaseURL('../../assets/');
        this.load.image("sky", "sky.jpg");
        this.load.image("table", "table2.jpg");
        this.load.image("back", "back.jpg");
        this.load.image("cup", "cup1_sm.png");
        this.load.image("cupwin", "cup1_sm_win.png");
        this.load.image("cuplose", "cup1_sm_lose.png");
        this.load.audio('slide', [
            './audio/slide.ogg',
            './audio/slide.mp3'
        ]);
        this.load.audio('cash', [
            './audio/cash.ogg',
            './audio/cash.mp3'
        ]);

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    }

    init(data) {
        console.log(data);
        this.text = null;
        this.textCoins = null;
        this.grd = null;
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }

    create () 
    {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'table');

        this.audioSlide = this.sound.add('slide', {volume:0.1});             
        this.audioCash = this.sound.add('cash', {volume:0.1});

        this.input.on('gameobjectup', this.clickHandler, this);

        this.createText();
        
        this.menuButton = new ToggleButton(this, 700, 15, 'back', this.quitGame); 
        this.add.existing(this.menuButton);
        
        this.newGame();
        
        this.lockInput = false;
    }

    quitGame(context) {
        GameServer.EndGame();        
        context.scene.start("MenuScene", "from_main");
    }

    newGame() {
        GameServer.NewGame();        
        this.scene.get('GameServer').events.emit('GameEvent', "123");

        //Get initial ordering from server        
        var cup1 = new Cup(this, 600, 390, 'cup', 'Latte');        
        this.add.existing(cup1);
        this.tweens.add({
            targets: cup1,
            x: 200,
            ease: 'Cubic.Out',
            delay: 0,
            duration: 500,
            completeDelay: 800,            
            callbackScope: this
        });

        var cup2 = new Cup(this, 200, 390, 'cup', 'Americano');        
        this.add.existing(cup2);
        this.tweens.add({
            targets: cup2,
            x: 400,
            ease: 'Cubic.Out',
            delay: 0,
            duration: 500,
            completeDelay: 800,            
            callbackScope: this
        });

        var cup3 = new Cup(this, 400, 390, 'cup', 'Cuppucino');
        this.add.existing(cup3);
        this.tweens.add({
            targets: cup3,
            x: 600,
            ease: 'Cubic.Out',
            delay: 0,
            duration: 500,
            completeDelay: 800,            
            callbackScope: this
        });
    }

    clickHandler (pointer, box)
    {
        if ( this.lockInput == true) return ;        
        console.log(box.ObjectID);
        if ( GameState.AudioEnabled){
            this.audioSlide.play(); 
        }
        
        this.text.text = "Checking cup...";
        this.lockInput = true;

        var win = GameServer.GetWin(box.ObjectID);

        if ( win == true ){
            this.text.text = Constants.winner();
            
            if ( GameState.AudioEnabled){
                this.audioCash.play();
            }
            //swap graphic with winning cup
            var cup1 = new Cup(this, box.x, box.y, 'cupwin', 'Latte');        
            this.add.existing(cup1);
            box.setVisible(false);

            this.tweens.add({
                targets: cup1,
                y: 420,
                ease: 'Cubic.Out',
                delay: 0,
                duration: 200,
                completeDelay: 400,
                onComplete: this.responseDidWin,
                callbackScope: this
            });
        } 
        else {

            var cup1 = new Cup(this, box.x, box.y, 'cuplose', 'Latte');        
            this.add.existing(cup1);
            box.setVisible(false);

            this.tweens.add({
                targets: cup1,
                y: 420,
                ease: 'Linear',
                delay: 0,
                duration: 200,
                completeDelay: 400,
                onComplete: this.responseDidLose,
                callbackScope: this
            });
        }

        this.textCoins.text = "Coins " + GameServer.GetCoins();        
        //  Dispatch a Scene event
        this.events.emit('CheckScore');
    }

    responseDidWin() {
        this.lockInput = false;
        console.log("Winner Winner Chicken Dinner");
        this.scene.start("MainScene", "fromMain");
    }

    responseDidLose() {
        this.lockInput = false;
        console.log("Oh noes you lose");
        this.text.text = Constants.notThisOne();        
    }

    createText() {

        this.text = this.add.text(10, 10, Constants.gameName());
        //this.textCoins = this.add.text(340, 10, "Coins " + GameServer.GetCoins());
        this.textCoins = this.add.text(190, 50, "Coins " + GameServer.GetCoins(), { fontFamily: "Arial Black", fontSize: 74, color: "#964b00" });
        this.textCoins.setStroke('#c67b30', 16);        
        this.textCoins.setShadow(2, 2, '#333333', 2, true, false);        
    
        this.text.font = 'Fontdiner Swanky';
        this.text.fontSize = 60;        
        this.text.align = 'center';
        this.text.stroke = '#000000';
        this.text.strokeThickness = 2;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    
        this.text.inputEnabled = true;        
    }

    out() {
        this.text.fill = grd;    
    }
    
    over() {    
        text.fill = '#ff00ff';    
    }
}

export default MainScene;