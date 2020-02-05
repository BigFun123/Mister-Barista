/*******************************
 *        Toggle Button        *
 *******************************/
export default class ToggleButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, id, callback) {
        super(scene, x, y, id);
        this.setInteractive()
        .on('pointerover', () => this.hover())
        .on('pointerout', () =>this.pointerOut())
        .on('pointerdown', ()=> { callback(scene)});

    }

    hover(){
        this.setTint(0xdddddd);    
    }

    pointerOut(){
        this.setTint(0xffffff);    
    }

}
