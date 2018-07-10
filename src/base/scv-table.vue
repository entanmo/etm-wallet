<template>
  <div>
    <div class="w">
      <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>序号</th>
              <th>名称</th>
              <th>得票数</th>
              <th>欺诈次数</th>
              <th>生产率</th>
              <th>平均算力</th>
              <th>已运行时间</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td>{{item.index + 1}}</td>
                  <td class="gre" @click="goToDetail(item)">{{item.minerName}}</td>
                  <td>{{item.vote}}</td>
                  <td>{{item.cheat}}</td>
                  <td>{{(item.productivity * 100).toFixed(2)}}%</td>
                  <td>{{(item.averagepower).toFixed(2)}} MH/s</td>
                  <td>{{calcTime(item.alreadyruntime)}}</td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
      </div>
      <!-- 分页 -->
      <page v-show="PageTotal > 1" :PageTotal="PageTotal" @renderDiff="renderDiff"></page>
    </div>
    
  </div>
</template>
<script>
import NoData from "./nodata";
import Page from "./page";
const HOST = require('../../config/ip')
export default {
  components: {
    NoData,
    Page
  },
  data() {
    return {
      tableData: [],
      PageTotal: 1,
      status: '',
      ONE_PAGE_NUM: 10
    };
  },
  computed: {
      sortAs() {
          return this.$store.state.sortAs ? 'desc' : 'asc'
      },
      sortBy() {
          switch(this.$store.state.sortBy) {
            case 0:
            return 'vote';
            break;
            case 1:
            return 'averagepower';
            break;
            case 2:
            return 'alreadyruntime';
            break;
            case 3:
            return 'alreadyruntime';
            break;
        }
      }
  },
  mounted () {
    switch (this.$route.name) {
      case "formalMiners":
        this.status = "RUN";
        break;
      case "candidateMiners":
        this.status = "WAIT";
        break;
      case "remainingMiners":
        this.status = "EMPTY";
        break;
    }
    this.getSCVMinersNum();
    this.getSCVMiners(0);
  },
  methods: {
      getSCVMinersNum() {
      this.$http
        .get(HOST+"/api/miner/scv", {
          params: {
            status: this.status
          }
        })
        .then(res => {
          if (res.data.success) {
            this.PageTotal = Math.ceil(res.data.totalCount / this.ONE_PAGE_NUM);
          }
        });
    },
    getSCVMiners(p) {
      this.$http
        .get(HOST+"/api/miner/scv", {
          params: {
            status: this.status,
            offset: this.ONE_PAGE_NUM * p,
            limit: this.ONE_PAGE_NUM,
            orderBy: this.sortBy + ':' + this.sortAs
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tableData = res.data.data;

            this.tableData.forEach((item, index) => {
              this.$set(item, "index", this.ONE_PAGE_NUM * p + index);
            });
          }
        });
    },
    calcTime(t) {
      let h = Math.floor(t / 3600);
      let m = Math.floor((t - h * 3600) / 60);
      return h === 0 ? m + "min" : h + "h " + m + "min";
    },
    renderDiff(p) {
      this.getSCVMiners(p);
    },
    goToDetail(item) {
      this.$router.push({
        path: `/miners-list/${item.minerNo}`
      })
      sessionStorage.setItem('detailInfo', JSON.stringify(item))
    },
    
  },
  watch: {
      sortAs() {
        this.getSCVMiners(0)
      },
      sortBy() {
        this.getSCVMiners(0) 
      }
  }
};
</script>
<style scoped>
.gre {
  color: #1890ff;
  cursor: pointer;
}
</style>

