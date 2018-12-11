<template>
  <div class="person">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane :tab="$tc('person.tab',0)" key="1">
        <account></account>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('person.tab',1)" key="2" forceRender>
        <second-password></second-password>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import Account from '@/components/account/account'
import SecondPassword from '@/components/second-password/second-password'

export default {
  data () {
    return {}
  },
  methods: {

  },
  components: {
    Account,
    SecondPassword
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
