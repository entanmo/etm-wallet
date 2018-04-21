<template>
  <div class="w">
    <div class="h">
      <div class="s">
        <input type="text" placeholder="搜索">
        <a href="javascript:;" @click="search">
          <i class="icon icon-search"></i>
        </a>
      </div>
    </div>
    <!-- table -->
      <el-table :data="tableData" @row-click="showDetail" style="width: 100%;cursor:pointer;">
      <el-table-column
        prop="date"
        label="高度">
      </el-table-column>
      <el-table-column
        prop="name"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="交易">
      </el-table-column>
      <el-table-column
        prop="name"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="name"
        label="费用">
      </el-table-column>
      <el-table-column
        prop="name"
        label="奖励">
      </el-table-column>
      </el-table>
    <!-- popout -->
    <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">区块详情</p>
      <div class="input">
        <label>ID：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>版本：</label>
        <span>0</span>
      </div>
      <div class="input">
        <label>时间：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>高度：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>上一块：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>交易数：</label>
        <span>0</span>
      </div>
      <div class="input">
        <label>交易总额：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>奖励：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>摘要：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
      <div class="input">
        <label>生产者：</label>
        <span>0</span>
      </div>
      <div class="input">
        <label>生产者公钥：</label>
        <span>dsfsdfsdgrefgdsfgd</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      showPop: false,
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]  
    }
  },
  methods: {
    search() {

    },
    showDetail(row) {
      console.log(row)
      this.showPop = true
      Bus.$emit('showMask', true)
    },
    hidePopout() {
      this.showPop = false
      Bus.$emit('showMask', false)      
    }
  }
}
</script>

<style scoped>
.w {
  padding: 0 24px;
}
.h {
  background: #fff;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e5e5e5;
}
.s {
  margin-left: 10px;
  position: relative;
}
.s input {
  width: 280px;
  height: 36px;
  border: 1px solid #e5e5e5;
  padding-left: 10px;
  border-radius: 3px;
}
.icon-search {
  display: inline-block;
  background-size: 20px 20px;
  height: 20px;
  width: 20px;
  position: relative;
  top: 5px;
  right: 30px;
  background: url(../assets/images/m_sear.png) center center no-repeat;
}
/*弹框*/
.popout {
  width: 700px;
  height: 460px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
}
.close {
  font-size: 36px;
  text-align: right;
}
.close span {
  display: inline-block;
  width: 47px;
  text-align: center;
  cursor: pointer;
}
.title {
  font-size: 18px;
  color: #c3c3c3;
  text-align: center;
  margin-bottom: 20px;
}
.input {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
}
.input label {
  display: inline-block;
  width: 120px;
  text-align: right;
  color: #343434;
}
.input span {

}
</style>