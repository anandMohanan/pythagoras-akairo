const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const os = require("os");

module.exports = class statsCommand extends Command {
  constructor() {
    super("stats", {
      aliases: ["stats"],
      description: {
        content: "shows the stats of the bot",
        usage: "stats",
        examples: ["stats"],
      },

      category: "general",
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
      const embed = CreateEmbed()
        .setThumbnail(this.client.user.displayAvatarURL())
        .setTitle("Bot Stats")

        .addFields(
          {
            name: "🌐 Servers",
            value: `Serving ${this.client.guilds.cache.size} servers.`,
            inline: true,
          },
          {
            name: "📺 Channels",
            value: `Serving ${this.client.channels.cache.size} channels.`,
            inline: true,
          },
          {
            name: "👥 Server Users",
            value: `Serving ${this.client.users.cache.size}`,
            inline: true,
          },
          {
            name: "⏳ Ping",
            value: `${Math.round(this.client.ws.ping)}ms`,
            inline: true,
          },
          {
            name: "Join Date",
            value: this.client.user.createdAt.toString(),
            inline: true,
          },
          {
            name: "Server Info",
            value: `Cores: ${os.cpus().length}`,
            inline: true,
          }
        )
        .setFooter(`Created By:  neimand`);

      await msg.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
