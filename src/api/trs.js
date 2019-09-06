import http from '../utils/axios'
import etmLib from 'etm-js-lib'
import {blocks} from './block'
import crypto from 'crypto'
const trs = etmLib.transaction
const ed = etmLib.utils.ed

const createTransaction = async (data) => {
  const hash = crypto.createHash('sha256').update(data.secret, 'utf8').digest()
  const keypair = ed.MakeKeypair(hash)
  data.sender = {
    publicKey: keypair.publicKey.toString('hex')
  }
  const result = await blocks({limit: 1, orderBy: 'height:desc'})
  if (result && result.data.success) {
    let timestamp = result.data.blocks[0].timestamp
    data.timestamp = timestamp
    data.keypair = keypair
    if (data.secondSecret) {
      const secondHash = crypto.createHash('sha256').update(data.secondSecret, 'utf8').digest()
      const secondKeypair = ed.MakeKeypair(secondHash)
      data.secondKeypair = secondKeypair
    }
    return trs.create(data)
  }
}

export const transactionSigned = async (params) => {
  let arr = []
  let transactions = await createTransaction(params)
  arr.push(transactions)
  return http({
    url: '/api/transactions/signed',
    method: 'put',
    data: {'transactions': arr}
  })
}
