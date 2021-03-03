<template>
  <div class='cart'>
     <nav-bar class='cart-nav'>
       <!-- 这里是一个插销 -->
       <div slot='center'>购物车({{length}})</div>
     </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
    name: "Cart",
    components:{
      NavBar,
    },
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }

      //使用辅助函数mapGetters
      // 数组模式， 可以把getters里面的函数直接拿到计算属性里面用，不需要在创建一个函数调用
      // ...mapGetters(['cartLength'])

      // 对象模式， 可以把getters里面的函数改名
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
