<template>
  <!-- 使用动态路由 -->
  <div class="detail">
    <div class="header">
      <div class="left">
        <i class="iconfont iconjiantou2" @click="$router.go(-1)"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew" @click="$router.go(-1)"></i>
      </div>
      <div class="right">
        <div class="followed" v-if="list.has_follow" @click="followed" >已关注</div>
        <div class="follow"  v-else @click="follow">关注</div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <p>{{ list.title }}</p>
      </div>
      <div class="middle">
        <span>{{ list.user.nickname }}</span>
        <span>{{ list.create_date | time }}</span>
      </div>
      <div class="video" v-if="list.type === 2">
        <video :src="list.content" controls></video>
      </div>
      <div class="info" v-html="list.content" v-else></div>
      <div class="bottom">
        <div class="good">
          <van-icon name="good-job-o" size="18px" color="red" @click="like" v-if="list.has_like" />
          <van-icon name="good-job" size="18px" v-else @click="like"/>
          <span>{{list.like_length}}</span>
        </div>
        <div class="share">
          <i class="iconfont iconweixin"></i>
          <span>微信</span>
        </div>
     </div>
    </div>
      <!-- 底部区域 -->
    <div class="follow">
      <div class="title">精彩跟帖</div>
      <div class="sofa" v-if="commentList.length === 0">暂无跟帖,抢占沙发</div>
      <hm-comment @reply="reply" v-else v-for="item in commentList" :key="item.id" :commentList="item"></hm-comment>
      <div class="more" v-show="commentList.length > 0">更多跟帖</div>
      <div class="empty" style="height:40px"></div>
    </div>
    <div class="footer">
      <div class="comment-text"  v-if="isShowfocus" >
        <textarea v-model="textvalue" name="" id="" cols="30" rows="10" :placeholder="placeholder" v-focus @blur="showblur"></textarea>
        <span @click="send">发送</span>
      </div>
      <div class="top"  v-else>
        <input type="text" placeholder="写跟帖"  @focus="showfocus">
        <van-icon name="chat-o" info="9" size="20px"/>
        <van-icon name="star" size="20px" color="orange" v-if="list.has_star" @click="star"/>
        <van-icon name="star-o" size="20px" v-else @click="star"/>
        <van-icon name="comment-circle-o" size="22px"/>
      </div>
    </div>
  </div>
</template>

<script>
import HmComment from 'components/hm-comment.vue'
export default {
  components: {
    HmComment
  },
  data () {
    return {
      list: {
        user: {}
      },
      commentList: [],
      isShowfocus: false,
      textvalue: '',
      placeholder: '回复',
      parentId: ''
    }
  },
  created () {
    this.getDetail()
    this.getComment()
  },
  methods: {
    async getDetail () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async followed () {
      const id = this.list.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.getDetail()
      }
    },
    async follow () {
      const id = this.list.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getDetail()
      }
    },
    async like () {
      // id: 点赞的文章的id
      const id = this.list.id
      const res = await this.$axios.get(`/post_like/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getDetail()
        this.$toast.success(message)
      }
    },
    async star () {
      const id = this.list.id
      const res = await this.$axios.get(`/post_star/${id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.getDetail()
        this.$toast.success(message)
      }
    },
    async getComment () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        this.getDetail()
      }
    },
    showfocus () {
      this.isShowfocus = true
    },
    showblur () {
      if (this.textvalue) return
      this.isShowfocus = false
    },
    async send () {
      const id = this.$route.params.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.textvalue,
        parent_id: this.parentId
      }
      )
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast('发布成功')
        this.textvalue = ''
        this.placeholder = '回复'
        this.isShowfocus = false
        this.getComment()
      }
    },
    reply (id, nickname) {
      // console.log(id, nickname)
      this.parentId = id
      this.isShowfocus = true
      this.placeholder = `回复:@${nickname}`
    }
  }
}
</script>

<style lang="scss" scoped>
 .detail {
    .header{
      display:flex;
      height:50px;
      line-height:28px;
      padding:10px;
      border: 1px solid #ccc;
      .left {
        width:20px;
        height:28px;
        i{
          font-size:15px;
        }
      }
      .center{
        flex:1;
        vertical-align: middle;
        i{
          font-size:50px;
        }
      }
      .right{
        .followed,.follow{
          padding: 0 10px;
          border: 1px solid #ccc;
          border-radius: 15px;
        }
        .follow {
          background-color: red;
          color:#fff;
        }
      }
    }
    .main {
      padding:10px;
      .title{
        font-size:16px;
        font-weight:700;
        padding:10px;
      }
      .middle{
        margin:5px 0 20px 0;
        span{
          padding-right:15px;
        }
      }
      .video{
        video{
          width:100%;
        }
      }
    }
    .bottom {
      padding: 20px 0;
      border-bottom: 3px solid #ccc;
      display:flex;
      justify-content: space-around;
      .good,.share{
        border: 1px solid #000;
        border-radius:10px;
        padding:0 10px;
        height:25px;
        span {
          padding:0 5px;
        }
        .iconweixin{
          color:green;
        }
      }
    }
    .footer{
      position:fixed;
      width:100%;
      left:0;
      bottom:0;
      background-color: #ccc;
      padding:10px 0;
      .top{
       display:flex;
       justify-content: space-around;
        input {
        width:200px;
        border-radius:100px;
        background-color: pink;
        padding-left:10px;
       }
      }
      .comment-text{
        display:flex;
        justify-content: space-between;
        align-items: flex-end;
        padding:10px;
        textarea{
          padding:10px;
          width:260px;
          height:70px;
          border-radius:10px;
        }
        span{
          width:60px;
          display:inline-block;
          background-color: red;
          font-size:12px;
          text-align:center;
          height:30px;
          line-height:30px;
          border-radius:10px;
          color:#fff;
        }
      }
    }
    .follow{
      padding:10px;
      padding-top:0;
        .title{
        text-align:center;
        font-size:16px;
      }
      .sofa{
        text-align:center;
        height:80px;
        line-height:80px;
        font-size:14px;
      }
      .more{
        width:100px;
        height:30px;
        line-height:30px;
        margin:20px auto;
        border: 1px solid #ccc;
        text-align:center;
        border-radius:15px;
    }
    }
 }
</style>
