// const { Message, Client, MessageEmbed } = require("discord.js");

// module.exports = {
//   name: "8ball",
//   description: "Asks the Magic 8-Ball for some psychic wisdom",
//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     const answers = [
//       "It is certain.",
//       "It is decidedly so.",
//       "Without a doubt.",
//       "Yes - definitely.",
//       "You may rely on it.",
//       "As I see it, yes.",
//       "Most likely.",
//       "Outlook good.",
//       "Yes.",
//       "Signs point to yes.",
//       "Reply hazy, try again.",
//       "Ask again later.",
//       "Better not tell you now.",
//       "Cannot predict now.",
//       "Concentrate and ask again.",
//       "Don't count on it.",
//       "My reply is no.",
//       "My sources say no.",
//       "Outlook not so good.",
//       "Very doubtful.",
//     ];
//     try {
//       const question = args.join(" ");
//       if (!question) return message.reply("Please provide a question to ask");
//       const embed = new MessageEmbed()
//         .setTitle("The Magic 8-Ball")
//         .addField("Question", question)
//         .addField(
//           "Answer",
//           `${answers[Math.floor(Math.random() * answers.length)]}`
//         )
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

module.exports = class BallCommand extends Command {
  constructor() {
    super("8ball", {
      aliases: ["8ball", "8b"],
      description: {
        content: "Asks the Magic 8-Ball for some psychic wisdom",
        usage: "8b [string]",
        example: ["8b am i gay?"],
      },
      category: "fun",
      cooldown: 3000,
      args: [
        {
          id: "question",
          type: "string",
          match: "rest",
          prompt: {
            start: "Type your question",
          },
        },
      ],
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg, { question }) {
    try {
      const answers = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes - definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
      ];
      const ques = question;
      if (!question)
        return msg.reply({
          content: "Please provide a question to ask",
          allowedMentions: { repliedUser: false },
        });
      const embed = CreateEmbed("info", `**Question:** ${ques}`).addField(
        "Answer:",
        `${answers[Math.floor(Math.random() * answers.length)]}`
      );
      msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
