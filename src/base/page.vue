<template>
<div class="page-box" v-if="showPage">
    <ul class="pag">
        <li class="first-page" @click="getData(0)" v-show="PageTotal > 5">
            <a href="javascript:;">首页</a>
        </li>
        <li class="prev"  @click="flagP && getData(prev)" :class="{disabled: page === 0}" >
            <a href="javascript:;" >&nbsp;</a>
        </li>
        <li v-show="pageTotal > 5 && page > 2">
            <a href="javascript:;">...</a>
        </li>
        <li v-for="(item,index) in pages" :key="index" :class="{active: page === item}" @click="getData(item)">
            <a href="javascript:;">{{item+1}}</a>
        </li>
        <li v-show="pageTotal > 5 && page < PageTotal - 5">
            <a href="javascript:;">...</a>
        </li>
        <li class="next" @click="flagN && getData(next)" :class="{disabled: page === PageTotal - 1}">
            <a href="javascript:;">&nbsp;</a>
        </li>
        <li class="last-page" @click="getData(PageTotal - 1)" v-show="PageTotal > 5">
            <a href="javascript:;">尾页</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  data () {
    return {
       page: 0,
       flagP: true,
       flagN: true,
       pages: [],
       stuffLists: []
    }
  },
  computed: {
      showPage() {  //是否显示分页
          return this.PageTotal > 1
      },
      prev() {  //上一页
          return this.page <= 0 ? 0 : this.page - 1
      },
      next() {  //下一页
          return this.page <= this.PageTotal - 1 ? this.page + 1 : this.PageTotal - 1
      },
      pageTotal() {  
          return this.PageTotal
      }
  },
  props: {
      PageTotal: {
          type: Number,
          default: 0
      },
      changeTable: {
          type: Boolean,
          default: true
      },
      routeName: {
          type: String,
          default: ""
      },
      data: {
          type: Object,
          default: () => {}
      },
      secondCode: {
          type: String,
          default: ''
      },
      active: {
          type: Number,
          default: 0
      },
      status: {
          type: String,
          default: "正常"
      },
  },
  created () {
    // Bus.$on('changeStuffList', (data) => {
    //     this.stuffLists = data
    // })  
  },
  methods: {
      getData(p) {
        this.$emit('renderDiff', p)
        // 改变page，实现分页样式的变化
        this.page = p
        // 边界情况左右按钮禁止点击
        this.page === 0 ? this.flagP = false : this.flagP = true
        this.page === this.PageTotal - 1 ? this.flagN = false : this.flagN = true
      },
  },
  watch: {
      
      active(newVal, oldVal) {
          this.page = 0
      },
      PageTotal(newVal, oldVal) {  //解决弱网络下分页问题
          this.pages = []
          let totalLength = newVal <= 5 ? newVal : 5
            for( let i = 0; i < totalLength; i++ ) {
                this.pages.push(i)
            }
      },
      page(newVal, oldVal) {
          if( this.page + 5 <= this.PageTotal ) {
              this.pages = []
              if( this.page <= 2 ){
                  for( let i = 0; i < 5; i++ ) {
                    this.pages.push(i)
                  }
              }else {
                  for( let i = this.page - 2; i < this.page + 3; i++ ) {
                    this.pages.push(i)
                  }
              }
          }else {
              this.pages = []
              if( this.PageTotal <= 5 ) {
                  for( let i = 0; i < this.PageTotal; i++ ) {
                    this.pages.push(i)
                  }
              }else {
                  for( let i = this.PageTotal-5; i < this.PageTotal; i++ ) {
                    this.pages.push(i)
                  }
              }
          }   
      }
  }
}
</script>

<style scoped>

</style>