import Phaser from "phaser";

export default class Page16 extends Phaser.Scene {
  constructor() {
    super("Page16");
  }

  preload() {
    this.load.image("page16", "assets/NotePage16.png");
  }

  create() {
    const page12 = this.add.image(0, 0, "page16").setOrigin(0, 0);
    page12.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const exitNotesButton1 = this.add.zone(0, 0, 950, 2000);
    exitNotesButton1.setOrigin(0.5);
    exitNotesButton1.setInteractive();

    exitNotesButton1.on("pointerdown", () => {
      this.scene.start("InicialScene");
    });

    const exitNotesButton2 = this.add.zone(1850, 0, 950, 2000);
    exitNotesButton2.setOrigin(0.5);
    exitNotesButton2.setInteractive();

    exitNotesButton2.on("pointerdown", () => {
      this.scene.start("InicialScene");
    });
  }
}
