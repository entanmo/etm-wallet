<template>
  <div>
    <div class="user_content" >
      <div >
        <form class="Transfer_form">
        <div>
        <label>发送者：</label><input type="text"  />
        </div>
        <div>
        <label>接收者：</label><input type="text"  />
        </div>
        <div>
        <label>金额：</label><input type="text"  />
        </div>
        <div>
        <label>费用：</label><input type="text" class="moeny" />
        </div>
        <div>
        <label>备注：</label><input type="text" />
        </div>
          <p>请确保您正在发送Mole给正确的地址，本操作无法撤消</p>
          <button type="button">发送</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style scoped>
.user_content{
	/* width: 100%; */
	height: 100%;
  padding: 0 25px;
  box-sizing: border-box;
}
.user_content>div{
	/* width: 100%; */
	min-height: 700px;
	background: #fff;
}
footer>p{
	/* width: 100%; */
	height: 53px;
	line-height: 53px;
	display: flex;
	justify-content: center;
	color: #ababab;
	font-size: 14px;
}

.Transfer_form>div>label{
	display: inline-block;
  width: 100px;
  padding-left: 28px;
}
.Transfer_form>div>input{
	width: 540px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 4px;
	border: solid 1px #d9d9d9;
	padding-left: 8px;
	color: #707070;
}
input.moeny{
	color: #5093fc !important;
}
.Transfer_form>div{
	height: 49px;
	line-height: 49px;
}
.Transfer_form>p{
	height: 40px;
	font-family: MicrosoftYaHei;
	font-size: 14px;
	line-height: 40px;
	color: #9a9a9a;
  padding: 20px 0px 20px 130px;
  
}
.Transfer_form>button{
	width: 57px;
	height: 40px;
	background-color: #1890ff;
	border-radius: 4px;
	color: #fff;
	margin-left: 130px;
}
.Transfer_form{
	padding-top: 18px;
}
</style>