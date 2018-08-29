<template>
  <div class="w">
    <div class="head flex">
        <p>共{{allNum}}人</p>
    </div>
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>用户名</th>
              <th>地址</th>
              <th>权重</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td>{{item.name}}</td>
                  <td style="color: #399dff;">{{item.address}}</td>
                  <td>{{item.weight}}</td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
    </div>
    <!-- 分页 -->
    <page v-show="PageTotal > 1" :PageTotal="PageTotal" :routeName="routeName" @renderDiff="renderDiff"></page>
  </div>
</template>

<script>
import Page from '../page'
import NoData from '../nodata'
import {genPublicKey} from '../../assets/js/gen'
const HOST = require('../../../config/ip')
export default {
  components: {
    Page,NoData
  },
  data() {
      return {
        PageTotal: 1,
        routeName: '',
        showPop: false,
        tableData: [],
        ONE_PAGE_NUM:10, //每页数量
        allNum: 0
      }
    },
    created(){
      this._getWhoVoteForMe(0)
    },
    mounted () {
    },
  methods: {
    _getWhoVoteForMe(p) {
      this.$http.get(HOST+'/api/delegates/voters', {
        params: {
          publicKey: genPublicKey(localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret'))
        }
      }).then(res => {
        this.tableData = res.data.accounts.slice(
          this.ONE_PAGE_NUM * p,
          this.ONE_PAGE_NUM * p + 10
        );
        this.allNum = res.data.accounts.length;
        this.PageTotal = Math.ceil(this.allNum / this.ONE_PAGE_NUM);
      }).catch(e => {console.log(e)})
    },
    renderDiff(p) {
      this._getWhoVoteForMe(p)
    }
  }
}
</script>

<style scoped>
.gre {
    color: #1890ff;
}
.head {
    height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
}
.head p {
    font-size: 18px;
}
.head button {
    width: 120px;
    height: 36px;
    background: #169bd5;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
}
</style>
