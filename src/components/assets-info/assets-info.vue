<template>
  <div class="assets-info">
        <div class="table">
            <div>
              <a-table :rowSelection="rowSelection"
                :rowKey="record => record.currency"
                :columns="columns"
                :dataSource="data"
                :loading="loading"
                >
        </a-table>
            </div>
              <no-data v-show="nodatas"></no-data>
          </div>
  </div>
</template>

<script>
import noData from '@/components/nodata/nodata'
import {getDappBanlance} from '@/api/funds'
import {mapState} from 'vuex'
const columns = [{
  title: i18n.t('assets_info.table_columns.th01'),
  dataIndex: 'currency'
}, {
  title: i18n.t('assets_info.table_columns.th02'),
  dataIndex: 'balanceShow'
}]
export default {
  data () {
    return {
      columns,
      data: [],
      loading: false,
      nodatas: false
    }
  },
  computed: {
    ...mapState({
      secret: state => state.user.secret,
      address: state => state.user.accountInfo.address
    })
  },
  created () {
    this.getDappList()
  },
  methods: {
    async getDappList () {
      try {
        this.loading = true
        const result = await getDappBanlance(this.address)
        if (result && result.data.success) {
          this.data = result.data.balances
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    noData
  }
}
</script>

<style lang="less" scoped>
.assets-info{
  .table{
    position: relative;
  }
}
</style>
