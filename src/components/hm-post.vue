<template>
  <div class="hm-post" @click="handleClick">
    <!-- 视频的渲染 -->
    <div class="video" v-if="post.type === 2">
      <div class="info">
        <div  class="context">
        <p class="txt-cut">{{ post.title }}</p>
        </div>
        <div class="video-img">
           <img :src="post.cover[0].url" alt="">
           <i class="iconfont iconshipin"></i>
        </div>
         <div class="bottom">
           <span>{{ post.user.nickname }}</span>
           <span>{{ post.comment_length}}跟帖</span>
         </div>
      </div>
    </div>
    <!-- 单张图片的渲染 -->
    <div class="list" v-else-if="post.cover.length<3">
      <div class="info">
        <div  class="context">
        <p class="txt-cut">{{ post.title }}</p>
        </div>
         <div class="bottom">
           <span>{{ post.user.nickname }}</span>
           <span>{{ post.comment_length}}跟帖</span>
         </div>
      </div>
      <div class="picture">
        <img :src="post.cover[0].url" alt />
      </div>
    </div>
    <!-- 三张图片的渲染 -->
    <div class="MoreImg" v-else>
      <div class="info">
        <div  class="context">
        <p class="txt-cut">{{ post.title }}</p>
        </div>
        <div class="imgs">
           <img :src="item.url" v-for="item in post.cover" :key="item.id"/>
        </div>
         <div class="bottom">
           <span>{{ post.user.nickname }}</span>
           <span>{{ post.comment_length}}跟帖</span>
         </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
 .list,.MoreImg,.video {
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
      .video-img{
        position:relative;
        overflow: hidden;
        .iconshipin{
          width:50px;
          height:50px;
          line-height:50px;
          text-align:center;
          color:#ffffff;
          position:absolute;
          font-size:40px;
          background-color: rgba(0,0,0,.3);
          border-radius:50%;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%)
        }
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
    .imgs {
      display:flex;
      padding:8px 0;
      justify-content:space-between;
      img {
        width:110px;
        height:75px;
      }
    }
  }
</style>
