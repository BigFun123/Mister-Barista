//done this way in anticipation of language packs

var _gameName = "Mister Barista";
var _version = "v0.01";
var _winner = "Winner!";
var _notThisOne = "Not this one... Try Again";

export default class Constants {
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