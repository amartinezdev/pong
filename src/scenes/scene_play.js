import Jugadores from "../gameObjects/jugadores.js";

class Scene_play extends Phaser.Scene {
  constructor() {
    super({ key: "Scene_play" });
  }

  scoreLeft = 0;
  scoreRight = 0;
  scoreTextLeft;
  scoreTextRight;

  preload() {}

  create() {
    const style = { fontFamily: "JetBrains Mono", fontSize: "25px", color: "rgb(238, 238, 238)", fontWeight: "900" };

    // marcador izquierdo
    this.scoreTextLeft = this.add.text(this.scale.width * 0.25, 32, "0", style).setOrigin(0.5, 0);

    // marcador derecho
    this.scoreTextRight = this.add.text(this.scale.width * 0.75, 32, "0", style).setOrigin(0.5, 0);

    let center_width = this.sys.game.config.width / 2;
    let center_height = this.sys.game.config.height / 2;

    // separador
    this.add.image(center_width, center_height, "separator");

    // jugadores
    this.left = new Jugadores(this, 20, center_height, "left");
    this.right = new Jugadores(this, this.sys.game.config.width - 20, center_height, "right");

    // controles
    // jugador derecho
    this.cursor = this.input.keyboard.createCursorKeys();

    // jugador izquierdo
    this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    // bola
    // para que sólamente colisione abajo y arriba
    this.physics.world.setBoundsCollision(false, false, true, true);
    this.ball = this.physics.add.image(center_width, center_height, "ball");

    // hace que rebote al impactar en jugador
    this.ball.setCollideWorldBounds(true);

    // devuelve la bola a la misma velocidad
    this.ball.setBounce(1.03);
    this.ball.setVelocityX(-330);

    // físicas
    this.physics.add.collider(this.ball, this.left, this.choke, null, this);
    this.physics.add.collider(this.ball, this.right, this.choke, null, this);
  }

  /**
   * Función que al chocar con un jugador, la bola salga entre un rango aleatorio de 120 grados
   */
  choke() {
    this.ball.setVelocityY(Phaser.Math.Between(-120, 120));
  }

  update() {
    // control de los jugadores
    // jugador derecho
    if (this.cursor.down.isDown) {
      this.right.body.setVelocityY(350);
    } else if (this.cursor.up.isDown) {
      this.right.body.setVelocityY(-300);
    } else {
      this.right.body.setVelocityY(0);
    }

    // jugador izquierdo
    if (this.cursor_S.isDown) {
      this.left.body.setVelocityY(300);
    } else if (this.cursor_W.isDown) {
      this.left.body.setVelocityY(-300);
    } else {
      this.left.body.setVelocityY(0);
    }

    // si marca el jugador derecho
    if (this.ball.x < 0) {
      this.scoreRight++;
      this.scoreTextRight.setText(this.scoreRight.toString());
      this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
      this.ball.setVelocityX(-330);
    }

    // si marca el jugador izquierdo
    if (this.ball.x > this.sys.game.config.width) {
      this.scoreLeft++;
      this.scoreTextLeft.setText(this.scoreLeft.toString());
      this.ball.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);
      this.ball.setVelocityX(-330);
    }
  }
}

export default Scene_play;
