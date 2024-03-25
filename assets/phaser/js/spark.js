class sparkPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'spark') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
       
        this.anims.play("spark").setScale(0.3).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.destroy();
        });
    }
}

class livesPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'lives') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
       
        this.setScrollFactor(0).setScale(0.65);
        this.anims.play("lives");
    }

    preUpdate()
    {
        if(this.scene.arthur.health == 2)
        {
            this.alpha = 1;
            this.anims.stop().setFrame(1)
        }
        else if (this.scene.arthur.health == 1)
        {
            this.alpha = 1;
            this.anims.stop().setFrame(0)
        }
        else
        {
            this.alpha = 0;
        }

    }
}