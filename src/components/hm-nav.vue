<template>
  <div class="hm-nav" @click="changeClick">
    <div class="item">
      <span>{{ name }}</span>
      <span class="center">{{ info }}</span>
      <span class="arrow">
        <i class="iconfont iconjiantou1"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    info: {
      type: String
    }

  },
  methods: {
    changeClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang='scss' scoped>
.hm-nav {
  .item {
    height:50px;
    line-height:50px;
    font-size:14px;
    display:flex;
    border-bottom:2px solid #e4e4e4;
    padding: 0 20px;
    .center{
      flex:1;
      text-align:right;
    }
    .arrow {
    width: 30px;
    height: 50px;
    line-height: 50px;
    text-align:center;
  }
  }
}
</style>
