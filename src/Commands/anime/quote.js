const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class QuoteCommand extends Command {
  constructor() {
    super("quote", {
      aliases: ["quote", "aq", "animequote"],
      description: {
        content: "return an anime quote",
        usage: "quote",
        example: ["quote"],
      },
      category: "anime",
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
      const body = await fetch("https://animechan.vercel.app/api/random");
      let resp = await body.json();

      let embed = CreateEmbed("info", resp.quote).setTitle(resp.character);
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
