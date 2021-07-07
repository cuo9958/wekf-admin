<template>
  <div>
    <el-upload
      ref="upload"
      action="/api/upload"
      :headers="headers"
      :limit="1"
      name="file"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      accept="image/png, image/jpeg"
      class="upload-content"
      list-type="picture-card"
    >
      <i v-if="img == '' && !loading" slot="trigger" class="el-icon-plus"></i>
      <img v-if="img !== ''" :src="img" class="upload_img" />
    </el-upload>
  </div>
</template>
<script>
  export default {
    name: 'MyUpload',
    props: {
      value: { type: String, default: '' },
    },
    data() {
      return {
        img: this.value,
        loading: false,
        headers: {},
      }
    },
    watch: {
      value(val) {
        this.img = val
      },
    },
    methods: {
      handleProgress() {
        this.loading = true
      },
      handleSuccess() {
        this.$emit('input', this.img)
        // setTimeout(() => {
        //   this.$emit(
        //     'input',
        //     'https://img2.daling.com/zin/public/specialTopic/2021/06/16/15/11/38/52540011C422MC23S000010600233.png'
        //   )
        // }, 2000)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .upload_img {
    width: 100%;
    height: 100%;
  }
</style>
