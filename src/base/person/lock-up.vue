<template>
  <div class="w">
    <p class="title">设置锁仓信息</p>
    <form class="pwd_form">
    <div>
    <label>请输入锁仓高度值&nbsp;&nbsp;：</label><input type="text" placeholder="请输入" />
    </div>
    <p>在到达此高度后解锁</p>
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
	},
	mounted () {
		
	},
	methods: {
		
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
/* .pwd_form>div>label{
	display: inline-block;
    width: 81px;
    font-size: 14px;
    text-align: right;
    color: #343434;
} */
.pwd_form>div:first-child{
	margin-bottom: 10px;
}
.pwd_form>p{
	font-family: MicrosoftYaHei;
	font-size: 14px;
	line-height: 60px;
	color: #343434;
}
.pwd_form label{
	width: 137px;
	line-height: 40px;
	color: #343434;
}
.pwd_form input{
	width: 240px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d9d9d9;
}

button{
		width: 57px;
	height: 40px;
	background-color: #1890ff;
	border-radius: 4px;
	color: #fff;
	    position: relative;
    right: 22px;
}
</style>