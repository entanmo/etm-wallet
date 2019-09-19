<template>
  <div class="assets">
    <a-row>
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24" class="part-left" >
          <a-card :bordered="false" :title="$t('issuing_assets.my_assets')" :body-style="{padding: 0}">
          <a slot="extra">
            <a-button type="primary" style="margin-right:10px;" @click="registeredAssets">{{$t('issuing_assets.register_assets')}}</a-button>
            <a-button  type="primary" @click="reflash">{{$t('issuing_assets.refresh')}}</a-button>
          </a>
          <div class="table">
            <div>
              <a-table
                :rowKey="record => record.name"
                :columns="columns"
                :dataSource="data"
                :loading="loading"
                :scroll="{ x: 1000 }"
                >
            <template
            slot="quantityShow"
            slot-scope="text,record">
            {{ record.quantityShow }}
          </template>
            <template
            slot="height"
            slot-scope="text,record">
            {{ computedTime(record.height) }}
          </template>
            <template slot="action" slot-scope="text, record, index">
              <a slot="action" @click="issuingAssets(record)"  href="javascript:;">{{$t('issuing_assets.operating')}}</a>
            </template>
        </a-table>
            </div>
              <no-data v-show="nodatas"></no-data>
          </div>
          </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24" class="part-right">
        <a-card :bordered="false" :title="$t('issuing_assets.register_publisher')" :body-style="{padding: 0}">
          <div v-if="!publisher.name" class="publish">
            <p>{{$t('issuing_assets.not_publisher')}}</p>
            <a-button type="primary" @click="() => visible = true">{{$t('issuing_assets.become_publisher')}}</a-button>
          </div>
          <div class="detail" v-else >
            <h3>{{$t('issuing_assets.name')}}: {{publisher.name}}</h3>
            <p>{{publisher.desc}}</p>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <!-- 注册发行商用户协议 -->
    <a-modal
      :title="$t('issuing_assets.become_publisher')"
      v-model="visible"
      :destroyOnClose=true
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel">{{$t('issuing_assets.cancel')}}</a-button>
        <a-button  type="primary" :disabled='!checked'  @click="handleOk">{{$t('issuing_assets.agree')}}</a-button>
      </div>
    </template>
      <div class="agreement">
        <div class="content">
          <h3>{{$t('issuing_assets.user_agreement')}}</h3>
          <p>用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内容文案用户协议内</p>
        </div>
        <div class="footer-content">
          <a-checkbox :checked="checked" @change="onChange">{{$t('issuing_assets.agree')}}</a-checkbox>
          <span class="explan">{{$t('issuing_assets.agreement_tip')}}</span>
        </div>
      </div>
    </a-modal>
    <!-- 注册发行商 -->
    <a-modal
      :title="$t('issuing_assets.become_publisher')"
      :destroyOnClose=true
      v-model="visible1"
    >
    <template slot="footer">
      <div class="detail-foot">
        <a-button style="marginRight:10px" @click="cancel1">{{$t('issuing_assets.cancel')}}</a-button>
        <a-button  type="primary" :loading="loadingBtn" @click="submitOk">{{$t('issuing_assets.submit')}}</a-button>
      </div>
    </template>
    <div>
      <a-form :form='form'>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('issuing_assets.publisher_form.name.label')"
        >
        <a-input type="text"
          v-decorator="[
            'name',
            {rules: [{ required: true,max:16, message :$t('issuing_assets.publisher_form.name.msg'),whitespace: true }]}
          ]"
        :placeholder="$t('issuing_assets.publisher_form.name.msg')" />
        </a-form-item>
        <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('issuing_assets.publisher_form.desc.label')"
        >
        <a-input type="text"
        v-decorator="[
          'desc',
          {rules: [{ required: true, message :$t('issuing_assets.publisher_form.desc.msg'),whitespace: true }]}
        ]"
        :placeholder="$t('issuing_assets.publisher_form.desc.msg')" />
        </a-form-item>
      </a-form>
    </div>
    </a-modal>
    <!-- 发行代币 -->
    <issuingAssets :modalVisible.sync="issuing" :record='currentColumn' @callback='createAssets' @issueSecond="issueSecond" ></issuingAssets>
    <!-- 注册资产 -->
    <createAssets  :modalVisible.sync="visible2" :name="publisher.name" @callback='createFunds' @hasSecond="hasSecond"></createAssets>
    <pop-password  :modal2Visible.sync="modal2Visible" @secondSubmit="secondSubmit" ></pop-password>
  </div>
