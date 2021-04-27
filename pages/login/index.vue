<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{  isLogin ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(error, field) in errors">
              <span v-for="(item, index) in error" :key="index">
                {{ field }} {{ item }}
              </span>
            </li>
          </ul>

          <form @submit.prevent="loginIn">
            <fieldset class="form-group">
              <input
                v-if="!isLogin"
                v-model="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                :required="!isLogin"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{  isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user.js'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'loginPage',
  middleware: 'notAuthenticated',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      errors: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async loginIn () {
      const submitFn = this.isLogin ? login : register
      const { username, email, password } = this
      try {
        const { data } = await submitFn({
          user: {
            username,
            email,
            password,
          }
        })
        // 服务端存储token信息
        Cookie.set('user', data.user)
        // 客户端存储用户信息
        this.$store.commit('setUserInfo', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        // 处理错误信息
        this.errors = error.response.data.errors
      }
    }
  }
};
</script>

<style></style>
