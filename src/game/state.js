  const STATE_MENU = "MENU";
 const STATE_GAME = "GAME";
 const STATE_SCORE = "SCORE";

 //var GameState = STATE_MENU;

var _AudioEnabled = true;

 export default class GameState {
    static get AudioEnabled() {
        return _AudioEnabled;
    }
    static set AudioEnabled(enabled){
        _AudioEnabled = enabled;
    }
 }

 