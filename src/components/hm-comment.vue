<template>
  <div class="hm-comment">
    <div class="follow-up">
      <div class="recycle">
        <div class="img-wrap">
          <img :src="commentList.user.head_img | fixUrl" alt="">
        </div>
        <div class="name">
          <p>{{commentList.user.nickname}}</p>
          <p>{{ commentList.create_date| time('YYYY-MM-DD hh:mm:ss') | second }}小时前</p>
        </div>
        <div class="answer" @click="reply(commentList.id,commentList.user.nickname)">回复</div>
      </div>
      <hm-floor @reply="reply" :index="index" v-if="commentList.parent" :commentList="commentList.parent" ></hm-floor>
      <div class="content">{{ commentList.content }}</div>
     </div>
  </div>
</template>

<script>
import HmFloor from 'components/hm-floor'
export default {
  created () {
    var obj = this.commentList
    while (obj.parent) {
      this.index++
      obj = obj.parent
    }
    // console.log(this.index)
  },
  data () {
    return {
      index: 0
    }
  },
  props: {
    commentList: Object
  },
  components: {
    HmFloor
  },
  methods: {
    reply (id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="scss" scoped>
  .hm-comment{
    .follow-up{
      padding-bottom:10px;
      border-bottom: 1px solid #ccc;
      .info{
        height: 50px;
        line-height:50px;
        text-align:center;
        font-size:14px;
      }
      .comment{
        text-align:center;
        font-size:16px;
      }
      .recycle{
        height:50px;
        display:flex;
        padding:10px;
        .img-wrap{
          img{
            width:35px;
            height:35px;
            border-radius:50%;
          }
        }
        .name {
          padding-left:20px;
          flex:1;
          p:nth-child(1){
            font-size:14px;
          }
        }
      }
      .content {
        padding:10px 0px 5px 10px;
      }
      .hm-floor{
        border: 1px solid #ccc;
        border-bottom:none;
     }
    }

  }
</style>
