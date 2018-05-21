<template>
<div>
  <div class="w" v-show="minerDetail == undefined">
    <div class="head flex">
      <p>共{{totalMinersNum}}台</p>
      <button @click="vote" ref="voteBtn">投票</button>
    </div>
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th></th>
              <th>排名</th>
              <th>名称</th>
              <th>得票数</th>
              <th>欺诈次数</th>
              <th>生产率</th>
              <th>平均算力</th>
              <th>已运行时间</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td>
                    <input type="checkbox"
                     :value="item" 
                     v-model="selectMiners"
                     ref="checkBox">
                  </td>
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
    <!-- 弹框 -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">投票</p>
      <p class="care">请确认您的选择与投票，每张票最多可同时投33人</p>
      <div class="input-list">
      <div class="input-line" v-for="(item,index) in selectMiners" :key="index">
        <div class="input clearfix">
        <span class="fl">{{item.minerName}}</span>
        <span class="gre fr">{{item.vote}}票</span>
        </div>
      </div>
      </div>
      <div class="set-btm">
        <div class="confirm"><button @click="submitVoter">提交</button></div>
        <p class="tips">投票需支付0.01Mole</p>
      </div>
    </div>
    <div class="tip" v-show="submitVote" :class="yesOrNo">
		  投票{{voteType}}！
	  </div>
    <s-secret v-show="showSecondSecretPop" @hidePop="hidePop" @inputSSecret="inputSSecret"></s-secret>
  </div>
  <router-view @setMinerDetail="setMinerDetail"></router-view>
</div>
</template>

<script>
import Page from "../base/page";
import NoData from "../base/nodata";
import SSecret from "../base/second-secret";
export default {
  components: {
    Page,
    NoData,
    SSecret
  },
  data() {
    return {
      tableData: [],
      selectMiners: [],
      PageTotal: 1,
      totalMinersNum: 0,
      ONE_PAGE_NUM: 10,
      showPop: false,
      secondSecret: "",
      miners: [],
      showSecondSecretPop: false,
      voteType: "",
      submitVote: false,
      minerDetail: null
    };
  },
  computed: {
    yesOrNo() {
      return this.voteType === "成功" ? "success-tip" : "fail-tip";
    }
  },
  activated() {
    this.$store.commit("changeTitle", "选择旷工");
  },
  created() {
    this.getMinersNum();
    this.getMiners(0);
    
  },
  mounted() {
    //   未选择无法点击投票
    if (!this.miners.length) {
      this.$refs.voteBtn.disabled = true;
    } else {
      this.$refs.voteBtn.disabled = false;
    }
  },
  updated() {
    Bus.$on("hideQrcode", data => {
      this.showPop = false;
    });
  },
  methods: {
    
    getMinersNum() {
      this.$http
        .get("http://118.24.135.98:4096/api/miner")
        .then(res => {
          if (res.data.success) {
            this.totalMinersNum = res.data.totalCount;
            this.PageTotal = Math.ceil(res.data.totalCount / this.ONE_PAGE_NUM);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getMiners(p) {
      this.$http
        .get("http://118.24.135.98:4096/api/miner", {
          params: {
            orderBy: "productivity:desc",
            offset: this.ONE_PAGE_NUM * p,
            limit: this.ONE_PAGE_NUM
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tableData = res.data.miners;
            // 设置排名
            this.tableData.forEach((item, index) => {
              this.$set(item, "index", this.ONE_PAGE_NUM * p + index);
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    calcTime(t) {
      let h = Math.floor(t / 3600);
      let m = Math.floor((t - h * 3600) / 60);
      return h === 0 ? m + "min" : h + "h " + m + "min";
    },
    vote() {
      this.showPop = true;
      Bus.$emit("showMask", true);
    },
    renderDiff(p) {
      this.getMiners(p);
    },
    hidePopout() {
      this.showPop = false;
      Bus.$emit("showMask", false);
    },
    submitVoter() {
      this.showPop = false;
      Bus.$emit("showMask", false);
      if (this.$store.state.needsSecondSecret) {
        this.showSecondSecretPop = true;
      } else {
        this._submitVoter();
      }
    },
    _submitVoter() {
      this.checkSecondSecret();
      this.$http
        .put("http://118.24.135.98:4096/api/miner", {
          secret:
            localStorage.getItem("etmsecret") ||
            sessionStorage.getItem("etmsecret"),
          secondSecret: this.secondSecret,
          miners: this.miners
        })
        .then(res => {
          // 投票后自动关闭弹框
          Bus.$emit("showMask", false);
          this.showPop = false;

          if (res.data.success) {
            this.voteType = "成功";
            this.submitVote = true;
            setTimeout(() => {
              this.submitVote = false;
            }, 2000);
          } else {
            this.voteType = "失败";
            this.submitVote = true;
            setTimeout(() => {
              this.submitVote = false;
            }, 2000);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    checkSecondSecret() {
      // 如果未设置二级密码，那么不用传secondSecret
      if (!this.$store.needsSecondSecret) {
        this.$http.interceptors.request.use(
          config => {
            delete config.data.secondSecret;
            return config;
          },
          e => {
            return Promise.reject(error);
          }
        );
      }
    },
    goToDetail(item) {
      this.$router.push({
        path: `/select-miners/${item.minerNo}`
      })
      sessionStorage.setItem('detailInfo', JSON.stringify(item))
    },
    setMinerDetail(data) {
      this.minerDetail = data
    },
    hidePop(data) {
      this.showSecondSecretPop = data;
    },
    inputSSecret(data) {
      this.secondSecret = data;
      this._submitVoter();
    },
  },
  watch: {
    selectMiners(newVal, oldVal) {
      this.miners = [];
      newVal.forEach(item => {
        this.miners.push({
          minerNo: item.minerNo,
          vote: item.vote
        });
      });
      if (!this.miners.length) {
        this.$refs.voteBtn.disabled = true;
      } else {
        this.$refs.voteBtn.disabled = false;
      }
    },
    '$route'(newVal) {
        this.minerDetail = this.$route.params.id
        sessionStorage.setItem('minerDetail', this.minerDetail)
    }
  }
};
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
/*弹框*/
.popout {
  width: 560px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
  max-height: 500px;
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
.care {
  font-size: 16px;
  color: #afafaf;
  text-align: center;
  margin-bottom: 10px;
}
.input-list {
  max-height: 260px;
  overflow: auto;
}
.input-line {
  text-align: center;
}
.input {
  width: 480px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  padding: 0 6px;
  border-radius: 3px;
  display: inline-block;
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
</style>


