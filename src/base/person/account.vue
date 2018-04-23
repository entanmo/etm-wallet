<template>
  <div class="w">
    <p class="title">账号信息</p>
    <div class="list">
        <ul>
            <li><span>总余额：</span><span>{{accountInfo.balance}}</span></li>
            <li><span>地址：</span><span>{{accountInfo.address}}</span></li>
            <li><span>二级密码：</span><span>?</span></li>
            <li><span>锁仓状态：</span><span>?</span></li>
            <li><span>公钥：</span><span>{{accountInfo.publicKey}}</span></li>
            <li><span>主秘钥二维码：</span><span><a href="javascript:;" @click="keyQrcode">点击获取</a></span></li>
            <li><span>地址二维码：</span><span><a href="javascript:;" @click="addressQrcode">点击获取</a></span></li>
        </ul>
    </div>
    <qrcode :value="address" :options="{ size: 400 }" v-show="showQrcode"></qrcode>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      accountInfo: {},
      showQrcode: false,
      address: ''
    }
  },
  mounted () {
    this.address = localStorage.getItem('etmaddress')
    this._getAccounts(this.address)
  },
  methods: {
    _getAccounts(address) {
      this.$http.get('/api/accounts', {
        params: {
          address
        }
      }).then(res => {
        if(res.data.success) {
          this.accountInfo = Object.assign({}, res.data.account, res.data.latestBlock, res.data.version)
        }
      })
    },
    keyQrcode() {

    },
    addressQrcode() {
      this.showQrcode = true
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