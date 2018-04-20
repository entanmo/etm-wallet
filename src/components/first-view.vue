<template>
  <div class="w">
    <div class="info">
        <ul class="flex">
            <li>
              <p>我的余额</p>
              <p>44444 Mole</p>
            </li>
            <li>
              <p>最后出块高度</p>
              <p>35346456</p>
            </li>
            <li>
              <p>版本信息</p>
              <p>V1.4</p>
            </li>
        </ul>
    </div>
    <div class="transaction">
      
    </div>
  </div>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style scoped>
.w {
    padding: 0 24px;
}
.info {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: #fff;
  border-radius: 3px;
  padding-top: 20px;
  box-sizing: border-box;
}
.info ul {
  height: 100%;
}
.info li {
  width: 33.3%;
  height: 100%;
  text-align: center;
  line-height: 30px;
  /* flex-direction: column; */
}
.info li > p {
  border-right: 1px solid #e9e9e9;
}
.info li:last-child > p {
  border-right: 0;
}
.info li > p:first-child {
  color: #8d8d8d;
  font-size: 14px;
}
.info li > p:last-child {
  color: #4b4b4b;
  font-size: 24px;
}
</style>


