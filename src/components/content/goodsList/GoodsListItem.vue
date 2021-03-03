@<template>
  <div class="goodsLitsItem" @click="itemClick">
    <img :src="showImg" alt="" @load='imgLoad'>
    <div class="goodslistitem-div">
      <p>{{item.title}}</p>
      <span>{{item.price}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span>{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    item: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImg(){
      // ???这里的调换位置就会出错原因还未找到
      return this.item.image || this.item.show.img
    }
  },
  methods:{
    imgLoad(){
      this.$bus.$emit('imgLoad')
    },
    itemClick(){
      //监听图片获取id
      this.$router.push('/detail/' + this.item.iid)
    }
  }
}
</script>

<style>
  .goodsLitsItem{
    /* flex: 1; */
    width: 48%;
    font-size: 12px;
  }
  .goodsLitsItem img {
    width: 100%;
    border-radius: 5px;
    margin: 5px 0;
  }
  .goodsLitsItem div {
    text-align: center;
  }
  .goodsLitsItem div p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goodsLitsItem div span:first-of-type {
    color: var(--color-tint);
  }
  /* 不要给父盒子设置相对定位，要给span设置，不然后面的定位有偏差 */
  .goodslistitem span {
    position: relative;
  }
  .goodsLitsItem div span:first-of-type::after {
    content: '';
    width: 14px;
    height: 14px;
    /* background-color: pink; */
    position: absolute;
    top: 0;
    right: -16px;
    background: url("~assets/img/common/collect.svg")0 0/14px 14px;
  }
</style>