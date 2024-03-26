class playerPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'arthur') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.cursorKeys = _scene.input.keyboard.createCursorKeys();
        this.health = 2;
        this.tookDamage = false;
        this.isInvincible = false;
        this.isAttacking = false;
        this.timeToAttack
        this.direction = 1;
        this.bulletHeight = 28;
        this.spears;
        this.knives;
        this.fires;
        this.hasArmour = true;
        this.timeSinceLastShot;
        this.weapon = 0;
        this.score = 0;
        this.throwAnimation = "throw";
        this.throwAnimationCrouch = "throwCrouch";
        this.runAnimation = "run";
        this.selectAnimation = [5, 6];
        this.canClimbLadders = false;
        this.canDownLadders = false;
        this.hasAlreadyEntered = false;
        this.weaponSpawnNumber = 0;
        this.randomWeapon = 0;
        this.hasWon = false;


        this.body.setSize(12, 28, true);

        _scene.physics.add.collider
            (
                this,
                _scene.tombs1F
            );

        _scene.physics.add.collider
            (
                this,
                _scene.tombs2F
            );

        _scene.physics.add.overlap
            (
                this,
                _scene.ladders,
                this.useLadder,
                null,
                this
            );

        _scene.physics.add.overlap
            (
                this,
                _scene.water
            );


        _scene.physics.add.overlap
            (
                this,
                _scene.door,
                _scene.door.nextScene
            );

        _scene.physics.add.collider
            (
                this,
                _scene.platform
            );

        this.loadPools();
        this.attack = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.jump = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.invencibile = _scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
    }

    loadPools() {
        //Weapon bullets Pool
        this.spears = this.scene.physics.add.group();
        this.knives = this.scene.physics.add.group();
        this.fires = this.scene.physics.add.group();
    }

    checkArmour() {
        if (this.health == 2)
            this.hasArmour = true;
        else
            this.hasArmour = false;
    }

    hasHitEnemy(_this, _enemy) {
        var deathSound;
        _this.setActive(false);
        _this.y += 500;
        deathSound = _enemy.enemyType == 'crow' ? 'crowDeath' : 'enemyDeath';

        if (_enemy.enemyType == 'zombie' || _enemy.enemyType == 'crow') {
            var enemyDeath = new enemyDeathPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y + 10, 'enemy_death_zombiecrow');
            _this.scene.arthur.score += 100;
        }
        else {
            var enemyDeath = new enemyDeathPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'enemy_death');
            _this.scene.arthur.score += 150;
        }

        _this.scene.sound.play(deathSound);
        const enemyIndex = _this.scene.enemiesSpawned.indexOf(_enemy);
        _this.scene.enemiesSpawned.splice(enemyIndex, 1);
        _this.scene.enemiesWaiting[_enemy.spriteTag] = false;

        this.weaponSpawnNumber = Phaser.Math.Between(0,2);
        //RANDOM CHANCE TO SPAWN A NEW WEAPONS
        if (this.weaponSpawnNumber == 0) {
            var new_weapon;
            this.randomWeapon = Phaser.Math.Between(0, 1);
            if (_this.scene.arthur.weapon == 0) {         // Spear
                if (this.randomWeapon == 0)
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'knife')
                else
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'fire')
            }
            else if (_this.scene.arthur.weapon == 1) {    //knife
                if (this.randomWeapon == 0)
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'spear')
                else
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'fire')
            }
            else if (_this.scene.arthur.weapon == 2) {                           //fire
                if (this.randomWeapon == 0)
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'spear')
                else
                    new_weapon = new itemPrefab(_this.scene, _enemy.body.position.x, _enemy.body.position.y, 'item', 'knife')
            }
        }
        _enemy.destroy();
    }


    resetAttackAnim() {
        // Si se está pulsando la tecla de ataque y no se está disparando actualmente, ni subiendo o bajando escaleras
        if (this.attack.isDown && !this.isAttacking && this.body.allowGravity) {
            // Comprobamos si se puede disparar con el tipo de arma seleccionada
            if (this.canShoot(this.weapon)) {
                this.timeSinceLastShot = this.scene.time.addEvent(
                    {
                        delay: 50,
                        callback: this.shoot(this.weapon),
                        callbackScope: this,
                        repeat: 0
                    }
                );
                this.isAttacking = true;
            }
        } else if (!this.attack.isDown && this.isAttacking) {
            this.isAttacking = false;
        }
    }

    // Función para comprobar si se puede disparar con el tipo de arma especificado
    canShoot(weapon) {
        if (weapon === 0) {
            return this.spears.countActive() < gamePrefs.MAX_BULLET_AMOUNT;
        } else if (weapon === 1) {
            return this.knives.countActive() < gamePrefs.MAX_BULLET_AMOUNT;
        } else if (weapon === 2) {
            return this.fires.countActive() < gamePrefs.MAX_FIRE_AMOUNT;
        }
    }

    shoot(weapon) {
        if (weapon === 0) {
            this.shootSpear();
        } else if (weapon === 1) {
            this.shootKnife();
        } else if (weapon === 2) {
            this.shootFire();
        }
    }

    shootSpear() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.spears.getFirst(false);

        _bullet = new spearPrefab(this.scene, this.x + auxX, this.y + auxY);
        this.spears.add(_bullet);

        _bullet.body.allowGravity = false;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    shootFire() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.fires.getFirst(false);

        _bullet = new firePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.fires.add(_bullet);

        _bullet.body.allowGravity = true;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_);
            _bullet.body.setVelocityY(-gamePrefs.SPEAR_SPEED_);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    shootKnife() {
        //Spawn the bullet in the correct spot
        var auxX = -15;
        var auxY = -8;

        if (this.direction == 1)
            auxX = 15;

        if (this.cursorKeys.down.isDown)
            auxY = 6;


        var _bullet = this.knives.getFirst(false);

        _bullet = new knifePrefab(this.scene, this.x + auxX, this.y + auxY);
        this.knives.add(_bullet);

        _bullet.body.allowGravity = false;
        _bullet.body.setSize(1, 1);
        _bullet.startingPosX = this.x + auxX;

        if (this.direction == 1) {
            _bullet.setFlipX(false);
            _bullet.body.setVelocityX(gamePrefs.SPEAR_SPEED_ * 1.5);
        }
        else if (this.direction == -1) {
            _bullet.setFlipX(true);
            _bullet.body.setVelocityX(-gamePrefs.SPEAR_SPEED_ * 1.5);
        }
        //Sonido de lanzar ataque
        this.scene.sound.play('arthurThrow');
    }

    deathByFall() {
        if (this.y > 210 && !this.hasAlreadyEntered) {
            this.health = 2;
            this.tookDamage = false;
            this.isInvincible = false;
            this.isAlive = false;
            this.scene.inputScene();

            //Save Score
            if (this.score > gamePrefs.score) {
                gamePrefs.score = this.score;
            }

            //Musica de muerte de Arthur
            if (!this.isAlive) {
                this.scene.sound.play('arthurDeath');
                this.isAlive = true;
            }
            this.hasAlreadyEntered = true;
        }
    }

    changeMountainCollisions() {
        if (!this.scene.allMountainCollisionsAreModified && this.x > 520) {
            var tiles = this.scene.terrain2F.culledTiles

            if (tiles != null) {
                for (var i = 0; i < tiles.length; i++) {
                    if (tiles[i] != null && tiles[i].y == 3 &&
                        (tiles[i].index == 11 || tiles[i].index == 12)) {
                        tiles[i].setCollision(false, false, true, false);
                    }
                }
            }
            if (this.x >= 1140) {
                this.scene.allMountainCollisionsAreModified = true;
            }
        }
    }

    resizeCollision() {
        if (!this.cursorKeys.down.isDown) {
            this.setSize(32 + 2, 32 + 2, true)
            this.body.setSize(12, 28, true);
        }
        else {
            this.setSize(32 + 2, 32 + 10, true)
            this.body.setSize(12, 20, true);
        }
    }

    checkBorders() {
        if (this.body.position.x <= 4)
            this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);

        if (this.body.position.x >= 3540)
            this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
    }

    setAnimations() {
        this.throwAnimation = this.hasArmour ? "throw" : "throwNaked";
        this.throwAnimationCrouch = this.hasArmour ? "throwCrouch" : "throwCrouchNaked";
        this.runAnimation = this.hasArmour ? "run" : "runNaked";
        this.laddersAnimation = this.hasArmour ? "laddersAnimation" : "laddersAnimationNaked";
        this.selectAnimation = this.hasArmour ? [4, 5, 6, 7] : [18, 21, 22, 23];
    }

    throwAttack() {
        const animation = this.cursorKeys.down.isDown ? this.throwAnimationCrouch : this.throwAnimation;
        this.anims.play(animation, true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.anims.stop().setFrame(this.selectAnimation[3]);
        });
    }

    useLadder(_player, _ladders) {
        const tile1 = this.scene.ladders.getTileAtWorldXY(this.x, this.y);
        const tile2 = this.scene.ladders.getTileAtWorldXY(this.x, this.y + 32);

        this.canClimbLadders = (tile1 != null && tile1.index != null && tile1.index != 0);
        this.canDownLadders = (tile2 != null && tile2.index != null && tile2.index != 0);

        if (_player.y >= 177) {
            this.canDownLadders = false;
        }

        if (_player.y <= 97) {
            this.canClimbLadders = false;
        }

        if (!this.canClimbLadders && !this.canDownLadders) {
            this.body.allowGravity = true;
        }
    }

    playerMovement() {

        if (this.isAttacking) {
            this.throwAttack();
        }

        else if(!this.hasWon){
            if (this.cursorKeys.down.isDown) {
                if (this.canDownLadders) {
                    // Si el personaje está en una escalera y se está moviendo hacia abajo,
                    // desactivamos la colisión con el suelo para poder bajar
                    this.body.allowGravity = false;
                    this.body.setVelocityY(gamePrefs.ARTHUR_SPEED);
                    this.body.checkCollision.down = false;

                    this.scene.time.addEvent({
                        delay: 200, callback: () => {
                            this.body.checkCollision.down = true;
                            this.body.allowGravity = true;
                        }
                    });
                    this.anims.play(this.laddersAnimation, true);
                }

                this.body.setVelocityX(0);
                this.anims.stop().setFrame(this.selectAnimation[3]);
            }

            else if (this.body.onFloor()) {
                //Left
                if (this.cursorKeys.left.isDown) {
                    this.body.setVelocityX(-gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(true);
                    this.anims.play(this.runAnimation, true);
                    this.direction = -1;
                    this.changeMountainCollisions();
                }
                //Right
                else if (this.cursorKeys.right.isDown) {
                    this.body.setVelocityX(gamePrefs.ARTHUR_SPEED);
                    this.setFlipX(false);
                    this.anims.play(this.runAnimation, true);
                    this.direction = 1;
                    this.changeMountainCollisions();
                }

                else if (this.canClimbLadders && this.cursorKeys.up.isDown) {
                    // Si el personaje está en una escalera y se está moviendo hacia arriba,
                    // ajustamos su velocidad vertical para que suba por la escalera
                    this.body.setVelocityY(-gamePrefs.ARTHUR_SPEED);
                    this.body.allowGravity = false;
                    this.anims.play(this.laddersAnimation, true);
                }

                else {
                    this.body.setVelocityX(0);
                    this.anims.play(this.runAnimation, true);
                    this.anims.stop().setFrame(this.selectAnimation[0]);
                }

                //Jump
                if (this.jump.isDown &&
                    this.body.blocked.down &&
                    Phaser.Input.Keyboard.DownDuration(this.jump, 250)) {
                    this.body.setVelocityY(-gamePrefs.ARTHUR_JUMP);
                    this.scene.sound.play('arthurJump');
                }
            }

            if (!this.body.onFloor() && !this.isAttacking) {
                if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                    this.anims.stop().setFrame(this.selectAnimation[1]);
                }

                if (!this.body.onFloor() && !this.isAttacking) {
                    if (this.cursorKeys.right.isDown || this.cursorKeys.left.isDown) {
                        this.anims.stop().setFrame(this.selectAnimation[1]);
                    }
                    else {
                        this.anims.stop().setFrame(this.selectAnimation[2]);
                    }
                }
            }
        }
    }

    healthManager() {
        if (this.health == 1) {
            if (this.direction == 1)
                this.body.velocity.x = gamePrefs.ARTHUR_SPEED;
            else
                this.body.velocity.x = gamePrefs.ARTHUR_SPEED;

            this.body.velocity.y = -300;
            this.alpha = 0.75;
            this.anims.stop().setFrame(32);
            var b_armour = new breakArmourPrefab(this.scene, this.body.position.x, this.body.position.y);
            var invincibleTimer = this.scene.time.addEvent({
                delay: 1500, //ms
                callback: this.endInvincibility,
                callbackScope: this,
                loop: false
            });
            if (this.direction == 1) {
                b_armour.setFlipX(false);
            }
            else if (this.direction == -1) {
                b_armour.setFlipX(true);
            }
            this.tookDamage = false;
            this.scene.sound.play('arthurHit');
        }
        else if (this.health <= 0) {
            this.death()
        }
    }

    death() {
        //DIE ANIMATION.
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.anims.play('die', true);
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.body.reset(65, 100);
            this.scene.cameras.main.shake(500, 0.05);
            this.scene.cameras.main.flash(500, 255, 0, 0);
            this.health = 2;
            this.tookDamage = false;
            this.isInvincible = false;
            this.isAlive = false;
            this.scene.inputScene();
        });

        //Save Score
        if (this.score > gamePrefs.score) {
            gamePrefs.score = this.score;
        }

        //Musica de muerte de Arthur
        if (!this.isAlive) {
            this.scene.sound.play('arthurDeath');
            this.isAlive = true;
        }
    }

    preUpdate(time, delta) {
        this.deathByFall();
        this.resizeCollision();
        this.checkArmour();
        this.resetAttackAnim();
        this.setAnimations();
        if (this.tookDamage) {
            this.healthManager();
        }
        else {
            this.playerMovement();
        }

        this.checkBorders();
        this.setInvencible();
        super.preUpdate(time, delta);
    }

    endInvincibility() {
        this.isInvincible = false;
        this.alpha = 1;
    }

    setInvencible() {
        if (this.invencibile.isDown)
            this.isInvincible = true;
    }
}