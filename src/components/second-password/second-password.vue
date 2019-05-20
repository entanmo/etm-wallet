<template>
  <div class="second-password">
    <a-form :form="form">
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('second_password.password.label')"
      >
      <a-input type="password"
        v-decorator="[
          'password',
          {rules: [{ required: true, message: $t('second_password.password.msg'),whitespace: true }]}
        ]"
      :placeholder="$t('second_password.password.msg')" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="$t('second_password.confirm_password.label')"
      >
      <a-input type="password"
      v-decorator="[
        'confirm_password',
        {rules: [{ required: true, message :$t('second_password.confirm_password.msg'),whitespace: true }]}
      ]"
      :placeholder="$t('second_password.confirm_password.msg')" />
      </a-form-item>
      <a-form-item
      :labelCol="labelCol"
      :label="$t('second_password.note')"
      >
      {{$t('second_password.p')}}
      </a-form-item>
      <a-form-item
      :wrapperCol="{ span: 12, offset: 2 }">
      <a-button @click="check" type='primary'>
        {{$t("second_password.submitBtn")}}
      </a-button>
    </a-form-item>
    </a-form>
  </div>
</template>
<script>
import {transactionSigned} from '@/api/trs'

import {unit} from '@/utils/utils'

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      formLayout: 'horizontal',
      unit: unit,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: {span: 3},
        lg: {span: 3}
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: {span: 8},
        lg: {span: 8}
      }
    }
  },
  computed: {
    secret () {
      return this.$store.state.user.secret || ''
    },
    balance () {
      return this.$store.state.user.accountInfo.balance || 0
    }
  },
  methods: {
    check () {
      this.form.validateFields(
        (err, values) => {
          if (!err) {
            if (values.password !== values.confirm_password) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('tip.not_same')
              })
              return false
            }
            if (unit(this.balance) < 5) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('tip.balance_enough')
              })
              return false
            }
            this.setSecondSecret(values.password)
          }
        }
      )
    },
    async setSecondSecret (password) {
      const result = await transactionSigned({type: 1, fee: 500000000, secret: this.secret, secondSecret: password})
      if (result && result.data.success) {
        this.$store.commit('SET_SECONDSECRET', true)
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.set_success')
        })
        setTimeout(() => {
          this.$store.dispatch('GetInfo')
          this.$store.commit('SET_SECONDSECRET', true)
        }, 4000)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.second-password{
  margin-top: 20px;
}
</style>
