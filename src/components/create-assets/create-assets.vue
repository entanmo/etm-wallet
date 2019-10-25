<template>
  <div>
 <!-- 注册资产 -->
    <a-modal
      :title="$t('create_assets.title')"
       v-model="visible"
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel">{{$t('create_assets.cancel')}}</a-button>
        <a-button type="primary" :loading="loadingBtn" @click="submitOk1">{{$t('create_assets.submit')}}</a-button>
      </div>
    </template>
    <div>
      <a-form :form="form">
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.name.label')"
        >
        <div  class="setName">
        <span>{{name}}. </span>
        <a-input type="text" class="name"
          v-decorator="[
            'name',
            {rules: [{ required: true,max:5, message: $t('create_assets.form.name.msg'),whitespace: true }]}
          ]"
        :placeholder="$t('create_assets.form.name.msg')" />
        </div>
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.desc.label')"
        >
        <a-input type="text"
        v-decorator="[
          'desc',
          {rules: [{ required: true, message :$t('create_assets.form.desc.msg'),whitespace: true }]}
        ]"
        :placeholder="$t('create_assets.form.desc.msg')" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.limt.label')"
        >
        <a-input type="number"
        v-decorator="[
          'maximum',
          {rules: [{ required: true, message :$t('create_assets.form.limt.err'),whitespace: true }]}
        ]"
        :placeholder="$t('create_assets.form.limt.msg')" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.precision.label')"
        >
        <a-input type="number"
        v-decorator="[
          'precision',
          {rules: [{ required: true, message :$t('create_assets.form.precision.err'),whitespace: true, validator:(rule,value,cb) => (value <= 16 && value >=0 ? cb() : cb(false)) }],
          },
        ]"
        :placeholder="$t('create_assets.form.precision.msg')" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.strategy.label')"
        >
        <a-input type="text"
        v-decorator="[
          'strategy',
          {rules: [{ required: false, message :$t('create_assets.form.strategy.msg'),whitespace: true }]}
        ]"
        :placeholder="$t('create_assets.form.strategy.msg')" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('create_assets.form.features.label')"
        >
        <div class="footer-content">
          <a-checkbox v-model="whitelist">{{$t('create_assets.form.features.whitelist')}}</a-checkbox>
          <a-checkbox v-model="blacklist">{{$t('create_assets.form.features.blacklist')}}</a-checkbox>
          <a-checkbox v-model="logout">{{$t('create_assets.form.features.logout')}}</a-checkbox>
        </div>
        <div class="footer-content">
          {{$t('create_assets.form.note')}}
        </div>
        </a-form-item>
      </a-form>

    </div>
    </a-modal>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      visible: this.modalVisible,
      whitelist: false,
      blacklist: false,
      logout: false,
      loadingBtn: false,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      }
    }
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      secondSignature: state => state.user.accountInfo.secondSignature
    })
  },
  watch: {
    modalVisible (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('update:modalVisible', val)
    }
  },
  methods: {
    submitOk1 (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.allowBlacklist = +this.blacklist
          values.allowWhitelist = +this.whitelist
          values.allowWriteoff = +this.logout
          if (!/[A-Z]{1,5}/g.test(values.name)) {
            this.$notification.info({
              message: i18n.t('tip.title'),
              description: i18n.t('create_assets.tipName')
            })
            return false
          }
          values.name = `${this.name}.${values.name}`
          values.strategy = ''
          if (this.secondSignature) {
            this.$emit('hasSecond', values)
            this.visible = false
          } else {
            this.$emit('callback', values)
          }
        }
      })
    },
    cancel () {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
.setName{
  display: flex;
  justify-content: space-between;
  .name{
    flex: 1;
    margin-top: 5px;
  }
}

</style>
