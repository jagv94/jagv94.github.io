class unicornBulletPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'unicornBullet') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);


        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
    }

    hit(_this, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}