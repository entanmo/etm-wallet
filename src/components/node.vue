<template>
  <div class="w">
    <p class="title">节点列表</p>
    <!-- table -->
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>IP</th>
              <th>版本</th>
              <th>操作系统</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td style="color: #399dff;">{{item.ip}}</td>
                  <td style="color: #399dff;">V{{item.version}}</td>
                  <td>{{item.os}}</td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
    </div>
    <!-- 分页 -->
    <page v-show="PageTotal > 1" :PageTotal="PageTotal" @renderDiff="renderDiff"></page>
  </div>
</template>

<script>
import Page from '../base/page'
import NoData from '../base/nodata'
export default {
  components: {
    Page,NoData
  },
  data () {
    return {
      ONE_PAGE_NUM: 10,
      PageTotal: 1,
      tableData: []
    }
  },
  activated () {
    this.$store.commit('changeTitle', '节点')
  },
  created () {
    this._getPeers(0)
  },
  methods: {
    _getPeers(p) {
      this.$http.get('/api/peers', {
        params: {
          limit: this.ONE_PAGE_NUM,
          offset: this.ONE_PAGE_NUM * p
        }
      }).then(res => {
        this.tableData = res.data.peers
        this.PageTotal = Number(res.data.totalCount[0])
      }).catch(e => {console.log(e)})
    },
    renderDiff(p) {
      this._getPeers(p)
    }
  }
}
</script>

<style scoped>
.w {
  padding: 0 24px;
  height: 700px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>