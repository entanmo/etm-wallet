<template>
  <div class="w">
    <div class="info">
        <ul class="flex">
            <li>
              <p>我的余额</p>
              <p>{{accountInfo.balance}} Mole</p>
            </li>
            <li>
              <p>最后出块高度</p>
              <p>{{accountInfo.height}}</p>
            </li>
            <li>
              <p>版本信息</p>
              <p>V{{accountInfo.version}}</p>
            </li>
        </ul>
    </div>
    <div class="transaction">
      <p>交易记录</p>
      <!-- table -->
             <div class="event">
            <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="true">
                <thead class="table_th">
                    <th>ID</th>
                    <th>类型</th>
                    <th>发送者</th>
                    <th>接收者</th>
                    <th>日期</th>
                    <th>备注</th>
                    <th>金额（Mole）</th>
                </thead>
                <tbody class="table_tb">
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td style="color: blue;">{{item.id}}</td>
                        <td>{{mapType(item.type)}}</td>
                        <td>{{item.senderId}}</td>
                        <td>{{item.recipientId}}</td>
                        <td>{{item.timestamp}}</td>
                        <td>{{item.asset}}</td>
                        <td>{{item.amount / 100000000}}</td>
                    </tr>
                    <tr>
                      <td>总计</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{{totalAmount()}}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading>
            <no-data v-show="!beforeConfirm.length && cannotfind"></no-data> -->
        </div>
        <page v-show="PageTotal > 1" :PageTotal="PageTotal" :routeName="routeName" @renderDiff="renderDiff"></page>
    </div>
  </div>
</template>

<script>
import Page from '../base/page'
export default {
  components: {
    Page
  },
  created () {
    let address = localStorage.getItem('etmaddress')
    this._getAccounts(address)
    this._getTransaction(address)
  },
  data () {
    return {
      PageTotal: 2,
      routeName: '',
      accountInfo: {},
      tableData: [{   
        "id": "17192581936339156329",   
        "height": "105951",   
        "blockId": "15051364118100195665",   
        "type": 0,   
        "timestamp": 4385190,   
        "senderPublicKey": "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3",   
        "senderId": "15745540293890213312",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "98d65df3109802c707eeed706e90a907f337bddab58cb4c1fbe6ec2179aa1c85ec2903cc0cf44bf0092926829aa5a0a6ec99458f65b6ebd11f0988772e58740e",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "31802",   
        "asset": {   

        }   
    },   
    {   
        "id": "7000452951235123088",   
        "height": "105473",   
        "blockId": "11877628176330539727",   
        "type": 1,   
        "timestamp": 4380147,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "dc84044d4f6b4779eecc3a986b6507e458cc5964f601ebeb4d3b68a96129813f4940e14de950526dd685ca1328b6e477e6c57e95aeac45859a2ea62a587d0204",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32280",   
        "asset": {   

        }   
    },   
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    },
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    },
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    },
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    },
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    },
    {   
        "id": "14093929199102906687",   
        "height": "105460",   
        "blockId": "2237504897174225512",   
        "type": 2,   
        "timestamp": 4380024,   
        "senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",   
        "senderId": "16358246403719868041",   
        "recipientId": "16723473400748954103",   
        "amount": 10000000000,   
        "fee": 10000000,   
        "signature": "73ceddc3cbe5103fbdd9eee12f7e4d9a125a3bcf2e7cd04282b7329719735aeb36936762f17d842fb14813fa8f857b8144040e5117dffcfc7e2ae88e36440a0f",   
        "signSignature": "",   
        "signatures": null,   
        "confirmations": "32293",   
        "asset": {   

        }   
    }
]
    }
  },
  methods: {
    _getAccounts(address) {
      this.$http.get('/api/accounts', {
        params: {
          address
        }
      }).then(res => {
        if(res.data.success) {
          this.accountInfo = Object.assign({}, res.data.account, res.data.latestBlock, res.data.version)
        }
      })
    },
    _getTransaction(address) {
      this.$http.get('/api/transactions', {
        params: {
          senderId: address,
          orderBy: 't_timestamp:desc'
        }
      }).then(res => {
        if(res.data.success) {
          // this.tableData = res.data.transactions
        }
      })
    },
    totalAmount() {
      let values = this.tableData.map(item => item.amount / 100000000)
      return values.reduce((prev,cur) => {
              return prev + cur
            })
    },
    mapType(type) {
      switch(type) {
        case 0: return '普通转账';
        break;
        case 1: return '设置二级密码';
        break;
        case 2: return '注册受托人';
        break;
        case 3: return '投票';
        break;
        case 4: return '多重签名';
        break;
        case 5: return 'DAPP';
        break;
        case 6: return 'IN_TRANSFER';
        break;
        case 7: return 'OUT_TRANSFER';
        break;
      }
    },
    renderDiff(data) {

    }
  }
}
</script>

<style scoped>
el-table__row > td:first-child > .cell {
  color: blue;
}
.w {
    padding: 0 24px;
}
/*主要信息*/
.info {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border-radius: 3px;
  padding-top: 20px;
  box-sizing: border-box;
}
.info ul {
  height: 100%;
}
.info li {
  width: 33.3%;
  height: 100%;
  text-align: center;
  line-height: 30px;
}
.info li > p {
  border-right: 1px solid #e9e9e9;
}
.info li:last-child > p {
  border-right: 0;
}
.info li > p:first-child {
  color: #8d8d8d;
  font-size: 14px;
}
.info li > p:last-child {
  color: #4b4b4b;
  font-size: 24px;
}
/*交易记录*/
.transaction {
  margin: 20px 0;
}
.transaction p {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>


