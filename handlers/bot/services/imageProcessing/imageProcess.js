//documentation: http://sharp.dimens.io/en/stable/
const sharp = require('sharp');
var qrcode = require('./qrcode.js');

//module.exports = async buffer => {
module.exports = async function (buffer) {
  const image = sharp(buffer);
  image
    .metadata()
    .then(function(metadata) {
      //Image dimension normalization 
      var data = image;
      if (metadata.width > 4096 || metadata.height > 4096) {
        data = image
              .resize(4096, 4096) //Max allowable width/height
              .max(); //use resize(w,h) inaccordance with max() to get max image size within max(w, h) while maintaining the aspect ratio
      }
      
      //Image formatting
      if (metadata.format != 'jpeg') {
        data = data.toFormat('jpeg');
      }

      return data.toBuffer();
    })
    .then(function(outputBuffer) {
      qrcode(outputBuffer).then(function(data) {
        if (data === 'unrecognized') {
          //在Chatbot提示需要重新掃描
          console.log("please upload image again!")
        }
        else {
          //Save to firebase
          console.log('qrcode decode is = ' + data);
        }
      });
    });
}