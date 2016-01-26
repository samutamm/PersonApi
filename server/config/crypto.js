const config = require('./config');
const CryptoJS = require("crypto-js");

exports.encrypt = function(string) {
  return CryptoJS.AES.encrypt(string, config.secretKey).toString();
}

exports.decrypt = function(crypted) {
  var bytes  = CryptoJS.AES.decrypt(crypted, config.secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
