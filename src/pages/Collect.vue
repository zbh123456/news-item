<template>
<!-- 跟帖的处理 -->
  <div class="collect">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in collectList" :key="item.id" :post="item"></hm-post>
    <!-- <div class="list" v-for="item in collectList" :key="item.id">
      <div class="info">
        <div  class="context">
        <p class="txt-cut">{{ item.title }}</p>
        </div>
         <div class="bottom">
           <span>{{ item.user.nickname }}</span>
           <span>{{ item.comments.length}}跟帖</span>
         </div>
      </div>
      <div class="picture">
        <img :src="item.cover[0].url" alt />
      </div>
    </div> -->
    <!-- <div class="item" >
      <div class="content">
        <span>亚马逊雨林为何燃烧？除了新总统“急功近利”的开发，国际资本才是真凶</span>
      </div>
      <div class="image clearfix">
         <div class="img-wrap"><img src="~assets/01.jpg" alt=""></div>
         <div class="img-wrap"><img src="~assets/01.jpg" alt=""></div>
         <div class="img-wrap"><img src="~assets/01.jpg" alt=""></div>
      </div>
       <span>火星时报</span>
       <span>52跟帖</span>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      collectList: []
    }
  },
  async created () {
    const res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data

    if (statusCode === 200) {
      data.forEach(item => {
        item.comment_length = item.comments.length
      })
      this.collectList = data
      // console.log(this.collectList)
    }
  }
}
</script>

<style lang="scss" scoped>
.collect {
  .list {
    border: 2px solid #e4e4e4;
    padding:10px;
    display: flex;
    .info{
      flex:1;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .context{
        font-size:14px;
      }
      span{
        color:#868686;
        padding:0 10px 0 0;
      }
    }
    .picture {
      width: 120px;
      height: 75px;
      img{
      width:100%;
      height:100%;
      object-fit: cover;
      }
    }
  }
  .item {
    border: 2px solid #e4e4e4;
    padding:10px;
    font-size:14px;
    .image{
      padding:10px 0;
      display:flex;
      overflow: hidden;
      .img-wrap{
        flex:1;
        margin-right:5px;
        img{
          height:75px;
        }
      }
    }
    span{
        color:#868686;
        padding:0 10px 0 0;
      }
  }
}
</style>
