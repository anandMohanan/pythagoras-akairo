// const { Client, Message, MessageEmbed } = require("discord.js");
// const ms = require("ms");
// module.exports = {
//   name: "slowmode",
//   description: "slowmode channel",
//   userPermissions: ["MANAGE_CHANNELS"],
//   botPermissions: ["MANAGE_CHANNELS"],

//   /**
//    *
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     if (!args[0]) {
//       return message.reply({
//         content: "You did not specify a time!",
//         allowedMentions: { repliedUser: false },
//       });
//     }
//     const currentCooldown = message.channel.rateLimitPerUser;

//     const reason = args[1] ? args.slice(1).join(" ") : "no reason";

//     const embed = new MessageEmbed().setFooter(
//       `${message.author.tag} | ${message.author.id}`,
//       message.author.displayAvatarURL({ dynamic: true })
//     );

//     if (args[0] === "off") {
//       if (currentCooldown === 0)
//         return message.reply("Channel cooldown is already off");

//       embed.setTitle("Slowmode Disabled").setColor("#cce1f2");
//       message.reply({
//         embeds: [embed],
//         allowedMentions: { repliedUser: false },
//       });
//       return message.channel.setRateLimitPerUser(0, reason);
//     }

//     const time = ms(args[0]) / 1000;

//     if (isNaN(time)) {
//       return message.reply({
//         content: "not a valid time, please try again!",
//         allowedMentions: { repliedUser: false },
//       });
//     }
//     if (time >= 21600) {
//       return message.reply({
//         content:
//           "That slowmode limit is too high, please enter anything lower than 6 hours.",
//         allowedMentions: { repliedUser: false },
//       });
//     }
//     if (currentCooldown === time) {
//       return message.reply({
//         content: `Slowmode is already set to ${args[0]}`,
//         allowedMentions: { repliedUser: false },
//       });
//     }
//     embed
//       .setTitle("Slowmode Enabled")
//       .addField("Slowmode: ", args[0])
//       .addField("Reason: ", reason)
//       .setColor("#cce1f2");

//     message.channel.setRateLimitPerUser(time, reason);
//     message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
//   },
// };

const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");

module.exports = class SlowmodeCommand extends Command {
  constructor() {
    super("slowmode", {
      aliases: ["slowmode", "sm"],
      description: {
        content: "Sets the slowmode in channel.",
        usage: "sm [number]",
        example: ["sm 10s", "sm 0"],
      },
      category: "moderation",
      cooldown: 3000,
      args: [
        {
          id: "time",
          type: "int",
          prompt: {
            start: "give a time to set the slowmode",
          },
        },
      ],
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }
  /**
   *
   * @param {import('discord.js').Message} msg
   * @returns
   */
  async exec(msg, { time }) {
    try {
      if (!msg.member.permissions.has("MANAGE_CHANNELS"))
        return msg.reply({
          embeds: [
            CreateEmbed(
              "warn",
              `⛔ | you do not have enough permissions to run this command.`
            ),
          ],
        });

      if (!msg.member.guild.me.permissions.has("MANAGE_CHANNELS"))
        return msg.reply({
          embeds: [
            CreateEmbed(
              "warn",
              `⛔ | i do not have enough permissions to run this command.`
            ),
          ],
        });
      const formatDuration = (ms) => {
        if (ms < 0) ms = -ms;
        const time = {
          day: Math.floor(ms / 86400000),
          hour: Math.floor(ms / 3600000) % 24,
          minute: Math.floor(ms / 60000) % 60,
          second: Math.floor(ms / 1000) % 60,
          millisecond: Math.floor(ms) % 1000,
        };
        return new Intl.ListFormat("en-GB", {
          style: "long",
          type: "conjunction",
        }).format(
          Object.entries(time)
            .filter((val) => val[1] !== 0)
            .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
        );
      };
      await msg.channel.setRateLimitPerUser(time);
      return msg.channel.send({
        embeds: [
          CreateEmbed(
            "info",
            `Slowmode ${
              time == 0
                ? "✅ | has been disabled!"
                : `✅ | has been set for ${formatDuration(time * 1000)}.`
            }`
          ),
        ],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
