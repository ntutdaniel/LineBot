// const qrcodeScanner = require('some-scanner')
var QrCode = require('qrcode-reader');
const sharp = require('sharp');
var Jimp = require("jimp");

module.exports = async function(imageBuffer) {
  const outputImage = sharp(imageBuffer);
  const metadata = await outputImage.metadata()
  const image = await Jimp.read(imageBuffer)
  var qr = new QrCode();
  return new Promise(function(resolve, reject) {
  	// Do async job
    qr.callback = function(err, value) {
      if (err) {
        console.error('new qrcode error: ' + err);
        //reject(err);
        resolve('unrecognized');
      }
      else {
        //console.log('new qrcode result = ' + value.result);
        resolve(value.result);
      }
    };
    qr.decode(image.bitmap);
  });
}