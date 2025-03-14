Aqui está o conteúdo formatado de forma mais organizada para um **README**. Eu adicionei seções e melhoraram a estrutura para facilitar a leitura e a compreensão:

---

# Fluxo e Funcionalidades do Jogo

**Por Bernardo Bertante Martins - Ciência da Computação**

Este documento descreve, de forma detalhada, o fluxo de jogo e as funcionalidades implementadas até o momento, visando orientar os jogadores interessados em compreender a experiência jogável inicial. Nele, serão apresentados trechos do roteiro narrativo, explicações sobre as interações com o ambiente (PC, bloco de notas e NPCs) e referências aos elementos de ensino de programação em Python integrados à narrativa. Ao longo do documento, serão inseridos trechos do texto original e prints ilustrativos de cada etapa.

---

## 1. Visão Geral do Jogo

O jogo é uma experiência de investigação narrativa, onde o jogador assume o papel de um detetive que retorna à pequena cidade onde cresceu para investigar o assassinato de uma jovem. A narrativa se desenrola através de interações com o ambiente – principalmente a interface de um computador e um bloco de notas – e diálogos com NPCs, que fornecem pistas e instruções por meio de códigos em Python.

### Objetivos Principais:
- Investigar o assassinato da jovem.
- Obter informações relevantes por meio de interações com NPCs, principalmente o influente Sr. Willow While.
- Aprender, de maneira integrada à narrativa, conceitos básicos de programação em Python, como o uso da função `print("")` e estruturas de repetição (por exemplo, o `for`).

---

## 2. Estrutura Narrativa e Fluxo de Jogo

### 2.1. Cena Inicial – Mensagem na Tela

**Contexto:**
Ao iniciar o jogo, o jogador se depara com uma mensagem que apresenta o contexto do caso:

> “Houve o assassinato de uma jovem na pequena cidade onde você, detetive, morou quando criança. Durante sua infância, você teve contato com várias pessoas desta cidade, mas o tempo passou e muitos rostos se tornaram esquecidos. Entretanto, o dono do hotel, Sr. Willow While, um homem de grande influência local, possui informações cruciais e seu número de telefone está salvo na sua agenda.”

**Propósito:**
A mensagem deixa claro que o primeiro passo da investigação será buscar informações com o Sr. Willow While, incentivando o jogador a explorar suas pistas e contatos.

