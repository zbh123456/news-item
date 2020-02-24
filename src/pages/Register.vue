<template>
  <div class="register">
    <div class="closebtn">
      <i class="iconfont iconicon-test"></i>
    </div>
    <h1 class="logo">
      <i class="iconfont iconnew"></i>
    </h1>
    <div class="usename">
      <hm-input :rules="userRules" err-msg="请输入4-10数字" v-model="username" placeholder="用户名/手机号" type="text"></hm-input>
    </div>
    <div class="nickname">
      <hm-input :rules="nicknameRules" err-msg="请输入2-4中文" v-model="nickname" placeholder="昵称" type="text"></hm-input>
    </div>
    <div class="password">
      <hm-input :rules="passRules" err-msg="请输入3-9字符" v-model="password" placeholder="密码" type="password"></hm-input>
    </div>
    <div class="enter">
      <hm-button  @click="register">注册</hm-button>
      <p class="gologin">没有账号&nbsp;?&nbsp;立即<router-link to="/login">&nbsp;登录&nbsp;</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      nickname: '',
      userRules: /^1\d{3,9}$/,
      passRules: /^\w{3,9}$/,
      nicknameRules: /^[\u4E00-\u9FA5]{2,4}$/
    }
  },
  methods: {
    async register () {
      if (!this.userRules.test(this.username)) {
        this.$toast('请输入正确的号码')
        return
      }
      if (!this.nicknameRules.test(this.nickname)) {
        this.$toast('请输入正确的昵称')
        return
      }
      if (!this.passRules.test(this.password)) {
        this.$toast('请输入正确的密码')
        return
      }
      // 点击注册按钮 要发送axios请求
      const res = await this.$axios.post('/register', {
        username: this.username,
        password: this.password,
        nickname: this.nickname
      })
      // statusCode: 200, message: "注册成功"
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        // 跳转到登录页 要求把数据回显在登录页
        this.$router.push({
          name: 'login',
          params: {
            username: this.username,
            password: this.password
          }
        })
      } else {
        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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
    .gologin{
      margin-top:30px;
      font-size:18px;
    }
  }
}
</style>
