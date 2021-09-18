// const { Message, Client, MessageEmbed } = require("discord.js");
// const fetch = require("node-fetch");
// module.exports = {
//   name: "advice",
//   description: "returns an advice",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       const body = await fetch("http://api.adviceslip.com/advice");
//       const advice = await body.json();
//       const ans = advice.slip.advice;
//       let adviceEmbed = new MessageEmbed()
//         .setAuthor("Advice")
//         .setColor("#cce1f2 ")
//         .setDescription(ans);
//       message.reply({
//         embeds: [adviceEmbed],
//         allowedMentions: { repliedUser: false },
//       });
//     } catch (err) {
//       message.channel.send(
//         `An error occurred: \`${err.message}\`. Try again later!`
//       );
//     }
//   },
// };
const fetch = require("node-fetch");

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class AdviceCommand extends Command {
  constructor() {
    super("advice", {
      aliases: ["advice"],
      description: {
        content: "returns an advice",
        usage: "advice",
        example: ["advice"],
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
      const body = await fetch("http://api.adviceslip.com/advice");
      const advice = await body.json();
      const ans = advice.slip.advice;
      const embed = CreateEmbed("info", ans);
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      // msg.reply({ content: ans });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
