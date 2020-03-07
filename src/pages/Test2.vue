<template>
  <div class="test2">
    我是test2组件
    <test3 :comment="comment"></test3>
  </div>
</template>

<script>
import Test3 from 'pages/Test3.vue'
export default {
  components: {
    Test3
  },
  data () {
    return {
      comment: {
        id: 4,
        content: '我是四楼, 嘎嘎, 自己动手丰衣足食',
        parent: {
          id: 3,
          content: '我是三楼, 你们还有火锅吃, 我都吃土好几个礼拜了',
          parent: {
            id: 2,
            content: '我是二楼, 我今天吃的火锅',
            parent: {
              id: 1,
              content: '我是一楼, 你今天吃了啥?',
              parent: null
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .test3{
   border: 1px solid #000;
   border-bottom:none;
 }
</style>
