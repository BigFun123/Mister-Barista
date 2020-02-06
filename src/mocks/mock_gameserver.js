import AGameServer from "../services/agameserver.js";

/********************************
  Mock Game Server for Testing 
  v 0.01 Mister Barista
 ********************************/

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

class MockGameServer extends AGameServer {    

    constructor() {
        super('GameServer');
        Instance = this;        
    }
    static RegisterHandler(handler){Instance._handler = handler}

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

    static CreateGame() {                
        return Instance.createGame();
    }

    /**
     * Create a new game
     * @param {*} reinit : reinitialize assets, false = pooling
     */
    static NewGame(reinit) {        
        return Instance.newGame(reinit);
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
    }

    createGame() {
        console.log( "MockGameServer:createGame");
        _Coins = 100;        
        super.createGame();
    }

    newGame(reinit) {
        console.log( "MockGameServer:newGame");
        var n = MockGameServer.getRndInteger(0,Cups.length-1);
        CurrentTarget = Cups[n];
        console.log("Current Target:" + CurrentTarget);
        super.newGame(reinit);
    }

    /**
     * A number generator that should return a 'perfect' game, 
     * ie balanced odds of winning and losing 
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

export default MockGameServer;