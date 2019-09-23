const Slackbot = require("slackbots");
const axios = require("axios");

const bot = new Slackbot({
  token: "xoxb-771591631143-769745293696-oTPj8xqit6HqSiuwAZ4bEG0E",
  name: "conversation-saver"
});

// Start Handler
bot.on("start", () => {
  bot.postMessageToChannel("general", "Lets help you save your conversation");
});

// Error Handler
bot.on("error", err => console.log(err));

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  console.log(data);
});
