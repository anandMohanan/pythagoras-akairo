const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { RockPaperScissors } = require("weky");
module.exports = class rpsCommand extends Command {
  constructor() {
    super("rps", {
      aliases: ["rps"],
      description: {
        content: "rock paper scissors.",
        usage: "rps",
        examples: ["rps"],
      },
      args: [
        {
          id: "person",
          type: "member",
          //match: "rest",
        },
      ],
      category: "games",
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
      await RockPaperScissors({
        message: msg,
        opponent: person,
        embed: {
          title: "✅ | Rock Paper Scissors",
          description: "Press the button below to choose your element.",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        buttons: {
          rock: "Rock",
          paper: "Paper",
          scissors: "Scissors",
          accept: "Accept",
          deny: "Deny",
        },
        time: 60000,
        acceptMessage:
          "<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!",
        winMessage: "GG, <@{{winner}}> won!",
        drawMessage: "This game is deadlock!",
        endMessage:
          "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
        timeEndMessage:
          "Both of you didn't pick something in time. So, I dropped the game!",
        cancelMessage:
          "<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!",
        choseMessage: "You picked {{emoji}}",
        noChangeMessage: "You cannot change your selection!",
        othersMessage: "Only {{author}} can use the buttons!",
        returnWinner: false,
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
