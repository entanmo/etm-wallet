<template>
  <div class="w">
    <div class="register_main">
      <div class="head_img">
        <img class="logo" src="../../assets/images/walletlogo.png" />
      </div>
     <form class="register" v-if="registerStatus">
      <div>
        <h2>{{$t("register.title")}}</h2>
        <div class="register-in">
           <a-textarea v-model="newPassword" id="key" style="padding-right:23px;"  :autosize="{ minRows: 2, maxRows: 6 }" />
           <a-icon title="复制"  type="copy" class="copy"  data-clipboard-target="#key" @click="copy" ></a-icon>
        </div>
        <div class="register-in">
           <a-textarea v-model="confirmPassword" :placeholder="$t('register.placeholder')" :autosize="{ minRows: 2, maxRows: 6 }" />
        </div>
        <div class="items">
            <div class="check_div">
            <a-checkbox v-model="checkitem01">{{$tc("register.checkitem",0)}}</a-checkbox>
          </div>
            <div class="check_div">
            <a-checkbox v-model="checkitem02">{{$tc("register.checkitem",1)}}</a-checkbox>
          </div>
          <div class="check_div ">
            <a-checkbox v-model="checkitem03">{{$tc("register.checkitem",2)}}</a-checkbox>
          </div>
        </div>
      <div class="div_btn">
        <a-button @click="returnLogin" type="primary">{{$t("register.returnBtn")}}</a-button>
        <a-button @click="createWallet" >{{$t("register.create")}}</a-button>
      </div>
      </div>
    </form>
    <div class="check-register" v-else>
      <h2>{{$t('register.check_title')}}</h2>
      <a-select mode="multiple" allowClear="true" class="selectInput"  v-model="selectValue" :open="false"  @change="handleChange"  @deselect="handleDeselect" placeholder="请选择">
        <a-select-option v-for="i in selectValue" :key="i">{{i}}</a-select-option>
      </a-select>
      <div class="password_btn">
        <a-button class="password_item" :disabled="i.disabled" @click="joinHandle(i)" v-for="(i,index) in arrData" :key="index">{{i.item}}</a-button>
      </div>
      <div class="div_btn check_btn">
        <a-button @click="returnRegister" type="primary">{{$t('register.previous_btn')}}</a-button>
        <a-button @click="checkHandle" >{{$t('register.sure_btn')}}</a-button>
      </div>
    </div>
    <a-modal
      v-model="visible"
      centered="true"
      width="400px"
    >
      <template slot="footer">
        <div class="detail-foot" >
        <a-button style="marginRight:10px" @click="cancel">{{$t('register.cancel_btn')}}</a-button>
        <a-button  type="primary" @click="handleOk">{{$t('register.sure_btn')}}</a-button>
        </div>
      </template>
      <div class="model-content" style="text-align:center">
        <h2>{{$t('register.modal.tip_title')}}</h2>
        <p>{{$t('register.modal.tip_content')}}</p>
        <p>{{$t('register.modal.tip_content1')}}</p>
      </div>
    </a-modal>
    </div>
  </div>
</template>

<script>
import bip39 from 'bip39'
import Clipboard from 'clipboard'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      registerStatus: true,
      newPassword: '',
      confirmPassword: '',
      checkitem01: false, // 条款
      checkitem02: false,
      checkitem03: false,
      visible: false,
      selectValue: [],
      arrData: []
    }
  },
  created () {
    this.newPassword = bip39.generateMnemonic()
    this.confirmPassword = ''
    this.checkitem01 = this.checkitem02 = this.checkitem03 = false
  },
  methods: {
    shuffle (arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        var randomIdx = Math.floor(Math.random() * (i + 1))
        var itemAtIdx = arr[randomIdx]
        arr[randomIdx] = arr[i]
        arr[i] = itemAtIdx
      }
      return arr
    },
    dataHandle () {
      let arr = this.newPassword.split(' ')
      let arr2 = []
      this.shuffle(arr).forEach((item, index) => {
        arr2.push({
          'item': item,
          'disabled': false
        })
      })
      this.arrData = arr2
    },
    joinHandle (value) {
      this.selectValue.push(value.item)
      value.disabled = true
    },
    handleDeselect (value) {
      this.arrData.forEach(i => {
        if (value === i.item) {
          i.disabled = false
        }
      })
    },
    handleChange (value) {
      if (value.length === 0) {
        this.dataHandle()
      }
    },
    handleOk () {
      this.visible = false
      this.registerStatus = false
      this.selectValue = []
      this.dataHandle()
    },
    cancel () {
      this.visible = false
    },
    returnLogin () {
      this.$router.push({'path': '/login'})
    },
    returnRegister () {
      this.registerStatus = true
    },
    checkHandle () {
      let str = this.selectValue.join(' ')
      if (str === this.newPassword) {
        this.$message.success(i18n.t('register.tip_password_success'))
        setTimeout(() => {
          this.$router.push({'path': '/login'})
        }, 1000)
      } else {
        this.$notification.info({
          message: i18n.t('register.tip_password_err'),
          description: i18n.t('register.tip_password_des')
        })
      }
    },
    copy () {
      const clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.copy_success')
        })
        e.clearSelection()
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.copy_error')
        })
        clipboard.destroy()
      })
    },
    createWallet () {
      if (!this.checkitem01 || !this.checkitem02 || !this.checkitem03) {
        this.$message.error(i18n.t('register.tip_err_limit'))
      } else if (this.confirmPassword !== this.newPassword) {
        this.$message.error(i18n.t('register.tip_err_same'))
      } else {
        this.visible = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}
  .register_main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .selectInput{
      width: 500px;
    }
  }
  .check-register h2{
    text-align:center;
  }
  .register_main .logo{
  width:390px;
}
  .register h2 {
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
}
.register .register-in {
  text-align: center;
  margin-bottom: 15px;
  position: relative;
}
.register-in .copy{
 position: absolute;
 font-size: 20px;
 top: 14px;
 cursor: pointer;
 right: 10px;
}
.register .items {
  margin-bottom: 10px;
}
.register .items .check_div {
  margin-bottom: 2px;
  color: rgba(56, 56, 56, 1);
}
.div_btn {
  width: 368px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 10px;
}
.check_btn{
  margin-top: 20px;
}
.div_btn > button {
  width: 175px;
  height: 38px;
}
.password_btn{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 500px;
  .password_item{
    margin-top: 10px;
  }
}
.ant-select-selection--multiple{
  height: 200px!important;
}
.detail-foot{
  text-align: center;
}
.model-content{
  text-align: center;
  h2{
    font-size: 20px;
    font-weight: 600;
  }
  p:nth-of-type(1){
    font-size: 16px;
    margin-bottom:5px;
  }
  p:nth-of-type(2){
    font-size: 14px;
    color: red;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .register_main{
    // justify-content:center;
    .selectInput{
      width: 360px;
      margin: 0 auto;
    }
    .password_btn{
      width: 360px;
    }
  }
}
</style>
