var LAYERS = {};

LAYERS.create = function (context) {
    //Pintamos el nivel
    //Cargo el JSON
    context.map = context.add.tilemap('stage1');

    //Cargamos los TILESETS
    context.map.addTilesetImage('background', 'background');
    context.map.addTilesetImage('GraveyardTrees', 'trees');
    context.map.addTilesetImage('Fences', 'fences');
    context.map.addTilesetImage('Grass', 'grass');
    context.map.addTilesetImage('Fortress', 'fortress');
    context.map.addTilesetImage('Water', 'water');
    context.map.addTilesetImage('firstMountain', 'firstMountain');
    context.map.addTilesetImage('Mountain02', 'mountainSides');
    context.map.addTilesetImage('2FLadders', 'ladders');
    // context.map.addTilesetImage('Tombs', 'tombs');
    context.map.addTilesetImage('Graveyard Terrain', 'terrain');
    context.map.addTilesetImage('2FTerrain', 'f2Terrain');

    //Pintamos las CAPAS/LAYERS
    context.background = context.map.createLayer('BackgroundLayer','background');
    context.trees2F = context.map.createLayer('2FTreesLayer', 'GraveyardTrees');
    context.trees1F = context.map.createLayer('1FTreesLayer', 'GraveyardTrees');
    context.fences2F = context.map.createLayer('2FFencesLayer', 'Fences');
    context.fences1F = context.map.createLayer('1FFencesLayer', 'Fences');
    context.grassBorder1F = context.map.createLayer('1FBorderGrassLayer', 'Graveyard Terrain');
    context.grass2F = context.map.createLayer('2FGrassLayer', 'Grass');
    context.grass1F = context.map.createLayer('1FGrassLayer', ['Graveyard Terrain', 'Grass']);
    context.fortress = context.map.createLayer('FortressLayer', 'Fortress');
    context.water = context.map.createLayer('WaterLayer', 'Water');
    context.firstMountain = context.map.createLayer('MountainLayer', 'firstMountain');
    context.mountainLSide = context.map.createLayer('2FLeftLayer', 'Mountain02');
    context.mountainRSide = context.map.createLayer('2FRightLayer', 'Mountain02');
    // context.tombs2F = context.map.createLayer('2FTombsLayer', 'Tombs');
    context.terrain2F = context.map.createLayer('2FTerrainLayer', '2FTerrain');
    // context.tombs1F = context.map.createLayer('1FTombsLayer', 'Tombs');
    context.ladders = context.map.createLayer('LaddersLayer','2FLadders');
    context.terrainBorder1F = context.map.createLayer('BorderTerrainLayer', 'Graveyard Terrain');
    context.terrain1F = context.map.createLayer('TerrainLayer', 'Graveyard Terrain');

    //Cargamos las capas de objetos y enemigos
    context.enemiesSpawn = context.map.getObjectLayer('EnemiesLayer');
    context.objectsSpawn = context.map.getObjectLayer('ObjectsLayer');

    context.map.setCollisionBetween(1,1,true,true,'BorderTerrainLayer');
    context.map.setCollisionBetween(1,1,true,true,'TerrainLayer');
    context.map.setCollisionBetween(11,12,true,true,'2FTerrainLayer');
    // context.map.setCollisionBetween(5,7,true,true,'1FTombsLayer');
    // context.map.setCollisionBetween(5,7,true,true,'2FTombsLayer');
    context.map.setCollisionBetween(8,10,true,true,'LaddersLayer');
    context.map.setCollisionBetween(24,25,true,true,'WaterLayer');
};