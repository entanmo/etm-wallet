<template>
  <div class="vote">
    <a-tabs defaultActiveKey="0" >
      <a-tab-pane :tab="$tc('vote.tab',0)" key="0">
        <vote-lists></vote-lists>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('person.tab',2)" key="1">
        <lock-up></lock-up>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('vote.tab',1)" key="2" >
        <vote-record></vote-record>
      </a-tab-pane>
      <a-tab-pane :tab="$tc('vote.tab',2)" key="3" >
        <vote-for-me></vote-for-me>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import voteLists from '@/components/vote-lists/vote-lists'
import LockUp from '@/components/lock-up/lock-up'
import voteRecord from '@/components/vote-record/vote-record'
import voteForMe from '@/components/vote-for-me/vote-for-me'

export default {
  data () {
    return {}
  },
  components: {
    'vote-lists': voteLists,
    'vote-record': voteRecord,
    'vote-for-me': voteForMe,
    LockUp
  }
}
</script>
<style lang="less" scoped>
.vote{
  background: #fff;
  border-radius: 2px;
  padding: 10px;

}
</style>
