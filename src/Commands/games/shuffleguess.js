const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { ShuffleGuess } = require("weky");
module.exports = class ShuffleguessCommand extends Command {
  constructor() {
    super("shuffleguess", {
      aliases: ["shuffleguess", "sg"],
      description: {
        content: "shuffle guess.",
        usage: "sg [member]",
        examples: ["sg @neimand"],
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
      await ShuffleGuess({
        message: msg,
        embed: {
          title: "✅ | Shuffle Guess",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        word: ["amogus"],
        button: { cancel: "Cancel", reshuffle: "Reshuffle" },
        startMessage:
          "I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!",
        winMessage:
          "GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**",
        loseMessage:
          "Better luck next time! The correct answer was **{{answer}}**.",
        incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        time: 60000,
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
