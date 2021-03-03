<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 这里主要的思想：创建一个相同的tabcontrol然后让他覆盖原有的 -->
    <tab-control 
      :title="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabcontrol1"
      :class="{tabControlClass:true}" v-show="istabOffsetTop"></tab-control>
    <scroll ref="scroll" 
      :probeType='3' 
      @croll='contentScroll'
      :pull-up-load='true' @pullUpLoad='loadMore'
      >
       <!-- 不识别驼峰 -->
      <home-swiper 
      :banners='banners'
      @SwiperImgLoad='SwiperImgLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <featrue-view></featrue-view>
      <tab-control 
      :title="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabcontrol2"
      ></tab-control>
      <!-- //currentTab不需要加引号 -->
      <goods-list :goods="goods[currentTab].list"></goods-list>
      <!-- <div style="height:1000px"></div> -->
    </scroll>
    <!-- .native可以监听组件里面的事件 -->
    <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goodsList/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'


import HomeSwiper from './childComs/HomeSwiper'
import RecommendView from './childComs/RecommendView'
import FeatrueView from './childComs/FeatrueView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/debounce/debounce.js'
import {Mixin, BackTopMixin} from 'common/mixin/mixin.js'

export default {
  name: "Home",
  data(){
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentTab: 'pop',
      tabOffsetTop: 0,
      istabOffsetTop: false,
      savaY:0,
    }
  },
  mixins:[Mixin, BackTopMixin],
  components: { 
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatrueView,
    TabControl,
    GoodsList,
    Scroll,
  },
  // 用created生命周期函数，在完成后请求数据
  created(){
    // 这里调用的时候需要加上this
    this.getHomeMultidata()
    this.getHomeGoods2('pop')
    this.getHomeGoods2('new')
    this.getHomeGoods2('sell')
  },
  destroyed(){
    // console.log('destroyed');
  },
  activated(){
    // console.log('activated');
    // 进入时让scroll跳转
    this.$refs.scroll.scrollTo(0,this.savaY,0)
    // 多次点击后向下滚会出现直接跳转到顶的bug，每次回到的时候，重新刷新一下页面
    this.$refs.scroll.refresh()

  },
  deactivated(){
    // console.log('deavtivated');
    //离开时保存scroll.y的值
    this.savaY = this.$refs.scroll.scrollY()

    //在离开页面时删除imgload的监听
    this.$bus.$off('imgLoad',this.itemImage)
  },
  mounted(){
  },
  methods: {
    /* 
    
      事件监听函数

    */
    tabClick(index){
      switch (index) {
        case 0:
        this.currentTab = 'pop'
        break
        case 1:
        this.currentTab = 'new'
        break
        case 2:
        this.currentTab = 'sell'
        break
      }
      // 让tabcontrol组件里面的tabcontrol（就是传递过来的index值）等于index，就能把最新的index值赋值给两个组件
      this.$refs.tabcontrol2.tabcontrol = index;
      this.$refs.tabcontrol1.tabcontrol = index;
    },
    contentScroll(position){
      this.BackTopShow(position)
      this.istabOffsetTop = -(position.y) > this.$refs.tabcontrol2.$el.offsetTop
    },
    loadMore(){
      this.getHomeGoods2(this.currentTab)
    },
     SwiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
    },
    /* 
    
      网络请求函数

    */
    getHomeMultidata(){
       getHomeMultidata().then(res => {
      // 函数每次调用完就会被垃圾回收，所以需要存放
      // console.log(res);
      this.banners = res.data.data.banner.list
      this.recommends = res.data.data.recommend.list
    })
    },
    getHomeGoods2(type){
      let page = this.goods[type].page + 1;
      //这里的1不能写死
      getHomeGoods(type,page).then(res=>{   
        //res拿到后需要把数据给到pop里面的list数组
        // console.log(res);
        //这里的...是一个数组可以把多个数据追加到里面，还可以使用for循环遍历
        this.goods[type].list.push(...res.data.data.list)
        // for(let data of res.data.data.list) {
        //   // for in 循环
        //   // console.log(data.data.list[data]);
        //   //  this.goods[type].list.push(res.data.data.list[data])

        //   // for of 循环
        //   // console.log(data);
        //    this.goods[type].list.push(data)
        // }
        this.goods[type].page += 1;
        // 默认值传递一次，需要这里每次传递是调用一次
        this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tabControlClass {
  position: relative;
  z-index: 9;
}
</style>
