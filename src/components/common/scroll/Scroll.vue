@<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>  
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default(){
        return false
      }
    },
  },
  data(){
    return {
      scroll:null
    }
  },
  //写在mounted函数里，不要写在created函数，不然拿不到dom
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      // home里面的按钮失效，需要加上scroll里面的click：true
      click:true,
      // 这里的参数不能写死，需要改造一下，可以通过props让父组件传递一个值
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', position => {
      // 通过自定义事件传出去
      this.$emit('croll',position)
    })
    //监听上拉加载需要在BScroll里面添加属性pullUpLoud
    this.scroll.on('pullingUp', () => {
      // console.log('jiazi');
      //需要传递布尔值，然后把监听的上拉在传递过去
      this.$emit('pullUpLoad')
    })
  },
  methods:{
    scrollTo(x,y,time){
      // 这里判断scroll是否加载完成，可能scroll没有加载完，就调用就会报错
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      //这里可以看到调用的次数
      // console.log('-----');
      this.scroll && this.scroll.refresh()
    },
    scrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>