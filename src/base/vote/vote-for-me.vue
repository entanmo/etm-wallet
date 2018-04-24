<template>
  <div class="w">
    <div class="head flex">
        <p>共{{voters}}人</p>
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
        voters: 0
      }
    },
    mounted () {
      this._getWhoVoteForMe()
    },
  methods: {
    _getWhoVoteForMe() {
      this.$http.get('/api/delegates/voters', {
        params: {
          publicKey: genPublicKey(localStorage.getItem('etmsecret'))
        }
      }).then(res => {
        this.tableData = res.data.accounts
        this.voters = res.data.accounts.length
      }).catch(e => {console.log(e)})
    },
    renderDiff(p) {

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