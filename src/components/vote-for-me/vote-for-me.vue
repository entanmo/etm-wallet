<template>
  <div class="vote-for-me">
    <a-row type="flex" justify="space-between" align="middle">
        <a-col class="count" >{{$tc("vote_for_me.total",1)}}   {{data.length }}   {{$tc("vote_for_me.total",0)}}</a-col>
        <a-col>
          <a-button class="refresh" type="primary" @click="refresh">{{$t("vote_for_me.refresh")}}</a-button>
        </a-col>
    </a-row>
    <div class="table">
      <div>
        <a-table :columns="columns"
                 :rowKey="record => record.address"
                :dataSource="data"
                :pagination="pagination"
                :loading="loading"
                :scroll="{ x: 1300 }"
                @change="handleTableChange"
        >
        <template slot="weight" slot-scope="text,record">
          {{record.weight.toFixed(2) === '0.00' ? 0 : record.weight.toFixed(2)}}
        </template>
        </a-table>
      </div>
        <no-data v-show="nodata"  ></no-data>
    </div>
  </div>
</template>
<script>
import {voteForMe} from '@/api/account'
import noData from '@/components/nodata/nodata'
const columns = [{
  title: i18n.t('vote_for_me.columns.th01'),
  dataIndex: 'name'
}, {
  title: i18n.t('vote_for_me.columns.th02'),
  dataIndex: 'address'
}, {
  title: i18n.t('vote_for_me.columns.th03'),
  dataIndex: 'weight',
  scopedSlots: {customRender: 'weight'}

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
      nodata: false
    }
  },
  created () {
    this._voteForMe(0)
  },
  computed: {
    publicKey () {
      const data = JSON.parse(sessionStorage.getItem('etmUse') || localStorage.getItem('etmUse')).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    }
  },
  methods: {
    refresh () {
      this.nodata = false
      this._voteForMe(this.pagination.current)
    },
    async _voteForMe (p) {
      this.loading = true
      const params = {publicKey: this.publicKey}
      const result = await voteForMe(params)
      if (result.data.success) {
        this.loading = false
        if (result.data.accounts.length === 0) {
          this.nodata = true
        }
        this.data = result.data.accounts.slice(
          this.pagination.defaultPageSize * p,
          this.pagination.defaultPageSize * p + 10
        )
        const pagination = {...this.pagination}
        pagination.total = result.data.accounts.length
        pagination.current = p
        this.pagination = pagination
      }
    },
    handleTableChange (pagination) {
      this.voteForMe(pagination.current - 1)
    }
  },
  components: {
    noData
  }
}
</script>
<style lang="less" scoped>
.vote-for-me{
  min-height: 600px;
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
