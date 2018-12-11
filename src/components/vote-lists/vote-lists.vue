<template>
  <div class="vote-lists">
    <a-row type="flex" justify="space-between" align="middle">
        <a-col class="count" >{{$tc("vote_lists.total",1)}}  {{filterDisabled.length}}   {{$tc("vote_lists.total",0)}} </a-col>
        <a-col >
          <a-button class="refresh" type="primary" @click="refresh">{{$t("vote_lists.refresh")}}</a-button>
          <a-button type="primary" @click="vote" >{{$t("vote_lists.vote")}}</a-button>
        </a-col>
    </a-row>
    <div class="table">
      <div>
        <a-table :rowSelection="{type:'radio',selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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
import {getRecord, getVoteLists, submitVoter} from '@/api/account'
import {mapState} from 'vuex'
import PopPassword from '@/components/pop-password/pop-password'
import PopVoted from '@/components/pop-voted/pop-voted'
import {compareArrObj, unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'

const columns = [{
  title: i18n.t('vote_lists.columns.th01'),
  dataIndex: 'rate'
}, {
  title: i18n.t('vote_lists.columns.th02'),
  dataIndex: 'username'
}, {
  title: i18n.t('vote_lists.columns.th03'),
  dataIndex: 'address'
}, {
  title: i18n.t('vote_lists.columns.th04'),
  dataIndex: 'vote'
}, {
  title: i18n.t('vote_lists.columns.th05'),
  dataIndex: 'producedblocks'
}, {
  title: i18n.t('vote_lists.columns.th06'),
  dataIndex: 'productivity',
  scopedSlots: {customRender: 'productivity'},
  width: 110,
  fixed: 'right'
}]

export default {
  data () {
    return {
      data: [],
      resultData: [],
      haveVoted: [], // 以投票数组
      filterDisabled: [],
      columns,
      selectedRowKeys: [],
      selectedRows: [], // 选择的行
      totalVoters: 0,
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      selectRecord: [],
      loading: false,
      modal1Visible: false,
      modal2Visible: false,
      nodata: false,
      type: 'new'
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
    // 选中数组
    voted () {
      const votedList = []
      if (this.haveVoted && this.haveVoted.length > 0) {
        votedList.push('-' + this.haveVoted[0].publicKey)
      }
      this.selectedRows.forEach((item) => {
        votedList.push('+' + item.publicKey)
      })
      return votedList
    }
  },
  methods: {
    // 刷新
    refresh () {
      this.nodata = false
      this.selectedRowKeys = []
      this.selectedRows = []
      this._getRecord(this.pagination.page)
    },
    // 投票
    vote () {
      if (this.selectedRows.length === 0) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.choose_vote')
        })
      } else {
        this.modal1Visible = true
      }
    },
    // 弹框确认
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
    // 二次密码确认
    secondSubmit (secondSecret) {
      this._submitVoter({secret: this.secret, delegates: this.voted, secondSecret: secondSecret})
    },
    // 选中事件
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    // 获取列表
    async _getVoteLists (p) {
      this.loading = true
      try {
        const params = {orderby: 'approval:desc'}
        const result = await getVoteLists(params)
        if (result.data.success) {
          this.resultData = result.data.delegates
          if (result.data.totalCount > 101) {
            const resultMore = await getVoteLists({orderby: 'approval:desc', offset: 101})
            if (resultMore.data.success) {
              this.resultData = [...this.resultData, ...resultMore.data.delegates]
            }
          }
          this.filterDisabled = compareArrObj(this.haveVoted, this.resultData).result
          this.data = this.filterDisabled.slice(
            this.pagination.defaultPageSize * p,
            this.pagination.defaultPageSize * p + 10
          )
          if (result.data.delegates.length === 0) {
            this.nodata = true
          }
          this.loading = false
          const pagination = { ...this.pagination }
          pagination.total = this.filterDisabled.length
          pagination.page = p
          this.pagination = pagination
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取记录列表
    async _getRecord (p) {
      try {
        const params = {address: this.address}
        this.loading = true
        const result = await getRecord(params)
        if (result.data.success) {
          this.totalVoters = result.data.delegates.length
          this.haveVoted = result.data.delegates
          this._getVoteLists(p)
        } else {
          this.haveVoted = []
          this._getVoteLists(p)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 分页
    handleTableChange (pagination) {
      this._getVoteLists(pagination.current - 1)
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 提交投票接口
    async _submitVoter (params = {secret: this.secret, delegates: this.voted}) {
      const result = await submitVoter(params)
      if (result.data.success) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.vote_success')
        })
        this.modal1Visible = false
        this.modal2Visible = false
        this.selectedRowKeys = []
        this.selectedRows = []
        setTimeout(() => {
          this.$store.dispatch('GetInfo')
          this._getVoteLists(this.pagination.page)
        }, 4000)
      } else {
        this.modal1Visible = false
        this.modal2Visible = false
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: result.data.error
        })
      }
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
.vote-lists{
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
  }
}
</style>
