const { Command } = require("discord-akairo");
const { CreateEmbed } = require("../../Utility/CreateEmbed");
const { stripIndents } = require("common-tags");
module.exports = class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help", "h"],
      description: {
        content: "help command",
        usage: "h <command name>",
        example: ["h ping"],
      },
      args: [
        {
          id: "command",
          type: "commandAlias",
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
  async exec(msg, { command }) {
    try {
      const prefix = this.handler.prefix;
      if (!command) {
        let embed = CreateEmbed(
          "info",
          `📬 | List of all the commands.
        ─────────────────
        `
        );
        for (const category of this.handler.categories.values()) {
          embed.addField(
            `${category.id}`,
            `${category
              .filter((cmd) => cmd.aliases.length > 0)
              .map((cmd) => `\`${cmd.aliases[0]}\``)
              .join(", ")}`
          );
        }
        embed.addField(
          `─────────────────`,
          `**\`${prefix}help <command>\` for command specific info**
          example:\`${prefix}help ping\`
          `
        );
        msg.channel.send({ embeds: [embed] });
      } else {
        //console.log(command.aliases);
        let aliases = command.aliases[0]
          ? command.aliases[0]
          : "no aliases given";
        return msg.channel.send(stripIndents`
            \`\`\`makefile
      [Help: Command-> ${aliases}] ${
          command.ownerOnly ? `/!\\ Owner only /!\\` : ""
        }
      ${command.description.content}

      Usage: ${prefix}${
          command.description.usage
            ? command.description.usage
            : "no usage given"
        }

      Example: ${prefix}${
          command.description.examples
            ? command.description.examples.join(` | ${prefix}`)
            : "no example given"
        }
            ─────────────────

            ${prefix} (prefix of the bot)
            () = alias | <> = optional arguement(s) | [] = obligatory arguement(s)
            \`\`\`
            `);
      }
    } catch (e) {
      this.client.logger.error(e.message);
      msg.channel.send(CreateEmbed("warn", "⛔ | An error occured"));
    }
  }
};
