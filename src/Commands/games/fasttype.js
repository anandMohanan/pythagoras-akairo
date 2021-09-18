const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { FastType } = require("weky");
module.exports = class FastTypeCommand extends Command {
  constructor() {
    super("fasttype", {
      aliases: ["fasttype", "ft"],
      description: {
        content: "fast type the sentence given",
        usage: "ft",
        examples: ["ft"],
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
    const sentences = [
      "She couldn't decide of the glass was half empty or half full so she drank it.",
      "With the high wind warning",
      "He stomped on his fruit loops and thus became a cereal killer.",
      "The miniature pet elephant became the envy of the neighborhood.",
      "He was the type of guy who liked Christmas lights on his house in the middle of July.",
      "My biggest joy is roasting almonds while stalking prey.",
      "In the end, he realized he could see sound and hear words.",
      "He wasn't bitter that she had moved on but from the radish.",
      "On a scale from one to ten, what's your favorite flavor of random grammar?",
      "She let the balloon float up into the air with her hopes and dreams.",
      "The near-death experience brought new ideas to light.",
      "Nothing seemed out of place except the washing machine in the bar.",
      "This is the last random sentence I will be writing and I am going to stop mid-sent",
      "The mysterious diary records the voice.",
      "She insisted that cleaning out your closet was the key to good driving.",
      "The tart lemonade quenched her thirst, but not her longing.",
      "There are over 500 starfish in the bathroom drawer.",
      "There aren't enough towels in the world to stop the sewage flowing from his mouth.",
      "If any cop asks you where you were, just say you were visiting Kansas.",
      "Excitement replaced fear until the final moment.",
      "He learned the hardest lesson of his life and had the scars, both physical and mental, to prove it.",
      "The fog was so dense even a laser decided it wasn't worth the effort.",
      "In that instant, everything changed.",
      "Writing a list of random sentences is harder than I initially thought it would be.",
      "Joyce enjoyed eating pancakes with ketchup.",
      "I was fishing for compliments and accidentally caught a trout.",
      "The toy brought back fond memories of being lost in the rain forest.",
      "Today I heard something new and unmemorable.",
      "He wondered why at 18 he was old enough to go to war, but not old enough to buy cigarettes.",
      "When he had to picnic on the beach, he purposely put sand in other people’s food.",
      "I want to buy a onesie… but know it won’t suit me.",
      "Waffles are always better without fire ants and fleas.",
      "They improved dramatically once the lead singer left.",
      "The blinking lights of the antenna tower came into focus just as I heard a loud snap.",
      "Today is the day I'll finally know what brick tastes like.",
      "She had some amazing news to share but nobody to share it with.",
      "Seek success, but always be prepared for random cats.",
      "Two seats were vacant.",
      "It was the first time he had ever seen someone cook dinner on an elephant.",
      "Siri became confused when we reused to follow her directions.",
      "It didn't make sense unless you had the power to eat colors.",
      "his seven-layer cake only had six layers.",
      "Being unacquainted with the chief raccoon was harming his prospects for promotion.",
      "I think I will buy the red car, or I will lease the blue one.",
      "The pet shop stocks everything you need to keep your anaconda happy.",
      "He said he was not there yesterday; however, many people saw him there.",
      "We're careful about orange ping pong balls because people might think they're fruit.",
      "Her hair was windswept as she rode in the black convertible.",
      "As he entered the church he could hear the soft voice of someone whispering into a cell phone.",
      "He decided that the time had come to be stronger than any of the excuses he'd used until then.",
    ];
    const random_string =
      sentences[Math.floor(Math.random() * sentences.length)];
    try {
      await FastType({
        message: msg,
        embed: {
          title: "✅ | FastType",
          description: "You have **{{time}}** to type the below sentence.",
          color: "#2F3136",
          footer: "pythagoras bot",
          timestamp: false,
        },
        sentence: random_string,
        winMessage:
          "GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.",
        loseMessage: "Better luck next time!",
        cancelMessage: "You ended the game!",
        time: 60000,
        buttonText: "Cancel",
        othersMessage: "Only <@{{author}}> can use the buttons!",
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
