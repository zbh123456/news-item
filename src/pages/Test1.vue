<template>
  <div class="test1">
    <h1>我是test1组件</h1>
    <div class="info">
      <h3>我是标题</h3>
      <p>我可以自己调用自己</p>
    </div>
    <test1 :index="index - 1" v-if="index > 1"></test1>
  </div>
</template>

<script>
export default {
  name: 'test1',
  props: {
    index: Number
  }
}
</script>

<style lang="scss" scoped>
  .test1{
      h1{
        font-size:16px;
        font-weight:700;
      }
    .info{
      border: 1px solid #000;
      h3{
        font-size:14px;
        font-weight:700;
      }
    }
  }
</style>
