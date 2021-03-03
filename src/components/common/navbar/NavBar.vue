<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style>
  .navbar {
    height: 44px;
    line-height: 44px;
    display: flex;
    z-index: 9;

    /* 在原生js中需要加上，在BScroll里面不需要 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0; */
  }
  .left,.right {
    width: 60px;
    /* background-color: aqua; */
}
  .center {
    flex: 1;
    /* background-color: bisque; */
    text-align: center;
  }
</style>