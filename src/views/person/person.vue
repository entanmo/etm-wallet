<template>
  <div class="person">
    <a-tabs defaultActiveKey="1" @tabClick = "update" >
      <a-tab-pane :tab="$tc('person.tab',0)" key="1">
        <account></account>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('person.tab',1)" key="2" forceRender>
        <second-password></second-password>
      </a-tab-pane>
      <a-tab-pane :tab="$t('person.assets')" key="3" forceRender>
        <assets-info></assets-info>
      </a-tab-pane>
      <a-tab-pane v-if="delay" :tab="$t('person.delay')" key="4" >
        <delay-record  ></delay-record>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { delayOrders } from '@/api/account'
import Account from '@/components/account/account'
import SecondPassword from '@/components/second-password/second-password'
import DelayRecord from '@/components/delay-record/delay-record'
import AssetsInfo from '@/components/assets-info/assets-info'
export default {
  data () {
    return {
      delay: false
    }
  },
  created () {
    this.delayRecord()
  },
  computed: {
    address () {
      return this.$store.state.user.accountInfo.address
    }
  },
  methods: {
    update () {
      this.$store.dispatch('_getBalance')
    },
    async delayRecord (params = {address: this.address, mode: 0}) {
      const result = await delayOrders(params)
      if (result && result.data.success) {
        if (result.data.result.length > 0) {
          this.delay = true
        }
      }
    }
  },
  components: {
    Account,
    SecondPassword,
    AssetsInfo,
    DelayRecord
  }
}
</script>
<style lang="less" scoped>
  .person{
    background: #fff;
    padding: 10px;
    min-height: 600px;
  }
</style>
