<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recommendDiv" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </a>
    </div>
  </div>  
</template>

<script>
export default {
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style>
  .recommend {
    display: flex;
    text-align: center;
    padding: 15px 0 15px;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommendDiv {
    flex: 1;
  }
  .recommendDiv img {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>