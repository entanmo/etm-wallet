<template>
<div>
  <div class="w" v-show="minerDetail == undefined">
    <div class="head flex">
      <p>共{{totalMinersNum}}台</p>
      <button @click="addNewMiner">添加新矿工</button>
    </div>
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th>状态</th>
              <th>名称</th>
              <th>得票数</th>
              <th>欺诈次数</th>
              <th>生产率</th>
              <th>平均算力</th>
              <th>已运行时间</th>
              <th>操作</th>              
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td :class="item.status==='RUN'?'run':(item.status==='WAIT'?'wait':'idle')">{{mapStatus(item.status)}}</td>
                  <td class="gre" @click="goToDetail(item)">{{item.minerName}}</td>
                  <td>{{item.vote}}</td>
                  <td>{{item.cheat}}</td>
                  <td>{{(item.productivity * 100).toFixed(2)}}%</td>
                  <td>{{(item.averagepower).toFixed(2)}} MH/s</td>
                  <td>{{calcTime(item.alreadyruntime)}}</td>
                  <td class="del" @click="deleteIt(item)">删除</td>
              </tr>
          </tbody>
      </table>
      <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading> -->
      <no-data v-show="!tableData.length"></no-data>
    </div>
    <!-- 弹框 -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">您确定要删除该矿工吗？</p>
      <div class="set-btm">
        <div class="confirm">
          <button @click="hidePopout">取消</button>
          <button @click="submitDelete">确定</button>
        </div>
      </div>
    </div>
    <div class="tip" v-show="submitDel" :class="yesOrNo">
		  删除{{delType}}！
	  </div>
    <s-secret v-show="showSecondSecretPop" @hidePop="hidePop" @inputSSecret="inputSSecret"></s-secret>
  </div>
  <router-view @setMinerDetail="setMinerDetail"></router-view>
</div>
</template>

<script>
import NoData from '../base/nodata'
import SSecret from "../base/second-secret";
export default {
  components: {
    NoData,
    SSecret
  },
  data () {
    return {
      totalMinersNum: 0,
      secondSecret: '',
      tableData: [],
      minerDetail: null,
      showPop: false,
      submitDel: false,
      delType: '',
      delMinerNo: [],
      secondSecret: '',
      showSecondSecretPop: false,
      mapColor: ''
    }
  },
  computed: {
    yesOrNo() {
      return this.delType === "成功" ? "success-tip" : "fail-tip";
    },
  },
  activated() {
    this.$store.commit("changeTitle", "已选旷工");
  },
  updated() {
    Bus.$on("hideQrcode", data => {
      this.showPop = false;
    });
  },
  created () {
    this.getSelectedMiners()
  },
  methods: {
    mapStatus(status) {
      switch (status) {
        case 'RUN':
          // this.mapColor = 'run'
          return '正式'
          break;
        case 'WAIT':
          // this.mapColor = 'wait'
          return '备选'
          break;
        case 'IDLE':
          // this.mapColor = 'idle'
          return '剩余'
          break;
      }
    },
    getSelectedMiners() {
      this.checkSecondSecret_delParams()
      this.$http.get('/api/miner/vote', {
        params: {
          secret: localStorage.getItem("etmsecret") ||
            sessionStorage.getItem("etmsecret"),
          secondSecret: this.secondSecret
        }
      }).then(res => {
        if(res.data.success) {
          this.totalMinersNum = res.data.miners.length
          this.tableData = res.data.miners
        }
      }).catch(e => {
        console.log(e)
      })
    },
    checkSecondSecret_delParams() {
      // 如果未设置二级密码，那么不用传secondSecret
      if (!this.$store.needsSecondSecret) {
        this.$http.interceptors.request.use(
          config => {
            if(config.params) {
              delete config.params.secondSecret
            }
            return config;
          },
          e => {
            return Promise.reject(error);
          }
        );
      }
    },
    checkSecondSecret_delData() {
      // 如果未设置二级密码，那么不用传secondSecret
      if (!this.$store.needsSecondSecret) {
        this.$http.interceptors.request.use(
          config => {
            delete config.data.secondSecret
            return config;
          },
          e => {
            return Promise.reject(error);
          }
        );
      }
    },
    calcTime(t) {
      let h = Math.floor(t / 3600);
      let m = Math.floor((t - h * 3600) / 60);
      return h === 0 ? m + "min" : h + "h " + m + "min";
    },
    goToDetail(item) {
      this.$router.push({
        path: `/selected-miners/${item.minerNo}`
      })
      sessionStorage.setItem('detailInfo', JSON.stringify(item))
    },
    setMinerDetail(data) {
      this.minerDetail = data
    },
    addNewMiner() {
      this.$router.push({
        path: '/select-miners'
      })
    },
    hidePopout() {
      this.showPop = false;
      Bus.$emit("showMask", false);
    },
    deleteIt(item) {
      this.showPop = true;
      Bus.$emit("showMask", true);
      this.delMinerNo.push({
        minerNo: item.minerNo
      })
    },
    submitDelete() {
      this.showPop = false;
      Bus.$emit("showMask", false);
      if (this.$store.state.needsSecondSecret) {
        this.showSecondSecretPop = true;
      } else {
        this._submitDelete();
      }
    },
    _submitDelete() {
      this.checkSecondSecret_delData()
      // 删除
      this.$http.put('/api/miner/del', {
        secret: localStorage.getItem("etmsecret") ||
            sessionStorage.getItem("etmsecret"),
        secondSecret: this.secondSecret,
        miners: this.delMinerNo
      }).then(res => {
        console.log(res)
        // 投票后自动关闭弹框
          Bus.$emit("showMask", false);
          this.showPop = false;

          if (res.data.success) {
            this.delType = "成功";
            this.submitDel = true;
            setTimeout(() => {
              this.submitDel = false;
            }, 2000);
            window.location.reload()
          } else {
            this.delType = "失败";
            this.submitDel = true;
            setTimeout(() => {
              this.submitDel = false;
            }, 2000);
          }
      })
    },
    hidePop(data) {
      this.showSecondSecretPop = data;
    },
    inputSSecret(data) {
      this.secondSecret = data;
      this._submitDelete();
    },
  },
  watch: {
    '$route'(newVal) {
        this.minerDetail = this.$route.params.id
        sessionStorage.setItem('minerDetail', this.minerDetail)
    }
  }
}
</script>

<style scoped>
.gre {
  color: #1890ff;
  cursor: pointer;
}
.w {
  width: 96%;
  margin: 0 2%;
  background: #fff;
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
.del {
  color: red;
  cursor: pointer;
}
/*弹框*/
.popout {
  width: 400px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
  height: 200px;
}
.close {
  font-size: 36px;
  text-align: right;
}
.close span {
  display: inline-block;
  width: 47px;
  text-align: center;
  cursor: pointer;
}
.title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
}
.popout .confirm {
  text-align: center;
  margin: 20px 0;
}
.popout .confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
  margin: 0 10px;
}
.popout .confirm button:first-child {
  background: #adb1b3;
}
.popout .tips {
  text-align: center;
}
.set-btm {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.tip {
  width: 160px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 0 0 20px rgb(200, 200, 200);
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 18px;
}
.success-tip {
  background: #399bff;
}
.fail-tip {
  background: #ee4000;
}
.run {
  color: #3adfa4;
}
.wait {
  color: #ebc80e;
}
.idle {
  color: #5b6b9e;
}
</style>