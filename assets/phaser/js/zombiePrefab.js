class zombiePrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'zombie') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.enemyType = 'zombie';
        this.startingPos = _positionX;
        this.dist = 0;
        this.maxDistance = 200;
        this.anims.play('zombieSpawn', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isSpawning = false;
        });
        this.direction = -1;
        this.isSpawning = true;
        this.spawningSound = true;
        this.scene = _scene;
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );

        this.body.setSize(15, 30, true);
    }

    hit(_zombie, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    computeDirection() {
        var distance = this.scene.arthur.x - this.body.position.x;
        if (distance <= 0 )
            this.direction = -1;
        else
            this.direction = 1;
    }

    preUpdate(time, delta) {
    
        if (this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);

        this.dist = Phaser.Math.Distance.Between(this.body.position.x, 0, this.startingPos, 0)
        if (this.dist > this.maxDistance) {
            this.body.setVelocityX(0);
            this.anims.playReverse("zombieSpawn", true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.anims.stop().setFrame(0);
                this.resetPosition();
            });
        }
        else {
            if (!this.isSpawning) {
                this.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.direction);
                this.anims.play('zombieRun', true);
                this.spawningSound = true;
            }
            else {
                if (this.spawningSound) {
                    this.scene.sound.play('zombieSpawn');
                    this.spawningSound = false;
                }
            }
        }

        super.preUpdate(time, delta);
    }

    resetPosition() {
        this.computeDirection();
        this.x = this.startingPos;
        this.anims.nextAnim = 'zombieSpawn';
        this.isSpawning = true;
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isSpawning = false;
            this.body.setSize(15, 30, true);
        });
    }

}