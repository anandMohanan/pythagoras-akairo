const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = class InviteCommand extends Command {
  constructor() {
    super("invite", {
      aliases: ["invite", "inv"],
      description: {
        content: "returns an invite for the bot",
        usage: "inv",
        examples: ["inv"],
      },
      args: [
        {
          id: "person",
          type: "user",
          match: "rest",
        },
      ],
      category: "general",
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
      const InviteLink =
        "https://discord.com/api/oauth2/authorize?client_id=858246719649087509&permissions=8&scope=bot%20applications.commands";
      let button = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("invite me")
          .setStyle("LINK")
          .setURL(InviteLink)
      );
      return msg.reply({
        embeds: [
          CreateEmbed("info", "invite link").setImage(
            "https://cdn.discordapp.com/attachments/867702505345122334/875359916829863966/pythagorus.jpg"
          ),
        ],
        components: [button],
      });
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
