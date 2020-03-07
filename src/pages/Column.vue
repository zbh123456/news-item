<template>
  <div class="column">
    <hm-header>栏目管理</hm-header>
    <div class="info">
      <div class="delchannel">点击删除以下频道</div>
      <ul>
        <li @click="del(index)" v-for="(item,index) in list" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    <div class="content">
      <div class="addchannel">点击添加以下频道</div>
      <ul>
        <li @click="add(index)" v-for="(item,index) in lastlist" :key="item.id">{{item.name}}</li>
      </ul>
     </div>
  </div>
</template>

<script>
export default {
  created () {
    const list = JSON.parse(localStorage.getItem('list'))
    const lastlist = JSON.parse(localStorage.getItem('lastlist'))
    if (list && lastlist) {
      this.list = list
      this.lastlist = lastlist
    } else {
      this.getlist()
    }
  },
  data () {
    return {
      list: [],
      lastlist: []
    }
  },
  methods: {
    async getlist () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    del (index) {
      this.lastlist.push(this.list[index])
      this.list.splice(index, 1)
    },
    add (index) {
      this.list.push(this.lastlist[index])
      this.lastlist.splice(index, 1)
    }

  },
  watch: {
    list () {
      localStorage.setItem('list', JSON.stringify(this.list))
      localStorage.setItem('lastlist', JSON.stringify(this.lastlist))
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