![image](https://github.com/user-attachments/assets/1308fcaf-9aa4-4e21-8973-aab3172c979a)

---

### 2.2. Primeira Interação – A Mesa do Jogador

Após ler a mensagem, o jogador visualiza uma cena que simula sua visão ao olhar para a mesa, onde estão dispostos:

- Um computador, com o botão de ligar piscando.
- Um bloco de notas.

Esta cena introduz o ambiente interativo que o jogador irá explorar para avançar na investigação.

---

## 3. Interação com o Computador

### 3.1. Ligando o PC e Acessando o Chat

**Funcionamento:**  
Quando o jogador clica no botão de ligar do PC, é redirecionado para uma nova cena em que o computador é mostrado “ligado”. A única funcionalidade implementada no momento é o chat.

**Mecânica do Chat:**
- O jogador pode digitar mensagens.
- O NPC, Sr. Willow While, responde com base no output processado pelo servidor.
- **Importante:** O servidor espera entradas em código Python. Como o jogador ainda não domina essa linguagem, a comunicação com Willow While não é efetiva neste primeiro acesso.

**Consequência:**
Ao não conseguir se comunicar por meio do chat, o jogador precisa retornar à cena anterior (mesa com o computador e bloco de notas) para buscar mais pistas.

---

## 4. Uso do Bloco de Notas

### 4.1. Descoberta do Contato e a Mancha de Café

**Primeira Ação:**  
O jogador então se lembra que inicialmente foi lhe dada a informação de que o contato do Sr. Willow está na agenda, o que leva o jogador a clicar no bloco de notas.  
Ao fazer isso, é exibida uma cena que mostra o bloco de notas aberto com o número do Sr. Willow While anotado, porém parcialmente ilegível devido a uma mancha de café.

**Narrativa do Bloco de Notas:**  
Um texto na cena destaca a frustração com a mancha, explicando que, para evitar fraudes e garantir a autenticidade na comunicação, o Sr. Willow só se comunica por meio de códigos. Dessa forma, o jogador deve buscar os códigos que já estavam anotados em outra página do bloco, mas em primeiro momento, ele não precisará achar o meio pelo qual acessa outra página do bloco de notas.

---

### 4.2. Recuperação do Código de Comunicação

**Ação do Jogador:**  
Ao “arrancar” a página manchada, o jogador revela uma nova página contendo um exemplo de código em Python:

```python
print("")
```

**Significado:**  
Essa página funciona como um tutorial básico, informando que o formato de `print("")` é o método correto para se comunicar com o NPC no chat do PC.

---

## 5. Comunicação com o Sr. Willow While

### 5.1. Primeira Tentativa de Conversa

**Experiência Inicial:**  
Convencido de que o código `print("")` é o suficiente, o jogador liga o PC e tenta uma conversa convencional com o Sr. Willow, utilizando o formato aprendido.

**Desenvolvimento do Diálogo:**
- Inicialmente, a conversa segue normalmente.
- Quando o jogador aborda o tema do assassinato, o NPC responde com mensagens genéricas.

---

### 5.2. A Persistência Necessária e o Uso de Loop

**Desafio na Comunicação:**  
Se o jogador insiste demasiadamente com mensagens simples (vários `print()` sobre o mesmo assunto), o NPC começa a demonstrar irritação.

**Dica do NPC:**  
Em determinado momento, o Sr. Willow menciona que o assunto já foi discutido anteriormente, numa conversa ocorrida em um encontro na cafeteria. Esse comentário serve como pista para que o jogador volte ao bloco de notas e procure por mais instruções.

**A Instrução Secreta:**  
Ao explorar o bloco de notas, o jogador descobre que clicando no número da página atual, ele pode avançar para a próxima página, onde encontra uma explicação de como utilizar um loop em Python, especificamente a estrutura `for`.

**Implementação:**  
Após aprender a usar o loop, o jogador retorna ao chat e aplica o novo conhecimento (por exemplo, usando o seguinte código):

```python
for i in range(2):
    print("")
```

Com isso, ele consegue extrair informações mais valiosas do Sr. Willow.

---

## 6. Evolução da Investigação e Ensino de Novos Conceitos

### 6.1. Informação sobre a Família Constantino

**Desdobramento do Caso:**  
Após a utilização correta do loop no chat, o NPC finalmente fornece informações essenciais:

> “Você precisa investigar a família Constantino. A jovem assassinada teve algum envolvimento com eles ainda na infância, e eles são conhecidos por serem reservados e frios.”

**Integração com o Bloco de Notas:**  
Ao mencionar a família Constantino, o jogador automaticamente é direcionado para uma nova página no bloco de notas. Essa página serve para registrar as informações sobre a família e, simultaneamente, introduz o uso da palavra-chave `const` na programação.

**Impacto no Jogo:**
- A partir desse ponto, um novo local – a mansão da família Constantino – será desbloqueado no mapa, como parte do avanço investigativo (ainda não implementado), onde ensinará ao player sobre constantes na programação.

---

## 7. Conclusão e Próximos Passos

Este documento abrange as mecânicas implementadas até o momento, destacando:

- **Narrativa Imersiva:**  
  O uso de mensagens, cenas interativas e diálogos que conduzem a investigação de um assassinato, entrelaçando a história pessoal do detetive com pistas sobre o caso.

- **Integração de Programação:**  
  A mecânica de comunicação via códigos Python (inicialmente com `print("")` e, posteriormente, com estruturas de loop e a introdução do `const`) é central para a progressão no jogo, agregando um componente educacional de forma orgânica.

- **Fluxo de Jogo Interativo:**  
  A alternância entre o PC (chat) e o bloco de notas estimula o jogador a explorar o ambiente e buscar dicas, reforçando a ideia de persistência e aprendizado para obter informações valiosas dos NPCs.

### Próximos Desenvolvimentos:
- **Expansão do Mapa:**  
  A implementação de novos locais, como a mansão da família Constantino, que ampliará o ambiente investigativo e trará novas mecânicas de gameplay.

- **Aprimoramento do Sistema de Chat:**  
  Possível expansão das interações e maior profundidade na comunicação com NPCs, conforme o jogador progride no conhecimento de programação.

- **Mais Elementos Educativos:**  
  Integração de novos conceitos de programação que possam ser úteis tanto para a progressão do jogo quanto para o aprendizado dos jogadores.

---

Este documento serve como um guia detalhado para o funcionamento da parte jogável já implementada, garantindo que os jogadores compreendam a lógica e a progressão do jogo. Conforme novos elementos forem adicionados, o documento será atualizado para refletir as mudanças e expansões na narrativa e nas mecânicas de jogo.

---

Essa estrutura organiza o conteúdo e facilita a leitura, tornando o README mais acessível e claro. Se precisar de ajustes ou mais detalhes, é só avisar!
