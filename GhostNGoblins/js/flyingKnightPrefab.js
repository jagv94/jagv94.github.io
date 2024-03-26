class flyingKnightPrefab extends actorPrefab {
    constructor(_scene, _positionX, _positionY, _spriteTag = 'flyingKnight') {
        super(_scene, _positionX, _positionY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.enemyType = 'flyingKnight';
        this.direction = -1;
        this.scene = _scene;
        this.sinus = -1;
        this.ascendent = true;
        this.gethit = false;
        this.anims.play('flyingKnightIddle', true);
        this.body.setAllowGravity(false);
        _scene.physics.add.overlap
            (
                this,
                _scene.arthur,
                this.hit,
                null,
                this
            );
        this.body.setSize(15, 28, true);

        _scene.flyingKnightAudio = _scene.sound.add('flyingKnightAudio');

        setInterval(() =>
        {
            if(this.body != null)
            {

                // Comprueba si el enemigo está en pantalla.
                // Si no funciona bien, habrá que sacar esto a Scene1, iterar el array de enemigos y ejecutar esto si aún existe.
                if (this.x > 0 && this.x < this.scene.renderer.width && this.y > 0 && this.y < this.scene.renderer.height) {
                    if(!_scene.flyingKnightAudio.isPlaying){
                        _scene.flyingKnightAudio.play();
                    }
                } else {
                    if(!_scene.flyingKnightAudio.isPlaying){
                        _scene.flyingKnightAudio.stop();
                    }
                }
            }
        }, 100);
    }

    hit(_flyingKnight, _arthur) {
        if (_arthur.isInvincible == false) {
            _arthur.tookDamage = true;
            _arthur.isInvincible = true;
            _arthur.health -= 1;
        }
    }


    preUpdate(time, delta) {
        if (this.direction == 1)
            this.setFlipX(true);
        else
            this.setFlipX(false);

        //Calculo para poder cambiar el movimiento del knight de arriba a abajo
        if (this.sinus <= -1)
            this.ascendent = true;
        else if (this.sinus >= 1)
            this.ascendent = false;

        //Calculo para poder mover el knight de posicion frame a frame.
        if (this.ascendent)
            this.sinus = this.sinus + 0.05;
        else
            this.sinus = this.sinus - 0.05;


        this.body.setVelocityX(this.direction * gamePrefs.ENEMY_SPEED);
        this.body.velocity.y = gamePrefs.FLYINGKNIGHT_HEIGHT * Math.sin(this.sinus);

        super.preUpdate(time, delta);
    }

}