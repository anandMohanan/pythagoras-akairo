// const {
//   Client,
//   Message,
//   MessageEmbed,
//   MessageAttachment,
// } = require("discord.js");
// const DIG = require("discord-image-generation");
// module.exports = {
//   name: "bed",
//   description: "bed image",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       if (message.mentions.users.size < 1)
//         return message.channel.send("mention someone").then((msg) => {
//           msg.delete({ timeout: 10000 });
//         });
//       let user = message.mentions.users.first();
//       let img2 = user.displayAvatarURL({ dynamic: false, format: "png" });

//       let img1 = message.author.displayAvatarURL({
//         dynamic: false,
//         format: "png",
//       });
//       //let jakfh = new Discord.MessageAttachment(img1, "fdgdfg.png");
//       //let jhjhg = new Discord.MessageAttachment(img2, "hjfgfd.png");
//       //message.channel.send(jakfh);
//       //message.channel.send(jhjhg);
//       let image = await new DIG.Bed().getImage(img1, img2);
//       let attach = new MessageAttachment(image, "bed.png");
//       const embed = new MessageEmbed()
//         .setTimestamp()
//         .setColor("#cce1f2")
//         .setImage("attachment://bed.png");
//       return await message.reply({
//         files: [attach],
//         embeds: [embed],
//         allowedMentions: { repliedUser: false },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageAttachment } = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = class BedCommand extends Command {
  constructor() {
    super("bed", {
      aliases: ["bed"],
      description: {
        content: "bed image",
        usage: "bed [@member]",
        examples: ["bed @neimand"],
      },
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",

          prompt: {
            start: "mention a member.",
            retry: "mention a member.",
          },
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
      let user = person;
      let img2 = user.displayAvatarURL({ dynamic: false, format: "png" });

      let img1 = msg.author.displayAvatarURL({
        dynamic: false,
        format: "png",
      });

      let image = await new DIG.Bed().getImage(img1, img2);
      let attach = new MessageAttachment(image, "bed.png");
      const embed = CreateEmbed("info").setImage("attachment://bed.png");
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
