export default class Cup extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "cup");
    }
}

//factory for creating cups
class CupPlugin extends Phaser.Plugins.BasePlugin {

    constructor (pluginManager)
    {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('cup', this.createCup);
    }

    createCup (x, y)
    {
        return this.displayList.add(new Cup(this.scene, x, y));
    }

}


//export default Cup;