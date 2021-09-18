const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { Fight } = require("weky");
module.exports = class FightCommand extends Command {
  constructor() {
    super("fight", {
      aliases: ["fight"],
      description: {
        content: "fight with another user",
        usage: "fight [member] ",
        examples: ["fight @neimand"],
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
      console.log(person);
      await Fight({
        message: msg,
        opponent: person,
        embed: {
          title: "✅ | Fight",
          color: "#2F3136",
          footer: "pythagoras bot",
          timestamp: false,
        },
        buttons: {
          hit: "Hit",
          heal: "Heal",
          cancel: "Stop",
          accept: "Accept",
          deny: "Deny",
        },
        acceptMessage:
          "<@{{challenger}}> has challenged <@{{opponent}}> for a fight!",
        winMessage: "GG, <@{{winner}}> won the fight!",
        endMessage:
          "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
        cancelMessage: "<@{{opponent}}> refused to have a fight with you!",
        fightMessage: "{{player}} you go first!",
        opponentsTurnMessage: "Please wait for your opponents move!",
        highHealthMessage: "You cannot heal if your HP is above 80!",
        lowHealthMessage: "You cannot cancel the fight if your HP is below 50!",
        returnWinner: false,
        othersMessage: "Only {{author}} can use the buttons!",
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
