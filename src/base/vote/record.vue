<template>
  <div class="w">
    <div class="head flex">
        <p>共500人</p>
        <button>删除</button>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="rank"
      label="排名"
      width="55">
    </el-table-column>
    <el-table-column
      prop="name"
      label="受托人"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="生产率"
      width="100">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="生产块数"
      width="100">
    </el-table-column>
    <el-table-column
      prop="name"
      label="得票率"
      width="100">
    </el-table-column>
  </el-table>
  <!-- popout -->
  <div class="popout" v-show="showPop">
      <div class="close"><span @click="hidePopout">×</span></div>
      <p class="title">投票给受托人</p>
      <p class="care">请确认您的选择与投票，每张票最多可同时投33人</p>
      <div class="input-list">
      <div class="input-line" v-for="(item,index) in multipleSelection" :key="index">
        <div class="input clearfix">
        <span class="fl">{{item.name}}</span>
        <span class="gre fr">{{item.address}}</span>
        </div>
      </div>
      </div>
      <div class="set-btm">
        <div class="confirm"><button>提交</button></div>
        <p class="tip">投票需支付0.01Mole</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
      return {
        showPop: false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          rank: 1
        }],
        multipleSelection: []
      }
    },
  methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
        
      },
      vote() {
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
.gre {
    color: #1890ff;
}
.head {
    height: 60px;
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
}
.head p {
    font-size: 18px;
}
.head button {
    width: 120px;
    height: 36px;
    background: #169bd5;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
}
/*弹框*/
.popout {
  width: 560px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  z-index: 1000;
  max-height: 500px;
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
  font-size: 26px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
}
.care {
  font-size: 16px;
  color: #afafaf;
  text-align: center;
  margin-bottom: 10px;
}
.input-list {
    max-height: 260px;
    overflow: auto;
}
.input-line {
  text-align: center;
}
.input {
  width: 480px;
  height: 32px;
  line-height: 32px;
  border: 1px solid #d9d9d9;
  padding: 0 6px;
  border-radius: 3px;
  display: inline-block;
}
.popout .confirm {
  text-align: center;
  margin: 20px 0;
}
.popout .confirm button {
  width: 64px;
  height: 40px;
  background: #169bd5;
  border-radius: 6px;
  color: #fff;
  line-height: 40px;
}
.popout .tip {
  text-align: center;
}
.set-btm {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
</style>