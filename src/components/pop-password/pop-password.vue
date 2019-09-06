<template>
  <a-modal
  :title="$t('pop_password.title')"
  :destroyOnClose=true
  v-model="visible"
  @cancel="handleCancel"
>
    <a-form :form="form">
      <a-form-item
      :label="$t('pop_password.secondSecret.label')"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 16 }"
      >
        <a-input type="password" autocomplete="off"
        v-decorator="[
          'secondSecret',
          {rules: [{ required: true, message: $t('pop_password.secondSecret.msg') }]}
        ]"
        :placeholder="$t('pop_password.secondSecret.placeholder')" />
      </a-form-item>
    </a-form>
  <template slot="footer">
    <div class="foot">
      <a-button  type="primary" @click="handleSecondOk">
            {{$t('pop_password.submitBtn')}}
      </a-button>
    </div>
  </template>
</a-modal>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  props: {
    modal2Visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.modal2Visible
    }
  },
  watch: {
    modal2Visible (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('update:modal2Visible', val)
    }
  },
  methods: {
    handleSecondOk () {
      this.form.validateFields(
        (err, values) => {
          if (!err) {
            this.$emit('secondSubmit', values.secondSecret)
          }
        }
      )
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
<style>

</style>
