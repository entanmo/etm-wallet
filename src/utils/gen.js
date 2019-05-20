import etmLib from 'etm-js-lib'
import {timestampToTime} from './utils'
// 生成公钥
export function genPublicKey (secret) {
  return etmLib.account.getKeypairBySecret(secret).publicKey
}
// 时间转换
export function convertTime (time) {
  const stampTime = etmLib.utils.slots.getRealTime(time)
  return timestampToTime(stampTime)
}
