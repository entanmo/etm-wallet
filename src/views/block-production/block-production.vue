<template>
  <div class="block-appear">
    <!-- info -->
    <!-- <a-button type="primary" @click="add">按钮</a-button> -->
    <div v-show="show"  style="position:absolute;top:-100px;left:0;width:100%;height:1000px;overflow:hidden">
        <animated-coin  :ref="'coin'+index" class="item-box" :key="index" v-for="(item,index) in coins"></animated-coin>
    </div>
    <a-row class="name" type="flex" justify="start" align="middle" >
      <a-col :xs="10" :sm="8" :md="8" :lg="5" :xl="4">{{$t("block_production.info")}}</a-col>
      <a-col :xs="6" :sm="6" :md="6" :lg="3" :xl="3"> <div>{{onOff}}</div></a-col>
      <a-col :xs="8" :sm="6" :md="6" :lg="3" :xl="2">
         <a-button v-if="delegates" class="btn" size="large" @click="() => modal1Visible = true" type="primary">{{$t("block_production.registerBtn")}}</a-button>
      </a-col>
    </a-row>
    <div class="info">
      <a-row class="etm-info" type="flex" justify="space-around" align="middle">
          <a-col class="etm-info-li" :span="6">
            <p>{{$t("block_production.rewards")}} (ETM)</p>
            <p>{{unit(delegateInfo.rewards) || 0}}</p>
          </a-col>
          <a-col class="etm-info-li" :span="6">
            <p>{{$t("block_production.rate")}}</p>
            <p>{{delegateInfo.rate || 0}}</p>
          </a-col>
          <a-col class="etm-info-li" :span="6">
            <p>{{$t("block_production.productivity")}}</p>
            <p>{{delegateInfo.productivity ? delegateInfo.productivity+ '%' : 0}} </p>
          </a-col>
          <a-col class="etm-info-li last" :span="6">
            <p>{{$t("block_production.approval")}}</p>
            <p>{{delegateInfo.approval ? delegateInfo.approval+ '%' : 0}}</p>
          </a-col>
    </a-row>
    </div>
    <div class="production">
      <p>{{$t("block_production.block_list")}}</p>
      <div class="table">
        <div>
          <a-table :columns="columns"
          :rowKey="record => record.id"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          :scroll="{ x: 1300 }"
          :dataSource="data" >
          <template slot="time" slot-scope="text, record">
            {{convertTime(record.timestamp)}}
          </template>
          <template slot="totalFee" slot-scope="text,record">
              {{unit(record.totalFee)}}
          </template>
          <template slot="reward" slot-scope="text,record">
              {{unit(record.reward)}}
          </template>
          </a-table>
        </div>
         <no-data v-show="nodata" ></no-data>
        </div>
    </div>
    <a-modal
      :title="$t('block_production.pop_title')"
      v-model="modal1Visible"
    >
      <div>
        <a-form :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item
           :label="$t('block_production.name.label')"
          :labelCol="{ span: 5 }"
          :wrapperCol="{ span: 16 }"
          :fieldDecoratorId="$t('block_production.name.label')"
          destroyOnClose
          :fieldDecoratorOptions="{rules: [{ required: true, message: $t('block_production.name.msg') }]}"
          >
            <a-input type="text" v-model="delegateName" :placeholder="$t('block_production.name.required')" />
          </a-form-item>
          <a-form-item
           :label="$t('block_production.note.label')"
          :labelCol="{ span: 5 }"
          >
         {{$t('block_production.note.msg')}}
          </a-form-item>
        </a-form>
      </div>
      <template slot="footer" class="foot">
        <div class="foot">
          <a-button  type="primary" @click="handleOk">
         {{$t('block_production.submitBtn')}}
          </a-button>
        </div>
      </template>
    </a-modal>
    <pop-password :modal2Visible.sync="modal2Visible"  @secondSubmit="handleSecondOk"></pop-password>
  </div>
</template>
<script>
import noData from '@/components/nodata/nodata'
import popPassword from '@/components/pop-password/pop-password'
import { getDelegate, setDelegate, blocks } from '@/api/block'
import { convertTime } from '@/utils/gen'
import {mapState} from 'vuex'
import {unit} from '@/utils/utils'
import AnimatedCoin from '@/components/animated-coin/animated-coin'
import { setTimeout } from 'timers'