</template>
<script>
import noData from '@/components/nodata/nodata'
import createAssets from '@/components/create-assets/create-assets'
import issuingAssets from '@/components/issuing-assets/issuing-assets'
import popPassword from '@/components/pop-password/pop-password'
import {transactionSigned} from '@/api/trs.js'
import {issuers, assets} from '@/api/funds'
import {mapState, mapActions} from 'vuex'
import {timestampToTime} from '@/utils/utils'

const columns = [{
  title: i18n.t('issuing_assets.columns.th01'),
  dataIndex: 'name'
}, {
  title: i18n.t('issuing_assets.columns.th02'),
  dataIndex: 'maximumShow'
}, {
  title: i18n.t('issuing_assets.columns.th03'),
  dataIndex: 'precision'
}, {
  title: i18n.t('issuing_assets.columns.th04'),
  dataIndex: 'quantityShow',
  scopedSlots: { customRender: 'quantity' }

}, {
  title: i18n.t('issuing_assets.columns.th05'),
  dataIndex: 'height',
  scopedSlots: { customRender: 'height' }
}, {
  title: i18n.t('issuing_assets.columns.th06'),
  dataIndex: 'allowWhitelist'
}, {
  title: i18n.t('issuing_assets.columns.th07'),
  dataIndex: 'allowBlacklist'
}, {
  title: i18n.t('issuing_assets.columns.th08'),
  dataIndex: 'allowWriteoff'
}, {
  title: i18n.t('issuing_assets.columns.th09'),
  dataIndex: 'productivity',
  scopedSlots: { customRender: 'action' },
  fixed: 'right',
  width: 60
}]
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 16
      },
      data: [],
      loading: false,
      loadingBtn: false,
      visible: false,
      visible1: false,
      visible2: false,
      issuing: false,
      checked: false,
      publisher: {
        name: '',
        desc: ''
      },
      modal2Visible: false,
      currentColumn: {},
      params: {},
      assetsValue: {},
      issueValue: {},
      nodatas: false
    }
  },
  created () {
    this.issuersInfo()
    this.assetsInfo()
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      height: state => state.user.accountInfo.height,
      secondSignature: state => state.user.accountInfo.secondSignature
    })
  },
  methods: {
    ...mapActions({
      _effectAccount: '_effectAccount'
    }),
    reflash () {
      this.issuersInfo()
      this.assetsInfo()
    },
    computedTime (expired) {
      const diff = expired - this.height
      const second = diff * 3
      return timestampToTime((Date.now() / 1000 + second) * 1000)
    },

    issueSecond (values) {
      this.issueValue = values
      this.modal2Visible = true
    },
    hasSecond (values) {
      this.assetsValue = values
      this.modal2Visible = true
    },
    secondSubmit (secondSecret) {
      if (this.assetsValue.name) {
        this.assetsValue.secondSecret = secondSecret
        this.createFunds(this.assetsValue)
      } else if (this.issueValue.currency) {
        this.issueValue.secondSecret = secondSecret
        this.createAssets(this.issueValue)
      } else {
        this.params.secondSecret = secondSecret
        this.publisherHandle(this.params)
      }
    },
    async createAssets (options) {
      try {
        const params = {type: 13, secret: this.secret, fee: 10000000, ...options}
        const result = await transactionSigned(params)
        if (result && result.data.success) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('issuing_assets.tip.successful_release')
          })
          if (this.modal2Visible) {
            this.modal2Visible = false
            this.issueValue = {}
          }
          this.issuing = false
          setTimeout(() => {
            this.assetsInfo()
          }, 4000)
        } else {
          this.modal2Visible = false
          this.issuing = false
          this.issueValue = {}
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createFunds (options) {
      try {
        const params = {type: 10, fee: 50000000000, secret: this.secret, ...options}
        params.precision = +params.precision
        const result = await transactionSigned(params)
        if (result && result.data.success) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('issuing_assets.tip.successful_release_assets')
          })
          if (this.modal2Visible) {
            this.modal2Visible = false
            this.assetsValue = {}
          }
          this.visible2 = false
          setTimeout(() => {
            this.assetsInfo()
          }, 4000)
        } else {
          this.modal2Visible = false
          this.visible2 = false
          this.this.assetsValue = {}
        }
      } catch (error) {
        console.log(error)
      }
    },
    async publisherHandle (params) {
      try {
        const result = await transactionSigned(params)
        if (result && result.data.success) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('issuing_assets.tip.resgister')
          })
          this.modal2Visible = false
          this.visible1 = false
          this.params = {}
          this.loadingBtn = false
          setTimeout(() => {
            this.issuersInfo()
          }, 4000)
        } else {
          this.loadingBtn = false
          this.modal2Visible = false
          this.visible1 = false
          this.params = {}
        }
      } catch (error) {
        console.log(error)
      }
    },

    async createPublisher (options) {
      try {
        this.loadingBtn = true
        const res = await this._effectAccount()
        if (res && res.data.effectivity === false) {
          this.$notification.error({
            message: i18n.t('issuing_assets.tip.err_params'),
            description: i18n.t('issuing_assets.tip.insufficient_balance')
          })
          setTimeout(() => {
            this.loadingBtn = false
          }, 500)
        } else if (res && res.data.effectivity) {
          this.params = {type: 9, secret: this.secret, fee: 10000000000, ...options}
          if (this.secondSignature) {
            this.loadingBtn = false
            this.modal2Visible = true
            this.visible1 = false
          } else {
            this.publisherHandle(this.params)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async issuersInfo () {
      try {
        const result = await issuers()
        if (result && result.data.success) {
          if (result.data.issuers.length > 0) {
            let issuer = result.data.issuers.filter(item => item.issuerId === this.address)
            if (issuer.length > 0) {
              this.publisher.name = issuer[0].name
              this.publisher.desc = issuer[0].desc
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async assetsInfo () {
      try {
        this.loading = true
        const result = await assets()
        if (result && result.data.assets) {
          this.loading = false
          this.data = result.data.assets.filter(item => item.issuerId === this.address)
          if (this.data.length > 0) {
            this.nodatas = false
          } else {
            this.nodatas = true
          }
        } else {
          this.nodatas = true
        }
      } catch (error) {
        console.log(error)
      }
    },

    issuingAssets (record) {
      this.issuing = true
      this.currentColumn = record
    },
    registeredAssets () {
      if (!this.publisher.name) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('issuing_assets.tip.resgister_publisher_first')
        })
      } else {
        this.visible2 = true
      }
    },
    cancel () {
      this.visible = false
      this.checked = false
    },
    cancel1 () {
      this.visible1 = false
      this.checked = false
    },
    handleOk () {
      this.visible = false
      this.visible1 = true
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.createPublisher(values)
        }
      })
    },
    onChange (e) {
      this.checked = e.target.checked
    }

  },
  components: {
    noData,
    createAssets,
    issuingAssets,
    popPassword
  }
}
</script>

<style lang="less" scoped>
  .assets{
    .table{
      position: relative;
      min-height: 500px;
    }
    .part-left{
      padding-right: 12px;
    }
    .part-right{
      padding-left: 12px;
    }
    .publish{
      text-align: center;
      padding-top: 60px;
      height: 400px;
      p{
        font-size: 18px;
        margin-bottom:10px;
      }
    }
    .detail{
      padding-left: 32px;
      padding-top: 20px;
      height: 400px;

      p{
        margin-top: 10px;
      }
    }
  }
  .agreement{
    .content{
      height: 200px;
      overflow-y: scroll;
      h3{
        text-align: center;
      }

    }
    .footer-content{
      margin-top: 10px;
      .explan{
        float: right;
      }
    }
  }
@media (max-width: 1200px){
      .assets{
      .part-left{
        padding-right: 0px;
      }
      .part-right{
        margin-top: 20px;
        padding-left: 0px;
      }
    }
}

</style>
