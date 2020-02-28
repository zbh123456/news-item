<template>
  <div class="test">
    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputType="option.outputType"
      :canScale="option.canScale"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHeight"
      :fixedNumber="option.fixedNumber"
    ></vueCropper>
    <van-button class="cancelcrop" type="primary">取消裁剪</van-button>
    <van-button class="crop" type="danger" @click="crop">确定裁剪</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import img from 'assets/01.jpg'
export default {
  data () {
    return {
      option: {
        img: img, // 这个img应该要是上传的那张图片，只不过现在我写死了 ------ 必填
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框 ------- 需要
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
    }
  },
  methods: {
    crop () {
      this.$refs.cropper.getCropData(data => {
        // data就是我们裁剪出来的图片
        console.log(data)
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="scss" scoped>
  .test{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    .crop{
      position:absolute;
      left:30px;
      bottom:10px;
    }
    .cancelcrop{
      position:absolute;
      right:30px;
      bottom:10px;
    }
  }
</style>
