class actorPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'actor') {
        super(_scene, _positionX, _positionY, _spriteTag);

        this.spriteTag = _spriteTag;

        _scene.physics.add.collider
            (
                this,
                [_scene.terrain2F,
                _scene.terrainBorder1F,
                _scene.terrain1F]
            );
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}