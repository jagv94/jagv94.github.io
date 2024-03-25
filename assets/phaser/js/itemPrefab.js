class itemPrefab extends Phaser.GameObjects.Sprite {
    constructor(_scene, _posX, _posY, _spriteTag = 'item', _objectType = '') {
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.objectType = _objectType;
        _scene.physics.add.collider
            (
                this,
                [_scene.terrain2F,
                _scene.terrainBorder1F,
                _scene.terrain1F]
            );

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

        switch (this.objectType) {
            case 'bag':
                var pointsText1 = this.scene.add.bitmapText(
                    _this.body.position.x - 5,
                    _this.body.position.y - 5,
                    "arcadeFont",
                    "200"
                ).setScale(0.25);

                this.scene.tweens.add({
                    targets: pointsText1,
                    y: this.y - 20,
                    alpha: 0,
                    duration: 1500,
                    ease: "Power2",
                });

                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 200;
                break;

            case 'coin':
                var pointsText2 = this.scene.add.bitmapText(
                    _this.body.position.x - 5,
                    _this.body.position.y - 5,
                    "arcadeFont",
                    "100"
                ).setScale(0.25).setTint(0xffffff);


                this.scene.tweens.add({
                    targets: pointsText2,
                    y: this.y - 20,
                    alpha: 0,
                    duration: 1500,
                    ease: "Power2",
                });

                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 100;
                break;

            case 'knife':
                var pointsText1 = this.scene.add.bitmapText(
                    _this.body.position.x - 5,
                    _this.body.position.y - 5,
                    "arcadeFont",
                    "100"
                ).setScale(0.25);

                this.scene.tweens.add({
                    targets: pointsText1,
                    y: this.y - 20,
                    alpha: 0,
                    duration: 1500,
                    ease: "Power2",
                });
               
                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 100;
                _arthur.weapon = 1;
                break;

            case 'fire':
                var pointsText1 = this.scene.add.bitmapText(
                    _this.body.position.x - 5,
                    _this.body.position.y - 5,
                    "arcadeFont",
                    "100"
                ).setScale(0.25);

                this.scene.tweens.add({
                    targets: pointsText1,
                    y: this.y - 20,
                    alpha: 0,
                    duration: 1500,
                    ease: "Power2",
                });
                _this.setActive(false);
                _this.y += 500;
                _arthur.score += 100;
                _arthur.weapon = 2;

                break;

            case 'spear':
                var pointsText1 = this.scene.add.bitmapText(
                    _this.body.position.x - 5,
                    _this.body.position.y - 5,
                    "arcadeFont",
                    "100"
                ).setScale(0.25);

                this.scene.tweens.add({
                    targets: pointsText1,
                    y: this.y - 20,
                    alpha: 0,
                    duration: 1500,
                    ease: "Power2",
                });

                _this.setActive(false);
                _arthur.score += 100;
                _this.y += 500;
                _arthur.weapon = 0;
                break;

            case 'armour':
                _this.setActive(false);
                _this.y += 500;
                if (_arthur.health == 1)
                    _arthur.health += 1;
                break;

            case 'key':
                _this.scene.door.openDoor();
                _this.scene.endSong();
                _this.y += 500;
                _this.setActive(false);
                break;

            default:
                break;
        }
    }

    itemSprite() {
        switch (this.objectType) {
            case 'bag':
                this.anims.stop().setFrame(13).setScale(0.85);;
                break;

            case 'coin':
                this.anims.play('itemCoin', true).setScale(0.85);;
                break;

            case 'knife':
                this.anims.play('itemKnife', true).setScale(0.85);;
                break;

            case 'fire':
                this.anims.play('itemFire', true).setScale(0.85);;
                break;

            case 'spear':
                this.anims.play('itemSpear', true).setScale(0.85);;
                break;

            case 'armour':
                this.anims.stop().setFrame(12).setScale(0.85);;
                break;

            case 'key':
                this.anims.play('itemKey', true).setScale(0.85);;
                break;

            default:
                break;
        }
    }
    preUpdate(time, delta) {

        this.itemSprite();

        super.preUpdate(time, delta);
    }
}