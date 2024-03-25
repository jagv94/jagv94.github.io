class splashScreenScene extends Phaser.Scene {
    constructor() {
        super({ key: "splashScreenScene" });

     }
    
    create()
    {
        
        this.anims.create({
            key: 'runSplash',
            frames: this.anims.generateFrameNumbers('splashGif', { start: 0, end: 2 }),
            frameRate: 0.3,
            repeat: -1
        });
        
        this.sprites = new splashGifObject(this, 0, 0).setScale(0.3).setOrigin(0);
        
        
    }
    update()
    {
        let button1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        
        if(button1.isDown)
        {
            this.loadStage()
        }
    }

    loadStage()
    {
        this.scene.start('stage1');
    }

}