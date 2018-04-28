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
            <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
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
                        <td style="color: #399dff;">{{item.id}}</td>
                        <td>{{mapType(item.type)}}</td>
                        <td>{{item.senderId}}</td>
                        <td>{{item.recipientId}}</td>
                        <td>{{convertTime(item.timestamp)}}</td>
                        <td>{{item.message}}</td>
                        <td>{{item.amount}}</td>
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
            <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
            <no-data v-show="!tableData.length"></no-data>
        </div>
        <page v-show="PageTotal > 1" :PageTotal="PageTotal" @renderDiff="renderDiff"></page>
    </div>
  </div>
</template>

<script>
import Page from '../base/page'
import NoData from '../base/nodata'
import {genPublicKey, genAddress} from '../assets/js/gen'
import {timestampToTime} from '../assets/js/utils'
export default {
  components: {
    Page,NoData
  },
  created () {
    this.address = genAddress(localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret')) 
    this._getAccounts(this.address)
    this._getTransaction(0)
  },
  activated () {
    this.$store.commit('changeTitle', '首页')
  },
  data () {
    return {
      PageTotal: 1,
      accountInfo: {},
      tableData: [],
      address: '',
      ONE_PAGE_NUM: 10
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
    _getTransaction(p) {
      this.$http.get('/api/transactions', {
        params: {
          senderId: this.address,
          orderBy: 't_timestamp:desc',
          offset: this.ONE_PAGE_NUM * p,
          limit: this.ONE_PAGE_NUM
        }
      }).then(res => {
        if(res.data.success) {
          this.tableData = res.data.transactions
          this.PageTotal = Math.ceil(res.data.count / this.ONE_PAGE_NUM)
        }
      }).catch(e => {console.log(e)})
    },
    totalAmount() {
      // 如果没有数据
      if(!this.tableData.length) return
      let values = this.tableData.map(item => item.amount)
      return values.reduce((prev,cur) => {
              return prev + cur
            })
    },
    convertTime(time) {
      let stampTime = entanmoJs.transaction.getTime(time)
      return timestampToTime(stampTime)
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
    renderDiff(p) {
      this._getTransaction(p)
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


