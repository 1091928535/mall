<template>
  <div class="user-comment" v-if="Object.keys(commentInfo).length !==0">
    <div class="comment-head">
      <div>用户评价</div>
      <div>更多>></div>
    </div>
    <div class="comment-text">
      <img :src="commentInfo.user.avatar" alt="" class="comment-text-img">
      <span class="comment-text-name">{{commentInfo.user.uname}}</span>
      <p class="conmment-text-p1" v-if="Object.keys(commentInfo.content).length !==0">{{commentInfo.content}}</p>
      <p class="conmment-text-p2"><span>{{commentInfo.created | getTime}}&nbsp;&nbsp;</span>{{commentInfo.style}}</p>
      <div v-for="(item, index) in commentInfo.images" :key="index" class="conmment-text-images">
        <img :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailUserComments',
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    getTime(value){
      const date = new Date(value * 1000)
      const Y = date.getFullYear()
      const M = date.getMonth()
      const D = date.getDate()
      return Y + '-' + M + '-' + D 
    }
  }
}
</script>

<style scoped>
.user-comment {
  padding: 0px 15px;
  border-top: 2px solid #eee;
}
.comment-head {
  font-size: 13px;
  height: 50px;
  color: #000;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}
.comment-head div:nth-child(1){
  float: left;
}
.comment-head div:nth-child(2){
  float: right;
}
.comment-text {
  margin-top: 10px;
}
.comment-text-img {
  width: 45px;
  border-radius: 50%;
  vertical-align: middle;
}
.comment-text-name {
  font-size: 14px;
  margin-left: 10px;
  color: #000;
}
.conmment-text-p1 {
  padding: 5px;
  color: #666;
  font-size: 12px;
}
.conmment-text-p2 {
  padding: 5px;
  color: #888;
  font-size: 12px;
}
.conmment-text-images {
  margin-top: 5px;
  margin-left: 2px;
  display: inline-block;
  width:25%;
}
.conmment-text-images img {
  width: 100%;
}
</style>
