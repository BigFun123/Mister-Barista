/********************************
 * Mock Game Server for Testing *
 ********************************/

let GameResult = 0;
let Instance = null;
let _Coins = 100;
var CurrentTarget = "";
var Cups = ["Latte", "Cuppucino", "Americano"];
var seed = 12;
var _GameID = 1;
var _HighScores = [
    {
        name:"jonl", 
        score:59
    },
    {
        name:"jane",
        score:120
    }
];

class GameServer extends Phaser.Scene {    

    constructor() {
        super('GameServer');
        Instance = this;
        GameResult = "Latte";
    }

    static get GameID() {
        return _GameID;
    }

    static GetWin(ObjectID) {
        console.log( "Player selected : " + ObjectID + " --- Current Game is :" + CurrentTarget);
        return Instance.CalculateWin(ObjectID);
    }

    static GetCoins() {
        return _Coins;
    }

    static NewGame() {        
        return Instance.newGame();
    }

    static EndGame() {
        console.log("ending game");
        _HighScores.push( { name:"player", score:_Coins } );
        return true;
    }

    static GetScores() {
        return _HighScores;
    }    

    create() {
        var ee = Phaser.Events.EventEmitter;
        ee.on("CheckScore", ()=> {
                console.log("clicky");
        });
    }

    newGame() {
        _Coins = 100;
        var n = GameServer.getRndInteger(0,Cups.length-1);
        CurrentTarget = Cups[n];
        console.log("Current Target:" + CurrentTarget);
    }

    /**
     * A number generator that should return a 'perfect' game, 
     * ie always perfectly balanced odds of winning and losing 
     * @param {*} min 
     * @param {*} max 
     */
    static getRndInteger(min, max) {
        //return Math.floor(Math.random() * (max - min + 1) ) + min; //steady loss?
        var x = Math.sin(seed++) * 10000;
        return Math.floor((x - Math.floor(x))* (max - min + 1)) + min; //steady value
      }

      /**
       * Did the player win? Give them a coin
       * Lose? take a coin
       * @param {*} ChosenOne 
       */
    CalculateWin(ChosenOne)  {
        //if ChosenOne === GameOne, then return winner
        if ( ChosenOne === CurrentTarget ) {
            _Coins++;
            return true;
        }
        else 
        {
            _Coins>0 ? _Coins-- : _Coins = 0;
            return false;
        };        
    }
}

gameServer = new GameServer();