<template>
<!-- 这里必须加上v-if，因为渲染是这里dom里面的{{}}为空数据还没请求过来，要等goods对象的数据请求过来后才能渲染 -->
  <div class="base-info margin-left-right " v-if="Object.keys(goods).length !==0">
    <div class="info-title">
      <span>{{goods.title}}</span>
    </div>
    <div class="info-price">
      <span class="info-new">{{goods.newPrice}}</span>
      <span class="info-old">{{goods.oldPrice}}</span>
      <span class="info-dis">{{goods.discount}}</span>
    </div>
    <div class="info-columns">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-serve">
      <span class="serve-left" v-for="index in goods.services.length-2" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style>
.info-title {
  color: #000;
  margin-top: 5px;
}
.info-price {
  height: 40px;
  line-height: 40px;
}
.info-new {
  color: var(--color-high-text);
  font-size: 18px;
}
.info-old {
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 5px;
}
.info-dis {
  width: 50px;
  /* height: 22px; */
  margin-left: 5px;
  /* display:inline-block; */
  background-color: var(--color-high-text);
  border-radius: 8px;
  color: #fff;
  padding: 0px 4px;
  font-size: 14px;
  vertical-align: 2px;
  
  /* font-weight: 800; */
}
.margin-left-right {
  margin: 0 5px;
}
.info-columns {
  height: 20px;
  font-size: 12px;
  display: flex;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.info-columns span {
  flex: 1;
}
.info-columns span:nth-child(1){
  text-align: left;
}
.info-columns span:nth-child(3){
  text-align: right;
}
.info-serve {
  display: flex;
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #eee;
}
.info-serve img {
  width: 10px;
}
.info-serve span {
  flex: 1;
}
.info-serve span:nth-child(1){
  text-align: left;
}
.info-serve span:nth-child(2){
  text-align: right;
}
</style>