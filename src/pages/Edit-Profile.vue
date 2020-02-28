<template>
<!-- 1 静态结构 头部组件的封装 -->
<!-- 2 头部组件利用具名插槽(可以设置默认值)和匿名插槽 -->
<!-- 3 设置请求拦截器 在请求发送前携带token-->
<!-- 4 编辑页面的渲染 -->
<!-- 5 编辑昵称 编辑密码 编辑性别-->
<!-- 6 图片上传 -->
  <div class="edit-profile">
    <HmHeader>编辑中心</HmHeader>
    <div class="headImg">
      <img :src="imgUrl" alt="">
      <van-uploader :after-read="afterRead" />
     </div>
     <hm-nav name="昵称" :info="profile.nickname" @click="Shownickname"></hm-nav>
     <hm-nav name="密码" info="******"  @click="Showpassword"></hm-nav>
     <hm-nav name="性别" :info="profile.gender === 0 ? '女':'男'" @click="Showgender"></hm-nav>
      <van-dialog   :beforeClose="editnickname" v-model="isShownickname" title="更改昵称" show-cancel-button>
       <van-field v-model="nickname" placeholder="请输入昵称" />
     </van-dialog>
      <van-dialog :beforeClose="editpassword" v-model="isShowpassword" title="更改密码" show-cancel-button>
       <van-field
       @click-right-icon = "ChangeType"
       v-model="password"
       placeholder="请输入密码"
       :type="isChangeType ? 'password':'text'"
       :right-icon="isChangeType ? 'closed-eye':'eye-o'" />
     </van-dialog>
     <van-dialog  @confirm="editgender"  v-model="isShowgender" title="更改性别" show-cancel-button>
       <van-radio-group v-model="gender" direction="horizontal">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
     </van-dialog>
     <div class="croppicture" v-show="isShowMask">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :canScale="option.canScale"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :fixedNumber="option.fixedNumber"
    ></vueCropper>
    <van-button class="crop" type="danger" @click="crop">确定裁剪</van-button>
    <van-button class="cancelcrop" type="primary" @click="cancel">取消裁剪</van-button>
    </div>
   </div>
</template>
<script>
import { VueCropper } from 'vue-cropper'
export default {
  computed: {
    imgUrl () {
      return this.$axios.defaults.baseURL + this.profile.head_img
    }
  },
  components: {
    VueCropper
  },
  data () {
    return {
      profile: {},
      isShownickname: false,
      nickname: '',
      password: '',
      gender: '',
      isShowgender: false,
      isShowpassword: false,
      isChangeType: false,
      option: {
        img: '', // 这个img应该要是上传的那张图片，只不过现在我写死了 ------ 必填
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixedNumber: [1, 1] // 截图框的宽高比例
      },
      isShowMask: false
    }
  },
  created () {
    this.Redenderprofile()
  },
  methods: {
    async crop () {
      this.$refs.cropper.getCropBlob(async picture => {
        // data就是我们裁剪出来的图片
        const fl = new FormData()
        fl.append('file', picture)
        const res = await this.$axios.post('/upload', fl)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editProfile({ head_img: data.url })
        }
        // console.log(res)
      })
      this.isShowMask = false
    },
    cancel () {
      this.isShowMask = false
    },
    async afterRead (file) {
      // console.log(file.file)
      // const fl = new FormData()
      // fl.append('file', file.file)
      // const res = await this.$axios.post('/upload', fl)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   this.editProfile({ head_img: data.url })
      // }
      // console.log(file.content)

      this.isShowMask = true
      this.option.img = file.content
    },
    editgender () {
      this.editProfile({ gender: this.gender })
    },
    Showgender () {
      this.isShowgender = true
      this.gender = this.profile.gender
    },
    ChangeType () {
      this.isChangeType = !this.isChangeType
    },
    async Redenderprofile () {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.get(`/user/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.profile = data
      }
    },
    Shownickname () {
      this.isShownickname = true
      this.nickname = this.profile.nickname
    },
    editnickname (action, done) {
      if (action === 'confirm') {
        if (/^[\u4E00-\u9FA5]{2,4}$/.test(this.nickname)) {
          done()
          this.editProfile({ nickname: this.nickname })
        } else {
          done(false)
          this.$toast('请输入2-4位中文字符')
        }
      }
      if (action === 'cancel') {
        done()
      }
    },
    Showpassword () {
      this.isShowpassword = true
      this.password = this.profile.password
    },
    editpassword (action, done) {
      if (action === 'confirm') {
        if (/^\w{3,9}$/.test(this.password)) {
          done()
          this.editProfile({ password: this.password })
        } else {
          done(false)
          this.$toast('请输入3-9位字符')
        }
      }
      if (action === 'cancel') {
        done()
      }
    },
    async editProfile (obj) {
      const id = localStorage.getItem('user_id')
      const res = await this.$axios.post(`/user_update/${id}`, obj)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.Redenderprofile()
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.edit-profile{
  .headImg{
    padding:20px 0 ;
    position:relative;
    img {
      width:80px;
      height:80px;
      margin: 0 auto;
      border-radius:50%;
    }
    .van-uploader{
      position:absolute;
      opacity: 0;
      left:50%;
      top:20%;
      transform:translateX(-50%)
    }
  }
  .van-dialog {
    padding: 0 20px;
    margin:20px 0;
    .van-field {
      border-bottom: 1px solid #ccc;
    }
    .van-radio-group {
      justify-content: space-around;
      margin:20px 0 ;
    }
  }
  .croppicture{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .crop{
      position:absolute;
      right:30px;
      bottom:10px;
    }
    .cancelcrop{
      position:absolute;
      left:30px;
      bottom:10px;
    }
  }
}
</style>
