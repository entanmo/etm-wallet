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
      :label="$t('transfer.type.label')">
      <a-select
        :filterOption="filterOption"
         showSearch
        v-decorator="[
          'type',
          { initialValue: 'ETM' },
          {rules: [{ required: false, message: $t('transfer.type.msg') }]}
        ]"
        :placeholder="$t('transfer.type.msg')"
      >
        <a-select-option value="ETM"  :key="ETM">
          ETM
        </a-select-option>
        <a-select-option :value="item.name"  v-for="item in data" :key="item.issureId">
          {{item.name}}
        </a-select-option>
      </a-select>
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
       :placeholder="$t('transfer.amount.msg')"  >
       </a-input>
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
      <a-button @click="check" type='primary' :loading="loading">
        {{$t('transfer.submitBtn')}}
      </a-button>
    </a-form-item>
    </a-form>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="handleSecondOk"></pop-password>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {transactionSigned} from '@/api/trs'
import popPassword from '@/components/pop-password/pop-password'
import {assets} from '@/api/funds'
import Big from 'big.js'
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
      type: '',
      modal2Visible: false,
      data: [],
      loading: false
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
      return this.changeAmount(this.amount)
    },
    precision () {
      return this.data.filter(item => item.name === this.type)[0].precision
    }
  },
  created () {
    this.assetsInfo()
  },
  methods: {
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    AmountBigger (str, precision) {
      const num = Math.pow(10, precision)
      return new Big(str).times(num).toString()
    },
    changeAmount (str) {
      if (str.includes('.')) {
        const num = 8
        const pointPos = str.lastIndexOf('.')
        let last = str.length - str.lastIndexOf('.') - 1
        if (last > 8) {
          str = str.substr(0, pointPos + 9)
          last = str.length - str.lastIndexOf('.') - 1
        }
        const zero = ''.padEnd(num - last, '0')
        return parseInt(str.replace('.', '') + zero)
      } else {
        const zero = ''.padEnd(8, '0')
        return parseInt(str + zero)
      }
    },
    check () {
      this.form.validateFields(
        (err, values) => {
          if (!err) {
            this.message = values.message
            this.recipientId = values.recipientId
            this.amount = values.amount
            this.type = values.type
            if (this.balance < 0.1) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('tip.balance_enough')
              })
            } else if (!/^[0-9]+\.?[0-9]*$/.test(this.amount)) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('transfer.tip.tip_amount')
              })
            } else if (this.amount * Math.pow(10, 8) > Number.MAX_SAFE_INTEGER) { // 超出范围
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('transfer.tip.tip_max')
              })
            } else if (this.secondSignature) {
              this.modal2Visible = true
            } else if (this.type !== 'ETM') {
              this.loading = true
              this.issuerNameTransaction()
            } else {
              this.loading = true
              this._transactions()
            }
          }
        }
      )
    },
    async assetsInfo () {
      try {
        const result = await assets()
        if (result && result.data.assets) {
          this.data = result.data.assets
        }
      } catch (error) {
        console.log(error)
      }
    },
    async issuerNameTransaction (params = {type: 14, secret: this.secret, recipientId: this.recipientId, fee: 10000000, message: this.message, currency: this.type, amount: this.AmountBigger(this.amount, this.precision)}) {
      try {
        const result = await transactionSigned(params)

        if (result && result.data.success) {
          this.loading = false
          this.modal2Visible = false
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.transfer_success')
          })
        }
        setTimeout(() => {
          this.loading = false
        }, 3000)
      } catch (error) {
        console.log(error)
      }
    },
    handleSecondOk (secondSecret) {
      if (this.type !== 'ETM') {
        this.issuerNameTransaction({type: 14, secret: this.secret, recipientId: this.recipientId, fee: 10000000, currency: this.type, amount: this.AmountBigger(this.amount, this.precision), secondSecret: secondSecret, message: this.message})
      } else {
        this._transactions({type: 0, fee: 10000000, secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, secondSecret: secondSecret, message: this.message})
      }
    },
    async _transactions (params = {type: 0, fee: 10000000, secret: this.secret, recipientId: this.recipientId, amount: this.computedAmount, message: this.message}) {
      try {
        const result = await transactionSigned(params)
        if (result && result.data.success) {
          this.loading = false
          this.modal2Visible = false
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.transfer_success')
          })
        }
        setTimeout(() => {
          this.loading = false
        }, 3000)
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
