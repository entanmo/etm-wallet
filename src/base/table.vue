<template>
         <div class="event">
            <table width=100% border="1" cellspacing="0" cellpresumeing="0" v-show="true">
                <thead class="table_th">
                    <th>序号</th>
                    <th>ID</th>
                    <th>头像</th>
                    <th>姓名</th>
                    <th>学历</th>
                    <th>级别</th>
                    <th>调岗后区域</th>
                    <th>调岗类型</th>
                    <th>调岗后部门/汽保站</th>
                    <th>调岗后基础工资</th>
                    <th>调岗后岗位工资</th>
                    <th>调岗后岗位</th>
                    <th>调岗日期</th>
                    <th>操作</th>
                </thead>
                <tbody class="table_tb">
                    <tr v-for="(item, index) in beforeConfirm" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.YGBM}}</td>
                        <td><img class="m_img" :src="item.faddr_Img ? item.faddr_Img : defaultAvator(item.Sex)" /></td>
                        <td>{{item.YGName}}</td>
                        <td>{{item.EducateLevel}}</td>
                        <td>{{item.GwLevel}}</td>
                        <td>{{item.NewGwArea}}</td>
                        <td>{{item.ChangeType===0?"部门调动":item.ChangeType===1?"职位调动":"区域/汽保站调动"}}</td>
                        <td>{{item.NewDeptName}}</td>
                        <td>{{item.NewBaseSalary}}</td>
                        <td>{{item.NewGwSalary}}</td>
                        <td>{{item.NewGwName}}</td>
                        <td>{{item.ChangeDate.slice(0, 10)}}</td>
                        <td>
                            <div class="operate">
                                <div class="more">
                                    <a @click="seeDetail(index)">查看详情</a>
                                </div>
                                <div class="enter">
                                    <a @click="confirmPromotion(item)">确定</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <loading v-show="!beforeConfirm.length && !cannotfind"></loading>
            <no-data v-show="!beforeConfirm.length && cannotfind"></no-data> -->
        </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
      }
    }
  }
</script>