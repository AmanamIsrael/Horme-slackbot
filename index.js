const Slackbot = require("slackbots");
const mongoose = require("mongoose");
const axios = require("axios");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const token = "xoxb-771591631143-769745293696-N86Xn1K2XaI3WFm8FaTfuzmv";

const bot = new Slackbot({
  token,
  name: "conversation-saver"
});

// Start Handler
bot.on("start", () => {
  bot.postMessageToChannel("general", "Lets help you save your conversation");
  bot.postMessageToChannel(
    "general",
    "Sign Up or Sign in to your account by tagging me and pressing Signup or Signin"
  );
});

// Error Handler
bot.on("error", err => console.log(err));

// Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  if (data.user == bot.id) {
    return;
  }
  console.log(data);
  handleMessage(data);
});

const handleMessage = data => {
  var message = data.text.toLowerCase();
  if (
    message.includes(" signup") ||
    message.includes(" sign-up") ||
    message.includes(" sign up")
  ) {
    bot.postMessageToChannel("general", "Enter your username");
  }
  if (
    message.includes(" signin") ||
    message.includes(" sign-in") ||
    message.includes(" sign in")
  ) {
    bot.postMessageToChannel("general", "Enter your username");
  }
  if (message.includes(" history")) {
    const channelId = bot.getChannelId("general");
    bot.postMessageToChannel("general", "Getting History");

    getChannelHistory("channel", data.channel, data.team);

    // console.log(channelId);
    // axios
    //   .get(
    //     "https://slack.com/api/channels.history",
    //     {
    //       token: "xoxb-771591631143-769745293696-N86Xn1K2XaI3WFm8FaTfuzmv"
    //     },
    //     res => {
    //       console.log(res);
    //       bot.postMessageToChannel("general", "Done getting it");
    //     }
    //   )
    //   .catch(err => {
    //     console.log(err);
    //     bot.postMessageToChannel("general", `Error ${err} while getting it`);
    //   });
  }
};

const getChannelHistory = (family, value, team) => {
  var url = `https://${team}.slack.com/api/${family}.history?token=${token}&channel=${value}`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) console.log(xhr.responseText);
  };
  xhr.open("GET", url, true);
  xhr.send();
};
