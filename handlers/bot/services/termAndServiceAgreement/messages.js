const { Line } = require('messaging-api-line');

const askTermAndServiceAgreementMessage = [
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
]

module.exports = askTermAndServiceAgreementMessage