class doorPrefab extends Phaser.GameObjects.Sprite {
  constructor(_scene, _positionX, _positionY, _spriteTag = "door") {
    super(_scene, _positionX, _positionY, _spriteTag);

    _scene.add.existing(this);
    _scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.isOpen = false;

    _scene.physics.add.collider(this, _scene.terrain1F);
  }

  openDoor() {
    this.anims.play("openDoor", false);
    this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.isOpen = true;
    });
  }

  nextScene(_this, _door) {
    console.log(_this.scene);
    if (_door.isOpen) {
        _this.scene.inputScene();
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }
}
