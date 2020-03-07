<template>
  <div class="hm-floor">
    <hm-floor @reply="reply" :index="index-1" :commentList="commentList.parent" v-if="commentList.parent"></hm-floor>
    <div class="parent-comment">
      <span>{{index}}</span>
      <span>{{ commentList.user.nickname}}</span>
      <span>2小时前</span>
      <span class="fr" @click="reply(commentList.id,commentList.user.nickname)">回复</span>
       <p>{{ commentList.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    commentList: Object,
    index: Number
  },
  methods: {
    reply (id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
  .hm-floor{
    .parent-comment{
      padding:10px;
      border-bottom: 1px solid #ccc;
      span{
        margin-right:5px;
      }
      p{
        margin-top:10px;
      }
     }

  }
</style>
