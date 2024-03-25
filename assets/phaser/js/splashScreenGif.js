class splashGifObject extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'splashGif') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);

        this.anims.play('runSplash', true);
    }
    
    create()
    {

    }
}
