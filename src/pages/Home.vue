<template>
<!-- 1 tab栏动态渲染完成 -->
<!-- 2 tab栏下面的数据分开渲染 每页的数据不一定  需要根据id来渲染 ,每页都需要,所以封装个方法 -->
<!--   2.1什么时候发送axios 使用watch监视active的变化 只有active变化就发送请求-->
<!-- 3 登录过得用户有关注 要求默认显示头条根据token判断用户是否登录 -->
<!-- 4 数据缓存-->
<!-- 5 tab栏下的数据渲染 进行组件封装 -->
<!-- 6 收藏优化 -->
<!-- 7 首页的分页功能 -->
<!-- 8 下拉刷新功能完成 -->
   <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="搜索新闻" />
      </div>
      <div class="tip" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- 导航 -->
    <van-icon name="arrow-down" size="25px" @click="$router.push('/column')"/>
    <van-tabs v-model="active" sticky animated swipeable background="#e4e4e4">
      <van-tab :title="item.name" v-for="item in list" :key="item.id">
        <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh" :head-height="150">
          <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
          <img
            class="doge"
            slot="pulling"
            slot-scope="props"
            src="https://img.yzcdn.cn/vant/doge.png"
            :style = "{transform:`scale(${props.distance / 80})`}">
          <!-- 释放提示 -->
          <img
            class="doge"
            slot="loosing"
            src="https://img.yzcdn.cn/vant/doge.png">
            <!-- 加载提示 -->
            <img
              class="doge"
              slot="loading"
              src="https://img.yzcdn.cn/vant/doge-fire.jpg">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            :offset="50"
            :immediate-check="false"
            @load="onLoad">
           <hm-post v-for="post in item.posts" :key="post.id" :post="post" @click="$router.push(`/detail/${post.id}`)"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      list: [],
      pageSize: 5
    }
  },
  async created () {
    await this.getHome()
    // 问题一 id获取不到 因为上面的axios是异步的 数据的结果还没回来
    this.getPost()
  },
  methods: {
    onRefresh () {
      const index = this.active
      // 下拉刷新应该做什么 初始化数据
      this.list[index].pageIndex = 1
      this.list[index].loading = true
      this.list[index].finished = false
      this.list[index].posts = []
      this.getPost()
    },
    async getHome () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.list是整个数据对象 里面包含每个tab 要求把每个tab里的数据存在一个数组(每一个)中
        // this.list[this.active].posts = [] 想法错误因为只把第一个下标为0 ]添加了 所以用foreach
        // 数据回来了但不是响应式的 原因是如果是对象，动态给对象添加或者删除一个属性，vue是检测不到的，所以不是响应的，如果想用动态添加的数据是响应式，需要使用Vue.set(obj, key, value)
        // 第二种方式 操作data 后台返回的数据是可以进行操作的
        // this.list.forEach(item => {
        //   this.$set(item, 'posts', [])
        //   // item.posts = []
        // })
        data.forEach(item => {
          item.posts = []
          item.pageIndex = 1
          item.loading = false
          item.finished = false
          item.isLoading = false
        })
        this.list = data
      }
    },
    async getPost () {
      // 根据下标获取id
      const index = this.active
      const id = this.list[index].id
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.list[index].pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // data是每个tab的数据
        // 将请求回来的数据缓存到posts中 如果已经缓存的就不需要重复缓存
        this.list[index].posts = [...this.list[index].posts, ...data]
        this.list[index].loading = false
        this.list[index].isLoading = false
        if (data.length < this.pageSize) {
          this.list[index].finished = true
        }
      }
      // console.log(res.data)
    },
    onLoad () {
      const index = this.active
      //  当loading触底的时候 应该加载下一页
      this.list[index].pageIndex++
      this.getPost()
    }
  },
  watch: {
    active (value) {
      this.list[value].loading = false
      this.list[value].finished = false
      // if (this.list[value].length > 0) return
      if (this.list[value].posts.length > 0) return
      this.getPost()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    background-color: #ff0000;
    display: flex;
    color: #fff;
    padding: 0 10px;
    .logo {
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      text-align: center;
      position: relative;
      i {
        position: absolute;
        left: 34%;
      }
      input {
        text-indent: 6em;
        font-size: 14px;
        width: 80%;
        height: 30px;
        line-height: 30px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 15px;
      }
      input::-webkit-input-placeholder {
        color: #fff;
      }
    }
    .tip {
      .iconwode {
        font-size: 24px;
      }
    }
  }
  .van-icon {
    float:right;
    position:sticky;
    z-index:999;
    top:0;
    width:40px;
    height:44px;
    line-height: 44px;
    text-align:center;
    background-color: #e4e4e4;
  }
}
.doge {
  width: 140px;
  height: 72px;
  margin: 5px auto;
  border-radius: 4px;
}
</style>
.<style lang="scss">
 .van-sticky{
   padding-right:40px;
 }
</style>
