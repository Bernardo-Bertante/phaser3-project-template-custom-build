import Phaser from "phaser";
import OpenScene from "./scenes/openScene";
import Game from "./scenes/game";
import PC from "./scenes/pc";
import Page12 from "./scenes/notes12";
import Page13 from "./scenes/notes13";
import Page14 from "./scenes/notes14";
import Page15 from "./scenes/notes15";
import Page16 from "./scenes/notes16";
import "regenerator-runtime/runtime";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoRound: false,
  parent: "contenedor",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  backgroundColor: "#000000",
  scene: [Game, PC, Page12, Page13, Page14, Page15, Page16],
};

const game = new Phaser.Game(config);
