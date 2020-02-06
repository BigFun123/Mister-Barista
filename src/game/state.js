 export default class GameState {
    static get AudioEnabled() {
        return GameState._AudioEnabled;
    }
    static set AudioEnabled(enabled){
        GameState._AudioEnabled = enabled;
    }
 }

 GameState._AudioEnabled = true;
 