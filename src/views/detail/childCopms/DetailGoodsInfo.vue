<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="goods-head">
      <span>宝贝详情</span>
    </div>
    <div class="goods-image">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
      :src="item" alt="" @load="imageLoad" :key="index">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetaileGoodsInfo',
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      this.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
.goods-head {
  font-size: 12px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #eee ;
}
.goods-head span{
  position: relative;
}
.goods-head span::after{
  content: '';
  display: inline-block;
  width: 50px;
  height: 1px;
  background-color: #eee;
  position: absolute;
  right: -60px;
  top: 50%;
}
.goods-head span::before{
  content: '';
  display: inline-block;
  width: 50px;
  height: 1px;
  background-color: #eee;
  position: absolute;
  left: -60px;
  top: 50%;
}
.goods-image img{
  width: 100%;
}
.goods-info {
  border-bottom: 1px solid #ccc;
}
</style>