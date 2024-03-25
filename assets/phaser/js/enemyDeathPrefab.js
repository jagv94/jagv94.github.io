class enemyDeathPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'enemy_death') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);

        if(_tag == 'enemy_death')
            this.anims.play('enemyDeath', true);
        else if(_tag  == 'enemy_death_zombiecrow')
            this.anims.play('enemyDeath_zombiecrow', true)
        
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        }, _scene);
    }

}