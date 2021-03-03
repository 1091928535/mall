@<template>
  <nav-bar>
    <div slot="left" class="detailItemTop" @click="DetailImgClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="detailItemCenter" >
    <div  
    v-for="(item,index) in titles"
    :class="{detailItemClass:index===currentIndex}"
    @click="detailItemClick(index)" :key='index'
    >{{item}}
    </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: { 
    NavBar 
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    detailItemClick(index){
      this.currentIndex = index
      // 1.做联动效果，先把index的值传递到父组件
      this.$emit('detailItemClick', index)
  },
  DetailImgClick(){
    this.$router.back()
  }
  }
}
</script>

<style>
.detailItemCenter {
  display: flex;
  font-size: 13px;
}
.detailItemCenter div {
  flex: 1;
}
.detailItemTop {
  text-align: center;
}
.detailItemTop img {
  margin-top: 10px;
}
.detailItemClass {
  color: var(--color-tint);
}
</style>