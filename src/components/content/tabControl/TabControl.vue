@<template>
  <div class="tabcontrol">
    <!-- // 动态绑定事件需要绑定在父盒子上，子盒子通过遍历出来可能没有响应或者报错 -->
    <div v-for="(item,index) in title" :class="{isActive:index === tabcontrol}" @click="tabClick(index)" :key='index'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tabcontrol:0
    }
  },
  props:{
    title:{
      type:Array,
      title(){
        return []
      }
    }
  },
  methods:{
    tabClick(index){
      this.tabcontrol = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tabcontrol{
    display: flex;
    background-color: #fff;
  }
  .tabcontrol div {
    flex: 1;
    text-align: center;
    height: 45px;
    line-height: 45px;
  }
  .tabcontrol div span {
    padding-bottom: 5px;
  }
  .isActive {
    color: var(--color-high-text);
  }
  .isActive span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>