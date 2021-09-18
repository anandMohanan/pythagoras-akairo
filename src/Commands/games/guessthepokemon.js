const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { GuessThePokemon } = require("weky");
module.exports = class GuessPokeCommand extends Command {
  constructor() {
    super("guessthepokemon", {
      aliases: ["guessthepokemon", "gtp"],
      description: {
        content: "guess the pokemon",
        usage: "gtp",
        examples: ["gtp"],
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
      await GuessThePokemon({
        message: msg,
        embed: {
          title: "✅ | Guess The Pokémon",
          description:
            "**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.",
          color: "#2F3136",
          footer: "pythagoras",
          timestamp: false,
        },
        thinkMessage: "I am thinking",
        othersMessage: "Only <@{{author}}> can use the buttons!",
        winMessage:
          "GG, It was a **{{answer}}**. You got it correct in **{{time}}**.",
        loseMessage: "Better luck next time! It was a **{{answer}}**.",
        time: 60000,
        incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
        buttonText: "Cancel",
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
