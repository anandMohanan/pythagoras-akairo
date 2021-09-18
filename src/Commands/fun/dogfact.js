// const { Message, Client, MessageEmbed } = require("discord.js");
// const fetch = require("node-fetch");
// module.exports = {
//   name: "dogfact",
//   description: "returns a dogfact",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     try {
//       const res = await fetch("https://dog-api.kinduff.com/api/facts");
//       const fact = (await res.json()).facts[0];
//       const embed = new MessageEmbed()
//         .setTitle("Dog Fact")
//         .setDescription(fact)
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
const fetch = require("node-fetch");

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class DogFactCommand extends Command {
  constructor() {
    super("dogfact", {
      aliases: ["dogfact", "df"],
      description: {
        content: "returns a dog fact",
        usage: "df",
        example: ["df"],
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
      const res = await fetch("https://dog-api.kinduff.com/api/facts");
      const fact = (await res.json()).facts[0];
      const embed = CreateEmbed("info", fact);
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
