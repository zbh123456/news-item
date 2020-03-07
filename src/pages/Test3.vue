<template>
  <div class="test3">
     <test3 v-if="comment.parent" :comment="comment.parent"></test3>
     <p>{{comment.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'test3',
  props: {
    comment: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
 .test3{
    p {
      border-bottom: 1px solid #000;
    }
 }
</style>
