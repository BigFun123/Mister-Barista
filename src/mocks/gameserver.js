/********************************
 * Mock Game Server for Testing *
 ********************************/

let GameResult = 0;
let Instance = null;
let Coins = 100;
var CurrentTarget = "";
var Cups = ["Latte", "Cuppucino", "Americano"];

class GameServer extends Phaser.Scene {    

    static get GAMEID() {
        return 1235465;
    }

    static GetWin(ObjectID) {        
        console.log( "Player selected : " + ObjectID + " --- Current Game is :" + CurrentTarget);
        return Instance.CalculateWin(ObjectID);
    }

    static GetCoins() {
        return Coins;
    }

    static NewGame() {
        return Instance.newGame();
    }

    constructor() {
        super('GameServer');

        Instance = this;
        GameResult = "Latte";        
        
    }

    create() {
        var ee = Phaser.Events.EventEmitter;
        ee.on("CheckScore", ()=> {
                console.log("clicky");
        });
    }

    newGame() {
        var n = GameServer.getRndInteger(0,Cups.length-1);
        CurrentTarget = Cups[n];
        console.log("Current Target:" + CurrentTarget);
    }

    static getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
      }

    CalculateWin(ChosenOne)  {
        //if ChosenOne === GameOne, then return winner
        if ( ChosenOne === CurrentTarget ) {
            Coins++;
            return true;
        }
        else 
        {
            Coins>0 ? Coins-- : Coins = 0;
            return false;
        };        
    }
}

gameServer = new GameServer();