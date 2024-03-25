
class rankingScene extends Phaser.Scene 
{
  constructor() {
    super({ key: "rankingScene"});
    
    this.padding = 4;
    this.topPadding = 4;

    this.highscores = [ 5000, 4000, 3000, 2000];
    this.nicknames = [ "PUIU", "ADR", "ROG", "FAB"];

    this.value;

  }
  
  create()
  {
    this.initScores();
    this.drawScore();
    this.drawNames();
  }
  
  initScores()
  {
    localStorage.clear();
    localStorage.setItem(gamePrefs.nickname, gamePrefs.score);
    
    for (var i = 0; i < this.highscores.length; i++) {      
      localStorage.setItem(this.nicknames[i], this.highscores[i]);
    }
    
    console.log(localStorage);
  }

  drawScore() {
    
    this.add
    .bitmapText(
        this.padding,
        50 + this.topPadding,
        "arcadeFont",
        "1ST  9999" 
      )
      .setTint(0xff0000).setFontSize(14);
      
    this.key = localStorage.key(0);
    this.value = localStorage.getItem(this.key);

    this.add
      .bitmapText(
        this.padding,
        70 + this.topPadding,
        "arcadeFont",
        "2ND  " + this.value
      )
      .setTint(0xff8200).setFontSize(14);

    this.key = localStorage.key(1);
    this.value = localStorage.getItem(this.key);  

    this.add
      .bitmapText(
        this.padding,
        90 + this.topPadding,
        "arcadeFont",
        "3RD  " + this.value
      )
      .setTint(0xffff00).setFontSize(14);

    this.key = localStorage.key(2);
    this.value = localStorage.getItem(this.key);

    this.add
      .bitmapText(
        this.padding,
        110 + this.topPadding,
        "arcadeFont",
        "4TH  " + this.value
      )
      .setTint(0x00ff00).setFontSize(14);

    this.key = localStorage.key(3);
    this.value = localStorage.getItem(this.key);

    this.add
      .bitmapText(
        this.padding,
        130 + this.topPadding,
        "arcadeFont",
        "5TH  " + this.value
      )
      .setTint(0x00bfff).setFontSize(14);
  }

  drawNames()
  {
    this.add
    .bitmapText(
      150,
      50 + this.topPadding,
      "arcadeFont",
      "RICHARD" 
    )
    .setTint(0xff0000).setFontSize(14);

  this.key = localStorage.key(0);

  this.add
    .bitmapText(
      150,
      70 + this.topPadding,
      "arcadeFont",
      "" + this.key
    )
    .setTint(0xff8200).setFontSize(14);
    
    this.key = localStorage.key(1);

    this.add
      .bitmapText(
        150,
        90 + this.topPadding,
        "arcadeFont",
        ""+ this.key
      )
      .setTint(0xffff00).setFontSize(14);

    this.key = localStorage.key(2);

    this.add
      .bitmapText(
        150,
        110 + this.topPadding,
        "arcadeFont",
        ""+ this.key
      )
      .setTint(0x00ff00).setFontSize(14);

    this.key = localStorage.key(3);

    this.add
      .bitmapText(
        150,
        130 + this.topPadding,
        "arcadeFont",
        ""+ this.key
      )
    .setTint(0x00bfff).setFontSize(14);
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
      this.scene.start('splashScreenScene');
  }
}
