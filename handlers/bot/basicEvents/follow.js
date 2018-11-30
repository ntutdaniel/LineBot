const { Line } = require('messaging-api-line');
const util = require('../../.././firebase/util');

module.exports = async context => {
    console.log('follow');
    
    let path = 'line/testNew/' + 'haha';
    util.user.saveLoginInfo();
    
    // Messages to reply:
    // 1. Welcome Message, type: Text,
    // 2. Term & Services Agreement, type: Imagemap
    // 3. Ask Login, type: Text,
    // 4. Login Button, type: Imagemap
    const liffId = process.env.LIFFID
    if (!liffId) {
        throw new Error('there is no LIFFID specified in process.env')
    }
    const liffUrl = `line://app/${liffId}`
    context.reply([
        Line.createText('歡迎您使用Licket' + String.fromCodePoint(0x100005)),
        Line.createText('開始使用前請點擊下圖閱讀與同意本服務條款'),
        {
            "type": "imagemap",
            "baseUrl": "https://s3-ap-southeast-1.amazonaws.com/licket/resources/termAndService",
            "altText": "服務條款",
            "baseSize": {
                "height": 1040,
                "width": 1040
            },
            "actions": [{
                    "type": "uri",
                    "linkUri": liffUrl,
                    "label": "點我閱讀",
                    "area": {
                        "x": 0,
                        "y": 0,
                        "width": 1040,
                        "height": 1040
                    }
                }
            ]
        }
    ]);
    
    context.setState({
        currentSection: 'termAndServiceAgreement'
    })
}