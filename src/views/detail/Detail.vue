<template>
  <div class="detail">
     <detail-item @detailItemClick='detailItemClick' ref='detailItem'></detail-item>
     <scroll class="detail-content" 
     ref="scroll" 
     @croll='detailScroll'
     :probeType='3'
     >
      <detail-swiper :topImg="topImg"></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'/>
      <detail-goods-param :paramInfo='paramInfo' ref='params'/>
      <detail-user-comments :commentInfo='commentInfo' ref='commentInfos'/>
      <goods-list :goods='recommend' ref='recommends'/>
     </scroll>
     <detail-bottom-bar @addToCart='addToCart'/>
     <back-top @click.native="backClick" v-show="isshow"></back-top>
  </div>
</template>

<script>
import DetailItem from './childCopms/DetailItem.vue'
import DetailSwiper from './childCopms/DetailSwiper.vue'
import DetailBaseInfo from './childCopms/DetailBaseInfo.vue'
import DetailShopInfo from './childCopms/DetailShopInfo.vue'
import DetailGoodsInfo from './childCopms/DetailGoodsInfo.vue'
import DetailGoodsParam from './childCopms/DetailGoodsParam.vue'
import DetailUserComments from './childCopms/DetailUserComments.vue'
import DetailBottomBar from './childCopms/DetailBottomBar.vue'
import GoodsList from 'components/content/goodsList/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import {debounce} from 'common/debounce/debounce.js'
import {Mixin, BackTopMixin} from 'common/mixin/mixin.js'

import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

export default {
  //这里的name在keep-alive里面的exclude属性会用到！！
    name:'Detail',
    components:{
      DetailItem,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailGoodsParam,
      DetailUserComments,
      GoodsList,
      DetailBottomBar,
    },
    data(){
      return{
        iid:null,
        topImg:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommend: [],
        themeTopYs: [],
        getThemeDebounce: null,
        positionY:0,
        positionCurrent:0,
      }
    },
    mixins:[Mixin, BackTopMixin],
    created(){
      // console.log(this.$route.params);
      // 通过$route.params获取iid
      this.iid = this.$route.params.iid

      getDetailData(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result
        // console.log(data);
        // 1.获取轮播图数据
        this.topImg = data.itemInfo.topImages

        // 2.获取商品信息数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        
        // 3.获取购物信息数据
        this.shop = new Shop(data.shopInfo)

        // 4.获取宝贝详情信息
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
     
        // 6.获取评论的信息
        if(data.rate.list !== undefined ) {
          // console.log(data.rata.list);
          if(this.commentInfo !== 0) {
            this.commentInfo = data.rate.list[0]
            // console.log(this.commentInfo);
          }
        }else if(data.rate.list == undefined){
          console.log(this.commentInfo);
        }
     })

      getRecommend().then(res => {
        this.recommend = res.data.data.list
      })

      // // 2.获取元素的高度  created里面获取不到DOM，因为DOM还没渲染出来
      // this.themeTopYs.push(0)
      // console.log(this.themeTopYs);
      // console.log(this.$refs.params);
      // this.themeTopYs.push()    

      this.getThemeDebounce = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)  
        
        // 这里的数据有的没有，需要判断一下
        if(Object.keys(this.commentInfo).length == 0){
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop) 
        }else if(Object.keys(this.commentInfo).length !== 0){
           this.themeTopYs.push(this.$refs.commentInfos.$el.offsetTop) 
        }
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        
        // 可以在高度后面设置一个无穷大的值判断，就不需要另外判断了
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)
    },
    methods:{
      imageLoad(){
        // 需要设置一个防抖函数比较好，有个bug但是不常出来
        // 使用混入可以直接调用混入里面的防抖函数
        this.refresh()
        // 如果等图片加载完调用的话就会执行多次，需要设置一个防抖函数
        // console.log('---------');
        this.getThemeDebounce()
      },
      detailItemClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],50)
      },
      detailScroll(position){
        this.positionY = -(position.y)
        let themeLength = this.themeTopYs.length
        // 因为多添加了一个无穷大值 所以这里最后一个值不需要循环，长度-1
        for(let i = 0; i< themeLength-1; i++) {
          // 判断是需要加上(),这里并且和或者顺序容易混乱
        //   if(this.positionCurrent !== i && ((i<themeLength-1 && this.positionY >= this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1]) || (i === themeLength-1 && this.positionY >= this.themeTopYs[i]))){
        //     this.positionCurrent = i
        //     // console.log(i);
        //     this.$refs.detailItem.currentIndex = this.positionCurrent
        //   }

        // 上面的判断条件过于繁琐，使用hack简化一下
          if(this.positionCurrent !== i && (i<themeLength-1 && this.positionY >= this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1] )){
            this.positionCurrent = i
            // console.log(i);
            this.$refs.detailItem.currentIndex = this.positionCurrent
          }
        }
        this.BackTopShow(position)
      },
      addToCart(){
        //创建一个数组
        const product = {}
        //获取到需要的数据然后放到对象中
        product.imgae = this.topImg[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 这里传递到actions里面就不是commit了 是dispatch,传递的函数必须是actions里面的函数名
        this.$store.dispatch('addCart',product)
      }
    },
    //这里没有缓存deactivated执行不了，需要使用destroyed
    // deactivated(){
    // this.$bus.$on('imgLoad',this.itemImage)
    // },
    destroyed(){
      this.$bus.$off('imgLoad',this.itemImage)
    },
    mounted(){
      // 2.获取元素的高度  这里面的图片没有加载完也获取不到正确是值
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)   
      // this.themeTopYs.push(this.$refs.commentInfos.$el.offsetTop)   
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs);
    },
    updated(){
      // 2.获取元素的高度  
      // 每次获取的时候都会在后面添加一个数组，所以需要每次获取的时候，都让themeTopYs重新为空数组
      // 需要等到图片都加载完 才能获取到正确的数据
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)   
      // this.themeTopYs.push(this.$refs.commentInfos.$el.offsetTop)   
      // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      // console.log(this.themeTopYs);
    }
}
</script>

<style>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-content {
  height: calc(100% - 44px);
}
</style>