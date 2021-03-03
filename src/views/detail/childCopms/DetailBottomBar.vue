<template>
  <div class="bottom-bar"> 
      <div class="bottom-bar-l">
        <div class="bottom-bar-l-customer">
          <div></div>
          <span>客服</span>
        </div>
         <div class="bottom-bar-l-customer">
          <div></div>
          <span>店铺</span>
        </div>
         <div class="bottom-bar-l-customer">
          <div></div>
          <span>收藏</span>
        </div>
      </div>
      <div class="bottom-bar-r">
        <div class="bottom-bar-r-l" @click="addToCart">加入购物车</div>
        <div class="bottom-bar-r-r">立即付款</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods:{
    addToCart(){
      this.$emit('addToCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  background-color: #fff;
  width: 100%;
  height: 49px;
  position: fixed;
  text-align: center;
  bottom: 0;
  z-index: 999999;
}
.bottom-bar-l,.bottom-bar-r {
  width: 40%;
  height: 100%;
  float: left;
}
.bottom-bar-r {
  width: 60%;
  float: right;
}
.bottom-bar-l {
  display: flex;
  padding: 8px;
}
.bottom-bar-l-customer {
  flex: 1;
  font-size: 12px;
  height: 100%;
}
.bottom-bar-l-customer div{
  width: 20px;
  height: 20px;
  background: url("~assets/img/detail/detail_bottom.png");
  background-size: 100%;
  margin-left: 9px;
}

.bottom-bar-l-customer:nth-child(1) div{
  background-position: 0 -48px;
}
.bottom-bar-l-customer:nth-child(2) div{
  background-position: 0 -89px;
} 

.bottom-bar-r {
  padding: 8px 8px;
}
.bottom-bar-r div {
  width: 50%;
  height: 100%;
  font-size: 13px;
  color: #fff;
}
.bottom-bar-r-l {
  float: left;
  background-image: linear-gradient(left,#fdda32,#ff9000);
  border-radius: 20px 0 0 20px;
  padding: 8px 6px;
}
.bottom-bar-r-r {
  background-image: linear-gradient(right,#ff9000,#ff5000);
  float: right;
  border-radius:0 20px 20px 0;
  padding: 8px 6px;
}
</style>