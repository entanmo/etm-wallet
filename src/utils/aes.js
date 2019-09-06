const storeKey = {
  key: 'etm123456', // 配置自己的key和iv
  iv: 'etm123456'
}
const CryptoJS = require('crypto-js')
const key = CryptoJS.enc.Utf8.parse(storeKey.key)
const iv = CryptoJS.enc.Utf8.parse(storeKey.iv)

export function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}

export function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
