class unicornPrefab extends actorPrefab {
    static isAlive = true;

    constructor(_scene, _positionX, _positionY, _spriteTag = 'unicorn') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.enemyType = 'unicornBoss';
        this.direction = -1;
        this.scene = _scene;
        this.health = 15;
        this.isJumping = false;
        this.anims.stop().setFrame(2);
        this.randnum = 0;
        this.canShoot = true;    
        this.body.setGravityY(-500);

        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
        var randTimer = _scene.time.addEvent
            (
                {
                    delay: 800, //ms
                    callback: this.makeRandom,
                    callbackScope: this,
                    loop: true
                }
            );
        var randTimer2 = _scene.time.addEvent
            (
                {
                    delay: 500, //ms
                    callback: this.makeRandom2,
                    callbackScope: this,
                    loop: true
                }
            );

        this.loadPools();
    }

    hit(_unicorn, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    loadPools() {
        this.bullet = this.scene.physics.add.group();
    }

    makeRandom() {
        this.randnum = Phaser.Math.Between(0, 5);
    }
    makeRandom2() {
        this.randnum2 = Phaser.Math.Between(0, 2);
    }

    throwProjectile() {
        var _bullet = this.bullet.getFirst(false);

        _bullet = new unicornBulletPrefab(this.scene, this.x, this.y);

        this.bullet.add(_bullet);
        _bullet.body.allowGravity = false;
        _bullet.body.setSize(14, 7);

        _bullet.setFlipX(false);

        _bullet.body.setVelocityX(gamePrefs.ENEMY_SPEAR_SPEED * this.direction);

        _bullet.anims.play("unicornBullet", true);
    }

    stopShooting() {
        if(this.body != null)
        {
            this.canShoot = true;
            if(!this.isJumping)
                this.anims.play("unicornWalk", true);
        }
    }

    movementLogic() {
        if(this.body.onFloor())
            this.isJumping = false;

        switch (this.randnum) {
            case 0: case 5: //Walk
                if (!this.isJumping) {
                    this.anims.play("unicornWalk", true);

                    //Movement Logic.
                    if (this.randnum2 == 0) this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED * 0.3);
                    else if (this.randnum2 == 1) this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED * (-0.3));
                    else this.body.setVelocityX(0);

                    break;
                }
                //Si esta Saltando Todavia, no se hace nada
                else { }

            case 1: case 4: //Jump
                if (!this.isJumping) {
                    this.anims.stop().setFrame(7);
                    this.body.setVelocityY(-300);
                    this.isJumping = true;
                }

                //Movement Logic.
                if (this.randnum2 == 0) this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED * 0.3);
                else if (this.randnum2 == 1) this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED * (-0.3));
                else this.body.setVelocityX(0);

                break;

            case 2: //Run
                if (!this.isJumping) {
                    this.anims.play("unicornRun", true);
                    this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED * 1.2);
                    break;
                }
                //Si esta Saltando Todavia, no se hace nada
                else { }

            case 3: //Fire
                if (!this.isJumping) {
                    if (this.canShoot) {
                        this.body.setVelocityX(0);
                        this.anims.stop().setFrame(8);
                        this.canShoot = false;
                        this.throwProjectile()
                        var shootTimer = this.scene.time.addEvent
                            (
                                {
                                    delay: 500, //ms
                                    callback: this.stopShooting,
                                    callbackScope: this,
                                    loop: false
                                }
                            );
                    }
                }
                //Si esta Saltando Todavia, no se hace nada
                else { }

                break;
            

            default:
                this.anims.stop().setFrame(2);
                break;

        }
    }
    preUpdate(time, delta) {
        this.movementLogic();
        if (this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);

        super.preUpdate(time, delta);
    }

    destroy() {
        // Ejecuta algo aquí antes de que el enemigo sea destruido
        if(this.scene != null && this.scene.bossDefeatable) {
            unicornPrefab.isAlive = false;
            //Aquí podríamos hacer aparecer la llave
            this.scene.endSong();
        }
      
        // Llama al método destroy de la superclase para destruir el enemigo
        super.destroy();
    };
}