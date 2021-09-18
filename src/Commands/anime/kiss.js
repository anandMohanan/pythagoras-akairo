const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class KissCommand extends Command {
  constructor() {
    super("kiss", {
      aliases: ["kiss"],
      description: {
        content: "kiss gif",
        usage: "kiss [@member]",
        examples: ["kiss @neimand"],
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
      const body = await fetch("https://nekos.best/api/v1/kiss");
      let resp = await body.json();
      let embed = CreateEmbed("info")
        .setImage(resp.url)
        .setTitle(`${msg.author.username} kisses ${person.username}`);
      msg.reply({
        // content: `\>>> ${msg.author.username} kisses ${person.username} \n\n`,
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