const columns = [{
  title: i18n.t('block_production.columns.th01'),
  width: 80,
  dataIndex: 'height',
  fixed: 'left'
}, {
  title: i18n.t('block_production.columns.th02'),

  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: i18n.t('block_production.columns.th03'),
  dataIndex: 'id'
}, {
  title: i18n.t('block_production.columns.th05'),
  dataIndex: 'numberOfTransactions'
}, {
  title: i18n.t('block_production.columns.th06'),
  dataIndex: 'totalAmount',
  scopedSlots: {customRender: 'totalAmount'}
}, {
  title: i18n.t('block_production.columns.th07'),
  dataIndex: 'totalFee',
  scopedSlots: {customRender: 'totalFee'}
}, {
  title: i18n.t('block_production.columns.th08'),
  dataIndex: 'reward',
  scopedSlots: {customRender: 'reward'}
}]
export default {
  // sockets: {
  //   'blocks/change': function (data) {
  //     // console.log(data)
  //     this._myBlock()
  //   },
  //   connect: function () {
  //     this.id = this.$socket.id
  //   },
  //   customEmit: function (val) {
  //     console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   }
  // },
  data () {
    return {
      onOff: i18n.t('block_production.status.not_register'),
      delegateInfo: {},
      data: [],
      columns,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false,
      nodata: false,
      height: '', // 查询高度
      detailHeight: '',
      blockDetail: {},
      convertTime: convertTime,
      modal1Visible: false,
      modal2Visible: false,
      delegateName: '',
      secondSecret: '', // 二级密码
      unit: unit,
      delegates: true, // 注册按钮显示
      amount: 48,
      show: false,
      height1: null
    }
  },
  created () {
    this._getDelegateDetail()
    let self = this
    setTimeout(function nextGetDelegateDetail () {
      self._getDelegateDetail()
        .then(value => {
          setTimeout(nextGetDelegateDetail, 1000 * 303)
        })
        .catch(error => {
          void (error)
          setTimeout(nextGetDelegateDetail, 1000 * 303)
        })
    }, 1000 * 303)
    setTimeout(function getBlock () {
      self._myBlock()
        .then(req => {
          setTimeout(getBlock, 3000)
        })
        .catch(err => {
          void (err)
          console.log(44)
          setTimeout(getBlock, 3000)
        })
    }, 3000)
  },
  computed: {
    ...mapState({
      secondSignature: state => state.user.accountInfo.secondSignature,
      secret: state => state.user.secret,
      balance: state => state.user.accountInfo.balance
    }),
    publicKey () {
      const data = JSON.parse(sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    },
    coins () {
      return Array(this.amount).fill(1)
    }
  },
  methods: {
    add () {
      this.show = true
      this.coins.forEach((element, index) => {
        this.$refs[`coin${index}`][0].tween()
      })
      setTimeout(() => {
        this.show = false
      }, 3000)
    },
    handleOk () {
      this.form.validateFields(
        (err) => {
          if (!err) {
            if (unit(this.balance) < 100) {
              this.$notification.info({
                message: i18n.t('tip.title'),
                description: i18n.t('tip.balance_enough')
              })
            } else if (this.secondSignature) {
              this.modal1Visible = false
              this.modal2Visible = true
            } else {
              this._setDelegate()
            }
          }
        }
      )
    },
    handleSecondOk (secondSecret) { // 二级密码
      this.secondSecret = secondSecret
      this._setDelegate()
    },
    async _setDelegate () {
      try {
        const params = {
          secret: this.secret,
          username: this.delegateName
        }
        if (this.secondSignature) {
          params.secondSecret = this.secondSecret
        }
        const res = await setDelegate(params)
        if (res.data.success) {
          this.modal1Visible = false
          this.modal2Visible = false
          this.$store.dispatch('GetInfo')
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.register_success')
          })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _getDelegateDetail (params = {publicKey: this.publicKey}) {
      this.loading = true
      try {
        const result = await getDelegate(params)
        if (result.data.success) {
          this.onOff = i18n.t('block_production.status.has_register')
          this.delegateInfo = result.data.delegate
          this.delegates = false
          this._getTableLists()
        } else {
          this.delegates = true
          this.onOff = i18n.t('block_production.status.not_register')
          this.nodata = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    async _myBlock (params = {limit: 1, orderBy: 'height:desc'}) {
      try {
        const result = await blocks(params)
        if (result.data.success) {
          // console.log(this.height1)
          const myPublicKey = result.data.blocks[0].generatorPublicKey
          if (this.height1 === result.data.blocks[0].height) {
            return
          } else if (this.publicKey === myPublicKey) {
            this.add()
            this._getDelegateDetail()
            this.height1 = result.data.blocks[0].height
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async _getTableLists (params = {generatorPublicKey: this.publicKey, limit: 10, orderBy: 'height:desc'}) {
      this.loading = true
      const result = await blocks(params)
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        }
        this.loading = false
        this.data = result.data.blocks
        const pagination = { ...this.pagination }
        pagination.total = result.data.count
        this.pagination = pagination
      }
    },
    handleTableChange (pagination) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this._getTableLists({
        generatorPublicKey: this.publicKey,
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 'height:desc'
      })
    }
  },
  components: {
    'no-data': noData,
    'pop-password': popPassword,
    'animated-coin': AnimatedCoin

  }
}
</script>
<style lang="less" scoped>
.block-appear{
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .info{
    .etm-info {
      background-color: #fff;
      padding: 20px 0;
      text-align: center;
      .etm-info-li {
        p {
          border-right: 1px solid #e9e9e9;
          margin: 0;
        }
        p:first-child {
          color: #8d8d8d;
          font-size: 14px;
        }
        p:last-child {
          color: #4b4b4b;
          font-size: 24px;
        }
      }
    .last {
      p {
        border: none;
      }
    }
    }
  }
  .production{
    margin: 20px 0;
    p{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    }
    .table{
      background: #fff;
      border-radius: 2px;
      padding:10px;
      position: relative;
    }
  }
.foot {
    text-align: center!important;
}
}
@media (max-width: 769px){
  .block-appear .info .etm-info .etm-info-li p:last-child{
    font-size: 20px;
  }
  .lang-en_GB .name ,.lang-en_GB .name .btn{
    font-size: 12px;
  }
}
</style>
