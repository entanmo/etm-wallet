<template>
  <div class="block-scan">
    <div class="search">
    <a-input-search
      :placeholder="$t('block_scan.search')"
      style="width: 300px"
      @search="onSearch"
      enterButton
      type="number"
    />
    </div>
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
        <template slot="totalAmount" slot-scope="text, record">
          {{unit(record.totalAmount)}}
        </template>
        <template slot="totalFee" slot-scope="text, record">
          {{unit(record.totalFee)}}
        </template>
        <template slot="reward" slot-scope="text, record">
          {{unit(record.reward)}}
        </template>
        <template slot="action" slot-scope="text, record, index">
          <a slot="action"  @click="showDetails(record.height)" href="javascript:;">{{$t('block_scan.click_details')}}</a>
        </template>
        </a-table>
      </div>
      <no-data v-show="nodata" ></no-data>
    </div>
<!-- 详情 -->
      <a-modal
      :title="$t('block_scan.block_details')"
      width='800px'
      v-model="visible"
    >
      <template slot="footer">
        <div class="detail-foot">
        <a-button  type="primary" style="margin-right:20px" @click="prevBlock" >{{$t('block_scan.pre_block')}}</a-button>
        <a-button  type="primary" @click="nextBlock" >{{$t('block_scan.next_block')}}</a-button>
        </div>
      </template>
      <div class="popDetail">
        <div class="input phone-input">
          <label>ID：</label>
          <span class="long">{{blockDetail.id}}</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.version')}}：</label>
          <span>V{{blockDetail.version}}</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.timestamp')}}：</label>
          <span>{{convertTime(blockDetail.timestamp)}}</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.height')}}：</label>
          <span>{{blockDetail.height}}</span>
        </div>
        <div class="input phone-input previousBlock">
          <label>{{$t('block_scan.previousBlock')}}：</label>
          <span class="long">{{blockDetail.previousBlock}}</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.numberOfTransactions')}}：</label>
          <span>{{unit(blockDetail.numberOfTransactions)}} ETM</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.totalAmount')}}：</label>
          <span>{{unit(blockDetail.totalAmount)}} ETM</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.reward')}}：</label>
          <span>{{unit(blockDetail.reward)}} ETM</span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.summary')}}：</label>
          <span></span>
        </div>
        <div class="input">
          <label>{{$t('block_scan.generatorId')}}：</label>
          <span>{{blockDetail.generatorId}}</span>
        </div>
        <div class="input phone-input">
          <label>{{$t('block_scan.generatorPublicKey')}}：</label>
          <span class="long">{{blockDetail.generatorPublicKey}}</span>
        </div>
      </div>
    </a-modal>

  </div>
</template>
<script>
import {getHighest, blocks, searchBlock} from '@/api/block'
import { convertTime } from '@/utils/gen'
import {unit} from '@/utils/utils'
import noData from '@/components/nodata/nodata'

const columns = [{
  title: i18n.t('block_scan.columns.th01'),
  dataIndex: 'height'
}, {
  title: i18n.t('block_scan.columns.th02'),
  dataIndex: 'timestamp',
  scopedSlots: {customRender: 'time'}
}, {
  title: i18n.t('block_scan.columns.th04'),
  dataIndex: 'generatorId'
}, {
  title: i18n.t('block_scan.columns.th05'),
  dataIndex: 'numberOfTransactions'
}, {
  title: i18n.t('block_scan.columns.th06'),
  dataIndex: 'totalAmount',
  scopedSlots: {customRender: 'totalAmount'}
}, {
  title: i18n.t('block_scan.columns.th07'),
  dataIndex: 'totalFee',
  scopedSlots: {customRender: 'totalFee'}
}, {
  title: i18n.t('block_scan.columns.th08'),
  dataIndex: 'reward',
  scopedSlots: {customRender: 'reward'}
}, {
  title: i18n.t('block_scan.columns.th09'),
  key: 'operation',
  fixed: 'right',
  width: 100,
  scopedSlots: { customRender: 'action' }
}]
export default {
  data () {
    return {
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
      visible: false, // 弹出框
      convertTime: convertTime, // 方法
      unit: unit
    }
  },
  created () {
    this._getTableLists()
  },
  methods: {
    async showDetails (height) {
      this.detailHeight = height
      this.visible = true
      const params = {height: height}
      const result = await searchBlock(params)
      if (result.data.success) {
        this.blockDetail = result.data.block
      }
    },
    async nextBlock () {
      const result = await getHighest()
      if (result.data.success) {
        if (this.detailHeight === result.data.height) {
          this.$notification.info({
            message: i18n.t('tip.title'),
            description: i18n.t('tip.hightest')
          })
        } else {
          this.detailHeight += 1
          this.showDetails(this.detailHeight)
        }
      }
    },
    async prevBlock () {
      if (this.detailHeight <= 1) {
        this.$notification.info({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.lowest')
        })
      } else {
        this.detailHeight -= 1
        this.showDetails(this.detailHeight)
      }
    },
    onSearch (value) {
      if (value === '') {
        this.$notification.error({
          message: i18n.t('tip.title'),
          description: i18n.t('tip.empty_hight')
        })
      } else {
        this.height = {height: value}
        this._search(this.height)
      }
    },
    async _search (params = {}) {
      this.loading = true
      const result = await searchBlock(params)
      if (result.data.success) {
        if (result.data.count === 0) {
          this.nodata = true
        }
        this.loading = false
        this.data = []
        this.data.push(result.data.block)
        this.pagination.total = 1
      }
      this.loading = false
    },
    async _getTableLists (params = {limit: 10, orderBy: 'height:desc'}) {
      this.loading = true
      const result = await blocks(params)
      if (result.data.success) {
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
        limit: pagination.pageSize,
        offset: pagination.pageSize * (pagination.current - 1),
        orderBy: 'height:desc'
      })
    }
  },
  components: {
    'no-data': noData

  }
}
</script>
<style lang="less" scoped>
.block-scan{
  background: #fff;
  border-radius: 2px;
  padding: 20px 10px;
  .search{
    margin-bottom: 20px;
  }
  .table{
    position: relative;
  }

}
.detail-foot{
    text-align: center!important;
  }
  .popDetail{
    .title {
      font-size: 18px;
      color: #c3c3c3;
      text-align: center;
      margin-bottom: 20px;
    }
    .input {
      font-size: 16px;
      height: 36px;
      line-height: 36px;
    }
    .input label {
      display: inline-block;
      width: 120px;
      text-align: right;
      color: #343434;
    }
  }
@media (max-width:800px){
  .popDetail{
    .phone-input{
      height: 100px;
      margin-bottom: 5px;
    }
    .previousBlock  label{
      width: 150px!important;
    }
    .input{
      display: block;
        label {
          text-align: left;
          width: 100px;
        }
        .long{
          width: 340px;
        }
        span{
          display: inline-block;
        }
    }
  }
}
</style>
