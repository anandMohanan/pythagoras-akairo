// const {
//   Client,
//   Message,
//   MessageEmbed,
//   MessageAttachment,
// } = require("discord.js");
// const DIG = require("discord-image-generation");
// module.exports = {
//   name: "ad",
//   description: "advertisement image",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     let user;
//     if (message.mentions.users.first()) {
//       user = message.mentions.users.first();
//     } else if (args[0]) {
//       user = message.guild.members.cache.get(args[0]).user;
//     } else {
//       user = message.author;
//     }

//     let avatar = await user.displayAvatarURL({ dynamic: false, format: "png" });
//     let image = await new DIG.Ad().getImage(avatar);
//     let attach = new MessageAttachment(image, "ad.png");
//     const embed = new MessageEmbed()
//       .setTimestamp()
//       .setColor("#cce1f2")
//       .setImage("attachment://ad.png");
//     return await message.reply({
//       files: [attach],
//       embeds: [embed],
//       allowedMentions: { repliedUser: false },
//     });
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = class adCommand extends Command {
  constructor() {
    super("ad", {
      aliases: ["ad"],
      description: {
        content: "advertisement image",
        usage: "ad <@member>",
        examples: ["ad @neimand"],
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
      let image = await new DIG.Ad().getImage(avatar);
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
