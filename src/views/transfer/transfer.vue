<template>
  <div class="transfer">
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.sender')">
      <a-input v-model="address" disabled  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.reciped.label')"
      :fieldDecoratorId="$t('transfer.reciped.label')"
      :fieldDecoratorOptions="{rules: [{ required: true, message: $t('transfer.reciped.msg') }]}">
      <a-input type="text"  v-model="recipientId" :placeholder="$t('transfer.reciped.msg')"  />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('transfer.amount.label')"
      :fieldDecoratorId="$t('transfer.amount.label')"
      :fieldDecoratorOptions="{rules: [{ required: true, message: $t('transfer.amount.msg') }]}">
      <a-input type="number" v-model="amount" :placeholder="$t('transfer.amount.msg')" addonAfter="ETM" />
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
      <a-input :placeholder="$t('transfer.remark.msg')" />
      </a-form-item>
      <a-form-item
       :labelCol="labelCol"
      :label="$t('transfer.note.label')"
      >
      {{$t('transfer.note.msg')}}
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }">
      <a-button @click="check" type='primary' htmlType='submit'>
        {{$t('transfer.submitBtn')}}
      </a-button>

    </a-form-item>

    </a-form>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="handleSecondOk"></pop-password>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {transactions} from '@/api/block'
import popPassword from '@/components/pop-password/pop-password'
export default {
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
        (err) => {
          if (!err) {
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
      this._transactions({secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, secondSecret: secondSecret})
    },
    async _transactions (params = {secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount}) {
      try {
        const result = await transactions(params)
        if (result.data.success) {
          this.modal2Visible = false
          // this.$store.dispatch('GetInfo')
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
