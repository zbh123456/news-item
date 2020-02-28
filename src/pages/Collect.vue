<template>
  <div class="collect">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <div class="info">
        <p class="context">林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
        <span>火星时报</span>
        <span>52跟帖</span>
      </div>
      <div class="picture">
        <img src="~assets/01.jpg" alt />
      </div>
    </div>
    <div class="item">
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
    </div>
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
    console.log(res.data)

    if (statusCode === 200) {
      this.collectList = data
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
      .context{
        font-size:14px;
        margin-bottom:8px;
        span{
          padding:0;
        }
      }
      span{
        color:#868686;
        padding:0 10px 0 0;
      }
    }
    .picture {
      img{
      width: 120px;
      height: 75px;
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
