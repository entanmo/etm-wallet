<template>
  <div class="w">
    <p class="title">账号信息</p>
    <div class="list">
        <ul>
            <li><span>总余额：</span><span>fdfdfdfdfdfdfdffdfdfdf</span></li>
            <li><span>地址：</span><span>fdfdfdfdfdfdfdffdfdfdf</span></li>
            <li><span>二级密码：</span><span>23432432432434</span></li>
            <li><span>锁仓状态：</span><span>湖北省武汉市西湖区转炉</span></li>
            <li><span>公钥：</span><span>3423432434324324324343243243</span></li>
            <li><span>主秘钥二维码：</span><span><a href="#">点击获取</a></span></li>
            <li><span>地址二维码：</span><span><a href="#">点击获取</a></span></li>
        </ul>
    </div>
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
.list{
	padding: 10px 28px 0 28px;
}
.list>ul>li{
	font-size: 14px;
	height: 38px;
	line-height: 38px;
	display: flex;
}

.list>ul>li>span:first-child{
	text-align: left;
		color: #343434;
	  width: 100px;
}
.list>ul>li>span:last-child{
		color:#707070;
		flex: 1;
}
.list>ul>li>span>a{
	color: #5093fc;
}
</style>