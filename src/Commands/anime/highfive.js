const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class HighfiveCommand extends Command {
  constructor() {
    super("highfive", {
      aliases: ["highfive", "hf"],
      description: {
        content: "highfive gif",
        usage: "highfive [@member]",
        examples: ["highfive @neimand"],
      },
      category: "anime",
      cooldown: 3000,
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",
          prompt: {
            start: "mention someone",
          },
        },
      ],
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg, { person }) {
    try {
      const body = await fetch("https://nekos.best/api/v1/highfive");
      let resp = await body.json();
      let embed = CreateEmbed("info")
        .setImage(resp.url)
        .setTitle(`${msg.author.username} highfives ${person.username}`);
      msg.reply({
        //content: `\>>> ${msg.author.username} highfives ${person.username} \n\n`,
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
