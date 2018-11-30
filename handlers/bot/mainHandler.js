const { LineHandler } = require('bottender');
const { condition, match, sendText, doNothing } = require('bottender-compose');
const followHandler = require('./basicEvents/follow')
const unfollowHandler = require('./basicEvents/unfollow')
const { middleware } = require('bottender');
const termAndService = require('./middlewares/termAndService');
const isLoggedIn = require('./middlewares/isLoggedIn');
const eventHandlers = require("./eventHandlers")

module.exports = new LineHandler()
    .onFollow(async context => {
        // handle follow event
        console.log('onFollow');
        return true
    }, followHandler)
    .onUnfollow(async context => {
        console.log('onUnfollow');
        return true
    }, unfollowHandler)  
    .onEvent(middleware([
        // always check if user agree with term and service agreement
        termAndService,
        
        // always check if user is logged in
        isLoggedIn,
        
        // pass to next level event handler if user agreed with term & service and is logged in
        eventHandlers
    ]))
    .onError(async (context, err) => {
        const msg = '抱歉 目前服務有誤 請稍待片刻再重試...'
        console.error(err);
        await context.sendText(msg)
    })
    .onUnhandled(doNothing)
    // .onUnhandled(async context => {
    //     if (context.event.isUnfollow) {
    //         return
    //     }
    //     const customerServiceAccountLink = 'https://line.me/R/ti/p/%40ggn0079p'
    //     const msg = `您好，目前我無法了解您的意思，若有任何問題請洽詢客服，點擊以下網址加入客服 LINE @${customerServiceAccountLink}`
    //     await context.sendText(msg)
    // })