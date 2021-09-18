const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { QuickClick } = require("weky");
module.exports = class QuickClickCommand extends Command {
  constructor() {
    super("quickclick", {
      aliases: ["quickclick", "qc"],
      description: {
        content: "quick click.",
        usage: "qc",
        examples: ["qc"],
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
      await QuickClick({
        message: msg,
        embed: {
          title: "✅ | Quick Click",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        time: 60000,
        waitMessage: "The buttons may appear anytime now!",
        startMessage:
          "First person to press the correct button will win. You have **{{time}}**!",
        winMessage:
          "GG, <@{{winner}}> pressed the button in **{{time}} seconds**.",
        loseMessage:
          "No one pressed the button in time. So, I dropped the game!",
        emoji: "👊",
        ongoingMessage:
          "A game is already runnning in <#{{channel}}>. You can't start a new one!",
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
