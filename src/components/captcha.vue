<template lang="pug">
  div.captcha(@click="getCaptchaUrl")
    img(:src='captchaUrl', alt="captcha")
</template>

<script>
  import { developmentUrl, productionUrl } from 'src/config'

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
        const hostname = window.location.hostname.toLowerCase()
        const captcha = `/captcha?${new Date().getTime()}`
        if (hostname !== 'localhost' && hostname !== '127.0.0.1' && hostname !== '0.0.0.0') {
          this.captchaUrl = productionUrl + captcha
        } else {
          this.captchaUrl = developmentUrl + captcha
        }
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
