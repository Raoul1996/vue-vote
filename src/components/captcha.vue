<template lang="pug">
  div.captcha(@click="getCaptchaUrl")
    img(:src='captchaUrl', alt="captcha")
</template>

<script>
  import { baseUrl } from 'src/config/env'

  export default {
    name: 'captcha',
    data () {
      return {
        captchaUrl: ''
      }
    },
    created () {
      this.getCaptchaUrl()
    },
    methods: {
      getCaptchaUrl () {
        this.captchaUrl = `${baseUrl}/captcha?timestamp=${new Date().getTime()}`
      }
    }
  }
</script>

<style scoped>
  .captcha {
    height: 40px;
  }

  .captcha img {
    width: 100%;
    height: 100%;
  }
</style>
