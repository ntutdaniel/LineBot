const { LineHandler } = require('bottender');
const { doNothing } = require('bottender-compose');
const { Line } = require('messaging-api-line');
const _ = require("underscore");

const agreePostbackData = 'action=agree&section=termAndServiceAgreement';
const disagreePostbackData = 'action=disagree&section=termAndServiceAgreement';

const validPostbacks = [
    agreePostbackData,
    disagreePostbackData
];

module.exports = new LineHandler()
    .onPostback(postback => {
        // is postback data valid
        const postbackData = postback.data;
        let isPostbackValid = _.contains(validPostbacks, postbackData);
        if (isPostbackValid) {
            return true
        }
        else {
            return false
        }
    }, async context => {
        const postbackData = context.event.postback.data
        if (postbackData === agreePostbackData) {
            
            const baseUrl = 'https://access.line.me/oauth2/v2.1/authorize'
            const client_id = (process.env.NODE_ENV === 'production') ? '1611064173' : '1610128050';
            const redirect_uri = (process.env.NODE_ENV === 'production') ? 'https://linehack2018.herokuapp.com:8080/login' : 'https://6b7e87d7.ngrok.io/login'
            console.log(redirect_uri)
            const state = '12345abcde';
            const scope = 'openid profile email';
            const nonce = '09876xyz';
            var loginUrl = `${baseUrl}?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&nonce=${nonce}`;
            loginUrl = encodeURI(loginUrl)
            const loginButtonImageBaseUrl = 'https://s3-ap-southeast-1.amazonaws.com/licket/line_login_button_desktop_2x_44dp/';
            context.reply([
                Line.createText('感謝您同意本條款並開始使用本服務'),
                Line.createText('為了使您有更好的操作體驗，請先登入唷'),
                {
                    "type": "imagemap",
                    "baseUrl": loginButtonImageBaseUrl,
                    "altText": "點我登入Line Login",
                    "baseSize": {
                        "height": 88,
                        "width": 303
                    },
                    "actions": [{
                            "type": "uri",
                            "linkUri": loginUrl,
                            "area": {
                                "x": 0,
                                "y": 0,
                                "width": 303,
                                "height": 88
                            }
                        }
                    ]
                }
            ])
            context.resetState();
        }
        else if (postbackData === disagreePostbackData) {
            context.reply([
                Line.createText('您需要同意本服務條款才可使用服務唷'),
                {
                    "type": "template",
                    "altText": "服務條款",
                    "template": {
                        "type": "buttons",
                        "thumbnailImageUrl": "https://banner2.kisspng.com/20180523/etq/kisspng-computer-icons-management-handshake-agreement-cliparts-5b05254071c2d2.758621351527063872466.jpg",
                        "imageAspectRatio": "rectangle",
                        "imageSize": "cover",
                        "imageBackgroundColor": "#FFFFFF",
                        "title": "服務條款",
                        "text": "點擊圖片查看服務條款",
                        "defaultAction": {
                            "type": "uri",
                            "label": "查看服務條款",
                            "uri": "https://www.youtube.com/static?template=terms"
                        },
                        "actions": [{
                                "type": "postback",
                                "label": "我同意",
                                "data": "action=agree&section=termAndServiceAgreement"
                            },
                            {
                                "type": "postback",
                                "label": "我不同意",
                                "data": "action=disagree&section=termAndServiceAgreement"
                            }
                        ]
                    }
                }
            ])
        }
    })
    .onEvent(async context => {
        console.log('onEvent on termAndServiceAgreement/handler.js');
        doNothing();
    })
    // .onError(async (context, err) => {
    //     context.reply([
    //         Line.createText('we are sorry, something went wrong'),
    //         Line.createText(`${err}`)
    //     ])
    // })
    // .onUnhandled(async context => {
    //     const customerServiceAccountLink = 'https://line.me/R/ti/p/%40ggn0079p'
    //     const msg = `QQ，目前我無法了解您的意思，若有任何問題請洽詢客服，點擊以下網址加入客服 LINE @${customerServiceAccountLink}`
    //     await context.sendText(msg)
    // })