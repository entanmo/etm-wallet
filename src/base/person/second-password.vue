<template>
  <div class="w">
    <p class="title">设置二级密码</p>
    <div class="pwd_form">
      <div>
        <label>密码&nbsp;&nbsp;：</label><input type="password" placeholder="请输入字母和数字组合,最短为1，最长为100" v-model="secondSecret"/>
      </div>
      <div>
        <label>确认密码&nbsp;&nbsp;：</label><input type="password" placeholder="请再次输入" v-model="confirmSecondSecret"/>
      </div>
      <p v-show="falseSecret">两次密码输入不一致</p>
      <p>请确认您已经安全保存了二级密码，一旦丢失，您在Mole系统中的财产将无法找回，设置二级密码需要5Mole手续费</p>
      <button @click="setSecret">提交</button>
    </div>
    <div class="tip" v-show="submitVote" :class="yesOrNo">
			设置{{voteType}}！
		</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      secondSecret: '',
      confirmSecondSecret: '',
      falseSecret: false,
      submitVote: false,
      voteType: ''
    }
  },
  computed: {
		yesOrNo() {
			return this.voteType === '成功' ? 'success-tip' : 'fail-tip'
		}
	},
  methods: {
    setSecret() {
      if(this.secondSecret != this.confirmSecondSecret) {
        this.falseSecret = true
        return
      }
      this.$http.put('/api/signatures', {
          secret: localStorage.getItem('etmsecret') || sessionStorage.getItem('etmsecret'),
          secondSecret: this.secondSecret
      }).then(res => {
        if(res.data.success) {
          this.voteType = '成功'
					  this.submitVote = true
					  setTimeout(() => {
						  this.submitVote = false
					  }, 2000);
          this.$router.push('/person/account')
        }else {
          this.voteType = '失败'
					  this.submitVote = true
					  setTimeout(() => {
						  this.submitVote = false
					  }, 2000);
        }
      })
    }
  }
}
</script>

<style scoped>
.w {
  padding: 10px;
}
.title {
    line-height: 64px;
	color: #424242;
	font-size: 16px;
	border-bottom:solid 1px  #e8e8e8;
	padding: 0 28px;
}
.pwd_form{
	display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin-top: 75px;
}
.pwd_form>div>input{
	width: 360px;
	height: 32px;
	border-radius: 4px;
  border: solid 1px #d9d9d9;
  padding-left: 10px;
}
.pwd_form>div>label{
	    display: inline-block;
    width: 81px;
    font-size: 14px;
    text-align: right;
    color: #343434;
}
.pwd_form>div:first-child{
	margin-bottom: 10px;
}
.pwd_form>p{
	font-family: MicrosoftYaHei;
	font-size: 14px;
	line-height: 60px;
	color: #343434;
}
button{
	width: 57px;
	height: 40px;
	background-color: #1890ff;
	border-radius: 4px;
	color: #fff;
	position: relative;
    right: 47px;
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
	background: #EE4000;
}
</style>