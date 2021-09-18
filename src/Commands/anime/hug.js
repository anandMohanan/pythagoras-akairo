const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class HugCommand extends Command {
  constructor() {
    super("hug", {
      aliases: ["hug"],
      description: {
        content: "hug gif",
        usage: "hug [@member]",
        examples: ["hug @neimand"],
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
      const body = await fetch("https://nekos.best/api/v1/hug");
      let resp = await body.json();
      let embed = CreateEmbed("info")
        .setImage(resp.url)
        .setTitle(`${msg.author.username} hugs ${person.username}`);
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
