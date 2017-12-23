import Vue from 'vue'
import HelloWorld from 'src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  const Constructor = Vue.extend(HelloWorld)
  const vm = new Constructor().$mount()
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
  it('should create a counter with zero value', function () {
    expect(vm.$data.counter).toEqual(0)
  })
  it('should render counter with counter data value', function () {
    const data = {counter: 48}
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor(data).$mount()
    expect(vm.$el.querySelector('.hello div.counter').textContent)
      .toEqual('48')
  })
})
