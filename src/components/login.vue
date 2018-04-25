<template>
  <div class="w">
    <div class="login_main">
		<div class="head_img">
			<img src="../assets/images/icon-15.png" />
		</div>
		<form class="login_form">
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
			<button type="button" @click="login">登录</button><button type="button">新账户</button>
			</div>
		</form>
	</div>
  </div>
</template>

<script>
export default {
  data () {
      return {
		    showPassword: false,
				toggleSavePW: true,
				password: '',
				publicKey: '',
				address: ''
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
			this.address = entanmoJs.crypto.getNewAddress(this.publicKey)
			
			// 登录
			this.$http.post('/api/accounts/open2/', {
					publicKey: this.publicKey
				}).then(res => {
				if(res.data.success) {
					// 登录跳转
					this.$router.push('/')
		  			setTimeout(() => {
		    			window.location.reload()
					}, 500)
				}
			}).catch(err => {
				console.log(err)
			})
			//  登录时是否选中“记住密码”，如果是，则保存密码
		    if(this.toggleSavePW) {
		      localStorage.setItem('etmsecret', this.password)
		    }else {
		      sessionStorage.setItem('etmsecret', this.password)			
		    }
	  }
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
    padding-top: 120px;
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
</style>


