import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  constructor() {
    super("InicialScene");
    this.changeScene = true;
  }

  preload() {
    this.load.image("ambience", "assets/GameScenario-Sheet.png");
  }

  create() {
    const pc = this.add.image(0, 0, "ambience").setOrigin(0, 0);
    pc.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const onButton = this.add.zone(960, 565, 100, 100);
    onButton.setOrigin(0.5);
    onButton.setInteractive();

    onButton.on("pointerdown", () => {
      this.scene.start("PC_on");
    });

    const NotesButton = this.add.zone(130, 700, 170, 170);
    NotesButton.setOrigin(0.5);
    NotesButton.setInteractive();

    NotesButton.on("pointerdown", () => {
      if (this.changeScene) {
        this.scene.start("Page12");
        this.changeScene = false;
      } else {
        this.scene.start("Page13");
      }
    });

    const blinkText = this.add.text(
      976, // Posição X
      620, // Posição Y
      ".",
      {
        font: "180px Arial",
        color: "#00ff00",
        fontStyle: "bold",
      }
    );
    blinkText.setOrigin(1);

    this.tweens.add({
      targets: blinkText,
      alpha: 0,
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
