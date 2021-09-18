const { MessageEmbed } = require("discord.js");

const Color = {
  info: "#2F3136",
  warn: "YELLOW",
  error: "RED",
};
const CreateEmbed = (color, message) => {
  const embed = new MessageEmbed().setColor(Color[color]);

  if (message) embed.setDescription(message);
  return embed;
};
module.exports = { CreateEmbed };
