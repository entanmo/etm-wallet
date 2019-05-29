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
                :scroll="{ x: 800 }"
                @change="handleTableChange"
        >
        <template slot="weight" slot-scope="weight">
          {{weight.toFixed(2) === '0.00' ? 0 : weight.toFixed(2)}}
        </template>
        </a-table>
      </div>
        <component v-show="nodata" :is="showComponent" ></component>
    </div>
  </div>
</template>
<script>
import {voteForMe} from '@/api/account'
import { getDelegate } from '@/api/block'
import noDataMiner from '@/components/nodata/nodataminer'
import noData from '@/components/nodata/nodata'
const columns = [{
  title: i18n.t('vote_for_me.columns.th01'),
  dataIndex: 'username'
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
      isDelegate: false,
      loading: false,
      nodata: false
    }
  },
  created () {
    this._getDelegateDetail()
  },
  computed: {
    publicKey () {
      const data = (this.$storage.getItem('etmUse', false) || this.$storage.getItem('etmUse', true)).account.publicKey
      return this.$store.state.user.accountInfo.publicKey || data
    },
    showComponent () {
      return this.isDelegate ? 'no-data' : 'no-data-miner'
    }
  },
  methods: {
    refresh () {
      if (this.isDelegate) {
        this.nodata = false
        this._voteForMe(this.pagination.current)
      } else {
        this._getDelegateDetail()
      }
    },
    async _voteForMe (p) {
      this.loading = true
      const params = {publicKey: this.publicKey}
      const result = await voteForMe(params)
      if (result && result.data.success) {
        this.nodata = false
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
    },
    async _getDelegateDetail (params = {publicKey: this.publicKey}) { // 获取矿工详情
      try {
        const result = await getDelegate(params)
        if (result && result.data.success) {
          this.isDelegate = true
          this._voteForMe(0)
        } else {
          this.isDelegate = false
          this.nodata = true
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  components: {
    noData,
    noDataMiner
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
