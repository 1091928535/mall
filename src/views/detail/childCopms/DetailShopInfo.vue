<template>
  <div class="shop-info">
    <div class="shop-info-top">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-info-btm">
      <div class="shop-info-btm-l">
        <div class="shop-info-btn-l-sells">
          <div>{{shop.sells | sellCountFilter}}</div>
          <div>总销量</div>
        </div>
         <div class="shop-info-btn-l-goods">
          <div>{{shop.goodsCount}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-info-btm-r">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="shop-info-btn-r-score"  :class="{scoreBetter:item.isBetter}">{{item.score}}</td>
            <td class='shop-info-btn-r-score' :class="{scoreBetter:item.isBetter}">{{item.isBetter ? '高' : '低'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-shop">
      <div>
        进店逛逛
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props:{
    shop:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    sellCountFilter:function (value) {
      if(value < 10000) {
        return value
      }
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style>
.shop-info-top {
  padding-left: 19px;
}
.shop-info-top span {
  font-size: 14px;
}
.shop-info-top img{
  width: 45px;
  border: 1px solid #eee;
  border-radius: 50%;
  vertical-align: -37px;
  margin: 20px 10px 20px 0;
}
.shop-info-btm-l,.shop-info-btm-r {
  display: inline-block;
}
.shop-info-btn-r-score {
  color: #5ea732;
}
.scoreBetter {
  color: #f13e3a;
}
.shop-info-btm {
  display: flex;
}
.shop-info-btm-r td {
  flex: 1;
  padding: 2px 5px;
  font-size: 12px;
}
.shop-info-btm-r {
  height: 100%;
}
.shop-info-btm-r table {
  height: 100%;
  margin-left: 23px;
}
.shop-info-btm-l {
  padding-top: 6px;
  height: 65px;
  /* line-height: 65px; */
  width: 50%;
  text-align: center;
  /* font-weight: 800; */
  color: #000;
}
.shop-info-btn-l-sells,.shop-info-btn-l-goods{
  /* margin-top: 10px; */
  width: 50%;
  display: inline-block;
}
.shop-info-btn-l-sells div:nth-child(2),.shop-info-btn-l-goods div:nth-child(2){
  font-size: 12px;
  font-weight: normal;
  margin-top: 5px;
}
.shop-info-btn-l-goods {
  border-right: 1px solid #ccc;
}
.enter-shop {
  margin: 0 5px;
  height: 50px;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
}
.enter-shop div{
  margin: 0 auto;
  text-align: center;
  width: 100px;
  height: 24px;
  line-height: 24px;
  background-color: #eee;
  border-radius: 8px;
  font-size: 12px;
}
</style>