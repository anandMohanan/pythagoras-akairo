// const { Message, Client, MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "love",
//   description: "returns an affinity",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       let user = message.mentions.users.first();
//       //console.log(user);
//       let randomUser = message.guild.members.cache.random().user;
//       const affinity = Math.round(Math.random() * 100);
//       if (!args[0]) {
//         // let loveMention = new Discord.MessageEmbed()
//         //   .setColor("#A348A6")
//         //   .setDescription(
//         //     `${user.username} is a ${affinity}% match for ${message.author.username}`
//         //   );
//         // return message.lineReply(loveMention);
//         let loveNoMention = new MessageEmbed()
//           .setTitle("💖 ,love affinity")
//           .setColor("#A348A6")
//           .setDescription(
//             `
//             ${randomUser} is a ${affinity}% match for ${message.author.username}
//             `
//           );
//         return message.reply({
//           embeds: [loveNoMention],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       if (user.id === client.config.owners[0]) {
//         let roastAnnan = new MessageEmbed()
//           .setColor("#A348A6")
//           .setDescription("No.");
//         return message.reply({
//           embeds: [roastAnnan],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       if (user.id === message.author.id) {
//         let loveMention = new MessageEmbed()
//           .setTitle("💖 ,love affinity")
//           .setColor("#A348A6")
//           .setDescription(
//             `
//             ${user.username} is a ${affinity}% match for ${message.author.username}
//             `
//           );
//         return message.reply({
//           embeds: [loveMention],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       let loveMention = new MessageEmbed()
//         .setTitle("💖 ,love affinity")
//         .setColor("#cce1f2")
//         .setDescription(
//           `
//           ${user.username} is a ${affinity}% match for ${message.author.username}
//           `
//         );
//       return message.reply({
//         embeds: [loveMention],
//         allowedMentions: { repliedUser: false },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageEmbed } = require("discord.js");
module.exports = class LoveCommand extends Command {
  constructor() {
    super("love", {
      aliases: ["love", "match", "couple"],
      description: {
        content: "returns an affinity",
        usage: "love",
        example: ["love"],
      },
      category: "fun",
      cooldown: 3000,
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",
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
      let user = msg.mentions.users.first();

      const affinity = Math.round(Math.random() * 100);
      if (!person) {
        let randomUser = msg.guild.members.cache.random().user;
        console.log(randomUser);
        let embed = CreateEmbed(
          "info",
          `
        ${randomUser.username} is a \`${affinity}%\` match for ${msg.author.username}
        `
        );

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else if (user.id === msg.author.id) {
        let embed = CreateEmbed(
          "info",
          `
            ${user.username} is a \`${affinity}%\` match for ${msg.author.username}
            `
        );

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else {
        let embed = CreateEmbed(
          "info",
          `
          ${user.username} is a \`${affinity}%\` match for ${msg.author.username}
          `
        );

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      }
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
