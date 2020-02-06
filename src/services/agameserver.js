/**
 * Abstract Game Server Base Class
 */
export default class AGameServer extends Phaser.Scene {
    //callback handler for server events completion, typeof AGame
    static RegisterHandler(handler){this._handler = handler} 

    static GetCoins() {return 0}

    createGame() {this._handler.onGameCreated()}

    newGame(reinit) {this._handler.onNewGameReady(reinit)}

    CalculateWin(cup,result)  {this._handler.onGetWinResponse(cup,result)}
    
    static GetWin() {}
}