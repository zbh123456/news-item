<template>
<!-- 我的跟帖实现加载功能 -->
<!-- loading触底的时候会触发 true -->
<!-- finished默认是false 当数据全部加载完成时 需要将finished设置为true -->
<!-- 问题一:数据被覆盖了 -->
<!-- 问题二:频繁的发请求 -->
  <div class="comment">
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset=50
      :immediate-check="false"
      @load="onLoad">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="time">{{ item.create_date | time('YYYY-MM-DD hh:ss:mm')}}</div>
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
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 4,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    async getComment () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      this.pageIndex++
      this.getComment()
    }
  }
}
</script>

<style lang="scss" scoped>
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
