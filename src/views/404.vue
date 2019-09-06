<template>
  <div style="height:700px;">
    <div class="noFound">
      <div>
         <img src="../assets/images/404.svg" alt="">
      </div>
        <ul class="noFound-right">
          <li class="title">404</li>
          <li class="des">{{$t('no_data.p')}}</li>
          <router-link class="btn" tag="li" to="/">{{$t('no_data.returnBtn')}}</router-link>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.noFound{
  display: flex;
  height: 100%;
  justify-content:center;
  align-items: center;
}
.noFound .noFound-right{
  margin-left: 122px;
}
.noFound .title{
  letter-spacing: -3px;
  color: rgba(75, 80, 93, 1);
  font-size: 100px;
  line-height: 150%;
  text-align: left;
  font-weight: bold;
}
.noFound .des {
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
}
.noFound .btn{
  width: 88px;
  height: 32px;
  left: 747px;
  top: 621px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(24, 144, 255, 1);
  border-radius: 4px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  margin-top: 16px;
}
</style>
