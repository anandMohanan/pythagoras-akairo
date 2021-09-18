// const { Client, Message, MessageEmbed } = require("discord.js");
// module.exports = {
//   name: "lock",
//   description: "locks the whole server",
//   userPermissions: ["MANAGE_CHANNELS"],
//   botPermissions: ["MANAGE_CHANNELS"],

//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     const channels = message.guild.channels.cache.filter(
//       (ch) => ch.type !== "category"
//     );
//     if (!args[0]) {
//       message.channel.send({ content: "usage =lock <on> || <off>" });
//     }
//     try {
//       if (args[0] === "on") {
//         channels.forEach((channel) => {
//           // channel.permissionOverwrites
//           //   .edit(message.guild.roles.everyone, {
//           //     SEND_MESSAGES: false,
//           //   })
//           channel.permissionOverwrites
//             .edit(
//               message.guild.roles.cache.find(
//                 (e) => e.name.toLowerCase().trim() === "@everyone"
//               ),
//               {
//                 SEND_MESSAGES: false,
//               }
//             )
//             .then(() => {
//               channel.setName((channel.name += `🔐`));
//             });
//         });
//         let lockdone = new MessageEmbed()
//           .setColor("#cce1f2")
//           .setDescription(`locked all channels`);
//         return message.reply({
//           embeds: [lockdone],
//           allowedMentions: { repliedUser: false },
//         });
//       } else if (args[0] === "off") {
//         channels.forEach((channel) => {
//           channel.permissionOverwrites
//             .edit(
//               message.guild.roles.cache.find(
//                 (e) => e.name.toLowerCase().trim() === "@everyone"
//               ),
//               {
//                 SEND_MESSAGES: true,
//               }
//             )
//             .then(() => {
//               channel.setName(channel.name.replace("🔐", ""));
//             });
//         });
//         let unlockdone = new MessageEmbed()
//           .setColor("#cce1f2")
//           .setDescription(`unlocked all channels`);
//         return message.reply({
//           embeds: [unlockdone],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class LockCommand extends Command {
  constructor() {
    super("lock", {
      aliases: ["lock"],
      description: {
        content: "locks the whole server.",
        usage: "lock <on|off>",
        example: ["lock on"],
      },
      category: "moderation",
      cooldown: 3000,
      args: [
        {
          id: "lockstate",
          type: "string",
          prompt: {
            start: " on or off!Type one",
            retry: "on || off?",
          },
        },
      ],
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg, { lockstate }) {
    try {
      if (!msg.member.permissions.has("MANAGE_CHANNELS"))
        return msg.reply({
          embeds: [
            CreateEmbed(
              "warn",
              `⛔ | you do not have enough permissions to run this command.`
            ),
          ],
        });

      if (!msg.member.guild.me.permissions.has("MANAGE_CHANNELS"))
        return msg.reply({
          embeds: [
            CreateEmbed(
              "warn",
              `⛔ | i do not have enough permissions to run this command.`
            ),
          ],
        });
      const channels = msg.guild.channels.cache.filter(
        (ch) => ch.type !== "category"
      );
      if (lockstate === "on") {
        channels.forEach((channel) => {
          // channel.permissionOverwrites
          //   .edit(message.guild.roles.everyone, {
          //     SEND_MESSAGES: false,
          //   })
          channel.permissionOverwrites
            .edit(
              msg.guild.roles.cache.find(
                (e) => e.name.toLowerCase().trim() === "@everyone"
              ),
              {
                SEND_MESSAGES: false,
              }
            )
            .then(() => {
              channel.setName((channel.name += `🔐`));
            });
        });

        return msg.channel.send({
          embeds: [CreateEmbed("info", `✅ | locked all channels!!`)],
          allowedMentions: { repliedUser: false },
        });
      } else if (lockstate === "off") {
        channels.forEach((channel) => {
          channel.permissionOverwrites
            .edit(
              msg.guild.roles.cache.find(
                (e) => e.name.toLowerCase().trim() === "@everyone"
              ),
              {
                SEND_MESSAGES: true,
              }
            )
            .then(() => {
              channel.setName(channel.name.replace("🔐", ""));
            });
        });

        return msg.channel.send({
          embeds: [CreateEmbed("info", `✅ | unlocked all the channels.`)],
          allowedMentions: { repliedUser: false },
        });
      }
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
