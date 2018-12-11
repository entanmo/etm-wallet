<template>
  <a-modal
  :title="$t('pop_password.title')"
  :destroyOnClose=true
  v-model="visible"
  @cancel="handleCancel"
>
    <a-form :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
      :label="$t('pop_password.secondSecret.label')"
      :labelCol="{ span: 6 }"
      :wrapperCol="{ span: 16 }"
      :fieldDecoratorId="$t('pop_password.secondSecret.label')"
      :fieldDecoratorOptions="{rules: [{ required: true, message: $t('pop_password.secondSecret.msg') }]}"
      >
        <a-input type="password" v-model="secondSecret" :placeholder="$t('pop_password.secondSecret.placeholder')" />
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
  props: {
    modal2Visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      secondSecret: '',
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
        (err) => {
          if (!err) {
            this.$emit('secondSubmit', this.secondSecret)
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
