const fetch = require("node-fetch");

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class BoredCommand extends Command {
  constructor() {
    super("bored", {
      aliases: ["bored"],
      description: {
        content: "tells you an activity to do when you're bored",
        usage: "bored",
        example: ["bored"],
      },
      category: "fun",
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
      const body = await fetch("https://www.boredapi.com/api/activity");
      const response = await body.json();
      const activity = response.activity;
      const embed = CreateEmbed("info", activity);
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      // msg.reply({ content: ans });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
