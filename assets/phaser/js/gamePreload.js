class gamePreload extends Phaser.Scene {
    constructor() {
        super({ key: "gamePreload" });
    }

    preload() {
        //Cargamos las tileset que se utilizarán en el nivel
        this.load.setPath('assets/tilesets/');
        this.load.image('background', 'background.png');
        this.load.image('trees', 'graveyardTrees.png');
        this.load.image('fences', 'fences.png');
        this.load.image('grass', 'grass.png');
        this.load.image('fortress', 'fortress01.png');
        this.load.image('water', 'water.png');
        this.load.image('f2Terrain', 'F2Terrain.png');
        this.load.image('firstMountain', 'mountain01.png');
        this.load.image('mountainSides', 'F2MountainSides.png');
        this.load.image('ladders', 'F2Ladders.png');
        // this.load.image('tombs','tombs.png');
        this.load.image('tomb01', 'tomb01.png');
        this.load.image('tomb02', 'tomb02.png');
        this.load.image('tomb03', 'tomb03.png');
        this.load.image('terrain', 'graveyardTerrain.png');

        this.load.setPath('assets/map/');
        this.load.tilemapTiledJSON('stage1', 'stage1.json');
        this.load.json('json', 'stage1.json');

        //Cargamos los sonidos
        this.load.setPath('assets/audio');
        this.load.audio('arthurJump', 'ARTHURJUMP.wav');
        this.load.audio('arthurHit', 'ARTHURHIT.wav');
        this.load.audio('arthurThrow', 'ARTHURTHROW.wav');
        this.load.audio('arthurDeath', 'ARTHURDEATH.wav');
        this.load.audio('armorPickup', 'ARMORPICKUP.wav');
        this.load.audio('zombieSpawn', 'ZOMBIESPAWN.wav');
        this.load.audio('torch', 'TORCH.wav'); //Explosion de las antorchas //Por añadir en el código
        this.load.audio('crow', 'CROW.wav');
        this.load.audio('woodyPig', 'WOODYPIG.wav'); //Por añadir en el código
        this.load.audio('enemyDeath', 'ENEMYDEATH.wav');
        this.load.audio('crowDeath', 'SMALLENEMYDEATH.wav');
        this.load.audio('projectileBlock', 'PROJECTILEBLOCK.wav');
        this.load.audio('flyingKnightAudio', 'FLYINGKNIGHT.wav'); //Debe sonar en bucle mientras exista en pantalla //Por añadir en el código
        this.load.audio('treasurePickup', 'TREASUREPICKUP.wav'); //Recoger objeto //Por añadir en el código
        this.load.audio('weaponPickup', 'WEAPONPICKUP.wav'); //Recoger arma //Por añadir en el código
        this.load.audio('doorOpen', 'DOOROPEN.wav'); //Abrir puerta //Por añadir en el código
        this.load.audio('bigEnemyWalk', 'BIGENEMYWALK.wav'); //Boss moviendose //Por añadir en el código
        this.load.audio('endTheme', 'ENDTHEME.mp3'); 

        //Cargamos la musica
        this.load.audio('gameStart', 'GAMESTART.wav');
        this.load.audio('gameTheme', 'GNGTHEME.mp3');

        //Cargamos los sprites del personaje
        this.load.setPath('assets/sprites/Arthur/');
        this.load.spritesheet('arthur', 'arthur.png',
            { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('break_armour', 'armour_break.png',
            { frameWidth: 52, frameHeight: 49 });

        this.load.spritesheet('ladders_animation', 'Armour/Climb - Armour Arthur.png',
            { frameWidth: 21, frameHeight: 32 });

        this.load.spritesheet('ladders_animation_naked', 'Naked/Ladder - Arthur Naked.png',
            { frameWidth: 21, frameHeight: 32 });

        //Cargamos los sprites de los enemigos
        this.load.setPath('assets/sprites/Enemies/');
        this.load.spritesheet('zombie', 'zombie.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('greenMonster', 'green_monster.png',
            { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet('flyingKnight', 'flying_knight.png',
            { frameWidth: 16, frameHeight: 30 })
        this.load.spritesheet('woodyPig', 'woody_pig.png',
            { frameWidth: 32, frameHeight: 16 })
        this.load.spritesheet('enemy_death', 'enemy_death.png',
            { frameWidth: 33, frameHeight: 33 })
        this.load.spritesheet('enemy_death_zombiecrow', 'enemy_death_zombie-crow.png',
            { frameWidth: 30, frameHeight: 30 })
        this.load.spritesheet("greenMonsterBullet", "greenMonsterBullet.png",
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("crow", "crow.png",
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("unicorn", "unicorn.png",
            { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("unicornBullet", "unicorn_projectile.png",
            { frameWidth: 16, frameHeight: 7 });


        //Cargamos los sprites de las armas
        this.load.setPath('assets/sprites/Weapons/');
        this.load.image("spear", "Spear.png");
        this.load.image("knife", "Knife.png");
        this.load.spritesheet("fire", "Fire projectile animation.png",
            { frameWidth: 32, frameHeight: 16 });

        //Cargamos los sprites de las armas enemigas
        this.load.spritesheet("woodyPigBullet", "woody_pig_spear.png",
            { frameWidth: 23, frameHeight: 23 });

        //Cargamos el sprite de la puerta final
        this.load.setPath('assets/tilesets/');
        this.load.spritesheet("door", "door.png",
            { frameWidth: 101, frameHeight: 130 });

        //Cargamos la plataforma móvil
        this.load.setPath('assets/sprites/');
        this.load.image('platform', 'movingPlatform.png')

        //Cargamos los objetos
        this.load.setPath('assets/sprites/');
        this.load.spritesheet('item', 'objects.png',
            { frameWidth: 28, frameHeight: 16 });


        this.load.image('endScreen', 'game_over.png')
        this.load.spritesheet('lives', 'lives.png',
            { frameWidth: 56, frameHeight: 26 });
        this.load.spritesheet('spark', 'spark.png',
            { frameWidth: 88, frameHeight: 64 });

        //Cargamos las fuentes
        this.load.setPath('assets/font/');
        this.load.image("outline", "outline.png");
        this.load.image("del", "del.png");
        this.load.image("end", "end.png");

        this.load.bitmapFont(
            "arcadeFont",
            "gng_font.png",
            "gng_font.xml"
        );

        //Cargamos el splash screen
        this.load.setPath('assets/tilesets/');
        this.load.spritesheet("splashGif", "splashScreen.png",
            { frameWidth: 832, frameHeight: 720 });
    }

    create() {
        this.scene.start('splashScreenScene');
    }
}