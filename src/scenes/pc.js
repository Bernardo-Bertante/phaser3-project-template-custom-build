import Phaser from "phaser";

export default class PC extends Phaser.Scene {
  constructor() {
    super("PC_on");
    this.playerInputs = {};
  }

  preload() {
    this.load.image("PC_on", "assets/PC.png");
    this.load.image("chatScreen", "assets/ChatWindown.png");
    this.load.image("button", "assets/Button.png");
    this.load.image("mainScreen", "assets/GeneralScreen.png");
  }

  create() {
    const mainScreen = this.add.image(0, 0, "mainScreen").setOrigin(0, 0);
    const pc_on = this.add.image(0, 0, "PC_on").setOrigin(0, 0);
    const chatScreen = this.add.image(0, 0, "chatScreen").setOrigin(0, 0);
    const button = this.add.image(0, 0, "button").setOrigin(0, 0);

    mainScreen.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );
    pc_on.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    chatScreen.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );
    button.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    const chatContainer = this.createScrollableChat(745, 360, 958, 310);

    const inputElement = this.createInputField(740, 580, 600, 80);

    const offButton = this.add.zone(1288, 690, 100, 60);
    offButton.setOrigin(0.5);
    offButton.setInteractive();

    offButton.on("pointerdown", () => {
      this.scene.start("InicialScene");
    });

    const blinkText = this.add.text(
      1313, // Posição X
      772, // Posição Y
      ".",
      {
        font: "240px Arial",
        color: "#ff0000",
        fontStyle: "bold",
      }
    );
    blinkText.setOrigin(1);

    this.tweens.add({
      targets: blinkText,
      alpha: 0, // Transparente
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    const sendButton = this.add.zone(0, 0, 1200, 1200).setInteractive();

    let inputCount = 0;

    sendButton.on("pointerdown", async () => {
      const temas = {
        casual: [
          "bom dia",
          "as coisas andam bem?",
          "tranquilo",
          "tudo bem",
          "como está",
          "saudações",
          "e aí",
          "tudo certo",
          "como vai",
        ],
        assassinato: [
          "assassinato",
          "crime",
          "homicídio",
          "morte",
          "incidente",
          "tragédia",
          "investigação",
          "caso",
          "ada logic",
          "jovem",
        ],
      };
      const rawPlayerCode = inputElement.value;
      const playerCode = rawPlayerCode.trim();

      if (playerCode) {
        for (const palavras of Object.values(temas)) {
          for (const palavra of palavras) {
            if (playerCode.includes(palavra)) {
              if (playerCode.toLowerCase().includes("for")) {
                inputCount = -1;
              } else {
                inputCount++;
                s;
              }
            }
          }
        }

        try {
          const serverResponse = await this.enviarCodigo(playerCode);

          if (serverResponse.startsWith("Erro")) {
            this.addMessageToChat(chatContainer, `Você digitou:`, "white");
            this.addFormattedMessageToChat(
              chatContainer,
              rawPlayerCode,
              "white"
            );
            const npcErroMessage = this.mensagemErro(serverResponse);
            this.addMessageToChat(chatContainer, `${npcErroMessage}`, "red");
          } else {
            this.addMessageToChat(
              chatContainer,
              `Você: ${serverResponse}`,
              "white"
            );
            this.addMessageToChat(chatContainer, `seu código:`, "gray");
            this.addFormattedMessageToChat(
              chatContainer,
              rawPlayerCode,
              "gray"
            );

            const npcResponse = this.responderNPC(serverResponse, inputCount);
            this.addMessageToChat(
              chatContainer,
              `Sr. Willow While: ${npcResponse}`,
              "yellow"
            );
          }
        } catch (error) {
          console.error("Erro ao enviar código:", error);
          this.addMessageToChat(
            chatContainer,
            "Sr. Willow While: Parece que houve um problema técnico. Tente novamente.",
            "red"
          );
        } finally {
          inputElement.value = "";
        }
      }
    });
  }

  addFormattedMessageToChat(container, message, color) {
    const preElement = document.createElement("pre");
    preElement.style.color = color;
    preElement.textContent = message;
    container.appendChild(preElement);
  }

  createScrollableChat(x, y, width, height) {
    const chatDiv = document.createElement("div");
    chatDiv.style.position = "absolute";
    chatDiv.style.left = `${x - width / 2}px`;
    chatDiv.style.top = `${y - height / 2}px`;
    chatDiv.style.width = `${width}px`;
    chatDiv.style.height = `${height}px`;
    chatDiv.style.overflowY = "auto";
    chatDiv.style.background = "#000";
    chatDiv.style.border = "2px solid #fff";
    chatDiv.style.padding = "10px";
    chatDiv.style.color = "#fff";
    chatDiv.style.fontSize = "16px";
    chatDiv.style.lineHeight = "1.5";

    document.body.appendChild(chatDiv);

    this.events.on("shutdown", () => chatDiv.remove());
    this.events.on("destroy", () => chatDiv.remove());

    return chatDiv;
  }

  createInputField(x, y, width, height) {
    const inputElement = document.createElement("textarea");
    inputElement.placeholder = "Digite seu código Python...";
    inputElement.style.position = "absolute";
    inputElement.style.left = `${x - width / 2}px`;
    inputElement.style.top = `${y - height / 2}px`;
    inputElement.style.width = `${width}px`;
    inputElement.style.height = `${height}px`;
    inputElement.style.background = "#fff";
    inputElement.style.border = "2px solid #000";
    inputElement.style.fontSize = "20px";
    inputElement.style.padding = "10px";

    document.body.appendChild(inputElement);

    this.events.on("shutdown", () => inputElement.remove());
    this.events.on("destroy", () => inputElement.remove());

    return inputElement;
  }

  addMessageToChat(chatContainer, message, color) {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.style.color = color;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  async enviarCodigo(codigo) {
    try {
      const response = await fetch("http://192.168.1.54:5001/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codigo }),
      });

      const data = await response.json();
      return data.output;
    } catch (error) {
      return "Erro: Não foi possível se comunicar com o servidor.";
    }
  }

  mensagemErro(erro) {
    const reflexoes = [
      "- Em meio à conversa, você pensa - 'Parece que minhas palavras não estão bem definidas.'",
      "- Você sente que algo no que disse está errado, mas não sabe ao certo o que.",
      "- Um silêncio constrangedor surge enquanto você tenta encontrar palavras melhores.",
      "- Talvez seja melhor reformular o que está tentando dizer.",
    ];

    const reflexao = reflexoes[Math.floor(Math.random() * reflexoes.length)];

    console.error("Erro do servidor:", erro);

    return reflexao;
  }

  responderNPC(output, inputCount) {
    const temas = {
      casual: [
        "bom dia",
        "como vão as coisas",
        "tranquilo",
        "tudo bem",
        "como está",
        "saudações",
        "e aí",
        "tudo certo",
        "como vai",
      ],
      assassinato: [
        "assassinato",
        "crime",
        "homicídio",
        "morte",
        "incidente",
        "tragédia",
        "investigação",
        "caso",
        "ada logic",
        "jovem",
      ],
    };

    const respostas = {
      casual: [
        "Ah, detetive... É raro ver alguém começar uma conversa com bons modos por aqui. Um bom dia para você também.",
        "Por enquanto, sim. Mas uma cidade como essa sempre guarda seus segredos.",
        "Tudo tranquilo por enquanto, mas nunca se sabe o que pode acontecer.",
        "Saudações, detetive. Espero que esteja pronto para desvendar mais mistérios.",
        "Bom dia. Espero que o clima de mistério não esteja pesando em seus ombros.",
      ],
      investigacao: [
        "Assassinato? Hmmm... Essas coisas podem acontecer mesmo nos lugares mais refinados.",
        "Talvez... Ou talvez não. Mas uma coisa eu posso dizer: persistência sempre nos leva aonde queremos.",
        "Você está certo em investigar, mas lembre-se: nem todas as respostas estão à vista.",
        "Ouvi rumores, mas não sou do tipo que entrega informações sem motivo.",
        "Esses casos de assassinato são complicados. Mas com um detetive persistente, algo sempre vem à tona.",
      ],
      irritado: [
        "Já disse, detetive... Eu sou um homem ocupado. Não gosto de insistência sem propósito. Pensei já ter deixado isso claro em nosso encontro na cafeteria!",
        "Ouça bem: insistência não é persistência. Se quiser respostas, talvez seja hora de aprender a agir de forma eficiente. Parece que não fui claro na cafeteria..",
        "Você acha que repetir perguntas vai magicamente abrir minha boca? Precisa ser mais criativo. Creio que nossa conversa na cafeteria não tenha valido muito..",
        "Detetive, estou começando a perder a paciência. Talvez você devesse aprender algo novo antes de voltar. Aquele café foi realmente um desperdício!",
        "Se você insistir sem propósito, não verá progresso. Use a cabeça, não só a boca. Creio ter se esquecido do que lhe disse na cafeteria..",
      ],
      dicas: [
        "Ah, vejo que aprendeu algo importante... Persistência inteligente, hein?",
        "Bem, já que você provou ser capaz, vou lhe dizer algo: ouvi rumores sobre alguém que visitou o local do crime à noite. Pode não ser coincidência.",
        "Continue usando essa sua persistência inteligente e talvez chegue ao culpado.",
        "Uma pista? Bem, ouvi falar que há uma testemunha silenciosa na cena do crime... pode valer a pena investigar.",
        "Cuidado com os Constantino... dizem que são frios como o gelo, focados e imutáveis, mas têm um caráter que nunca pode ser comprado.",
        "Ouvi dizer que os Constantino têm uma filosofia clara: 'Nada muda, nada quebra.' Talvez isso explique seu comportamento implacável.",
      ],
      default:
        "Não sei ao certo onde você quer chegar. Pode reformular sua pergunta?",
    };

    const textoNormalizado = output.toLowerCase();

    for (const [tema, palavras] of Object.entries(temas)) {
      for (const palavra of palavras) {
        if (textoNormalizado.includes(palavra)) {
          if (tema === "casual") {
            return respostas.casual[
              Math.floor(Math.random() * respostas.casual.length)
            ];
          }

          if (tema === "assassinato") {
            if (inputCount < 0) {
              let random = Math.random() * respostas.dicas.length;
              if (random >= 4) {
                this.time.delayedCall(2000, () => {
                  const text2 = this.add.text(
                    this.scale.width / 2,
                    this.scale.height / 2 + 400,
                    "- Preciso anotar essas informações valiosas do Sr. While..",
                    {
                      font: "16px Arial",
                      color: "#ffffff",
                      align: "center",
                    }
                  );
                  text2.setOrigin(0.5);
                });

                this.time.delayedCall(17000, () => {
                  if (text1) text1.destroy();
                });

                this.time.delayedCall(7000, () => {
                  this.scene.start("Page16");
                });
              }
              return respostas.dicas[Math.floor(random)];
            } else if (inputCount > 2) {
              return respostas.irritado[
                Math.floor(Math.random() * respostas.irritado.length)
              ];
            } else {
              return respostas.investigacao[
                Math.floor(Math.random() * respostas.investigacao.length)
              ];
            }
          }
        }
      }
    }

    return respostas.default;
  }
}
