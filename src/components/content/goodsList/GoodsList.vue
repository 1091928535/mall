@<template>
  <div class="goodslist">
      <goods-list-item v-for="(item, index) in goods" 
      :item='item' 
      class="goodslistitem" 
      :key="index">
      </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  components: { GoodsListItem },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.goodslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
  padding-bottom: 51px;
}
</style>