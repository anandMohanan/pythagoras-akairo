const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = class bobrossCommand extends Command {
  constructor() {
    super("bobross", {
      aliases: ["bobross"],
      description: {
        content: "bobross image",
        usage: "bobross <@member>",
        examples: ["bobross @neimand"],
      },
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",
        },
      ],
      category: "image",
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
      let avatar = await user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
      const level = 5;
      let image = await new DIG.Bobross().getImage(avatar);

      let attach = new MessageAttachment(image, "ad.png");
      const embed = CreateEmbed("info").setImage("attachment://ad.png");
      return await msg.channel.send({
        files: [attach],
        embeds: [embed],
        // allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
