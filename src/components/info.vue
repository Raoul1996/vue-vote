<template lang="pug">
  .info
    .avatar
      img(:src="avatarUrl", @click="toggleShow")
      my-upload(field="img", @crop-success="cropSuccess", @crop-upload-success="cropUploadSuccess", @crop-upload-fail="cropUploadFail", v-model="show", :width="300", :height="300", :url="uploadUrl", :params="params", :headers="headers", img-format="png")
    ul.users-list
      li.users-item.title {{info.name}}
      <!--li.users-item.email {{info.email}}-->
</template>

<script>
  import { baseUrl } from '../config'
  import myUpload from 'vue-image-crop-upload'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'info',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        show: false,
        params: {
          token: '123456798',
          name: 'avatar'
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        uploadUrl: baseUrl + '/upload',
        imgDataUrl: '', // the datebase64 url of created image
        avatarUrl: '' + baseUrl + this.info.avatar
      }
    },
    computed: {...mapState([])},
    methods: {
      ...mapMutations(['USER_INFO']),
      toggleShow () {
        this.show = !this.show
      },
      cropSuccess (imgDataUrl, field) {
      },
      cropUploadSuccess (jsonData, field) {
        const avatar = jsonData.data.data.pictureUrl
        this.USER_INFO(Object.assign({}, this.info, {avatar}))
        // 这里使用 $nextTick 的作用是在更改状态树种的 info.avatar 值之后，
        // 会导致当前组件的 avatarUrl 获取不到正确的 avatar 值，所以在这里对 avatarUrl 在下一次刷新的时候进行重新赋值
        // 目的是少发一次 user_info 请求，转化成仅仅发送一次对图片的请求
        this.$nextTick(() => {
          this.avatarUrl = '' + baseUrl + avatar
        })
      },
      cropUploadFail (status, field) {
        console.log(status)
        console.log('field: ' + field)
      }
    },
    components: {
      'my-upload': myUpload
    }
  }
</script>

<style scoped lang="stylus">
  .info {
    .avatar {
      margin 0 auto
      width 150px
      height 150px
      img {
        max-width 100%
      }
    }
    .users-list {
      padding 0
      .users-item {
        list-style none
      }
      .title {
        font-size 2em
      }
      .email {
        font-size 1.2em
      }
    }
  }
</style>
