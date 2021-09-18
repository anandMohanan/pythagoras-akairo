// const { Message, Client, MessageEmbed } = require("discord.js");
// const fetch = require("node-fetch");
// module.exports = {
//   name: "roast",
//   description: "returns a roast",
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
//       //console.log(client.config.owners[0]);
//       if (!args[0]) {
//         let roastArg = new MessageEmbed()
//           .setColor("#A348A6")
//           .setDescription("mention someone");
//         return message.reply({
//           embeds: [roastArg],
//           allowedMentions: { repliedUser: false },
//         });
//       }

//       if (user.id === client.config.owners[0]) {
//         let roastAnnan = new MessageEmbed()
//           .setColor("#A348A6")
//           .setDescription("How dare you roast annan!!!!!!!");
//         return message.reply({
//           embeds: [roastAnnan],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       if (user.id === message.author.id) {
//         let roastMention = new MessageEmbed()
//           .setColor("#A348A6")
//           .setDescription("You can not roast yourself");
//         return message.reply({
//           embeds: [roastMention],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       if (message.mentions.users.size < 1) {
//         let roastArg = new MessageEmbed()
//           .setColor("#A348A6")
//           .setDescription("You must mention someone to roast them.");
//         return message.reply({
//           embeds: [roastArg],
//           allowedMentions: { repliedUser: false },
//         });
//       }
//       let body = await fetch(
//         "https://evilinsult.com/generate_insult.php?lang=en&type=json"
//       );
//       let roast = await body.json();
//       let roastEmbed = new MessageEmbed()
//         .setColor("#cce1f2")
//         .setDescription(user.username + ", " + roast.insult);
//       await message.reply({
//         embeds: [roastEmbed],
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
const fetch = require("node-fetch");

module.exports = class RoastCommand extends Command {
  constructor() {
    super("roast", {
      aliases: ["roast"],
      description: {
        content: "returns a roast",
        usage: "roast",
        example: ["roast"],
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
      //console.log(person);
      let user = msg.mentions.users.first();
      //console.log(user);
      //console.log(client.config.owners[0]);
      if (!person) {
        let embed = CreateEmbed("info", "mention someone.");

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else if (user.id === this.client.config.owners[0]) {
        let embed = CreateEmbed("info", "How dare you roast annan!!!!!!!");

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else if (user.id === msg.author.id) {
        let embed = CreateEmbed("info", "You can not roast yourself");

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else if (msg.mentions.users.size < 1) {
        let embed = CreateEmbed(
          "info",
          "You must mention someone to roast them."
        );

        return msg.reply({
          embeds: [embed],
          allowedMentions: { repliedUser: false },
        });
      } else {
        let body = await fetch(
          "https://evilinsult.com/generate_insult.php?lang=en&type=json"
        );

        let roast = await body.json();
        let embed = CreateEmbed(
          "info",
          ` \`${user.username}\`, ${roast.insult}`
        );

        await msg.reply({
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
