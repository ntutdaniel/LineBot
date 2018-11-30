const { LineHandler } = require('bottender');
const { condition, match, sendText, doNothing } = require('bottender-compose');
const { Line } = require('messaging-api-line');
const _ = require("underscore");
const { termAndServiceAgreement } = require("./services/servicesHandler")

const matchSection = match(context => context.state.section);
module.exports = new LineHandler()
    .onPostback(postback => {
        const validPostbacks = [
            "action=retrieveTicket&ticketType=event",
            "action=retrieveTicket&ticketType=transportation"
        ];
        let isPostbackValid = _.contains(validPostbacks, postback.data);
        return isPostbackValid;
    }, async context => {
        const postbackData = context.event.postback.data;
        switch (postbackData) {
            case "action=retrieveTicket&ticketType=event":
                // code
                context.reply([
                    Line.createText('好唷，這邊是你的活動票'),
                    {
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": "https://s3-ap-southeast-1.amazonaws.com/licket/resources/ogimg.png",
                            "size": "full",
                            "aspectRatio": "20:13",
                            "aspectMode": "cover",
                            "action": {
                                "type": "uri",
                                "uri": "http://linecorp.com/"
                            }
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "md",
                            "contents": [{
                                    "type": "text",
                                    "text": "Line Hack 2019",
                                    "wrap": true,
                                    "weight": "bold",
                                    "gravity": "center",
                                    "size": "xl"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "margin": "md",
                                    "contents": [{
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                                        },
                                        {
                                            "type": "text",
                                            "text": "4.0",
                                            "size": "sm",
                                            "color": "#999999",
                                            "margin": "md",
                                            "flex": 0
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "lg",
                                    "spacing": "sm",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Date",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "Monday 25, 9:00PM",
                                                    "wrap": true,
                                                    "size": "sm",
                                                    "color": "#666666",
                                                    "flex": 4
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "地址",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "瑞光路610號10樓",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 4
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Seats",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "C Row, 18 Seat",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 4
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "xxl",
                                    "contents": [{
                                            "type": "spacer"
                                        },
                                        {
                                            "type": "image",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                                            "aspectMode": "cover",
                                            "size": "xl"
                                        },
                                        {
                                            "type": "text",
                                            "text": "You can enter the theater by using this code instead of a ticket",
                                            "color": "#aaaaaa",
                                            "wrap": true,
                                            "margin": "xxl",
                                            "size": "xs"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
                ])
                break;
            
            case "action=retrieveTicket&ticketType=transportation":
                context.reply([
                    Line.createText('好唷，這邊是你的交通票')
                ])
                break;
            default:
                // code
                doNothing()
        }
    })
    .onText(async context => {
        const text = context.event.text;
        
        switch (text) {
            case '我同意服務條款':
                const richMenuId = process.env.RICH_MENU_ID;
                if (!richMenuId) throw new Error('There is no RICH_MENU_ID specified'); 
                context.linkRichMenu(richMenuId)
                context.reply([
                    Line.createText('歡迎開始使用本服務，請藉由 Rich Menu操作')
                ])
                doNothing();
                break;
                
            case '/我要儲存票券':
                // code
                context.reply([
                    Line.createText('好唷，請您將票券截圖上傳'),
                    Line.createButtonTemplate('截圖', {
                                // thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
                                title: '截圖',
                                text: 'Please select',
                                actions: [{
                                        type: 'uri',
                                        label: '打開相機',
                                        uri: 'line://nv/camera/',
                                    },
                                    {
                                        type: 'uri',
                                        label: '打開相機膠卷',
                                        uri: 'line://nv/cameraRoll/single',
                                    }
                                ],
                            })
                ])
               
                break;
                
            case '/我的票券口袋':
                context.reply([
                    {
                        "type": "text", // ①
                        "text": "好唷，請選擇票券的類別",
                        "quickReply": { // ②
                            "items": [{
                                    "type": "action", // ③
                                    "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/licket/%E6%96%87%E6%A1%88%E8%B3%87%E6%96%99/quick+replay+icon/%E7%A8%AE%E9%A1%9E%E7%B4%B0%E9%A0%85/%E6%B4%BB%E5%8B%95.png",
                                    "action": {
                                        "type": "postback",
                                        "label": "活動",
                                        "data": "action=retrieveTicket&ticketType=event"
                                    }
                                },
                                {
                                    "type": "action", // ③
                                    "imageUrl": "https://s3-ap-southeast-1.amazonaws.com/licket/%E6%96%87%E6%A1%88%E8%B3%87%E6%96%99/quick+replay+icon/%E7%A8%AE%E9%A1%9E%E7%B4%B0%E9%A0%85/%E6%A9%9F%E7%A5%A8.png",
                                    "action": {
                                        "type": "postback",
                                        "label": "交通",
                                        "data": "action=retrieveTicket&ticketType=transportation"
                                    }
                                },
                                {
                                    "type": "action", // ④
                                    "action": {
                                        "type": "location",
                                        "label": "根據現在位置",
                                        "data": "action=retrieveTicket&ticketType=transportation"
                                    }
                                }
                            ]
                        }
                    }
                ])
                
                break;
            
            default:
                // code
                doNothing()
                context.reply([{
                    type: 'text',
                    text: `無法理解您要進行操作的服務: \nstate: ${state}, context:${context}`
                }])
        }
    })
    .onEvent(async context => {
        // 處理收到的票券照票 
        if (context.event.isImage) {
            console.log('received an image')
            const imageBuffer = await context.client.retrieveMessageContent(context.event.message.id);
            context.reply([
                Line.createText('目前以實作百度雲AI的圖片辨識，但時間有限還未整合，以範本展示'),
                {
                    "type": "flex",
                    "altText": "This is a Flex Message",
                    "contents": {
                        "type": "bubble",
                        "hero": {
                            "type": "image",
                            "url": "https://s3-ap-southeast-1.amazonaws.com/licket/resources/ogimg.png",
                            "size": "full",
                            "aspectRatio": "20:13",
                            "aspectMode": "cover",
                            "action": {
                                "type": "uri",
                                "uri": "http://linecorp.com/"
                            }
                        },
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "spacing": "md",
                            "contents": [{
                                    "type": "text",
                                    "text": "Line Hack 2019",
                                    "wrap": true,
                                    "weight": "bold",
                                    "gravity": "center",
                                    "size": "xl"
                                },
                                {
                                    "type": "box",
                                    "layout": "baseline",
                                    "margin": "md",
                                    "contents": [{
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                        },
                                        {
                                            "type": "icon",
                                            "size": "sm",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                                        },
                                        {
                                            "type": "text",
                                            "text": "4.0",
                                            "size": "sm",
                                            "color": "#999999",
                                            "margin": "md",
                                            "flex": 0
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "lg",
                                    "spacing": "sm",
                                    "contents": [{
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Date",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "Monday 25, 9:00PM",
                                                    "wrap": true,
                                                    "size": "sm",
                                                    "color": "#666666",
                                                    "flex": 4
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "地址",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "瑞光路610號10樓",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 4
                                                }
                                            ]
                                        },
                                        {
                                            "type": "box",
                                            "layout": "baseline",
                                            "spacing": "sm",
                                            "contents": [{
                                                    "type": "text",
                                                    "text": "Seats",
                                                    "color": "#aaaaaa",
                                                    "size": "sm",
                                                    "flex": 1
                                                },
                                                {
                                                    "type": "text",
                                                    "text": "C Row, 18 Seat",
                                                    "wrap": true,
                                                    "color": "#666666",
                                                    "size": "sm",
                                                    "flex": 4
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "margin": "xxl",
                                    "contents": [{
                                            "type": "spacer"
                                        },
                                        {
                                            "type": "image",
                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                                            "aspectMode": "cover",
                                            "size": "xl"
                                        },
                                        {
                                            "type": "text",
                                            "text": "You can enter the theater by using this code instead of a ticket",
                                            "color": "#aaaaaa",
                                            "wrap": true,
                                            "margin": "xxl",
                                            "size": "xs"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ])
        }
        
        // check state to dermine what service to use
        const stateSet = _.isEqual(context.state, {}) ? false : true
        console.log(`stateSet: ${stateSet}, state: ${JSON.stringify(context.state)}`)
    
        if (stateSet) {
            // pass context to services handler
            const section = context.state.currentSection
            switch (section) {
                // Section 0: Agree Term & Service
                case 'termAndServiceAgreement':
                    // code
                    // const termAndServiceAgreementHandler = termAndServiceAgreement.build();
                    // termAndServiceAgreementHandler(context);
                    doNothing();
                    break;
                
                // Section 1: Login
                
                // Section 2: Services Selection
                case 'servicesSelection':
                    break;
                
                // Section 3: save ticket dialog flow
                case 'saveTicket':
                    break;
    
                // Section 4: retrieve ticket dialog flow
                case 'retrieveTicket':
                    break;
                
                default:
                    // code
                    context.reply([
                        {
                            type: 'text',
                            text: `無法理解您要進行操作的服務: ${section}`
                        }
                    ])
            }
        }
        else {
            context.reply([
                Line.createText('請問您現在要儲存或提取票券呢？？'),
                Line.createButtonTemplate('操作選項', {
                    "type": "buttons",
                    "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                    "imageAspectRatio": "rectangle",
                    "imageSize": "cover",
                    "imageBackgroundColor": "#FFFFFF",
                    "title": "Menu",
                    "text": "Please select",
                    "defaultAction": {
                        "type": "uri",
                        "label": "使用說明",
                        "uri": "http://example.com/page/123"
                    },
                    "actions": [{
                            "type": "postback",
                            "label": "儲存票券",
                            "data": "action=saveTicket"
                        },
                        {
                            "type": "postback",
                            "label": "提取說明",
                            "data": "action=retri"
                        },
                        {
                            "type": "uri",
                            "label": "使用說明",
                            "uri": "http://example.com/page/123"
                        }
                    ]
                })
            ])
        }
    })
    .onUnhandled(doNothing)
    // .onError(async (context, err) => {
    //     const msg = `不好意思，目前服務暫時出了點問題呢! 請稍待片刻再重試唷~`
    //     console.error(err);
    //     await context.sendText(msg)
    // })
    // .onUnhandled(async context => {
    //     const customerServiceAccountLink = 'https://line.me/R/ti/p/%40ggn0079p'
    //     const msg = `您好，目前我無法了解您的意思，若有任何問題請洽詢客服，點擊以下網址加入客服 LINE @${customerServiceAccountLink}`
    //     await context.sendText(msg)
    // })