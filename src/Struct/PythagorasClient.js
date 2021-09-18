const {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
} = require("discord-akairo");
const { Intents } = require("discord.js");
const { join } = require("path");
const { CreatePrompt } = require("../Utility/CreatePrompt");
const config = require("../config");
const { CreateEmbed } = require("../Utility/CreateEmbed");
const { logger } = require("../Utility/Logger");

module.exports = class PythagorasClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: config.owners,
      },

      {
        intents: [
          Intents.FLAGS.GUILDS,
          Intents.FLAGS.GUILD_MESSAGES,
          Intents.FLAGS.GUILD_BANS,
          Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
          Intents.FLAGS.GUILD_MEMBERS,
        ],
      }
    );

    this.logger = logger;
    this.config = config;
    this.CommandHandler = new CommandHandler(this, {
      allowMention: true,
      directory: join(__dirname, "..", "Commands"),
      prefix: config.prefix,
      defaultCooldown: 3000,
      argumentDefaults: {
        prompt: {
          modifyStart: (message, text) => ({
            embeds: [CreateEmbed("info", CreatePrompt(text))],
          }),
          modifyRetry: (message, text) => ({
            embeds: [CreateEmbed("info", CreatePrompt(text))],
          }),
          modifyTimeout: () => ({
            embeds: [CreateEmbed("warn", "⛔ | command timeout.")],
          }),
          modifyEnded: () => ({
            embeds: [CreateEmbed("warn", "⛔ | command ended.")],
          }),
          modifyCancel: () => ({
            embeds: [
              CreateEmbed(
                "info",
                "⛔ | invalid arguments, command session has ended."
              ),
            ],
          }),
          retries: 3,
          time: 30000,
        },
      },
    })
      .on("commandFinished", (msg, command) => {
        this.logger.info(
          `[${msg.author.tag}] USING [${command.id.toUpperCase()}] COMMANDS`
        );
      })
      .on("cooldown", async (msg, command, remaining) => {
        const awaitMsg = await msg.channel.send(
          CreateEmbed(
            "warn",
            `Chill.. wait ${(remaining / 1000).toFixed(
              2
            )} second(s) to use command again`
          )
        );
        setTimeout(() => awaitMsg.delete(), remaining);
        this.logger.warn(
          `[${
            msg.author.tag
          }] GETTING RATE LIMIT ON [${command.id.toUpperCase()}] COMMANDS`
        );
      });
    this.ListenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "..", "Listeners"),
    });
  }
  initialize() {
    this.CommandHandler.loadAll();
    this.ListenerHandler.loadAll();
    // console.log(process.env.DISCORD_TOKEN)
    //this.login(process.env.DISCORD_TOKEN);
  }
};
