
const querystring = require('querystring');

module.exports.parseKeyMessage = (context, callback) => {
    var message = context.event.text.slice(1, -1); //Get rid of 『』
    //console.log('parseKeyMessage: message = ' + message);
    if (message == '測試') {
        console.log('parseKeyMessage : 測試');
    }
  //callback(null, response);
};

module.exports.postbackHandler = (context, callback) => {
    console.log('postbackHanlder enter');
    var qs = querystring.parse(context.event.postback.data);
    console.log(JSON.stringify(qs));                                                                                                                                                                                                                                        
  //callback(null, response);
};