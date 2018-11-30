const { LineBot, LineHandler, MongoSessionStore } = require('bottender'); //?
const { createServer, registerRoutes } = require('bottender/express');
const bodyParser = require('body-parser');
const express = require('express'); //http://expressjs.com/en/4x/api.html
const config = require('./config');

//?
if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({path: './.env.production'})
} else {
  require('dotenv').config({path: './.env.development'})
}

//呼叫express中的函式"express()，然後將新產生的Express物件指定到app變數中。
const app = express();
app.use(
  //bodyParser.json->support parsing of application/json type post data
  //在parsing前， buf(Buffer of the raw request body)儲存到key rawBody中。
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

//?
const lineConfig = (process.env.NODE_ENV === 'production') ? config.Line.production : config.Line.development

//Passive handle Line events
const bot = new LineBot({
    channelSecret: lineConfig.channelSecret,
    accessToken: lineConfig.accessToken,
    sessionStore: new MongoSessionStore(`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.uri}`, {
        collectionName: 'my-sessions'
    }, 365 * 24 * 60)
});
bot.setInitialState({
  currentSection: null,
  step: null
})

//Handler of Line basic event
// follow, unfollow, event, unhandle, error
const mainHandler = require("./handlers/bot/mainHandler.js")
bot.onEvent(mainHandler);
//?
registerRoutes(app, bot, { path: '/line' });

//Binds and listens for connections on the specified host and port.
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`server is running on ${port} port...`);
});