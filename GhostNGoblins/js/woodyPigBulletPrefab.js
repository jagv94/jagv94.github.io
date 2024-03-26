class woodyPigBulletPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'woodyPigBullet') {
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
        this.aliveTime = this.scene.time.addEvent(
            {
                delay: 1000,
                callback: this.destroy,
                callbackScope: this,
                repeat: 0
            }
        );
        super.preUpdate(time, delta);
    }
}