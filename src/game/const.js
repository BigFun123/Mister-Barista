var _gameName = "Mister Barista";
var _version = "v0.01";
var _winner = "Winner!";
var _notThisOne = "Not this one... Try Again";
var _coins = "Coins";
var _UseMockServer = true; 
var _LoggingEnabled = true; 
var _CoinOffset = -135;

export default class Constants {
  static get useMockServer(){
    return _UseMockServer;
  }
  static get loggingEnabled(){
    return _LoggingEnabled;
  }
  static gameName() {
    return _gameName;
  }
  static winner() {
    return _winner;
  }
  static notThisOne() {
    return _notThisOne;
  }
  static version() {
    return _version;
  }
  static coins() {
    return _coins;
  }
  static get coinOffset() {
    return _CoinOffset;
  }
}