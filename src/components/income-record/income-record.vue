<script>
import noData from '@/components/nodata/nodata'
import { getTransaction } from '@/api/account'
import { convertTime } from '@/utils/gen'
import {unit} from '@/utils/utils'
const columns = [{
  title: i18n.t('first-view.table_columns.th03'),
  dataIndex: 'senderId'
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
  render () {
    return (<div>
      <div class="income">
        <div class="income-table">
          <div >
            <a-table columns={this.columns}
              rowKey={record => record.id}
              dataSource={this.data}
              pagination={this.pagination}
              loading={this.loading}
              scroll={{ x: 1300 }}
            >
            </a-table>
            <no-data v-show="nodata"></no-data>
          </div>
        </div>
      </div>
    </div>)
  },
  computed: {
    address () {
      return this.$store.state.user.accountInfo.address
    }
  },
  created () {
    this.getIncome()
  },
  methods: {
    async getIncome (params = {senderId: this.address, orderBy: 't_timestamp:desc', limit: 10}) {
      this.loading = true
      const result = await getTransaction(params)
      if (result && result.data.success) {
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
      this.getIncome({
        senderId: this.address,
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 't_timestamp:desc'
      })
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
