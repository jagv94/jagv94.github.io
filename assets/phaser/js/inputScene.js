class InputScene extends Phaser.Scene {
    constructor(data) {
      super({
        key: "InputScene"
      });
  
      this.chars = [
        ["A", "B", "C", "D", "E", "F", "G", "H", "i", "J"],
        ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"],
        ["U", "V", "W", "X", "Y", "Z", ",", "!", "<", ">"]
      ];
  
      this.rows = this.chars.length;
      this.columns = this.chars[0].length;
      this.cursor = new Phaser.Math.Vector2();
      this.text;
      this.outline;
      this.name = "";
      this.charLimit = 4;
    }
    
    create() {

      this.add.bitmapText(
        this.padding + 32 * 6,
        50 + this.topPadding,
        "arcadeFont",
        "50000"
      );

      this.padding = 4;
      this.letterSpacing = 6;
      var charWidth = 17;
      var charHeight = 16;
      var lineHeight = 2;
      this.xSpacing = charWidth + 5;
      this.ySpacing = charHeight * lineHeight;
  
      var characters = "";
      for (var i = 0; i < this.chars.length; i++) {
        characters += this.chars[i].join("");
        if (i !== this.chars.length - 1) {
          characters += "\n".repeat(lineHeight);
        }
      }
      
      // Creamos el texto pixel art
      var text = this.add.bitmapText(20 + this.padding, 20, "arcadeFont", characters);
      text.fontSize = 16;
      text.setLetterSpacing(this.letterSpacing);
      text.setInteractive();
  
      // Creamos el texto con el nombre del jugador
      this.playerText = this.add
      .bitmapText(100, 150, "arcadeFont", "")
      .setTint(0xff0000)
      .setScale(.5);

      //Cargamos el botón de borrar
      this.add.image(
        text.x +
          charWidth * (this.columns - 1) -
          12 +
          this.letterSpacing * (this.columns - 2),
        text.y + charWidth * (lineHeight * (this.chars.length - 1)) + 8,
        "del"
      );

      //Cargamos el botón de finalizar
      this.add.image(
        text.x +
          charWidth * this.columns -
          12 +
          this.letterSpacing * (this.columns - 1),
        text.y + charWidth * (lineHeight * (this.chars.length - 1)) + 8,
        "end"
      );
  
      // Cargamos el outline de los caracteres
      this.outline = this.add.image(text.x - 5, text.y - 2, "outline").setOrigin(0);
      this.outline.setScale(.5);
      this.text = text;
        
      // Animación de fundido del outline 
      this.tweens.add({
        targets: this.outline,
        alpha: 0.2,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        duration: 350
      });
      text.on("pointermove", this.moveBlock, this);
      text.on("pointerup", this.pressKey, this);

      unicornPrefab.isAlive = true;
    }
  
    moveBlock(pointer, x, y) {
      var cx = Phaser.Math.Snap.Floor(x, this.xSpacing, 0, true);
      var cy = Phaser.Math.Snap.Floor(y, this.ySpacing, 0, true);
  
      if (cy <= this.rows - 1 && cx <= this.columns - 1) {
        this.cursor.set(cx, cy);
  
        this.outline.x = this.text.x - this.padding + cx * this.xSpacing;
        this.outline.y = this.text.y - 2 + cy * this.ySpacing;
      }
    }
  
    moveLeft() {
      if (this.cursor.x > 0) {
        this.cursor.x--;
        this.outline.x -= this.xSpacing;
      } else {
        this.cursor.x = 9;
        this.outline.x += this.xSpacing * 9;
      }
    }
  
    moveRight() {
      if (this.cursor.x < 9) {
        this.cursor.x++;
        this.outline.x += this.xSpacing;
      } else {
        this.cursor.x = 0;
        this.outline.x -= this.xSpacing * 9;
      }
    }
  
    moveUp() {
      if (this.cursor.y > 0) {
        this.cursor.y--;
        this.outline.y -= this.ySpacing;
      } else {
        this.cursor.y = 2;
        this.outline.y += this.ySpacing * 2;
      }
    }
  
    moveDown() {
      if (this.cursor.y < 2) {
        this.cursor.y++;
        this.outline.y += this.ySpacing;
      } else {
        this.cursor.y = 0;
        this.outline.y -= this.ySpacing * 2;
      }
    }
  
    pressKey() {
      var x = this.cursor.x;
      var y = this.cursor.y;
      var nameLength = this.name.length;
  
      this.outline.x = this.text.x - this.padding + x * this.xSpacing;
      this.outline.y = this.text.y - 2 + y * this.ySpacing;
  
      if (x === this.columns - 1 && y === this.rows - 1 && nameLength > 0) {
        //  Submit
        console.log(gamePrefs.nickname);
        gamePrefs.nickname = this.name;
        console.log(gamePrefs.nickname);
        this.scene.start("rankingScene");
      } 
      else if (  x === this.columns - 2 &&  y === this.rows - 1 && nameLength > 0) {
        // Return
        this.name = this.name.substring(0, nameLength - 1);
        this.updateName(this.name);
      } 
      else if (this.name.length < this.charLimit) {
        // Concadenamos las letras
        this.name = this.name.concat(this.chars[y][x]);
      }
      this.updateName(this.name);
    }
    
    updateName(name)
    {
      this.playerText.setText(name);      
    }

    update(time, delta) {
      
    }
  }