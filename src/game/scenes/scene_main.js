import Constants from '../const.js';
import GameServer from '../../services/gameserver.js';
import Cup from '../components/cup.js';
import ToggleButton from '../components/togglebutton.js';
import GameState from '../state.js';

/*******************************
 *         Main Scene          *
 *******************************/ 
class MainScene extends Phaser.Scene {   
    
    constructor ()
    {
        super('MainScene');          
    }

    preload ()
    {        
        this.load.setBaseURL('../../assets/');        
        this.load.image("table", "table2.jpg");
        this.load.image("back", "back.jpg");
        this.load.image("cup", "cup1_sm.png");
        this.load.image("cupwin", "cup1_sm_win.png");
        this.load.image("cuplose", "cup1_sm_lose.png");
        this.load.image("coin", "coin.png");
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
        this.temps = [];
        this.lockInput =true; //when true, the scene is locked for input
    }

    create () 
    {        
        this.lockInput =true; //when true, the scene is locked for input
        this.add.image(400, 300, 'table');        

        this.audioSlide = this.sound.add('slide', {volume:0.1});             
        this.audioCash = this.sound.add('cash', {volume:0.1});

        this.input.on('gameobjectup', this.clickHandler, this);

        this.createText();
        
        this.menuButton = new ToggleButton(this, 700, 15, 'back', this.quitGame); 
        this.add.existing(this.menuButton);

        this.coin = this.add.image(400, 300, 'coin');
        this.coin.setVisible(false);

        GameServer.RegisterHandler(this);    
        GameServer.CreateGame();
    }

    // callback from game server service after game is created on the server
    onGameCreated() {
        this.newGame(true);
    }

    //ends the game and returns to the menu
    quitGame(context) {
        GameServer.EndGame();        
        context.scene.start("MenuScene", "from_main");
    }

    //start a new game, using pooled game objects
    newGame(reinit) {
        this.lockInput = true;
        GameServer.NewGame(reinit); 
    }

    onNewGameReady(reinit) {
        this.clearTempObjects();
        
        if (( this.cup1 == null ) || (reinit==true)) {
            this.cup1 = new Cup(this, 600, 390, 'cup', 'Latte');        
            this.add.existing(this.cup1);
        }
        this.initCup(this.cup1, 600, 390, 200, 0);

        if (( this.cup2 == null ) || (reinit==true)) {
            this.cup2 = new Cup(this, 200, 390, 'cup', 'Americano');        
            this.add.existing(this.cup2);
        }

        this.initCup(this.cup2, 200, 390, 400, 0);
        
        if (( this.cup3 == null ) || reinit==true) {
            this.cup3 = new Cup(this, 400, 390, 'cup', 'Cuppucino');
            this.add.existing(this.cup3);
        }

        this.initCup(this.cup3, 400, 390, 600, 0);  
        
        this.updateUI();
    }

    /**
     * Updates UI text to match Game Server Truth
     */
    updateUI(){
        this.textCoins.text = "Coins " + GameServer.GetCoins(); 
    }

    gameReady() {
        this.lockInput = false;
        console.log(" INPUT UNLOCKED ")
    }

    initCup( cup, px, py, tx, ty) {
        cup.setVisible(true);
        cup.setActive(true);
        cup.x = px;
        cup.y = py;
        cup.clicked = false;
        cup.isCup = true;
        
        cup.tween = this.tweens.add({
            targets: cup,
            x: tx,
            ease: 'Cubic.Out',
            delay: 0,
            duration: 500,
            completeDelay: 200,  
            onComplete: this.gameReady,          
            callbackScope: this
        });
    }

    //destroys sprites, etc, used temporarily
    clearTempObjects() {
        this.temps.forEach((spr, index)=>{
            if ( spr != null ){
                spr.destroy();
            }
        })        
        this.temps = [];
    }

    clickHandler (pointer, cup)
    {
        if ((cup == null) || (!cup.isCup) || (cup.clicked == true) || (this.lockInput == true)) {
            return ;   
        }   
        
        cup.clicked = true;     
        console.log(cup.ObjectID);
        if ( GameState.AudioEnabled){
            this.audioSlide.play(); 
        }
        
        this.text.text = "Checking cup...";        

        var win = GameServer.GetWin(cup.ObjectID);

        if ( win == true ){
            this.text.text = Constants.winner();
            this.lockInput = true;
           
            
            if ( GameState.AudioEnabled){
                this.audioCash.play();
            }
            //swap graphic with winning cup
            var tempcup1 = new Cup(this, cup.x, cup.y, 'cupwin', 'NONE');        
            this.add.existing(tempcup1);
            cup.setVisible(false);            
            this.temps.push(tempcup1);

            this.tweens.add({
                targets: tempcup1,
                y: 420,
                ease: 'Cubic.Out',
                delay: 0,
                duration: 200,
                completeDelay: 600,
                onComplete: this.responseDidWin,
                callbackScope: this
            });

            this.showCoin(cup);
        } 
        else {

            var tempcup1 = new Cup(this, cup.x, cup.y, 'cuplose', 'NONE');        
            this.add.existing(tempcup1);
            cup.setVisible(false);
            this.temps.push(tempcup1);

            this.tweens.add({
                targets: tempcup1,
                y: 420,
                ease: 'Linear',
                delay: 0,
                duration: 200,
                completeDelay: 400,
                onComplete: this.responseDidLose,
                callbackScope: this
            });
        }

           
        //  Dispatch a Scene event
        this.events.emit('CheckScore');
    }

    responseDidWin() {
        this.lockInput = false;
        console.log("Winner Winner Chicken Dinner");
        this.updateUI();
       
        this.newGame(false); //don't need to reinit objects, can reuse them
    }

    showCoin(cup){
        this.coin.setVisible(true);
        this.coin.setActive(true);
        this.coin.x = cup.x;
        this.coin.y = cup.y-100;
        this.children.bringToTop(this.coin);
        this.tweens.add({
            targets: this.coin,
            x: { value: 700, duration: 1000, ease: 'Power2', yoyo: 0 },
            y: { value: 500, duration: 900, ease: 'Bounce.easeOut', yoyo: 0 },
            onComplete: this.hideCoin,
            callbackScope: this
        });
    }

    hideCoin() {
        this.coin.setVisible(false);
    }

    responseDidLose() {
        this.lockInput = false;
        console.log("Oh noes you lose");
        this.textCoins.text = "Coins " + GameServer.GetCoins();     
        this.text.text = Constants.notThisOne();        
    }

    createText() {

        this.text = this.add.text(10, 10, Constants.gameName());
        //this.textCoins = this.add.text(340, 10, "Coins " + GameServer.GetCoins());
        this.textCoins = this.add.text(250, 50, "Coins " + GameServer.GetCoins(), { fontFamily: "Arial Black", fontSize: 54, color: "#964b00" });
        this.textCoins.setStroke('#d68b40', 8);
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