/**
 * parte inicial del juego, aquí se cargan los imports
 * y las configuraciones por defecto de Phaser3
 */

import Phaser from "phaser";
import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/Scene_play.js";

/**
 * Configuración inicial de phaser;
 * esto crea el canvas en el contenedor del "parent"
 * en scene, hay que añadirle las escenas que tengamos.
 */
const config = {
  width: 740,
  height: 420,
  parent: "contenedor",
  physics: {
    default: "arcade",
  },
  scene: [Bootloader, Scene_play],
};

// instanciamos el objeto
new Phaser.Game(config);
