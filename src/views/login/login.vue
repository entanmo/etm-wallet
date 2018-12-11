<template>
  <div class="w">
    <div class="login_main">
      <div class="head_img">
        <img class="logo" src="../../assets/images/walletlogo.png" />
      </div>
    <form v-if="loginStatus" class="login_form">
      <div style="position:relative;">
          <a-input :type="showPassword ? 'text' : 'password'" class="pwd_ipt" v-model="password" :placeholder="$t('login.placeholder')"/>
          <i class="icon" :class="toggelIcon" @click="showPassword=!showPassword"></i>
      </div>
      <div class="check_div">
        <a-checkbox v-model="status">{{$t('login.status')}}</a-checkbox>
      </div>
      <div>
        <a-select size="small" :defaultValue="lang" @change='changeLocale'  style="width: 120px" >
            <a-select-option value="zh_CN">{{$t('login.select.zh_CN')}}</a-select-option>
            <a-select-option value="en_GB">{{$t('login.select.en_GB')}}</a-select-option>
        </a-select>
      </div>
      <div class="div_btn">
        <a-button @click="handleSubmit" type="primary">{{$t("login.loginBtn")}}</a-button>
        <a-button @click="register" >{{$t("login.registerBtn")}}</a-button>
      </div>
    </form>
    <form v-else class="register">
      <div>
        <h2>{{$t("register.title")}}</h2>
        <div class="register-in">
           <a-textarea v-model="newPassword"  :autosize="{ minRows: 2, maxRows: 6 }" />
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
        <a-button @click="createWallet">{{$t("register.create")}}</a-button>
      </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>

import bip39 from 'bip39'
import {mapActions} from 'vuex'
import {setup} from '@/lang'
export default {
  data () {
    return {
      loginStatus: true,
      showPassword: false,
      password: '', // 主密码
      newPassword: '',
      confirmPassword: '',
      checkitem01: false, // 条款
      checkitem02: false,
      checkitem03: false,
      status: false, // 是否保存密码
      lang: '' // 语言
    }
  },
  created () {
    this.lang = sessionStorage.getItem('localeLanguage') || 'zh_CN'
  },
  computed: {
    toggelIcon () {
      return this.showPassword ? 'icon-hide' : 'icon-show'
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async handleSubmit () {
      try {
        if (!bip39.validateMnemonic(this.password)) {
          this.$message.error(i18n.t('login.tip_err'))
        } else {
          let result = await this.login(this.password)
          if (result.data.success) {
            result.data.account.secret = this.password
            const data = JSON.stringify(result.data)
            if (this.status) {
              localStorage.setItem('etmUse', data)
            } else {
              sessionStorage.setItem('etmUse', data)
            }
            this.$message.success(i18n.t('login.tip_success'))
            this.$router.push('/')
          } else {
            this.$message.error(i18n.t('login.tip_fail'))
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    register () {
      this.loginStatus = false
      this.newPassword = bip39.generateMnemonic()
    },
    returnLogin () {
      this.loginStatus = true
    },
    createWallet () {
      if (!this.checkitem01 || !this.checkitem02 || !this.checkitem03) {
        this.$message.error(i18n.t('register.tip_err_limit'))
      } else if (this.confirmPassword !== this.newPassword) {
        this.$message.error(i18n.t('register.tip_err_same'))
      } else {
        this.loginStatus = true
      }
    },
    changeLocale (lang) { // 切换语言
      setup(lang)
      this.lang = lang
    }
  }
}
</script>

<style scoped>
.w {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
}

.login_main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.login_main .logo{
  width:390px;
}
.login_form {
  margin-top: 50px;
  font-size: 14px;
}

.pwd_ipt {
  font-size: 16px;
  width: 368px;
  color: #5e5e5e;
  padding-left: 4%;
  height: 40px;
  border-radius: 2px;
  padding-right: 40px;
}
.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 12px;
  cursor: pointer;
}
.icon-show {
  background: url(../../assets/images/icon-14.png) center center no-repeat;
}
.icon-hide {
  background: url(../../assets/images/see.png) center center no-repeat;
  background-size: 100% 100%;
}
.check_ipt {
  display: none;
}

.login_form > div {
  height: 45px;
  line-height: 45px;
}
.check_div {
  color: #000;
}
.login_select {
  width: 103px;
  height: 24px;
  border-radius: 2px;
  border: solid 1px #cacaca;
}
.div_btn {
  width: 368px;
  height: 42px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 10px;
}
.div_btn > button {
  width: 175px;
  height: 38px;
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
}

.register .items {
  margin-bottom: 10px;
}
.register .items .check_div {
  margin-bottom: 2px;
  color: rgba(56, 56, 56, 1);
}
</style>
