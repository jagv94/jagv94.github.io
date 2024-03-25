class greenMonsterPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'greenMonster') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.enemyType = 'greenMonster';
        this.direction = -1;
        this.scene = _scene;
        this.anims.stop().setFrame(0);
        this.randNum = 0;
        this.number = 0;
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
        var numberTimer = _scene.time.addEvent
        (
            {
                delay:2000, //ms
                callback:this.makeRandom,
                callbackScope: this,
                loop: true
            } 
        );
        
        this.anims.play('greenMonsterIddle', true);

        this.loadPools();

        this.body.setSize(15, 25, true);
    }



    hit(_greenMonster, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }

    loadPools() {
        this.bullet = this.scene.physics.add.group();
    }

    preUpdate(time,delta)
    {
        if(this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);

        if(Phaser.Math.Distance.BetweenPoints(this,this.scene.arthur) < 100)
        {
            this.anims.play('greenMonsterAttack', true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, ()=> {
                this.anims.stop();
                this.attack();
            }); 
        }        
    
    super.preUpdate(time,delta);
    }

    //THIS FUNCTION GETS CALLED BY THE TIMER EVERY 0.8SEC USED BY THE GREEN MOSTER TO DECIDE IF HE SHOOTS OR NOT. 
    //TRIED TO REPLICATE THE SAME BEHAVIOUR AS HE HAS IN THE OG GAME.
    makeRandom(min, max) {
        this.randNum = Phaser.Math.Between(0, 3);
    }
    attack() {   
        //Throw projectile
        var _bullet = this.bullet.getFirst(false);

        _bullet = new greenMonsterBulletPrefab(this.scene, this.x, this.y);
        this.bullet.add(_bullet);

        _bullet.body.setSize(8, 8);
        _bullet.setScale(0.5);
        _bullet.body.allowGravity = false;

        _bullet.play("greenMonsterBullet")

        var angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.arthur.x, this.scene.arthur.y)

        var speed_x = 120 * Math.cos(angle);
        var speed_y = 120 * Math.sin(angle);

        _bullet.body.setVelocityX(speed_x);
        _bullet.body.setVelocityY(speed_y);

        //reset animation to iddle
        this.anims.stop().setFrame(0);
    }
}