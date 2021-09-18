const { stripIndent } = require("common-tags");

const CreatePrompt = (prompt) => {
  return stripIndent`
  **❔ |** *${prompt}*
  **🔘 |** *You have \`30\` seconds to decide*
  **🔘 |** *Type \`cancel\` to cancel*
  `;
};

module.exports = { CreatePrompt };
