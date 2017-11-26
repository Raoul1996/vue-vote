import Vue from 'vue'
import Login from '@/pages/login.vue'

describe('Login', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.login title').textContent)
      .toEqual('Sign in to Voter')
  })
  it('has a mounted hook', () => {
    expect(typeof Login.mounted).toBe('function')
  })
})
