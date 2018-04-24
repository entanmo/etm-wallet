<template>
  <div class="w">
    <!-- table -->
      <div class="event" >
        <table width=100% border="0" cellspacing="0" cellpresumeing="0" v-show="tableData.length">
            <thead class="table_th">
                <th>图标</th>
                <th>名称</th>
                <th>应用描述</th>
                <th>接收者</th>
                <th>类型</th>
                <th>余额详情</th>
                <th>源码</th>
            </thead>
            <tbody class="table_tb">
                <tr v-for="(item, index) in tableData" :key="index">
                    <td><img src="../../assets/images/logo.png" alt=""></td>
                    <td>{{item.waimai}}</td>
                    <td>{{item.miaoshu}}</td>
                    <td>{{item.recipientId}}</td>
                    <td>{{item.type}}</td>
                    <td><a href="javascript:;" style="color: #399bff;">详情</a></td>
                    <td><a href="javascript:;" style="color: #399bff;">点击下载</a></td>
                </tr>
            </tbody>
        </table>
        <no-data v-show="!tableData.length"></no-data>
      </div>
      <page v-show="PageTotal > 1" :PageTotal="PageTotal" :routeName="routeName" @renderDiff="renderDiff"></page>
  </div>
</template>

<script>
import Page from "../page";
import NoData from "../nodata";
export default {
  components: {
    Page,
    NoData
  },
  data () {
    return {
      PageTotal: 1,
      routeName: "",
      tableData: [
        // {
        //   waimai: "2016-05-02",
        //   recipientId: "王小虎",
        //   miaoshu: "上海市普陀区金沙江路 1518 弄",
        //   type: 1
        // },
        // {
        //   waimai: "2016-05-04",
        //   recipientId: "王小虎",
        //   miaoshu: "上海市普陀区金沙江路 1517 弄",
        //   type: 1
        // },
        // {
        //   waimai: "2016-05-01",
        //   recipientId: "王小虎",
        //   miaoshu: "上海市普陀区金沙江路 1519 弄",
        //   type: 1
        // },
        // {
        //   waimai: "2016-05-03",
        //   recipientId: "王小虎",
        //   miaoshu: "上海市普陀区金沙江路 1516 弄",
        //   type: 1
        // }
      ]
    }
  },
  methods: {
    renderDiff() {
      
    }
  }
}
</script>

<style scoped>
.w {
  padding: 10px;
}
</style>