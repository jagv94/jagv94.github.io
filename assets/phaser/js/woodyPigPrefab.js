class woodyPigPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'woodyPig') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.enemyType = 'woodyPig';
        this.minimumHeight = _positionY + 80;
        this.direction = -1
        this.scene = _scene;
        this.playerDistanceHorizontal = 0;
        this.playerDistanceVertMod = 0;
        this.canGoUp = false;
        this.anims.play('woodyPigMove', true);
        this.isAttacking = false;
        this.body.setAllowGravity(false);
        this.body.setSize(30, 15, true);
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );

        this.loadPools();
    }

    hit(_woodyPig, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    loadPools() {
        this.bullet = this.scene.physics.add.group();
    }

    turnLogic() {
        this.randTurn = Phaser.Math.Between(0, 30);

        //Si va hacia la izquierda 
        if (this.playerDistanceHorizontal <= 0 && this.direction == -1) {
            if (this.randTurn == 0) {
                if (this.body.position.y < this.minimumHeight) {
                    //Si ha llegado al final puede ir hacia abajo o arriba
                    if (this.canGoUp) {
                        this.randGoUp = Phaser.Math.Between(0, 1);
                        if (this.randGoUp == 0) {
                            this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                        }
                        else
                            (
                                this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                            )
                    }
                    //Si todavia no ha llegado al final solo puede bajar
                    else {
                        this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                    }
                }
                //Si ha llegado al final de todo sube 
                else {
                    this.canGoUp = true;
                    this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                }
                var numberTimer = this.scene.time.addEvent
                    (
                        {
                            delay: 100, //ms
                            callback: this.stopVelocity,
                            callbackScope: this,
                            loop: false
                        }
                    );

                this.anims.play("woodyPigTurn", true)
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.anims.play("woodyPigMove", true);
                });
                this.direction *= -1;
            }
        }
        //SI va hacia la derecha
        else if (this.playerDistanceHorizontal >= 0 && this.direction == 1) {
            if (this.randTurn == 0) {
                if (this.body.position.y < this.minimumHeight) {
                    //Si ha llegado al final puede ir hacia abajo o arriba
                    if (this.canGoUp) {
                        this.randGoUp = Phaser.Math.Between(0, 1);
                        if (this.randGoUp == 0) {
                            this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                        }
                        else
                            (
                                this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                            )
                    }
                    //Si todavia no ha llegado al final solo puede bajar
                    else {
                        this.body.setVelocityY(+gamePrefs.ENEMY_SPEED)
                    }
                }
                //Si ha llegado al final de todo sube 
                else {
                    this.canGoUp = true;
                    this.body.setVelocityY(-gamePrefs.ENEMY_SPEED)
                }
                var numberTimer = this.scene.time.addEvent
                    (
                        {
                            delay: 100, //ms
                            callback: this.stopVelocity,
                            callbackScope: this,
                            loop: false
                        }
                    );

                this.anims.play("woodyPigTurn", true)
                this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.anims.play("woodyPigMove", true);
                });
                this.direction *= -1;
            }
        }
    }

    attackLogic() {
        this.randAttack = Phaser.Math.Between(0, 2);
        if (this.randAttack == 1) {
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);

            this.isAttacking = true;
            var throwTimer = this.scene.time.addEvent
                (
                    {
                        delay: 500, //ms
                        callback: this.throwProjectile,
                        callbackScope: this,
                        loop: false
                    }
                );

            var movingTimer = this.scene.time.addEvent
                (
                    {
                        delay: 1000, //ms
                        callback: this.startMoving,
                        callbackScope: this,
                        loop: false
                    }
                );
        }
    }


    stopVelocity() {
        if (this.body != null)
            this.body.setVelocityY(0);
    }

    startMoving() {
        this.isAttacking = false;
        if (this.body != null)
            this.anims.play("woodyPigMove", true);
    }

    throwProjectile() {
        if (this.body != null) {
            this.anims.stop().setFrame(5);

            var _bullet = this.bullet.getFirst(false);

            _bullet = new woodyPigBulletPrefab(this.scene, this.x, this.y);

            this.bullet.add(_bullet);
            _bullet.body.allowGravity = false;

            var angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.arthur.x, this.scene.arthur.y)
            if (this.playerDistanceVertMod < 5) {
                _bullet.anims.stop().setFrame(0);
                _bullet.body.setSize(23, 4);

                if (this.direction == 1)
                    _bullet.setFlipX(true);
                else
                    _bullet.setFlipX(false);

                _bullet.body.setVelocityX(gamePrefs.ENEMY_SPEAR_SPEED * this.direction);
            }
            
            
            else if (this.playerDistanceHorizMod < 1) {
                _bullet.anims.stop().setFrame(1);
                _bullet.body.setSize(4, 23);
                _bullet.body.setVelocityY(gamePrefs.ENEMY_SPEAR_SPEED);
            }
            
            this.anims.stop().setFrame(0);
        }
    }

    preUpdate(time, delta) {
        if (!this.isAttacking) {
            this.playerDistanceHorizontal = this.body.position.x - this.scene.arthur.x;
            this.playerDistanceHorizMod = Phaser.Math.Distance.Between(this.body.position.x, 0, this.scene.arthur.x, 0);
            this.playerDistanceVertMod = Phaser.Math.Distance.Between(0, this.body.position.y, 0, this.scene.arthur.y);

            this.body.setVelocityX(gamePrefs.ENEMY_SPEED * 1.25 * this.direction);
            this.turnLogic();

            if (this.playerDistanceHorizMod < 0.5 || this.playerDistanceVertMod < 3) {
                this.attackLogic();
            }
        }

        if (this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);


        super.preUpdate(time, delta);
    }
}