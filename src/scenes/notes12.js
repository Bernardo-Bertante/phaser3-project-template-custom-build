import Phaser from "phaser";

export default class Page12 extends Phaser.Scene {
  constructor() {
    super("Page12");
  }

  preload() {
    this.load.image("page12", "assets/NotePage9.png");
  }

  create() {
    const page12 = this.add.image(0, 0, "page12").setOrigin(0, 0);
    page12.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    let text1;

    this.time.delayedCall(1000, () => {
      text1 = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 250,
        "- Claro... uma maldita mancha de café bem onde estava o número. \nEu resmungo, mas não é o fim do mundo —\n talvez eu tenha o contato salvo no computador. \nSe bem que Willow While não faz nada do jeito fácil.\n Quando se trata de mensagens, só responde em códigos.\n Sigilo, segurança, e, francamente, um toque de paranoia.",
        {
          font: "16px Arial",
          color: "#000000",
          align: "center",
        }
      );
      text1.setOrigin(0.5);
    });

    this.time.delayedCall(17000, () => {
      if (text1) text1.destroy();
    });

    this.time.delayedCall(17500, () => {
      const text2 = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2 + 300,
        "- Felizmente, anotei os detalhes desse teatrinho cifrado no mesmo caderno...\n só espero que o café não tenha levado isso também.\n Além disso, acho melhor eu me livrar dessa página..",
        {
          font: "16px Arial",
          color: "#000000",
          align: "center",
        }
      );
      text2.setOrigin(0.5);
    });

    this.time.delayedCall(28000, () => {
      this.scene.start("Page13");
    });
  }
}
