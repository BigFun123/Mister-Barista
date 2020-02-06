var _gameName = "Mister Barista";
var _version = "v0.01";
var _winner = "Winner!";
var _notThisOne = "Not this one... Try Again";
var _UseMockServer = true; 
var _LoggingEnabled = true; 

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
}