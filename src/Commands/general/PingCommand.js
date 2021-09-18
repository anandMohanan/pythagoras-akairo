const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "pong"],
      description: {
        content: "ping pong",
        usage: "ping",
        examples: ["ping"],
      },
      category: "general",
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
      const message = await msg.channel.send("Getting info...");
      const embed = CreateEmbed("info")
        .addField(
          "⏳ Latency ",
          `__**${message.createdTimestamp - msg.createdTimestamp}ms**__`
        )
        .addField("💓 API", `__**${Math.floor(this.client.ws.ping)}ms**__`)
        .setTimestamp();
      setTimeout(() => {
        message.edit({ content: null, embeds: [embed] });
      }, 500);
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
