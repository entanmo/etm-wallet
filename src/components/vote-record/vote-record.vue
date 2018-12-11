<template>
  <div class="record">
    <a-row type="flex" justify="space-between" align="middle">
        <a-col class="count" >{{$tc("vote_record.total",1)}}   {{totalVoters}}   {{$tc("vote_record.total",0)}}</a-col>
        <a-col >
          <a-button class="refresh" type="primary" @click="refresh">{{$t("vote_record.refresh")}}</a-button>
          <a-button type="primary" @click="deleteRecord" >{{$t("vote_record.delete")}}</a-button>
          </a-col>
    </a-row>
    <div class="table">
      <div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
          :rowKey="record => record.publicKey"
          :columns="columns"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
           :scroll="{ x: 1300 }"
          @change="handleTableChange"
          >
          <template slot="productivity" slot-scope="text,record">
            {{record.productivity}}%
          </template>
          </a-table>
      </div>
        <no-data v-show="nodata"  ></no-data>
    </div>
    <pop-voted :type="type" :modal1Visible.sync="modal1Visible" :selectedRows="selectedRows"  @handleOk="handleOk"></pop-voted>
    <pop-password :modal2Visible.sync="modal2Visible" @secondSubmit="secondSubmit"></pop-password>
  </div>
</template>
<script>
import {getRecord, submitVoter} from '@/api/account'
import {mapState} from 'vuex'
import PopPassword from '@/components/pop-password/pop-password'
import PopVoted from '@/components/pop-voted/pop-voted'
import noData from '@/components/nodata/nodata'
import {unit} from '@/utils/utils'
const columns = [{
  title: i18n.t('vote_record.columns.th01'),
  dataIndex: 'rate'
}, {
  title: i18n.t('vote_record.columns.th02'),
  dataIndex: 'username'
}, {
  title: i18n.t('vote_record.columns.th03'),
  dataIndex: 'address'
}, {
  title: i18n.t('vote_record.columns.th04'),
  dataIndex: 'vote'

}, {
  title: i18n.t('vote_record.columns.th05'),
  dataIndex: 'producedblocks'
}, {
  title: i18n.t('vote_record.columns.th06'),
  dataIndex: 'productivity',
  scopedSlots: {customRender: 'productivity'},
  width: 110,
  fixed: 'right'
}]

export default {
  data () {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      selectedRows: [], // 选择的行
      totalVoters: 0,
      pagination: {
        page: 0,
        defaultPageSize: 10 // 每页个数
      },
      selectRecord: [],
      loading: false,
      modal1Visible: false,
      modal2Visible: false,
      nodata: false,
      type: 'cancel'
    }
  },
  created () {
    this._getRecord(0)
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address,
      secondSignature: state => state.user.accountInfo.secondSignature,
      balance: state => state.user.accountInfo.balance
    }),
    cancelVote () {
      const cancel = []
      this.selectedRows.forEach((item) => {
        cancel.push('-' + item.publicKey)
      })
      return cancel
    }
  },
  methods: {
    // 刷新
    refresh () {
      this.nodata = false
      this.selectedRowKeys = []
      this.selectedRows = []
      this._getRecord(0)
    },
    // 删除事件
    deleteRecord () {
      if (this.selectedRows.length === 0) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.delete_vote')
        })
      } else {
        this.modal1Visible = true
      }
    },
    // 确认提交
    handleOk () {
      if (unit(this.balance) < 0.1) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.balance_enough')
        })
      } else if (this.secondSignature) {
        this.modal1Visible = false
        this.modal2Visible = true
      } else {
        this._submitVoter()
      }
    },
    // 二级密码提交
    secondSubmit (secondSecret) {
      this._submitVoter({secret: this.secret, delegates: this.cancelVote, secondSecret: secondSecret})
    },
    // 选中事件
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 提交接口
    async _submitVoter (params = {secret: this.secret, delegates: this.cancelVote}) {
      const result = await submitVoter(params)
      if (result.data.success) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.delete_success')
        })
        this.modal1Visible = false
        this.modal2Visible = false
        this.selectedRowKeys = []
        this.selectedRows = []
        setTimeout(() => {
          this._getRecord(this.pagination.page)
          this.$store.dispatch('GetInfo')
        }, 4000)
      } else {
        this.modal1Visible = false
        this.modal2Visible = false
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: result.data.error
        })
      }
    },
    // 获取列表
    async _getRecord (p) {
      try {
        const params = {address: this.address}
        this.loading = true
        const result = await getRecord(params)
        if (result.data.success) {
          this.loading = false
          this.totalVoters = result.data.delegates.length
          if (this.totalVoters === 0) {
            this.nodata = true
          }
          this.data = result.data.delegates.slice(
            this.pagination.defaultPageSize * p,
            this.pagination.defaultPageSize * p + 10

          )
          const pagination = { ...this.pagination }
          pagination.total = result.data.delegates.length
          pagination.page = p
          this.pagination = pagination
        } else {
          this.data = []
          this.loading = false
          if (this.totalVoters === 0) {
            this.nodata = true
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleTableChange (pagination) {
      this._getRecord(pagination.current - 1)
      this.selectedRowKeys = []
      this.selectedRows = []
    }
  },
  components: {
    'pop-password': PopPassword,
    'pop-voted': PopVoted,
    noData
  }
}
</script>
<style lang="less" scoped>
.record{
  min-height: 600px;
  .refresh{
    margin-right: 10px;
  }
  .count{
    font-size: 18px;
    padding-left: 15px;
    // letter-spacing: 3px;
  }
  .table{
    margin-top: 20px;
    position: relative;
  }
}

</style>
