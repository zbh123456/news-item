<template>
  <!-- 1 个人中心静态结构完成 -->
  <!-- 2 完成头部渲染 需要验证:【Authorization 】token字符串 -->
  <!-- 3 实现退出功能 -->
  <!-- 4 个人中心实现登录拦截 如果是没有登录的用户不能访问个人中心route.beforeEach -->
  <!-- 5 拦截器 拦截token过期的用户 -->
  <div class="profile">
    <div class="profile-top" @click="$router.push('/edit-profile')">
      <div class="photo">
        <img :src="imgUrl" alt />
      </div>
      <div class="info">
        <div class="name">
          <i v-if="profile.gender===1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{ profile.nickname }}</span>
        </div>
        <div class="time">
          <span>{{ profile.create_date | time }}</span>
        </div>
      </div>
      <div class="arrow">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="profile-bottom">
      <hm-nav name="我的关注" info="关注的用户" @click="$router.push('/concern')"></hm-nav>
      <hm-nav name="我的跟帖" info="跟帖/回复" @click="$router.push('/comment')"></hm-nav>
      <hm-nav name="我的收藏" info="文章/视频" @click="$router.push('/collect')"></hm-nav>
      <hm-nav name="设置" @click="$router.push('/edit-profile')"></hm-nav>
    </div>
    <div class="logout" @click="logout">
      <van-button type="info" size="large" round>退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profile: ''
    }
  },
  computed: {
    imgUrl () {
      return this.$axios.defaults.baseURL + this.profile.head_img
    }
  },
  async created () {
    const id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${id}`, {
      headers: {
        Authorization: token
      }
    })
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.profile = data
    }
  },
  methods: {
    async logout () {
      // 弹出提示框 你确认要退出吗?
      // 点击确定退出 跳转到登录页 删除token和user_id
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确认要退出吗'
        })
        // console.log(res)
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-top {
  padding: 20px;
  display: flex;
  border-bottom: 4px solid #e4e4e4;
  .photo {
    img {
      width: 70px;
      height: 70px;
      border-radius: 35px;
    }
  }
  .info {
    flex: 1;
    font-size: 14px;
    padding: 10px;
    .name {
      .iconxingbienan {
        color: blue;
      }
      .iconxingbienv {
        color: pink;
      }
      span {
        margin-left: 10px;
      }
    }
    .time {
      margin-top: 5px;
    }
  }
  .arrow {
    width: 30px;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
}
.logout {
  padding: 20px;
}
</style>
