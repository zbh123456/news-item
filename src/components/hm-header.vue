<template>
  <div class="hm-header">
     <div class="item">
       <div class="left" @click="$router.go(-1)">
         <slot name="left"><i class="iconfont iconjiantou2"></i></slot>
       </div>
       <div class="center">
         <slot></slot>
       </div>
       <div class="right">
         <slot name="right"></slot>
       </div>
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .hm-header{
    .item{
      display:flex;
      height:50px;
      padding:10px;
      line-height:30px;
      text-align:center;
      font-weight:700;
      font-size:14px;
      border-bottom: 1px solid #ccc;
      .left,.right{
        width:30px;
        height:30px;
      }
      .center{
        flex:1;
      }
    }
  }
</style>
