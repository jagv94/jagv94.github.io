class breakArmourPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'break_armour') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);
        this.anims.play('breakArmour');
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        }, _scene);
    }

}