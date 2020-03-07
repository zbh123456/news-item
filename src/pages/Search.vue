<template>
  <div class="search">
     <div class="header">
       <div class="arrow" slot="label"><van-icon name="arrow-left" @click="$router.go(-1)"/></div>
        <van-search
            v-model="searchvalue"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
          >
        <div slot="action" @click="onSearch">搜索</div>
        </van-search>
     </div>
     <div class="main" v-if="!list.length > 0">
      <div class="history">
         <h3>历史记录</h3>
        <ul>
          <li @click="showdetail(item)" v-for="item in history" :key="item">{{item}}</li>
        </ul>
      </div>
      <div class="hotsearch">
        <h3>热门搜索</h3>
        <ul>
          <li @click="showdetail(item)" v-for="item in hotsearch" :key="item">{{item}}</li>
        </ul>
      </div>
     </div>
     <hm-post @click="$router.push(`/detail/${item.id}`)" v-else v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
</template>

<script>
export default {
  created () {
    const history = JSON.parse(localStorage.getItem('history')) || []
    this.history = history
  },
  data () {
    return {
      searchvalue: '',
      list: {},
      hotsearch: ['王牌对王牌', '关晓彤', '郑爽', '青春队'],
      history: []
    }
  },
  methods: {
    async onSearch () {
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.searchvalue
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.history = this.history.filter(item => item !== this.searchvalue)
        this.history.unshift(this.searchvalue)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    showdetail (item) {
      this.searchvalue = item
      this.onSearch()
    }
  },
  watch: {
    // 如果用户的搜索内容为空 就显示历史搜索页
    searchvalue (value) {
      if (value === '') {
        this.list = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
 .header{
    display:flex;
    .arrow{
      width:40px;
      text-align:center;
      line-height: 54px;
      font-size:25px;
      background-color: #fff;
    }
    .van-search{
      flex:1;
    }
 }
 .main {
   padding:10px;
   .history,.hotsearch{
     h3{
       font-weight:700;
       font-size:14px;
       padding:10px 0;
     }
     ul{
       display:flex;
       flex-wrap:wrap;
       li{
         padding-right:30px;
         margin-bottom:20px;
       }
     }
   }
 }
}

</style>
