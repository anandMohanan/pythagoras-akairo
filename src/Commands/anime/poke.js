const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

const fetch = require("node-fetch");

module.exports = class PokeCommand extends Command {
  constructor() {
    super("poke", {
      aliases: ["poke"],
      description: {
        content: "poke gif",
        usage: "poke [@member]",
        examples: ["poke @neimand"],
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
      const body = await fetch("https://nekos.best/api/v1/poke");
      let resp = await body.json();
      let embed = CreateEmbed("info").setImage(resp.url).setTitle(`${msg.author.username} pokes ${person.username}`);
      msg.reply({
        //content: `\>>> ${msg.author.username} poke ${person.username} \n\n`,
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
