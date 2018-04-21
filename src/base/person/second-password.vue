<template>
  <div class="w">
    <p class="title">设置二级密码</p>
    <form class="pwd_form">
    <div>
    <label>密码&nbsp;&nbsp;：</label><input type="password" placeholder="请输入8-16字母和数字组合" />
    </div>
    <div>
    <label>确认密码&nbsp;&nbsp;：</label><input type="password" placeholder="请再次输入" />
    </div>
    <p>请确认您已经安全保存了二级密码，一旦丢失，您在Mole系统中的财产将无法找回，设置二级密码需要5Mole手续费</p>
    <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      
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
	width: 240px;
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
	line-height: 40px;
	color: #343434;
	padding-top: 47px;
	padding-bottom: 27px;
	line-height: 14px;
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
</style>