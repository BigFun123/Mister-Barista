import GameState from '../state.js';
import ToggleButton from '../togglebutton.js';
import Constants from '../const.js';

/*******************************
 *     Menu and Settings       *
 *******************************/
class ScoreScene extends Phaser.Scene {    
        
    constructor ()
    {
        super('ScoreScene');
        //this.musicEnabled = true;  
    }

    preload ()
    {
        this.load.setBaseURL('../../../assets/');
        this.load.image("sky2", "sky.jpg");
        this.load.image("back", "back.jpg");
    }

    create ()
    {
        this.add.image(400, 300, 'sky2');
        this.menuButton = new ToggleButton(this, 700, 15, 'back', this.startGame); 
        this.add.existing(this.menuButton);
        this.text = this.add.text(10, 10, Constants.gameName() + " " + Constants.version());
        this.showScores();
    }

    startGame(context) {
        context.scene.start("MenuScene", "from_scores");
    }

    showScores() {
        var scores = GameServer.GetScores();

        Object.entries(scores).map(([index, entry]) => {
            console.log(index)
            console.log(entry)
            this.text = this.add.text(110, 50 + index* 20, entry.name + " " + entry.score);
        });

        this.text = this.add.text(10, 10, Constants.gameName() + " " + Constants.version());
    }
}

export default ScoreScene;