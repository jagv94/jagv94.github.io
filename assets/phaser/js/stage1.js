class stage1 extends Phaser.Scene {
  constructor() {
    super({ key: "stage1" });

    this.playerPointsText;
    this.sparks = [];
    this.arthurLife;
    this.stopSpawn = false;
    this.endSongBool = false;
  }

  preload() { }

  create() {
    //Carga namespace layers
    LAYERS.create(this);

    this.loadAnimations();

    //Pintamos la puerta final
    this.door = new doorPrefab(this, gamePrefs.DOOR_SPAWN_X, gamePrefs.DOOR_SPAWN_Y).setScale(.5);

    //Pintamos la plataforma móvil
    this.platform = new platformPrefab(this, gamePrefs.PLATFORM_SPAWN_X, gamePrefs.PLATFORM_SPAWN_Y).setScale(.5);
    
    //Pintamos al player
    this.arthur = new playerPrefab(this, gamePrefs.ARTHUR_SPAWN_X, gamePrefs.ARTHUR_SPAWN_Y);
    this.boss = new unicornPrefab(this, gamePrefs.DOOR_SPAWN_X, gamePrefs.DOOR_SPAWN_Y);
    this.boss.active = false;
    
    //Pintamos las tumbas
    this.tombs = new Array(
      new tombPrefab(this, 1 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 7 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb02"),
      new tombPrefab(this, 12 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 16 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb03"),
      new tombPrefab(this, 23 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 30 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 34 * 32 + 16 + 1, 5 * 32 + 16 + 1),
      new tombPrefab(this, 39 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb02"),
      new tombPrefab(this, 46 * 32 + 16 + 1, 5 * 32 + 16 + 1, "tomb03"),
      new tombPrefab(this, 23 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb02"),
      new tombPrefab(this, 26 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb03"),
      new tombPrefab(this, 29 * 32 + 16 + 16, 2 * 32 + 16 + 17, "tomb03")
    );

    //Preparamos el spawner de enemigos
    this.enemiesSpawned = [];
    this.enemiesWaiting = {};
    var bossDistance = 0;


    //Camaras
    this.cameras.main.startFollow(this.arthur);
    this.cameras.main.setBounds(
      0,
      0,
      gamePrefs.LEVEL1_WIDTH,
      gamePrefs.LEVEL1_HEIGHT
    );

    //TMP mecago en todo q   uew molestO A WDOAWIDHAW
    this.sound.volume = 0.1;

    this.gameStart = this.sound.add("gameStart");
    this.gameTheme = this.sound.add("gameTheme");
    this.endTheme = this.sound.add("endTheme");

    this.gameStart.play();
    this.hasPlayed = false;

    //Comprobamos si todas las tiles necesarias para no colisionar
    //con la parte de abajo y laterales del segundo piso de la montaña
    //han sido modificadas
    this.allMountainCollisionsAreModified = false;

    // Inicializa una variable para almacenar el índice de los enemigos
    this.enemyIndex;

    this.gameHUD();
    this.timer();

    this.playerPointsText = this.add.bitmapText(
      10,
      10,
      "arcadeFont",
      "" + this.arthur.score
    ).setScale(0.28).setScrollFactor(0);


    this.spawnItems();
  }

  gameHUD() {
    var playerText = this.add.bitmapText(
      5,
      1,
      "arcadeFont",
      "PLAYER 1"
    ).setScale(0.28).setScrollFactor(0);

    var topScoreText = this.add.bitmapText(
      100,
      1,
      "arcadeFont",
      "TOP SCORE"
    ).setScale(0.28).setScrollFactor(0).setTint(0xcb3058);

    this.topPointsText = this.add.bitmapText(
      135,
      10,
      "arcadeFont",
      "" + gamePrefs.topScore
    ).setScale(0.28).setScrollFactor(0);

    this.arthurLife = new livesPrefab(this, 20, 215);
  }

  update() {
    if (!this.gameStart.isPlaying && !this.hasPlayed) {
      this.gameTheme.play();
      this.gameTheme.setLoop(true);
      this.hasPlayed = true;
    }

    //Pintamos los enemigos
    if(!this.stopSpawn){

      this.spawnEnemies();
      this.checkEnemyDistance(this.arthur.x);
    }

    //actualizar hud score player
    this.playerPointsText.text = this.arthur.score;
    if (this.arthur.score > gamePrefs.topScore)
    {
      gamePrefs.topScore = this.arthur.score;
      this.topPointsText.text = this.arthur.score;
    }

    if (this.arthur.x > 3300) {
      this.stopSpawn = true;
      for (let j = 0; j < this.enemiesSpawned.length; j++) {
        this.cameras.main.flash(500, 20, 20, 20);
        this.destroyEnemy(j);
      }
    }

    if (Phaser.Math.Distance.Between(this.arthur.x, 0, this.boss.x, 0) <= 350)
      this.boss.active = true;

    if(this.endSongBool && !this.endTheme.isPlaying)
    {
      this.endSongBool = false;
      this.arthur.body.setVelocityX(50);
      this.arthur.anims.play("run")
    }
  }

  endSong()
  {
    this.gameTheme.stop();
    this.endTheme.play();
    this.arthur.anims.stop().setFrame(31);
    this.input.keyboard.enabled = false;
    this.arthur.body.setVelocityX(0);
    this.arthur.body.setVelocityY(0);
    this.arthur.invencibile = true;
    this.arthur.health = 2;
    this.arthur.hasWon = true;
    this.sound.volume = 0.3;
    this.endSongBool = true;
  }

  inputScene() {
    this.input.keyboard.enabled = true;
    gamePrefs.score = this.arthur.score;
    this.sound.volume = 0.1;
    this.endTheme.stop();
    this.gameTheme.stop();
    this.scene.start("InputScene");
  }

  spawnSparks(x, y) {
    this.sparks.push(new sparkPrefab(this, x, y));
  }

  timer() {
    var timerValue = 2 * 60;

    var timeText = this.add.bitmapText(
      10,
      30,
      "arcadeFont",
      "TIME"
    ).setScale(0.28).setScrollFactor(0);

    var timerText = this.add.bitmapText(
      10,
      40,
      "arcadeFont",
      "2 00"
    ).setScale(0.28).setScrollFactor(0);


    var timerAux = this.time.addEvent({
      delay: 1000,
      callback: function () {
        // Calculate the minutes and seconds left
        var minutes = Phaser.Math.FloorTo(timerValue / 60);
        var seconds = Phaser.Math.FloorTo(timerValue % 60);

        // Add leading zeros to the minutes and seconds, if necessary
        minutes = Phaser.Utils.String.Pad(minutes, 2, "", 1);
        seconds = Phaser.Utils.String.Pad(seconds, 2, "0", 1);

        // Decrement the timer value
        timerValue--;

        // Update the Text object with the new time
        timerText.text = minutes + " " + seconds;

      },
      callbackScope: this,
      loop: true
    });
  }

  loadAnimations() {
    //ARTHUR ARMOUR ANIMATIONS
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("arthur", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "die",
      frames: this.anims.generateFrameNumbers("arthur", { start: 32, end: 43 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throw",
      frames: this.anims.generateFrameNumbers("arthur", { start: 8, end: 9 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throwCrouch",
      frames: this.anims.generateFrameNumbers("arthur", { start: 10, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "animation",
      frames: this.anims.generateFrameNumbers("lives", { start: 0, end: 1 }),
      frameRate: 0,
      repeat: 0,
    });

    this.anims.create({
      key: "spark",
      frames: this.anims.generateFrameNumbers("spark", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0,
    });

    //ARTHUR NAKED ANIMATIONS
    this.anims.create({
      key: "runNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 16, end: 20 }),
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "throwNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 24, end: 25 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "throwCrouchNaked",
      frames: this.anims.generateFrameNumbers("arthur", { start: 26, end: 27 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "breakArmour",
      frames: this.anims.generateFrameNumbers("break_armour", {
        start: 0,
        end: 4,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "laddersAnimation",
      frames: this.anims.generateFrameNumbers("ladders_animation", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "laddersAnimationNaked",
      frames: this.anims.generateFrameNumbers("ladders_animation_naked", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //FIRE ANIMATION
    this.anims.create({
      key: "throwFire",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    //ZOMBIE ANIMATIONS
    this.anims.create({
      key: "zombieSpawn",
      frames: this.anims.generateFrameNumbers("zombie", { start: 1, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "zombieRun",
      frames: this.anims.generateFrameNumbers("zombie", { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    //GREEN MONSTER ANIMATIONS
    this.anims.create({
      key: "greenMonsterIddle",
      frames: this.anims.generateFrameNumbers("greenMonster", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "greenMonsterAttack",
      frames: this.anims.generateFrameNumbers("greenMonster", {
        start: 2,
        end: 5,
      }),
      frameRate: 5,
      repeat: 0,
    });

    //GREEN MONSTER BULLET
    this.anims.create({
      key: "greenMonsterBullet",
      frames: this.anims.generateFrameNumbers("greenMonsterBullet", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //FLYING KNIGHT
    this.anims.create({
      key: "flyingKnightIddle",
      frames: this.anims.generateFrameNumbers("flyingKnight", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //WOODY PIG
    this.anims.create({
      key: "woodyPigMove",
      frames: this.anims.generateFrameNumbers("woodyPig", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "woodyPigTurn",
      frames: this.anims.generateFrameNumbers("woodyPig", { start: 2, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });

    this.anims.create({
      key: "enemyDeath",
      frames: this.anims.generateFrameNumbers("enemy_death", { start: 0, end: 8, }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "enemyDeath_zombiecrow",
      frames: this.anims.generateFrameNumbers("enemy_death_zombiecrow", { start: 0, end: 4, }),
      frameRate: 10,
      repeat: 0,
    });

    //  CROW ANIMATIONS
    this.anims.create({
      key: "crowIdle",
      frames: this.anims.generateFrameNumbers("crow", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "crowFly",
      frames: this.anims.generateFrameNumbers("crow", { start: 4, end: 7 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornWalk",
      frames: this.anims.generateFrameNumbers("unicorn", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornRun",
      frames: this.anims.generateFrameNumbers("unicorn", { start: 3, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "unicornBullet",
      frames: this.anims.generateFrameNumbers("unicornBullet", {
        start: 0,
        end: 1,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //Door animations
    this.anims.create({
      key: "openDoor",
      frames: this.anims.generateFrameNumbers("door", { start: 0, end: 2 }),
      frameRate: 8,
      repeat: 0,
    });

    //Objects animations
    this.anims.create({
      key: "itemSpear",
      frames: this.anims.generateFrameNumbers("item", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "itemKnife",
      frames: this.anims.generateFrameNumbers("item", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "itemFire",
      frames: this.anims.generateFrameNumbers("item", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "itemKey",
      frames: this.anims.generateFrameNumbers("item", { start: 18, end: 20 }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "itemCoin",
      frames: this.anims.generateFrameNumbers("item", { start: 14, end: 17 }),
      frameRate: 15,
      repeat: 0,
    });

    //ARTHUR ARMOUR ANIMATIONS
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("arthur", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addEnemy(enemy) {
    this.enemiesSpawned.push(enemy);
  }

  checkEnemyDistance(arthurX) {
    // Recorre sólo los enemigos que están a una distancia determinada de arthur
    for (let i = 0; i < this.enemiesSpawned.length; i++) {
      const enemy = this.enemiesSpawned[i];

      if (Math.abs(arthurX - enemy.x) > gamePrefs.GAME_WIDTH / 2 ) {
        this.enemyIndex = i;
        break;
      }
    }

    // Si se ha encontrado un enemigo a una distancia mayor de la permitida, se procede a destruirlo
    if (this.enemyIndex !== undefined) {
      // Almacena el tiempo actual en una variable local para comparar más tarde
      const currentTime = Date.now();

      // Si el enemigo ha estado fuera del juego el tiempo suficiente, se destruye y se vuelve a habilitar
      if (this.enemiesSpawned != null && this.enemiesSpawned[this.enemyIndex] != null &&
        this.enemiesSpawned[this.enemyIndex].destroyTime != null &&
        currentTime - this.enemiesSpawned[this.enemyIndex].destroyTime >
        gamePrefs.ENEMY_RESPAWN_TIME
        )
       {
        destroyEnemy(this.enemyIndex);
      }
    }
  }

  // Función para destruir un enemigo
  destroyEnemy(enemyIndex) {
    // Elimina el enemigo del array de enemigos spawneados
    const enemy = this.enemiesSpawned.splice(enemyIndex, 1)[0];

    // Marca el enemigo como disponible para ser respawmado
    this.enemiesWaiting[enemy.spriteTag] = true;

    // Destruye el enemigo
    enemy.destroy();
  }

  spawnEnemies() {
    // Crea una tabla de búsqueda para crear los enemigos
    const enemyCreators = {
      Zombie: (x, y, name) => new zombiePrefab(this, x, y, name),
      GreenMonster: (x, y, name) => new greenMonsterPrefab(this, x, y, name),
      Crow: (x, y, name) => new crowPrefab(this, x, y, name),
      FlyingKnight: (x, y, name) => new flyingKnightPrefab(this, x, y, name),
      WoodyPig: (x, y, name) => new woodyPigPrefab(this, x, y, name),
      RedArremer: (x, y, name) => true,
      UnicornBoss: (x, y, name) => true
    };

    // Recorre el array de enemigos spawneables
    for (let i = 0; i < this.enemiesSpawn.objects.length; i++) {
      const spawn = this.enemiesSpawn.objects[i];

      // Verifica si el enemigo ya está en el array de enemigos spawneados
      let isDuplicated = false;
      for (let j = 0; j < this.enemiesSpawned.length; j++) {
        if (this.enemiesSpawned[j].spriteTag == spawn.name ) {
          isDuplicated = true;
          break;
        }
      }

      if (spawn.name in this.enemiesWaiting) {
        if (!this.enemiesWaiting[spawn.name]) {
          setTimeout(
            () => delete this.enemiesWaiting[spawn.name],
            gamePrefs.ENEMY_RESPAWN_TIME
          );
          this.enemiesWaiting[spawn.name] = true;
        }
      }

      // Si el enemigo no está duplicado y está en el rango de visión del jugador, lo spawnea
      if (!isDuplicated &&
        !(spawn.name in this.enemiesWaiting) &&
        this.arthur.x <= spawn.x + gamePrefs.GAME_WIDTH / 2  &&
        this.arthur.x >= spawn.x - gamePrefs.GAME_WIDTH / 2  &&
        spawn.properties[0].value != "RedArremer" &&
        spawn.properties[0].value != "UnicornBoss" &&
        unicornPrefab.isAlive) {
        if (this.arthur.x < 3000) {
          this.enemiesSpawned.push(enemyCreators[spawn.properties[0].value](spawn.x, spawn.y, spawn.name));
        }
      }
    }
  }

  spawnItems() {
    // Crea una tabla de búsqueda para crear los enemigos
    const objectCreators = {
      coin: (x, y) => new itemPrefab(this, x, y, 'item', 'coin'),
      bag: (x, y) => new itemPrefab(this, x, y, 'item', 'bag')
    };

    // Recorre el array de objetos spawneables
    for (let i = 0; i < this.objectsSpawn.objects.length; i++) {
      const spawn = this.objectsSpawn.objects[i];
      objectCreators[spawn.properties[0].value](spawn.x, spawn.y);
    }
  }
}
