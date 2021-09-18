const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class AvatarCommand extends Command {
  constructor() {
    super("avatar", {
      aliases: ["avatar", "av"],
      description: {
        content: "shows an avatar of a user",
        usage: "av <member>",
        examples: ["av @neimand"],
      },
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",
        },
      ],
      category: "general",
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
      let user = person || msg.author;
      let avatar = user.displayAvatarURL({ size: 4096, dynamic: true });
      return msg.channel.send({
        embeds: [CreateEmbed("info").setImage(avatar)],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
