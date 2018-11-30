const fs = require('fs');
const config = require('../config'); 
const { Line } = require('messaging-api-line');
const { LineClient } = require('messaging-api-line');

const lineConfig = (process.env.NODE_ENV === 'production') ? config.Line.production : config.Line.development
const client = LineClient.connect({
    channelSecret: lineConfig.channelSecret,
    accessToken: lineConfig.accessToken
});

const userId = 'U557b8b8a06ca0a4773dab9b14228b1b2'; //記得要改
const menuHost = {
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": false,
  "name": "Host", 
  "chatBarText": "主辦者", 
  "areas": [
    {  //(0, 0)
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"一般設定",
        "uri":"https://www.facebook.com/ObAIoT%E6%89%93%E9%80%A0%E4%BD%A0%E7%9A%84%E7%89%A9%E8%81%AF%E7%B6%B2-1539006922859663/"
      }
    },
    { //(0, 2)
      "bounds": {
        "x": 1667,
        "y": 0,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"活動行事曆",
        "uri":"https://calendar.google.com/calendar/embed?src=obaiot.com_9tmghpk9ic502qc0l5ni2dkocc%40group.calendar.google.com&ctz=Asia%2FTaipei"
      }
    },
    { //(1, 0)
      "bounds": {
        "x": 0,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"我要辦活動",
        "uri":"https://www.google.com/"
      }
    },
    { //(1, 1)
      "bounds": {
        "x": 833,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type": "postback",
        "data": "action=sm&target=attendee" //sm: switch menu
      }
    },
    { //(1, 2)
      "bounds": {
        "x": 1667,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type": "postback",
        "data": "action=ci&target=location" //ci: check-in, 我要驗票
      }
    },
  ]
};

const menuAttendee = {
  "size": {
    "width": 2500,
    "height": 1686
  },
  "selected": false,
  "name": "Attendee", 
  "chatBarText": "參加者", 
  "areas": [
    {  //(0, 0)
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"一般設定",
        "uri":"line://nv/location"
      }
    },
    { //(0, 2)
      "bounds": {
        "x": 1667,
        "y": 0,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"活動行事曆",
        "uri":"line://nv/camera/"
      }
    },
    { //(1, 0)
      "bounds": {
        "x": 0,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "label":"我的票券",
        "uri":"line://nv/cameraRoll/single"
      }
    },
    { //(1, 1)
      "bounds": {
        "x": 833,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type":"uri",
        "uri": "line://ti/p/@yjb9798z"
      }
    },
    { //(1, 2)
      "bounds": {
        "x": 1667,
        "y": 843,
        "width": 833,
        "height": 843
      },
      "action": {
        "type": "uri",
        "uri": "line://nv/recommendOA/@yjb9798z" //呼叫小助手
      }
    },
  ]
};

//https://www.npmjs.com/package/yargs
var { argv } = require('yargs');
//var argv = require('yargs').argv; //跟上ㄧ行同意義


//Josh:~/environment/linebot/richmenu (master) $ node menu --pushtemplate

//Josh:~/environment/linebot/richmenu (master) $ node menu --listmenu
//Josh:~/environment/linebot/richmenu (master) $ node menu --delmenu 'richmenu-65ebc8d98df6321c1c4bd85367d42e32'
//Josh:~/environment/linebot/richmenu (master) $ node menu --delallmenus

//Josh:~/environment/linebot/richmenu (master) $ node menu --createmenu //需要預先給定richmenu JSON 
//Josh:~/environment/linebot/richmenu (master) $ node menu --uploadmenu //需要預先給定richmenu id以及上傳image file 
//Josh:~/environment/linebot/richmenu (master) $ node menu --downloadmenu 'richmenu-11bea2e6ae67f895b810cc39500192c0'

//Josh:~/environment/linebot/richmenu (master) $ node menu --linkmenu 'richmenu-11bea2e6ae67f895b810cc39500192c0'
//Josh:~/environment/linebot/richmenu (master) $ node menu --unlinkmenu
//Josh:~/environment/linebot/richmenu (master) $ node menu --getlinkedmenu

