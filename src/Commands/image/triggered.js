const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = class triggeredCommand extends Command {
  constructor() {
    super("triggered", {
      aliases: ["triggered"],
      description: {
        content: "triggered image",
        usage: "triggered <@member>",
        examples: ["triggered @neimand"],
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
      let image = await new DIG.Triggered().getImage(avatar);

      let attach = new MessageAttachment(image, "ad.gif");
      const embed = CreateEmbed("info").setImage("attachment://ad.gif");
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
