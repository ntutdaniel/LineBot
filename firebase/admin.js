var admin = require("firebase-admin");
var serviceAccount = require("./linebotcourse-firebase-adminsdk-6nosc-8b46344270.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://linebotcourse.firebaseio.com/"
});

module.exports = admin;