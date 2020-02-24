<template>
  <div class="hm-input">
    <input :rules="rules" :class=[status] :type="type" :placeholder="placeholder" :value="value" @input="changeValue" />
    <p v-show="isshowPrompt">{{ errMsg }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '用户名'
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: RegExp
    },
    errMsg: {
      type: String
    }
  },
  methods: {
    changeValue (e) {
      const value = e.target.value
      this.$emit('input', value)
      if (this.rules.test(value)) {
        this.status = 'success'
      } else {
        this.status = 'error'
      }
    }
  },
  computed: {
    isshowPrompt () {
      return this.status === 'error' && this.errMsg
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-input {
  height: 80px;
  position: relative;
  input {
    width: 100%;
    height: 60px;
    background-color: transparent;
    border-bottom: 2px solid #ccc;
    font-size: 18px;
    text-indent: 1em;
    &.success {
      border-color: limegreen;
    }
    &.error {
      border-color: red;
    }
  }
  p {
    color:red;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
