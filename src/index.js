const path = require("path");
const PythagorasClient = require("./Struct/PythagorasClient");
require("dotenv").config();
const client = new PythagorasClient();

client.initialize();
//console.log(String(process.env.DISCORD_TOKEN));
client.login(process.env.DISCORD_TOKEN);
// "engines": {
//   "node": ">=v16.x"
// },
