<template>
  <div>
    <div class="user_content" >
      <div >
        <div class="Transfer_form">
        <div>
        <label>发送者：</label><input type="text"  v-model="address"/>
        </div>
        <div>
        <label>接收者：</label><input type="text"  v-model="recipientId"/>
        </div>
        <div>
        <label>金额：</label><input type="number"  v-model="amount"/>
        </div>
        <div>
        <label>费用：</label><input type="text" class="moeny" />
        </div>
        <div>
        <label>备注：</label><input type="text" />
        </div>
          <p>请确保您正在发送Mole给正确的地址，本操作无法撤消</p>
          <button type="button" @click="transfer">发送</button>
        </div>
      </div>
    </div>
		<s-secret v-show="showPop" @hidePop="hidePop" @inputSSecret="inputSSecret"></s-secret>
		<!-- 弹框 -->
		<div class="tip" v-show="submitTransfer" :class="yesOrNo">
			交易{{transferType}}！
		</div>
  </div>
</template>

<script>
import { genAddress } from "../assets/js/gen";
import SSecret from "../base/second-secret";
export default {
  components: {
    SSecret
  },
  data() {
    return {
      secret: "",
      address: "",
      recipientId: "",
      amount: null,
      submitTransfer: false,
      transferType: "",
      secondSecret: "",
      showPop: false
    };
  },
  activated() {
    this.$store.commit("changeTitle", "转账");
  },
  created() {
    this.secret =
      localStorage.getItem("etmsecret") || sessionStorage.getItem("etmsecret");
    this.address = genAddress(this.secret);
  },
  computed: {
    yesOrNo() {
      return this.transferType === "成功" ? "success-tip" : "fail-tip";
    }
  },
  methods: {
    transfer() {
      // 是否需要二级密码
      if (this.$store.state.needsSecondSecret) {
        this.showPop = true;
      } else {
        this._transfer();
      }
    },
    _transfer() {
      this.$http
        .put("/api/transactions", {
          secret: this.secret,
          amount: Number(this.amount),
          // recipientId: "17484924273970460319",
          recipientId: this.recipientId,
          secondSecret: this.secondSecret
        })
        .then(res => {
          // 根据交易是否成功来显示tip框颜色
          if (res.data.success) {
            this.transferType = "成功";
            this.submitTransfer = true;
            setTimeout(() => {
              this.submitTransfer = false;
            }, 2000);
          } else {
            this.transferType = "失败";
            this.submitTransfer = true;
            setTimeout(() => {
              this.submitTransfer = false;
            }, 2000);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    hidePop(data) {
      this.showPop = data;
    },
    inputSSecret(data) {
      this.secondSecret = data;
      this._transfer();
    }
  }
};
</script>

<style scoped>
.user_content {
  /* width: 100%; */
  height: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.user_content > div {
  /* width: 100%; */
  min-height: 700px;
  background: #fff;
}
footer > p {
  /* width: 100%; */
  height: 53px;
  line-height: 53px;
  display: flex;
  justify-content: center;
  color: #ababab;
  font-size: 14px;
}

.Transfer_form > div > label {
  display: inline-block;
  width: 100px;
  padding-left: 28px;
}
.Transfer_form > div > input {
  width: 540px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #d9d9d9;
  padding-left: 8px;
  color: #707070;
}
input.moeny {
  color: #5093fc !important;
}
.Transfer_form > div {
  height: 49px;
  line-height: 49px;
}
.Transfer_form > p {
  height: 40px;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  line-height: 40px;
  color: #9a9a9a;
  padding: 20px 0px 20px 130px;
}
.Transfer_form > button {
  width: 57px;
  height: 40px;
  background-color: #1890ff;
  border-radius: 4px;
  color: #fff;
  margin-left: 130px;
}
.Transfer_form {
  padding-top: 18px;
}

.tip {
  width: 160px;
  height: 80px;
  position: absolute;
  top: 10px;
  left: 50%;
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