<template>
  <div class="transfer">
    <a-form :form="form">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.sender')">
      <a-input v-model="address" disabled  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.reciped.label')">
      <a-input type="text"
         v-decorator="[
          'recipientId',
          {rules: [{ required: true, message: $t('transfer.reciped.msg') }]}
        ]"
       :placeholder="$t('transfer.reciped.msg')"  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.amount.label')">
      <a-input type="number"
         v-decorator="[
          'amount',
         {rules: [{ required: true, message: $t('transfer.amount.msg') }]}
        ]"
       :placeholder="$t('transfer.amount.msg')" addonAfter="ETM" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.fee')"
      >
      <a-input type="number" v-model="fee" disabled  addonAfter="ETM"/>
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.remark.label')"
      >
      <a-input
         v-decorator="[
          'message',
         {rules: [{require:false,max:255,message: $t('transfer.remark.help')}]}
        ]"
       :placeholder="$t('transfer.remark.msg')" />
      </a-form-item>
      <a-form-item
       :labelCol="labelCol"
      :label="$t('transfer.note.label')"
      >
      {{$t('transfer.note.msg')}}
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }"
      :labelCol="labelCol"
      >
      <a-button @click="check" type='primary' >
        {{$t('transfer.submitBtn')}}
      </a-button>
    </a-form-item>
    </a-form>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="handleSecondOk"></pop-password>
  </div>
</template>
<script>
import {mapState} from 'vuex'
// import {transactions} from '@/api/block'
import {transactionSigned} from '@/api/trs'
import popPassword from '@/components/pop-password/pop-password'
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: {span: 3},
        lg: {span: 2}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: {span: 8},
        lg: {span: 6}

      },
      recipientId: '',
      amount: '',
      fee: '0.1',
      message: '',
      modal2Visible: false
    }
  },
  computed: {
    ...mapState({
      address: state => state.user.accountInfo.address || '',
      secret: state => state.user.secret || '',
      secondSignature: state => state.user.accountInfo.secondSignature || '',
      balance: state => state.user.accountInfo.balance || 0
    }),
    computedAmount () {
      return parseInt(this.amount * Math.pow(10, 8)) // 必须为整数
    }
  },
  methods: {
    check () {
      this.form.validateFields(
        (err, values) => {
          if (!err) {
            this.message = values.message
            this.recipientId = values.recipientId
            this.amount = values.amount
            if (this.balance < 0.1) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('tip.balance_enough')
              })
            } else if (this.secondSignature) {
              this.modal2Visible = true
            } else {
              this._transactions()
            }
          }
        }
      )
    },
    handleSecondOk (secondSecret) {
      this._transactions({type: 0, fee: 10000000, secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, secondSecret: secondSecret, message: this.message})
    },
    async _transactions (params = {type: 0, fee: 10000000, secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, message: this.message}) {
      try {
        const result = await transactionSigned(params)
        if (result && result.data.success) {
          this.modal2Visible = false
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.transfer_success')
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    'pop-password': popPassword
  }
}
</script>
<style lang="less" scoped>
  .transfer{
    background: #fff;
    border-radius: 2px;
    padding: 18px 10px;
  }
</style>
