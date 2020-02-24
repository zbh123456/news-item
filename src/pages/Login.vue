<template>
    <!--组件封装  1 实现将用户名和密码显示在输入框中 -->
    <!-- 组件封装 2 当用户名修改时,完成数据更新 -->
    <!-- 组件封装 3 完成 value 格式校验 -->
    <!-- 轻消息提示 通过vantui 组件使用 -->
  <div class="login">
    <div class="closebtn">
      <i class="iconfont iconicon-test"></i>
    </div>
    <h1 class="logo">
      <i class="iconfont iconnew"></i>
    </h1>
    <div class="usename">
      <hm-input :rules="userRules" err-msg="请输入4-10位数字" v-model="username" placeholder="用户名/手机号" type="text"></hm-input>
    </div>
    <div class="password">
      <hm-input :rules="passRules" err-msg="请输入3-9位字符" v-model="password" placeholder="密码"  type="password"></hm-input>
    </div>
    <div class="enter">
      <hm-button  @click="login">登录</hm-button>
     <p class="goreg">没有账号&nbsp;?&nbsp;立即<router-link to="/register">&nbsp;注册&nbsp;</router-link></p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      userRules: /^1\d{3,9}$/,
      passRules: /^\d{3,9}$/
    }
  },
  created () {
    const { username, password } = this.$route.params
    if (username && password) {
      this.password = password
      this.username = username
    }
  },
  methods: {
    async login () {
      // 校验正确的格式在进行登录
      if (!this.userRules.test(this.username)) {
        // console.log('请输入正确的号码')
        this.$toast('请输入正确的号码')
        return
      }
      if (!this.passRules.test(this.password)) {
        // console.log('请输入正确的密码')
        this.$toast('请输入正确的密码')
        return
      }
      // 点击登录发送axios请求
      // console.log(this.username, this.password)
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      // 两种状态 1 message: "登录成功", statusCode: 200 2 statusCode: 401, message: "用户名或者密码错误"
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // console.log('登录成功')
        this.$toast.success(message)
      } else {
        // console.log('登录失败')
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .closebtn {
    i {
      font-size: 26px;
    }
  }
  .logo{
      height:130px;
      text-align:center;
      line-height:130px;
    i{
      font-size:130px;
      color:#d81e06;
    }
  }
  .enter{
    margin-top:15px;
    text-align:center;
    .goreg{
      margin-top:30px;
      font-size:18px;
    }
  }
}
</style>
