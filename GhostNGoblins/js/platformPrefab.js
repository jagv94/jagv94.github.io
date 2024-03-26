class platformPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'platform') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.allowGravity = false;
        this.body.immovable = true;

        this.direccion = 1;

        _scene.physics.add.collider
            (
                this,
                _scene.terrain1F
            );

        _scene.physics.add.collider
            (
                this,
                _scene.terrainBorder1F
            );

        this.body.setVelocityX((gamePrefs.PLATFORM_SPEED)*this.direccion);
    }

    preUpdate(time, delta) {
        this.platformMovement();
        
        super.preUpdate(time, delta);
    }

    platformMovement(){
        if(this.body.blocked.right || this.body.blocked.left)
            {
                this.direccion *=-1;
                this.body.setVelocityX((gamePrefs.PLATFORM_SPEED)*this.direccion);
            }
    }
}