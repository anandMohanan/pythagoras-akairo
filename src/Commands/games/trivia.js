const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { Trivia } = require("weky");
module.exports = class TriviaCommand extends Command {
  constructor() {
    super("trivia", {
      aliases: ["trivia"],
      description: {
        content: "trivia game.",
        usage: "trivia",
        examples: ["trivia"],
      },
      category: "games",
      cooldown: 3000,
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg) {
    try {
      await Trivia({
        message: msg,
        embed: {
          title: "✅ | Trivia",
          description: "You only have **{{time}}** to guess the answer!",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        difficulty: "hard",
        thinkMessage: "I am thinking",
        winMessage:
          "GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.",
        loseMessage:
          "Better luck next time! The correct answer was **{{answer}}**.",
        emojis: {
          one: "1️⃣",
          two: "2️⃣",
          three: "3️⃣",
          four: "4️⃣",
        },
        othersMessage: "Only <@{{author}}> can use the buttons!",
        returnWinner: false,
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
