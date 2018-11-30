const admin = require("./admin");

// save information once user is logged in via Line Login
function saveLoginInfo() {
 
  var path = 'line/users';
  
  admin.database().ref(path).once("value", function(data) {
      // do some stuff once
      console.log('saveLoginInfo, data = ' + JSON.stringify(data));
  });
  
  /*
  if (Firebase_.getAsString(path + '/info') == null) {
    cellVerified = false;
    
    Firebase_.set(path + '/_cellVerified', false); //boolean
    Firebase_.set(path + '/_emailVerified', false); //boolean
    //Firebase_.set(path + '/_twoFactorAuthentication', false); //boolean
    
    Firebase_.set(path + '/_lastSmsCode', ''); //string
    Firebase_.set(path + '/_lastSmsCodeSentTime', 0); //datetime in ticks, Josh! timeout?
    Firebase_.set(path + '/_lastSmsCodeSentCountBeforeVerified', 0); //number
    Firebase_.set(path + '/_lastSmsCodeVerificationErrorCount', 0); //number
    
    Firebase_.set(path + '/_lastVerifiedEmailSentTime', 0); //datetime in ticks, Josh! timeout?
    Firebase_.set(path + '/_lastVerifiedEmailCode', ''); //string
    
    //Josh! give default session
    Firebase_.set(path + '/_currentSession', ''); //string
    Firebase_.set(path + '/_lastEventTime', timeStamp); //datetime in ticks
    
    Firebase_.set(path + '/info/_cell', ''); //+886
    Firebase_.set(path + '/info/_email', ''); 
    Firebase_.set(path + '/info/_referralCode', ''); 
    //Josh to do: add function hook here 讓Host可以增加自己定義的欄位
    //Firebase_.set(path + '/info/_name', '');
    //Firebase_.set(path + '/info/_address', ''); 
    //Firebase_.set(path + '/info/_gender', ''); 
    //Firebase_.set(path + '/info/_birthday', '');
    //------------------------------------------------------------------------
  }
  */

    //https://www.npmjs.com/package/node-localstorage
    /*
     admin.database().ref('/line/followers/' + context.event.source.userId + '/_followTime').
                         set(context.event.rawEvent.timestamp);
        //delete from unfollowers if any
        admin.database().ref('/line/unfollowers/' + context.event.source.userId + '/_unfollowTime').
                         set(null);
        //user is active now
        admin.database().ref('line/users/' + context.event.source.userId + '/_active').
                         set(true);
    */
}

// get information that user logged in
function getLoginInfo() {
    
}

// save ticket to db
function saveTicket() {
    
}


// get ticket from db
// query condition:
// 1. by location
// 2. by time of event start
function getTicket(userId, condition) {
    
}

module.exports = {
    user: {
        saveLoginInfo,
        getLoginInfo
    },
    ticket: {
        saveTicket,
        getTicket
    }
}