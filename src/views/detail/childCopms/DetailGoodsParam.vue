<template>
  <div class="goods-param">
      <table v-for="(table, index) in paramInfo.sizes" :key="index" class="goods-param-size">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      <table class="goods-param-info">
        <tr v-for="(info, index) in paramInfo.infos" :key="index">
          <td class="info-key">{{info.key}}</td>
          <td class="info-value">{{info.value}}</td>
        </tr>
      </table>
  </div>
</template>

<script>

export default {
 name: 'DetailGoodsParam',
 props:{
   paramInfo:{
     type:Object,
     default(){
       return {}
     }
   }
 }
}
</script>

<style scoped>
.goods-param {
  padding: 20px 15px;
}
.goods-param-size{
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
}
.goods-param-size tr{
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  /* padding-left: 20px; */
}
.goods-param-size td {
  flex: 1;
}
.goods-param-info {
  width: 100%;
  font-size: 12px;
  /* text-align: center; */
}
.goods-param-info tr {
  /* height: 40px; */
  /* line-height: 40px; */ 
  border-bottom: 1px solid #ccc;
}
.info-key {
  /* flex: 2; */
  width: 20%;
}
.info-value {
  padding: 10px 0;
  color: var(--color-tint);
}
</style>