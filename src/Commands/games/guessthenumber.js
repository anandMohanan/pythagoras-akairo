const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { GuessTheNumber } = require("weky");
module.exports = class GuessCommand extends Command {
  constructor() {
    super("guessthenumber", {
      aliases: ["guessthenumber", "gth"],
      description: {
        content: "guess the number",
        usage: "gth",
        examples: ["gth"],
      },

      category: "games",
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
      const randomNumber = Math.floor(Math.random() * 1000);
      await GuessTheNumber({
        message: msg,
        embed: {
          title: "✅ | Guess The Number",
          description: "You have **{{time}}** to guess the number.",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        publicGame: true,
        number: randomNumber,
        time: 60000,
        winMessage: {
          publicGame:
            "GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}",
          privateGame:
            "GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.",
        },
        loseMessage:
          "Better luck next time! The number which I guessed was **{{number}}**.",
        bigNumberMessage:
          "No {{author}}! My number is greater than **{{number}}**.",
        smallNumberMessage:
          "No {{author}}! My number is smaller than **{{number}}**.",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        buttonText: "Cancel",
        ongoingMessage:
          "A game is already runnning in <#{{channel}}>. You can't start a new one!",
        returnWinner: false,
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
