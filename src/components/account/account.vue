<template>
  <div class="account">
    <!-- <p class="title">{{$t('account.title')}}</p> -->
    <div class="list">
        <ul>
            <li><span>{{$t('account.info.balance')}}：</span><span>{{unit(accounts.balance).toFixed(2)}} ETM</span></li>
            <li class="phone"><span>{{$t('account.info.address')}}：</span><span class="key">{{accounts.address}}</span></li>
            <li><span>{{$t('account.info.secondSecret')}}：</span><span>{{accounts.secondSignature ? $t('account.secretStatus.hasSet') : $t('account.secretStatus.notSet')}}</span></li>
            <!-- <li><span>{{$t('account.info.status')}}：</span><span>{{$t("account.lockedStatus.notSet")}}</span></li> -->
            <li class="phone"><span>{{$t('account.info.publicKey')}}：</span><span class="key">{{publicKey}}</span></li>
            <li><span>{{$t('account.info.keyCode')}}：</span><span><a href="javascript:;" @click="keyQrcode">{{$t('account.click')}}</a></span></li>
            <li><span>{{$t('account.info.addressCode')}}：</span><span><a href="javascript:;" @click="addressQrcode">{{$t('account.click')}}</a></span></li>
        </ul>
    </div>
    <a-modal
      :title="$t('account.QRcode')"
      width='328px'
      v-model="visible"
      :footer="null"
      :bodyStyle="{textAlign:'center'}"
    >
      <qrcode :value="qrvalue" :options="{ size: 280 }"></qrcode>
    </a-modal>
  </div>
</template>
<script>
import {unit} from '@/utils/utils'
export default {
  name: 'Account',
  data () {
    return {
      accountInfo: {},
      visible: false,
      qrvalue: '',
      unit: unit
    }
  },
  created () {
    this.$store.dispatch('GetInfo')
  },
  computed: {
    accounts () {
      return this.$store.state.user.accountInfo || {}
    },
    publicKey () {
      if (sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')) {
        const data = JSON.parse(sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')).account.publicKey
        return this.$store.state.user.accountInfo.publicKey || data
      } else {
        return ''
      }
    }
  },
  methods: {
    keyQrcode () {
      this.visible = true
      this.qrvalue = this.accounts.publicKey
    },
    addressQrcode () {
      this.visible = true
      this.qrvalue = this.accounts.address
    }
  }
}
</script>
<style lang="less" scoped>
.account{
  .title {
    line-height: 64px;
    color: #424242;
    font-size: 16px;
    padding: 0 28px;
}
.list{
    padding: 10px 28px 0 28px;
}
.list>ul>li{
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  // display: flex;
}

.list>ul>li>span:first-child{
    text-align: left;
    color: #343434;
    width: 100px;
    display: inline-block;
}

.list>ul>li>span:last-child{
    color:#707070;
}

.list>ul>li>span>a{
    color: #5093fc;
}
}
.lang-en_GB .account .list>ul>li>span:first-child{
  width: 162px;
}
@media (max-width: 890px) {
.list .phone{
  display: inline-block;
  .key{
    width:296px;
    height: 200px;
    display: inline-block;
  word-wrap:break-word;

  }
}
}
</style>
