<template>
  <div class="w">
    <div class="login_main">
      <div class="head_img">
        <img class="logo" src="../../assets/images/walletlogo.png" />
      </div>
    <form class="login_form">
      <div style="position:relative;">
          <a-input :type="showPassword ? 'text' : 'password'" autocomplete="off" class="pwd_ipt" v-model="password" :placeholder="$t('login.placeholder')"/>
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
    </div>
  </div>
</template>
<script>

import bip39 from 'bip39'
import {mapActions} from 'vuex'
import {setup} from '@/lang'
import {Encrypt} from '@/utils/aes'
export default {
  data () {
    return {
      showPassword: false,
      password: '',
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
          if (result && result.data.success) {
            result.data.account.secret = Encrypt(this.password)
            const data = result.data
            if (this.status) {
              this.$storage.setItem({name: 'etmUse', localStorage: true, value: data, expires: 1000 * 3600 * 24 * 15})
            } else {
              this.$storage.setItem({name: 'etmUse', localStorage: false, value: data, expires: 1000 * 60 * 30})
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
      this.$router.push({'path': '/register'})
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
</style>
