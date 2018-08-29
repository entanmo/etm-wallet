<template>
  <div class="w">
    <div class="login_main">
		<div class="head_img">
			<img src="../assets/images/logo-black.png" />
		</div>
		<form v-if="loginStatus" class="login_form">
			<div style="position:relative;">
			<input class="pwd_ipt" :type="showPassword ? 'text' : 'password'" placeholder="输入主密码" ref="pw"/>
            <i class="icon" :class="toggelIcon" @click="showPassword=!showPassword"></i>
			</div>
			<div class="check_div">
			   	<input class="check_ipt" type="checkbox" id="check" v-model="toggleSavePW"/>
				<label for="check" class="radioInput"></label>
				保持登录状态
			</div>
			<div>
			<select class="login_select" name="">
			<option value="cn">中文简体</option>
			</select>
			</div>
			<div class="div_btn">
			  <button type="button" @click="login">登录</button><button @click="register" type="button">新账户</button>
			</div>
		</form>
    <form v-else class="register">
      <div>
        <h2>密码由浏览器本地生成，请妥善备份保存</h2>
        <div class="register-in">
            <textarea class="register-text" v-model="newPassword" name="" id=""></textarea>
        </div>
        <div class="register-in">
          <textarea class="register-text" v-model="confirmPassword" placeholder="复制或输入上面的主密码" name="" id="" ></textarea>
        </div>
        <div class="items">
            <div class="check_div">
              <input class="check_ipt" type="checkbox" id="checkitem01" v-model="checkitem01"/>
            <label for="checkitem01" class="radioInput"></label>
            我了解如果我丢失了密码，我将永远丢失我的资产
          </div>
            <div class="check_div">
              <input class="check_ipt" type="checkbox" id="checkitem02" v-model="checkitem02"/>
            <label for="checkitem02" class="radioInput"></label>
            我了解如果我丢失了密码，没有人能够将它恢复
          </div>
            <div class="check_div ">
              <input class="check_ipt" type="checkbox" id="checkitem03" v-model="checkitem03"/>
            <label for="checkitem03" class="radioInput"></label>
            我已经记住或者用其他方式保存了我的密码
          </div>
        </div>

			<div class="div_btn">
			  <button type="button" @click="returnLogin" >返回登录</button><button @click="createWallet"  type="button">创建钱包</button>
			</div>
      </div>
    </form>
	</div>
    <tip :tip="tip" :tipShow="tipShow" @hidden="hidden"></tip>
  </div>
</template>

<script>
const HOST = require('../../config/ip');
const bip39 = require('bip39');
import tip from '@/base/tip'
export default {
  data () {
      return {
		    showPassword: false,   //查看密码
				toggleSavePW: false,
				password: '',
				publicKey: '',
        address: '',
        tipShow:false,    //提示框
        tip:'',          //提示内容
        loginStatus:true,
        newPassword:'',
        confirmPassword:'',
        checkitem01:false,  //条例
        checkitem02:false,
        checkitem03:false
      }
  },
  computed: {
      toggelIcon() {
        return this.showPassword ? 'icon-hide' : 'icon-show'
      }
	},
  methods: {
		login() {
		    //密码
			this.password = this.$refs.pw.value

			// 根据密码生成公钥
			this.publicKey = entanmoJs.crypto.getKeys(this.password).publicKey

			// // 根据密码生成地址
      this.address = entanmoJs.crypto.getAddress(this.publicKey)
      // EtmJS.crypto.getAddress(publicKey)
      console.log(this.address)
      // 登录
      if(!bip39.validateMnemonic(this.password) ){
        this.tipShow = true;
        this.tip = '密码格式不符合';
      } else{
        this.$http.post(HOST+'/api/accounts/open2/', {
            publicKey: this.publicKey
          }).then(res => {
          if(res.data.success) {
            this.tipShow = true;
            this.tip = '登录成功';
          //  登录时是否选中“记住密码”，如果是，则保存密码
            if(this.toggleSavePW) {
              localStorage.setItem('etmsecret', this.password)
            }else {
              sessionStorage.setItem('etmsecret', this.password)
            }
            console.log(res.data)
          // 登录跳转
            this.$router.push('/');
            	setTimeout(() => {
            		window.location.reload();
            }, 500)
          }else{
            this.tipShow = true;
            this.tip = '登录失败';
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    register(){
        this.loginStatus = false;
        this.newPassword = bip39.generateMnemonic();
    },
    returnLogin(){
      this.loginStatus = true
    },
    createWallet(){
      if(!this.checkitem01 || !this.checkitem02 || !this.checkitem03) {
        this.tipShow = true;
        this.tip = '请仔细阅读并勾选须知';
      } else if(this.confirmPassword != this.newPassword){
        this.tipShow = true;
        this.tip = '输入的主密码不一致';
      } else{
        this.loginStatus = true
      }
    },
    hidden(){
      this.tipShow = false
    }
  },
  components:{
    tip
  }
}
</script>

<style scoped>
.w {
    width: 100%;
    height: 100%;
}
*{
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

footer {
	position: fixed;
	bottom: 0px;
	width: 100%;
}

footer>p {
	width: 100%;
	height: 53px;
	line-height: 53px;
	display: flex;
	justify-content: center;
	color: #ababab;
	font-size: 14px;
}

footer>p>span {
	padding: 0 19px;
}

.login_form {
	margin-top: 73px;
	font-size: 14px;
}

.pwd_ipt {
	font-size: 16px;
	width: 368px;
	color: #5e5e5e;
	padding-left: 4%;
	height: 40px;
	background-color: #f8f8f8;
	border-radius: 2px;
	padding-right: 40px;
	border: solid 1px #cacaca;
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
  background: url(../assets/images/icon-14.png) center center no-repeat;
}
.icon-hide {
  background: url(../assets/images/see.png) center center no-repeat;
  background-size: 100% 100%;
}
.check_ipt {
	display: none;
}

.radioInput {
	   vertical-align: middle;
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.15);
		display: inline-block;
		height: 16px;
		margin-right: 10px;
		margin-top: -2px;
		vertical-align: middle;
		width: 16px;
		line-height: 1;
	   cursor: pointer;
	   border-radius: 3px;
	   background-size: 100% 100%;
}
.check_ipt:checked + label{
      background: url(../assets/images/checked.png) center center no-repeat;
      background-size: 18px 18px;
}
.login_form>div{
	height: 45px;
	line-height: 45px;
}
.check_div{
	color: #000;
}
.login_select{
	width: 103px;
	height: 24px;
	border-radius: 2px;
	border: solid 1px #cacaca;
}
.div_btn{
	width: 368px;
	height: 42px;
	display: flex;
	justify-content: space-between;
}
.div_btn>button:first-child{
	width: 175px;
	height: 38px;
	background-color: #1890ff;
	border-radius: 2px;
	border: solid 1px #1890ff;
	color: #fff;
}
.div_btn>button:last-child{
	width: 175px;
	height: 38px;
	background-color: #ffffff;
	border-radius: 2px;
	border: solid 1px #cacaca;
}

.register h2{
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
}
.register .register-in{
  text-align: center;
}
.register .register-text{
  background-color: #f8f8f8;
  border: 1px solid rgba(229, 229, 229, 1);
  width: 370px;
  height: 83px;
  margin: 0 0 18px 0;
  /* text-align: justify; */
  padding: 3px 6px;
  color: rgba(56, 56, 56, 1);
}
.register .items{
  margin-bottom: 10px;

}
.register .items .check_div{
  margin-bottom: 2px;
  color: rgba(56, 56, 56, 1);
}
</style>


