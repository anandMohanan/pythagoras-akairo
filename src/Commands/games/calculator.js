const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { Calculator } = require("weky");
module.exports = class CalculatorCommand extends Command {
  constructor() {
    super("calculator", {
      aliases: ["calculator", "calc"],
      description: {
        content: "use calculator",
        usage: "calculator",
        examples: ["calculator"],
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
      await Calculator({
        message: msg,
        embed: {
          title: "✅ | Calculator",
          color: "#2F3136",
          footer: "pythagoras bot",
          timestamp: false,
        },
        disabledQuery: "Calculator is disabled!",
        invalidQuery: "The provided equation is invalid!",
        othersMessage: "Only <@{{author}}> can use the buttons!",
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
