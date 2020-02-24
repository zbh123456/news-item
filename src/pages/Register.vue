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
      <hm-input :rules="nicknameRules" err-msg="请输入3-9字符" v-model="nickname" placeholder="昵称" type="text"></hm-input>
    </div>
    <div class="password">
      <hm-input :rules="passRules" err-msg="请输入3-9字符" v-model="password" placeholder="密码" type="password"></hm-input>
    </div>
    <div class="enter">
      <hm-button  @click="login">注册</hm-button>
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
      passRules: /^1\d{3,9}$/,
      nicknameRules: /^\w{3,9}$/
    }
  },
  methods: {
    login () {
      console.log(this.username, this.password, this.nickname)
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
