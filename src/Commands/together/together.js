const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const {
  MessageActionRow,
  MessageButton,
  MessageSelectMenu,
  CommandInteraction,
} = require("discord.js");

module.exports = class TogetherCommand extends Command {
  constructor() {
    super("together", {
      aliases: ["together"],
      description: {
        content:
          "generate a discord together link to watch youtube or play fishing | betrayal | poker | chess.",
        usage: "together",
        examples: ["together"],
      },
      category: "together",
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
      if (!msg.member.voice.channel)
        return msg.channel.send("join a vc to use this command.");

      const embed = CreateEmbed(
        "info",
        "Please choose an option to get the invite link"
      ).setTitle("discord-together");

      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("together")
            .setPlaceholder("Click to see all the options.")
            .setDisabled(state)
            .addOptions([
              {
                label: "youtube",
                description: "watch youtube with friends in vc",
                value: "youtube",
              },
              {
                label: "poker",
                description: "play poker with friends in vc",
                value: "poker",
              },
              {
                label: "chess",
                description: "play chess with friends in vc",
                value: "chess",
              },
              {
                label: "fishing",
                description: "play fishing with friends in vc",
                value: "fishing",
              },
              {
                label: "betrayal",
                description: "play betrayal with friends in vc",
                value: "betrayal",
              },
            ])
        ),
      ];

      const initialMessage = await msg.reply({
        embeds: [embed],
        components: components(false),
        allowedMentions: { repliedUser: false },
      });
      /**
       *
       * @param {CommandInteraction} togetherInteraction
       * @returns
       */
      const filter = (togetherInteraction) =>
        togetherInteraction.user.id === msg.author.id &&
        togetherInteraction.customId === "together";
      const collector = msg.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
        time: 10000,
      });

      collector.on("collect", (togetherInteraction) => {
        const [value] = togetherInteraction.values;

        this.client.discordtogether
          .createTogetherCode(
            msg.member.voice.channelId,
            value.toLowerCase().toString()
          )
          .then(async (invite) => {
            console.log(invite.code);
            let button = new MessageActionRow().addComponents(
              new MessageButton()
                .setLabel("invite link")
                .setStyle("LINK")
                .setURL(invite.code)
            );
            const inviteEmbed = CreateEmbed("info").setTitle(
              `Play ${value} with your friends in discord vc`
            );

            await togetherInteraction.update({
              embeds: [inviteEmbed],
              components: [button],
            });
          });
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
