<template>
  <div class="w">
    <div class="head flex">
        <p>共500人</p>
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
      label="用户名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>    
    <el-table-column
      prop="name"
      label="权重">
    </el-table-column>
  </el-table>
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
</style>