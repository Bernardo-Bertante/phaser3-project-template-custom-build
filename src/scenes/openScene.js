import Phaser from "phaser";

export default class OpenScene extends Phaser.Scene {
  constructor() {
    super("OpenScene");
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor("#000");

    const text = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      "- O caso caiu no meu colo como um trovão em noite clara: Ada Logic, a jovem prodígio da cidade, \nfoi encontrada morta sob circunstâncias misteriosas. Uma mente brilhante apagada antes do tempo.\n Agora cabe a mim decifrar essa equação sombria — cada pista, cada detalhe, até que a verdade venha à tona.",
      {
        font: "26px Arial",
        color: "#ffff00",
        align: "center",
      }
    );
    text.setOrigin(0.5);

    this.time.delayedCall(6500, () => {
      text.destroy();
    });

    this.time.delayedCall(7000, () => {
      const text = this.add.text(
        this.scale.width / 2,
        this.scale.height / 2,
        "- Lembro de um velho amigo que conhece mais segredos dessa cidade do que qualquer confessor. \nSe alguém souber o que está por trás da morte de Ada Logic, é ele.\n Claro, falar com ele não é simples — cada minuto custa caro, e ele odeia desperdício. \nMas acho que ainda tenho o número dele anotado no meu caderno...\n Isso, se o tempo e o descuido não tiverem levado essa página junto.",
        {
          font: "26px Arial",
          color: "#ffff00",
          align: "center",
        }
      );
      text.setOrigin(0.5);
    });

    this.time.delayedCall(14000, () => {
      this.scene.start("InicialScene");
    });
  }
}
