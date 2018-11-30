const { LineHandler } = require('bottender');
const { doNothing } = require('bottender-compose');
const { Line } = require('messaging-api-line');
const _ = require("underscore")
const validPostbacks = [
    'action=retrieveTicket&ticketType=event',
    'action=retrieveTicket&ticketType=event&sortBy=time',
    'action=retrieveTicket&ticketType=event&sortBy=location',
    'action=retrieveTicket&ticketType=transportation',
    'action=retrieveTicket&ticketType=transportation&sortBy=time',
    'action=retrieveTicket&ticketType=transportation&sortBy=location'
];

module.exports = new LineHandler()
    .onPostback(postback => {
        // is postback data valid
        const postbackData = postback.data;
        let isPostbackValid = _.contains(validPostbacks, postbackData);
        return isPostbackValid;
    }, async context => {
        const userId = context.session.user.userId;
        const postbackData = context.event.postback.data
        switch (postbackData) {
            case 'action=retrieveTicket&ticketType=event&sortBy=time':
                // const tickets = ticket.getTicket(userId, sortBy, limit)
                // context.reply(tickets);
                break;
            
            case 'action=retrieveTicket&ticketType=event&sortBy=location':
                // const tickets = ticket.getTicket(userId, sortBy, limit)
                // context.reply(tickets);
                break;
            
            default:
                // code
        }
    })
    .onEvent(async context => {
        
        
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