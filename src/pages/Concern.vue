<template>
  <!-- 1 登录验证 -->
  <!-- 2 页面数据渲染 -->
  <!-- 3 实现取消关注 -->
  <!-- 4 实现关注用户 -->
  <div class="concern">
    <hm-header>我的关注</hm-header>
    <div class="item" v-for="item in list" :key="item.id">
      <div class="left">
        <img :src="$axios.defaults.baseURL+item.head_img" alt />
      </div>
      <div class="center">
        <p>{{ item.nickname}}</p>
        <span>{{ item.create_date | time }}</span>
      </div>
      <div class="right" @click="cancelConcern(item.id)">取消关注</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getConcern()
    this.clickConcern(5)
    this.clickConcern(3)
    this.clickConcern(2)
    this.clickConcern(1)
  },
  methods: {
    async getConcern () {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancelConcern (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确认要取消关注吗?'
        })
        const res = await this.$axios.get(`/user_unfollow/${id}`)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast(message)
          this.getConcern()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async clickConcern (id) {
      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.getConcern()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  padding: 20px;
  border: 1px solid #d7d7d7;
  .left {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #b3b3b3;
    img {
      height: 40px;
    }
  }
  .center {
    font-size: 14px;
    padding-left: 20px;
    flex: 1;
  }
  .right {
    margin-top: 5px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    background-color: #e1e1e1;
  }
}
</style>
