<template>
    <a-modal
    v-model="visible"
    :title="$t('issuing_tokens.title')"
    >
      <template slot="footer">
        <div class="detail-foot">
          <a-button style="marginRight:10px" @click="cancelIssue">{{$t('issuing_tokens.cancel')}}</a-button>
          <a-button  type="primary" @click="check">{{$t('issuing_tokens.submit')}}</a-button>
        </div>
      </template>
  <div>
     <a-form :form='form'>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('issuing_tokens.form.token.label')"
        >
        {{record.name}}
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('issuing_tokens.form.circulation.label')"
        >
        <a-input type="number"
        v-decorator="[
          'amount',
          {rules: [{ required: true, message :$t('issuing_tokens.form.circulation.err'),whitespace: true }]}
        ]"
        :placeholder="$t('issuing_tokens.form.circulation.msg')" />
        </a-form-item>
         <a-form-item
          style="text-align:right">
        {{$t('issuing_tokens.form.note')}}
    </a-form-item>
      </a-form>
  </div>
  </a-modal>
</template>

<script>
import {mapState} from 'vuex'
import Big from 'big.js'

export default {
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => {}
    }

  },
  data () {
    return {
      visible: this.modalVisible,
      form: this.$form.createForm(this),
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  },
  watch: {
    modalVisible (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('update:modalVisible', val)
    }
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      secondSignature: state => state.user.accountInfo.secondSignature
    })
  },
  methods: {
    cancelIssue () {
      this.visible = false
    },
    AmountBigger (str, precision) {
      const num = Math.pow(10, precision)
      return new Big(str).times(num).toString()
    },
    check () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.currency = this.record.name
          values.amount = this.AmountBigger(values.amount, this.record.precision)
          if (this.secondSignature) {
            this.visible = false
            this.$emit('issueSecond', values)
          } else {
            this.$emit('callback', values)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
