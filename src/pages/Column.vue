<template>
  <div class="column">
    <hm-header>栏目管理</hm-header>
    <div class="info">
      <div class="delchannel">点击删除以下频道</div>
      <ul>
        <li v-for="item in list" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="addchannel">点击添加以下频道</div>
      <ul>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
        <li>推荐</li>
      </ul>
     </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getlist()
  },
  data () {
    return {
      list: {}
    }
  },
  methods: {
    async getlist () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column{
  .info,.content{
    padding:10px 15px;
    .delchannel,.addchannel{
      padding:10px 0;
    }
    ul{
      display:flex;
      flex-wrap:wrap;
      li{
        padding:0 20px;
        font-size:14px;
        line-height:30px;
        text-align:center;
        height:30px;
        border: 1px solid #000;
        margin: 0 10px 10px 0;
      }
    }
  }
}

</style>
