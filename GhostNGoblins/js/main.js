var gamePrefs=
{
    ARTHUR_JUMP: 400,
    ARTHUR_SPEED: 80,
    ENEMY_SPEED: 80,
    PLATFORM_SPEED: 70,
    FLYINGKNIGHT_HEIGHT: 300,
    CROW_Y_SPEED: 100,
    ENEMY_SPEAR_SPEED: 120,
    GRAVITY: 1500,
    GAME_WIDTH:512,
    GAME_HEIGHT:448,
    LEVEL1_WIDTH:3552,
    LEVEL1_HEIGHT:192,
    SPEAR_SPEED_: 220,
    MAX_BULLET_AMOUNT : 3,
    MAX_FIRE_AMOUNT : 2,
    ENEMY_RESPAWN_TIME : 10000,
    ARTHUR_SPAWN_X:  65,
    ARTHUR_SPAWN_Y: 100,
    DOOR_SPAWN_X: 3495,
    DOOR_SPAWN_Y: 160,
    PLATFORM_SPAWN_X: 1700,
    PLATFORM_SPAWN_Y: 202,
    topScore : 10000,
    score : 0, 
    nickname : "",
    lost : false
}

var config =
{
    type: Phaser.AUTO,
    width: gamePrefs.GAME_WIDTH,
    height: gamePrefs.GAME_HEIGHT,
    scene:[gamePreload, splashScreenScene, rankingScene, InputScene, stage1], //array con los niveles/pantallas/escenas (unity)
    render:
    {
        pixelArt:true
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        width:gamePrefs.GAME_WIDTH/2,
        height:gamePrefs.GAME_HEIGHT/2,
        autoCenter:Phaser.Scale.CENTER_BOTH
    },
    physics:
    {
        default:'arcade',
        arcade:
        {
            gravity:{y:gamePrefs.GRAVITY},
            debug:false
        }
    }
}

var juego = new Phaser.Game(config);