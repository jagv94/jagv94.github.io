class firePrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _tag = 'fire') {
        super(_scene, _posX, _posY, _tag);
        _scene.add.existing(this);

        _scene.physics.add.collider
            (
                this,
                _scene.tombs,
                this.hasHitTomb
            );

        _scene.physics.add.collider
        (
            this,
            [_scene.terrain2F,
            _scene.terrainBorder1F,
            _scene.terrain1F],
            this.hasHitNull
        );

        _scene.physics.add.collider
        (
            this,
            _scene.enemiesSpawned,
            _scene.arthur.hasHitEnemy
        );
        _scene.physics.add.overlap
        (
            this,
            _scene.boss,
            this.hasHitUnicorn
        );

        this.aliveTime = 0;
        this.anims.play("throwFire");
    }

    hasHitTomb(_this, _tomb) {
        _this.setActive(false);
        _this.y += 500;
        _this.scene.sound.play('projectileBlock');
        _this.scene.spawnSparks(_this.body.position.x, _this.body.position.y);
    }

    hasHitNull(_this, _null) {
        _this.setActive(false);
        _this.y += 500;
    }

    hasHitUnicorn(_this, _boss) {
        _this.setActive(false);
        _this.y += 500;
        _boss.health -= 1;
        if (_boss.health == 0) {
            var enemyDeath = new enemyDeathPrefab(_this.scene, _boss.body.position.x, _boss.body.position.y);
            var bossKey = new itemPrefab(_this.scene, 3445, 0, 'item', 'key');
            var enemyDeath = new enemyDeathPrefab(_this.scene, _boss.body.position.x, _boss.body.position.y, 'enemy_death');
            _this.scene.arthur.score += 1000;
            _boss.destroy();
            _this.scene.sound.play('enemyDeath');
        }
        else {
            _this.scene.sound.play('projectileBlock');
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