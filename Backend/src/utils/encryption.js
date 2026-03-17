 const CryptoJS = require("crypto-js");

const secret = process.env.AES_SECRET || "fallbacksecret";

exports.encrypt = (text) => {
  if (!text) return "";

  return CryptoJS.AES.encrypt(
    text.toString(),
    secret
  ).toString();
};

exports.decrypt = (cipher) => {
  if (!cipher) return "";

  const bytes = CryptoJS.AES.decrypt(cipher, secret);

  return bytes.toString(CryptoJS.enc.Utf8);
};