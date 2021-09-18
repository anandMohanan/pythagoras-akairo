const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class serversCommand extends Command {
  constructor() {
    super("servers", {
      aliases: ["servers"],
      description: {
        content: "shows an list of servers the bot is in",
        usage: "servers",
        examples: ["servers"],
      },

      category: "general",
      cooldown: 3000,
      ownerOnly: true,
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg) {
    try {
      let serverList = Array.from(this.client.guilds.cache.values());
      return msg.channel.send({
        embeds: [CreateEmbed("info", `${serverList.join("\n")}`)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
