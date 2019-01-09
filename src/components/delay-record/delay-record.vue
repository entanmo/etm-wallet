<template>
  <div class="income">
    <div class="income-table">
      <div >
        <a-table :columns="columns"
                 :rowKey="record => record.transactionId"
                 :dataSource="data"
                :pagination="pagination"
                :loading="loading"
                  :scroll="{ x: 1300 }"
        >
          <template slot="expired" slot-scope="text, record">
            {{computedTime(record.expired)}}
          </template>
          <template slot="amount" slot-scope="text, record">
            {{unit(record.amount)}}
          </template>
        </a-table>
        <no-data v-show="nodata"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import noData from '@/components/nodata/nodata'
import { delayOrders } from '@/api/account'
import { convertTime } from '@/utils/gen'
import {unit, timestampToLocalTime} from '@/utils/utils'
const columns = [{
  title: i18n.t('delay_record.table_columns.th01'),
  dataIndex: 'senderId'
}, {
  title: i18n.t('delay_record.table_columns.th02'),
  dataIndex: 'expired',
  scopedSlots: {customRender: 'expired'}
}, {
  title: i18n.t('delay_record.table_columns.th03'),
  dataIndex: 'amount',
  scopedSlots: {customRender: 'amount'}
}]
export default {
  props: {
    delay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      nodata: false,
      columns,
      convertTime: convertTime,
      unit: unit,
      data: [],
      pagination: {
        defaultPageSize: 10 // 每页个数
      },
      loading: false
    }
  },
  computed: {
    address () {
      return this.$store.state.user.accountInfo.address
    },
    height () {
      return this.$store.state.user.accountInfo.height
    }
  },
  created () {
    this.delayRecord()
  },
  methods: {
    computedTime (expired) {
      const diff = expired - this.height
      const second = diff * 3
      return timestampToLocalTime((Date.now() / 1000 + second) * 1000)
    },
    async delayRecord (params = {address: this.address, mode: 0}) {
      this.loading = true
      const result = await delayOrders(params)
      console.log(result)
      if (result && result.data.success) {
        if (result.data.result.length === 0) {
          this.nodata = true
        } else {
          this.nodata = false
        }
        this.data = result.data.result
        const pagination = {...this.pagination}
        pagination.total = result.data.result.length
        this.pagination = pagination
        this.loading = false
      }
    }
  },
  components: {
    'no-data': noData
  }
}
</script>
<style lang="less" scoped>
  .income{
    .income-table{
      position: relative;
      background: #fff;
      border-radius: 2px;
      padding:10px;
      min-height: 500px;
    }
  }
</style>
