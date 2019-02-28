<template>
  <div class="transfer-record">
    <p class="title"> <ul class="tabs-record" style=""><span @click="sender" :class="{active:!recipientFlag}" style="margin-right:20px;">{{$tc("first-view.transaction_type",1)}}</span><span  :class="{active:recipientFlag}" @click="recipient">{{$tc("first-view.transaction_type",2)}}</span></ul></p>
    <div class="lists" >
      <div>
        <a-table :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
          :scroll="{ x: 1300 }"
        @change="handleTableChange"
          >
          <template slot="typeIN" slot-scope="text,record">
            {{mapType(record.type)}}
          </template>
          <template slot="time" slot-scope="text,record">
            {{convertTime(record.timestamp)}}
          </template>
          <template slot="amount" slot-scope="text,record">
            {{unit(record.amount)}}
          </template>
        <template slot="footer" slot-scope="text,record">
          {{$t("first-view.all")}}:      {{totalAmount().toFixed(2)}} ETM
        </template>
        </a-table>
      </div>
      <no-data v-show="nodata"></no-data>
    </div>
  </div>
</template>
<script>
import { convertTime } from '@/utils/gen'
import {unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'
import { getTransaction } from '@/api/account'

// 表头
const columns = [{
  title: i18n.t('first-view.table_columns.th02'),
  scopedSlots: { customRender: 'typeIN' },
  dataIndex: 'type'
}, {
  title: i18n.t('first-view.table_columns.th03'),
  dataIndex: 'senderId'
}, {
  title: i18n.t('first-view.table_columns.th04'),
  dataIndex: 'recipientId'
}, {
  title: i18n.t('first-view.table_columns.th05'),
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: i18n.t('first-view.table_columns.th06'),
  dataIndex: 'message'
}, {
  title: i18n.t('first-view.table_columns.th07'),
  dataIndex: 'amount',
  scopedSlots: {customRender: 'amount'}
}]
export default {
  data () {
    return {
      columns,
      data: [],
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false,
      nodata: false,
      recipientFlag: false,
      unit: unit,
      convertTime: convertTime // 方法

    }
  },
  computed: {
    address () {
      return this.$store.state.user.accountInfo.address
    }
  },
  created () {
    this._getTransaction()
  },
  methods: {
    recipient () {
      this.recipientFlag = true
      this._getTransaction({
        recipientId: this.address,
        limit: 10,
        orderBy: 't_timestamp:desc'
      })
    },
    sender () {
      this.recipientFlag = false
      this._getTransaction({
        senderId: this.address,
        limit: 10,
        orderBy: 't_timestamp:desc'
      })
    },
    async _getTransaction (params = {senderId: this.address, orderBy: 't_timestamp:desc', limit: 10}) {
      this.loading = true
      const result = await getTransaction(params)
      console.log(result)
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        } else {
          this.nodata = false
        }
        this.data = result.data.transactions
        const pagination = {...this.pagination}
        pagination.total = result.data.count
        this.pagination = pagination
        this.loading = false
      }
    },
    handleTableChange (pagination) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      if (this.recipientFlag) {
        this._getTransaction({
          recipientId: this.address,
          limit: pagination.pageSize,
          offset: pagination.pageSize * (pagination.current - 1),
          orderBy: 't_timestamp:desc'
        })
      } else {
        this._getTransaction({
          senderId: this.address,
          limit: pagination.pageSize,
          offset: pagination.pageSize * (pagination.current - 1),
          orderBy: 't_timestamp:desc'
        })
      }
    },
    totalAmount () {
      if (!this.data.length) {
        return 0
      }
      const amount = this.data.map(item => unit(item.amount))
      return amount.reduce((prev, next) => {
        return prev + next
      })
    },
    mapType (type) {
      switch (type) {
        case 0:
          return i18n.t('first-view.transfer')
        case 1:
          return i18n.t('first-view.set')
        case 2:
          return i18n.t('first-view.register_voter')
        case 3:
          return i18n.t('first-view.vote')
        case 4:
          return i18n.t('first-view.multi_signature')
        case 5:
          return 'DAPP'
        case 6:
          return 'IN_TRANSFER'
        case 7:
          return 'OUT_TRANSFER'
        case 101:
          return i18n.t('first-view.lock')
        case 110:
          return i18n.t('first-view.delay')
        case 102:
          return i18n.t('first-view.unlock')
        case 120:
          return i18n.t('first-view.unregister_voter')
      }
    }
  },
  components: {
    'no-data': noData
  }
}
</script>
<style lang="less" scoped>
  .transfer-record{
      .title {
      font-size: 20px;
      height: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    .tabs-record{
      float:right;
      font-size:14px;
      margin-top:6px;
      margin-right:10px;
      span{
        cursor:pointer;
        font-weight: normal;
      }
      .active{
        color:#1890ff;
      }
    }
  }
  .lists{
  position: relative;
  background: #fff;
  border-radius: 2px;
  padding:10px;
  min-height: 500px;
  }
  }
</style>
