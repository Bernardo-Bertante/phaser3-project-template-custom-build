import Phaser from "phaser";

export default class Page14 extends Phaser.Scene {
  constructor() {
    super("Page14");
  }

  preload() {
    this.load.image("page14", "assets/NotePageEmpty.png");
  }

  create() {
    const page12 = this.add.image(0, 0, "page14").setOrigin(0, 0);
    page12.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const nextNotesButton = this.add.zone(985, 730, 120, 60);
    nextNotesButton.setOrigin(0.5);
    nextNotesButton.setInteractive();

    nextNotesButton.on("pointerdown", () => {
      this.scene.start("Page15");
    });

    const exitNotesButton1 = this.add.zone(0, 0, 720, 2000);
    exitNotesButton1.setOrigin(0.5);
    exitNotesButton1.setInteractive();

    exitNotesButton1.on("pointerdown", () => {
      this.scene.start("InicialScene");
    });

    const exitNotesButton2 = this.add.zone(1500, 0, 950, 2000);
    exitNotesButton2.setOrigin(0.5);
    exitNotesButton2.setInteractive();

    exitNotesButton2.on("pointerdown", () => {
      this.scene.start("InicialScene");
    });
  }
}
