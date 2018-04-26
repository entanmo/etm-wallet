<template>
  <div class="w">
    <div class="head flex">
        <p>共{{totalVoters}}人</p>
        <button @click="vote" ref="voteBtn">投票</button>
    </div>
    <div class="event" >
      <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
          <thead class="table_th">
              <th></th>
              <th>排名</th>
              <th>受托人</th>
              <th>地址</th>
              <th>生产率</th>
              <th>生产块数</th>
              <th>得票率</th>
          </thead>
          <tbody class="table_tb">
              <tr v-for="(item, index) in tableData" :key="index">
                  <td>
                    <input type="checkbox"
                     :value="item" 
                     v-model="selectDelegates"
                     disabled
                     ref="checkBox">
                  </td>
                  <td>{{item.rate}}</td>
                  <td>{{item.username}}</td>
                  <td style="color: #399dff;">{{item.address}}</td>
                  <td>{{item.productivity}}%</td>
                  <td>{{item.producedblocks}}</td>
                  <td>{{item.approval}}%</td>
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
      <p class="title">投票给受托人</p>
      <p class="care">请确认您的选择与投票，每张票最多可同时投33人</p>
      <div class="input-list">
      <div class="input-line" v-for="(item,index) in selectDelegates" :key="index">
        <div class="input clearfix">
        <span class="fl">{{item.username}}</span>
        <span class="gre fr">{{item.address}}</span>
        </div>
      </div>
      </div>
      <div class="set-btm">
        <div class="confirm"><button @click="submitVoter">提交</button></div>
        <p class="tips">投票需支付0.01Mole</p>
      </div>
    </div>
    <s-secret v-show="showPop1" @hidePop="hidePop" @inputSSecret="inputSSecret"></s-secret>

    <div class="tip" v-show="submitVote" :class="yesOrNo">
			投票{{voteType}}！
		</div>
  </div>
</template>

<script>
import Page from "../page";
import NoData from "../nodata";
import SSecret from "../second-secret";
import { genAddress } from "../../assets/js/gen";
import { compareArrObj, compareEqualArrObj } from "../../assets/js/utils";
import axios from "axios";
export default {
  components: {
    Page,
    NoData,
    SSecret
  },
  data() {
    return {
      totalVoters: 0,
      selectDelegates: [],
      delegate: [],
      PageTotal: 1,
      showPop: false,
      tableData: [],
      haveVoted: [],
      ONE_PAGE_NUM: 10, //每页展示10条数据,
      voteType: "",
      submitVote: false,
      filterDisabled: [],
      secondSecret: "",
      showPop1: false
    };
  },
  computed: {
    yesOrNo() {
      return this.voteType === "成功" ? "success-tip" : "fail-tip";
    }
  },
  mounted() {
    // 获取受托人（分页）
    // this._getTotalDelegates(0)
    // 获取投票记录
    // this._getRecord()
    // 获取受托人（全部）
    // this._getTotalD()
    axios
      .all([this._getTotalDelegates(0), this._getRecord()])
      .then(axios.spread(() => {}));

    if (!this.delegate.length) {
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
    // 投票列表
    _getRecord() {
      this.$http
        .get("/api/accounts/delegates", {
          params: {
            address: genAddress(
              localStorage.getItem("etmsecret") ||
                sessionStorage.getItem("etmsecret")
            )
          }
        })
        .then(res => {
          if (res.data.success) {
            this.haveVoted = res.data.delegates;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 受托人列表（全部）
    _getTotalD() {
      this.$http
        .get("/api/delegates/", {
          params: {
            orderby: "approval:desc"
          }
        })
        .then(res => {
          // 比较两数组，找出不同项
          this.filterDisabled = compareArrObj(
            this.haveVoted,
            res.data.delegates
          ).result;
        });
    },
    // 受托人列表及总数（分页）
    _getTotalDelegates(p) {
      this.$http
        .get("/api/delegates/", {
          params: {
            orderby: "approval:desc",
            offset: this.ONE_PAGE_NUM * p,
            limit: this.ONE_PAGE_NUM
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tableData = res.data.delegates;

            // 设置排名
            // this.tableData.forEach((item,index) => {
            //   this.$set(item, 'index', this.ONE_PAGE_NUM * p + index)
            // })

            this.totalVoters = res.data.totalCount;
            this.PageTotal = Math.ceil(res.data.totalCount / this.ONE_PAGE_NUM);

            let arr = compareEqualArrObj(this.filterDisabled, this.tableData)
              .result;
            let indexs = compareEqualArrObj(this.filterDisabled, this.tableData)
              .indexs;

            this.$nextTick(() => {
              for (let i = 0; i < this.$refs.checkBox.length; i++) {
                let element = this.$refs.checkBox[i];
                element.disabled = true;
              }
              indexs.forEach(item => {
                this.$refs.checkBox[item].disabled = false;
              });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitVoter() {
      this.showPop = false;
      Bus.$emit("showMask", false);
      // 是否需要二级密码
      if (this.$store.state.needsSecondSecret) {
        this.showPop1 = true;
      } else {
        this._submitVoter();
      }
    },
    _submitVoter() {
      this.$http
        .put("/api/accounts/delegates", {
          secret:
            localStorage.getItem("etmsecret") ||
            sessionStorage.getItem("etmsecret"),
          delegates: this.delegate,
          secondSecret: this.secondSecret
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
        });
    },
    vote() {
      this.showPop = true;
      Bus.$emit("showMask", true);
    },
    hidePopout() {
      this.showPop = false;
      Bus.$emit("showMask", false);
    },
    renderDiff(p) {
      this._getTotalDelegates(p);
    },
    hidePop(data) {
      this.showPop1 = data;
    },
    inputSSecret(data) {
      this.secondSecret = data;
      this._submitVoter();
    }
  },
  watch: {
    selectDelegates(newV, oldV) {
      // 选择受托人投票列表
      this.delegate = [];
      newV.forEach(item => {
        this.delegate.push("+" + item.publicKey);
      });
      if (!this.delegate.length) {
        this.$refs.voteBtn.disabled = true;
      } else {
        this.$refs.voteBtn.disabled = false;
      }
    },
    haveVoted(newVal) {
      // 获取投票记录列表后再去请求全部受托人列表
      if (newVal.length) {
        this._getTotalD();
      }
    }
  }
};
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
  top: 0;
  left: 40%;
  margin: 0 auto;
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