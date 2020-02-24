<template>
  <div class="hm-button" @click="handleClick">
   <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style>
.hm-button {
  height:50px;
  background-color: #cc3300;
  border-radius:25px;
  line-height:50px;
  font-size:18px;
  color:#fff;
  text-align:center;
}
</style>