//Josh:~/environment/linebot/richmenu (master) $ node menu --setdefaultmenu 'richmenu-11bea2e6ae67f895b810cc39500192c0'
//Josh:~/environment/linebot/richmenu (master) $ node menu --getdefaultmenu
//Josh:~/environment/linebot/richmenu (master) $ node menu --deldefaultmenu

if (argv.listmenu) {
  console.log('listmenu');
  client.getRichMenuList().then(richMenus => {
    for (var i in richMenus) {
      console.log(JSON.stringify(richMenus[i]));
    }
  });
}

if (argv.delmenu) {
  console.log('delmenu');
  let menuId = argv.delmenu; //若沒有給值預設為true，eg ＄node menu --delmenu
  client.deleteRichMenu(argv.delmenu);
}
if (argv.delallmenus) {
  console.log('delallmenus');
  client.getRichMenuList().then(richMenus => {
    for (var i in richMenus) {
      console.log(JSON.stringify(richMenus[i]));
      client.deleteRichMenu(richMenus[i].richMenuId);
    }
  });
}

// { richMenuId: 'richmenu-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' }
// { richMenuId: 'richmenu-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' }
if (argv.createmenu) {
  console.log('createmenu');
  client
  .createRichMenu(menuAttendee)
  .then(richMenu => {
    console.log(richMenu);
  });
  
  client
  .createRichMenu(menuHost)
  .then(richMenu => {
    console.log(richMenu);
  });
}

if (argv.uploadmenu) {
  console.log('uploadmenu');
  client.uploadRichMenuImage('richmenu-fb4018ebdea56096763964d39cfe13dc', fs.readFileSync('Licket_Attendee.jpg'));
  client.uploadRichMenuImage('richmenu-c20d7f1c8a9108776f4a53d8f0b08156', fs.readFileSync('Licket_Host.jpg'));
}
if (argv.downloadmenu) {
  let menuId = argv.downloadmenu;
  console.log('downloadmenu, menuId = ' + menuId);
  client.downloadRichMenuImage(menuId).then(imageBuffer => {
    console.log(imageBuffer);
    // <Buffer 61 61 73 64 ...>
  });
}

if (argv.linkmenu) {
  let menuId = argv.linkmenu;
  console.log('linkmenu, menuId = ' + menuId);
  client.linkRichMenu(userId, menuId);
}
if (argv.unlinkmenu) {
  console.log('unlinkmenu');
  client.unlinkRichMenu(userId);
}
if (argv.getlinkedmenu) {
  console.log('getlinkedmenu');
  client.getLinkedRichMenu(userId).then(richMenu => {
  console.log(richMenu);
});
}

if (argv.getdefaultmenu) {
  console.log('getdefaultmenu');
  client.getDefaultRichMenu().then(richMenu => {
    console.log(richMenu);
  });
}
if (argv.setdefaultmenu) {
  let menuId = argv.setdefaultmenu; 
  console.log('setdefaultmenu: menuId = ' + menuId);
  client.setDefaultRichMenu(menuId);
}
if (argv.deldefaultmenu) {
  console.log('deldefaultmenu');
  client.deleteDefaultRichMenu();
}

if (argv.pushtemplate) {
  client.pushTemplate(userId, '傑克．迪爾博士權能佈道主日', {
  type: 'buttons',
  thumbnailImageUrl: 'https://s3-ap-southeast-1.amazonaws.com/chatbotcourse/201812w1_9005521.jpg',
  title: '11/30-12/2 傑克．迪爾博士權能佈道主日',
  text: '博士曾任達拉斯神學院教授，著有《聖靈權能大驚異》，《聖靈話語大驚異》等暢銷書。',
  actions: [
    {
      type: 'postback',
      label: '12/1(六)13:00-15:00',
      data: 'action=buy&itemid=123',
    },
    {
      type: 'postback',
      label: '12/1(六)15:30-17:30',
      data: 'action=add&itemid=123',
    },
    {
      type: 'uri',
      label: '12/1(日)10:30-12:30',
      uri: 'http://example.com/page/123',
    },
  ],
});
}