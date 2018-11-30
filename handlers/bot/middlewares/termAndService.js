function agreement(lineUserId) {
    // TODO: validate if the userId of Line is agree with term & Service in Firebase database
}

module.exports = function(context, next) {
    console.log('Debug: user agreed with term & service')
    next();
    // const lineUserId = context.session.user.userId;
    // const doesAgree = agreement(lineUserId);
    // if (!doesAgree) {
    //     context.reply([
    //         Line.createText('請同意本服務的服務條款後使用本服務'),
    //         {
    //             "type": "template",
    //             "altText": "服務條款",
    //             "template": {
    //                 "type": "buttons",
    //                 "thumbnailImageUrl": "https://banner2.kisspng.com/20180523/etq/kisspng-computer-icons-management-handshake-agreement-cliparts-5b05254071c2d2.758621351527063872466.jpg",
    //                 "imageAspectRatio": "rectangle",
    //                 "imageSize": "cover",
    //                 "imageBackgroundColor": "#FFFFFF",
    //                 "title": "服務條款",
    //                 "text": "點擊圖片查看服務條款",
    //                 "defaultAction": {
    //                     "type": "uri",
    //                     "label": "查看服務條款",
    //                     "uri": "https://www.youtube.com/static?template=terms"
    //                 },
    //                 "actions": [{
    //                         "type": "postback",
    //                         "label": "我同意",
    //                         "data": "action=agreeTermAndService"
    //                     },
    //                     {
    //                         "type": "postback",
    //                         "label": "我不同意",
    //                         "data": "action=notAgreeTermAndService"
    //                     }
    //                 ]
    //             }
    //         }
    //     ])
    //     context.resetState({
    //         asking: true,
    //         termAndServiceAgreement: false
    //     })
    // } else {
    //     next();
    // }
    
}