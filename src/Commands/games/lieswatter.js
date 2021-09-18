const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { LieSwatter } = require("weky");
module.exports = class LieCommand extends Command {
  constructor() {
    super("lieswatter", {
      aliases: ["lieswatter", "ls"],
      description: {
        content: "liew swatter",
        usage: "ls",
        examples: ["ls"],
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
      await LieSwatter({
        message: msg,
        embed: {
          title: "✅ | Lie Swatter",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        thinkMessage: "I am thinking",
        winMessage:
          "GG, It was a **{{answer}}**. You got it correct in **{{time}}**.",
        loseMessage: "Better luck next time! It was a **{{answer}}**.",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        buttons: { true: "Truth", lie: "Lie" },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
