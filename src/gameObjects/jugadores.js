class Jugadores extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    // añade físicas a los jugadores
    scene.physics.world.enable(this);
    // hace que la bola no empuje a los jugadores
    this.body.immovable = true;
    // evitamos que los jugadores salgan del mapa
    this.body.setCollideWorldBounds(true);
  }
}

export default Jugadores;
