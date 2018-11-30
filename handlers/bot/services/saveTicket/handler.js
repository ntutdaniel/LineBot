const { LineHandler } = require('bottender');
const { doNothing } = require('bottender-compose');
const { Line } = require('messaging-api-line');
const _ = require("underscore");
const validPostbacks = [
    
];

module.exports = new LineHandler()
    .onPostback(postback => {
        // is postback data valid
        const postbackData = postback.data;
        let isPostbackValid = _.contains(validPostbacks, postbackData);
        if (isPostbackValid) {
            return true;
        }
        else {
            return false;
        }
    }, async context => {
        
    })
    .onEvent(async context => {
        //
        
    })
    .onError(async(context, err) => {
        context.reply([
            Line.createText('we are sorry, something went wrong'),
            Line.createText(`${err}`)
        ])
    })
    .onUnhandled(async context => {
        const customerServiceAccountLink = 'https://line.me/R/ti/p/%40ggn0079p'
        const msg = `QQ，目前我無法了解您的意思，若有任何問題請洽詢客服，點擊以下網址加入客服 LINE @${customerServiceAccountLink}`
        await context.sendText(msg)
    })