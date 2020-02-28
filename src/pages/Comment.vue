<template>
  <div class="comment">
    <hm-header>我的跟帖</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="time">{{ item.create_date | second}}</div>
      <div class="parent" v-if="item.parent">
        <p>回复： {{ item.parent.user.nickname}}</p>
        <span>{{item.parent.content}}</span>
      </div>
      <div class="reply">
        <p>{{ item.content}}</p>
      </div>
      <div class="content">
        <p class="one-txt-cut">{{ item.post.title }}</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      list: []
    }
  },
  filters: {
    second (value) {
      return moment(value).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  async created () {
    const res = await this.$axios.get('/user_comments')
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.list = data
    }
  }

}
</script>

.<style lang="scss" scoped>
  .comment{
    .item{
      padding:10px;
      border-bottom:2px solid #d7d7d7;
      line-height:30px;
      .time{
        color:#a0a0a0;
        font-size:12px;
      }
      .parent {
        line-height:25px;
        color:#929292;
        background-color: #e4e4e4;
        padding:10px;
        p{
          font-size:12px;
        }
        span {
          font-size:14px;
        }
      }
      .reply{
        font-size:14px;
      }
      .content {
        display:flex;
        p{
          flex:1;
          color:#898989;
        }
        .iconjiantou1{
          margin-left:10px;
        }
      }
    }
  }
</style>
