class tombPrefab extends Phaser.GameObjects.Sprite
{
    constructor(_scene,_positionX,_positionY,_spriteTag='tomb01')
    {
        super(_scene,_positionX,_positionY,_spriteTag);
            _scene.add.existing(this);
            _scene.physics.world.enable(this);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
            this.body.setSize(16, 17, true);

        _scene.physics.add.collider
        (
            this,
            [_scene.terrain2F,
            _scene.terrainBorder1F,
            _scene.terrain1F,
            _scene.arthur]
        );
    }

    preUpdate(time,delta)
    {
        this.body.setOffset(10, 14);
        super.preUpdate(time,delta);
    }
}