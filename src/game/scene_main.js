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
    }

    preload ()
    {        
        this.load.setBaseURL('../../assets/');
        this.load.image("sky", "sky.jpg");
        this.load.image("table", "table2.jpg");
        this.load.image("cup", "cup1_sm.png");
        this.load.audio('slide', [
            './audio/slide.ogg',
            './audio/slide.mp3'
        ]);
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

        this.input.on('gameobjectup', this.clickHandler, this);

        this.createText();
        this.newGame();

    // this.add.cup(200, 200);
    }

    newGame() {
        GameServer.NewGame();

        //Get initial ordering from server
        var cup1 = this.add.sprite(200, 390, 'cup').setInteractive();
        cup1.ObjectID = "Latte";
        var cup2 = this.add.sprite(400, 390, 'cup').setInteractive();
        cup2.ObjectID = "Americano";
        var cup3 = this.add.sprite(600, 390, 'cup').setInteractive();
        cup3.ObjectID = "Cuppucino";

        //sprite.on('pointerDown', function() {
          //  this.setTint(Math.random() * 16000000);
            //console.log("sprite1 clicked");
        //})
    }

    clickHandler (pointer, box)
    {
        console.log("an object clicked");
        console.log(box.ObjectID);
        this.audioSlide.play(); 

        var win = GameServer.GetWin(box.ObjectID);
        if ( win == true ){
            this.text.text = "Winner!";
            this.tweens.add({
                targets: box,
                y: 420,
                ease: 'Linear',
                delay: 0,
                duration: 200,
                completeDelay: 800,
                onComplete: this.responseDidWin,
                callbackScope: this
            });
        } 
        else {
            this.tweens.add({
                targets: box,
                y: 420,
                ease: 'Linear',
                delay: 0,
                duration: 200,
                completeDelay: 800,
                onComplete: this.responseDidLose,
                callbackScope: this
            });
        }


        this.textCoins.text = "Coins " + GameServer.GetCoins();        
        //  Dispatch a Scene event
        this.events.emit('CheckScore');
    }

    responseDidWin() {
        console.log("Winner Winner Chicken Dinner");
        //this.add.text(10, 10, "Winner!");
       
        this.scene.start("MainScene", "fromMain");
    }

    responseDidLose() {
        console.log("Oh noes you lose");
        this.text.text = "Try Again";
        //this.add.text(10, 10, "Try Again");
    }

    createText() {

        this.text = this.add.text(10, 10, "Mister Barista");
        this.textCoins = this.add.text(340, 10, "Coins " + GameServer.GetCoins());
        //text.anchor.setTo(0.5);
    
        this.text.font = 'Fontdiner Swanky';
        this.text.fontSize = 60;
    
        //  If we don't set the padding the font gets cut off
        //  Comment out the line below to see the effect
        //text.padding.set(10, 16);
    
        this.grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
        this.grd.addColorStop(0, '#8ED6FF');   
        this.grd.addColorStop(1, '#004CB3');
        this.text.fill = this.grd;
    
        this.text.align = 'center';
        this.text.stroke = '#000000';
        this.text.strokeThickness = 2;
        this.text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    
        this.text.inputEnabled = true;
        //this.text.input.enableDrag();
    
        //this.text.events.onInputOver.add(this.over, this);
        //this.text.events.onInputOut.add(this.out, this);    
    }

    out() {
        this.text.fill = grd;    
    }
    
    over() {    
        text.fill = '#ff00ff';    
    }
}

export default MainScene;