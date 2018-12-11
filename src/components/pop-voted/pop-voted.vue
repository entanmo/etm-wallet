<template>
      <a-modal
      :title=title
      width="450px"
      v-model="visible"
      :destroyOnClose=true
      @cancel="handleCancel"

  >
      <div class="input-list">
        <div class="input-line" v-for="(item,index) in selectedRows" :key="index">
          <div class="input clearfix">
          <span class="fl">{{item.username}}</span>
          <span class="gre fr">{{item.address}}</span>
          </div>
        </div>
      </div>
      <template slot="footer" >
        <p style="text-align:center">{{$t('pop_voted.note')}}</p>
        <div class="foot">
          <a-button  type="primary" @click="handleOk">
            {{$t('pop_voted.submitBtn')}}
          </a-button>
        </div>
      </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    modal1Visible: {
      type: Boolean,
      default: false
    },
    selectedRows: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      visible: this.modal1Visible
    }
  },
  computed: {
    title () {
      if (this.type === 'cancel') {
        return i18n.t('pop_voted.cancel_vote')
      } else if (this.type === 'new') {
        return i18n.t('pop_voted.new_vote')
      } else {
        return ''
      }
    }
  },
  watch: {
    modal1Visible (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('update:modal1Visible', val)
    }
  },
  methods: {
    handleOk () {
      this.$emit('handleOk')
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.input-list {
  max-height: 260px;
  overflow: auto;
  .input-line {
    text-align: center;
    margin-top: 4px;
    }
}
.foot{
  text-align: center;
}
</style>
