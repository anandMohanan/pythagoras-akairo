const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { NeverHaveIEver } = require("weky");
module.exports = class NeverhaveCommand extends Command {
  constructor() {
    super("neverhaveiever", {
      aliases: ["neverhaveiever", "nhie"],
      description: {
        content: "never have i ever.",
        usage: "nhie",
        examples: ["nhie"],
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
      await NeverHaveIEver({
        message: msg,
        embed: {
          title: "✅ | Never Have I Ever",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        thinkMessage: "I am thinking",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        buttons: { optionA: "Yes", optionB: "No" },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
