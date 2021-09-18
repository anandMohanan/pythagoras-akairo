const { Listener } = require("discord-akairo");
const slashCommands = require("../Utility/SlashCommands");
module.exports = class Readylistener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      category: "client",
      event: "ready",
    });
  }

  async exec() {
    this.client.logger.info(
      `CLIENT READY WITH ${this.client.guilds.cache.size} GUILDS`
    );
    this.client.user.setActivity(`${this.client.config.prefix} help`, {
      type: "LISTENING",
    });
    for (const command of slashCommands) {
      this.client.application.commands.set([]);
    }
  }
};
