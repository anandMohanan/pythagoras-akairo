// const { Message, Client, MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "dick",
//   description: "returns the size of your dick",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       let randomNumber = Math.floor(Math.random() * 18);
//       const cockSize = randomNumber;
//       const balls = "8";
//       const shaft = "=".repeat(cockSize);
//       const head = "D";
//       const cock = balls + shaft + head;
//       let pingEmbed = new MessageEmbed()
//         .setColor("#cce1f2")
//         .setAuthor(`${cockSize} inch(es)`)
//         .setDescription(cock);
//       message.reply({
//         embeds: [pingEmbed],
//         allowedMentions: { repliedUser: false },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class DickCommand extends Command {
  constructor() {
    super("dick", {
      aliases: ["dick"],
      description: {
        content: "returns the size of your dick",
        usage: "dick",
        example: ["dick"],
      },
      category: "fun",
      cooldown: 3000,
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg) {
    try {
      let randomNumber = Math.floor(Math.random() * 18);
      const cockSize = randomNumber;
      const balls = "8";
      const shaft = "=".repeat(cockSize);
      const head = "D";
      const cock = balls + shaft + head;
      const embed = CreateEmbed("info", cock);
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
