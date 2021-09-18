// const { Message, Client, MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "coin",
//   description: "flips a coin and returns the value",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       const randomNumber = Math.round(Math.random());
//       const ans = ["heads", "tails"];
//       const embed = new MessageEmbed()
//         .setTitle(ans[randomNumber])

//         .setColor("#cce1f2");
//       message.reply({
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

module.exports = class CoinCommand extends Command {
  constructor() {
    super("coin", {
      aliases: ["coin", "flip"],
      description: {
        content: "flips a coin and returns the value",
        usage: "coin",
        example: ["coin"],
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
      const randomNumber = Math.round(Math.random());
      const ans = ["heads", "tails"];
      const embed = CreateEmbed("info", ans[randomNumber]);
      msg.reply({ embeds: [embed] });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
