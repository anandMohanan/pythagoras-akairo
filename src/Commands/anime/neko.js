const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class HugCommand extends Command {
  constructor() {
    super("neko", {
      aliases: ["neko"],
      description: {
        content: "neko image",
        usage: "neko",
        examples: ["neko"],
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
  async exec(msg, { person }) {
    try {
      const body = await fetch("https://nekos.best/api/v1/nekos");
      let resp = await body.json();
      let embed = CreateEmbed("info").setImage(resp.url);

      msg.reply({
        //content: `${msg.author.username} hugs ${person.username} \n\n`,
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
