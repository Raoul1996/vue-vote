[zhihu](https://www.zhihu.com/question/50566681?sort=created)

之前也遇到过类似的疑惑，感觉很少看到有讨论Vue写测试的技巧，方法测试很简单，
但遇到其他场景也不知道怎么办了，后来在SlideShare上搜到一份PPT，
讲了一些测试技巧。Slide链接：[slideshare.net](https://www.slideshare.net/coulix/vuejs-testing) 的页面可能要梯子才能打开，
帮题主粘贴下关于题主两个疑惑部分的内容吧：

Testing an API call, mocking fetch.
```
import { authentify } from 'src/store/actions/auth';

import fetchMock from 'fetch-mock';
import { fetchUserToken } from 'src/api/web';

describe('Authentify action', () => {
 let sandbox;
 beforeEach(() => {
   sandbox = sinon.sandbox.create();
 });
 afterEach(() => {
   sandbox.restore();
   fetchMock.restore();
 });
 it('FetchUserToken should eventually resolve with a token.', () => {
   fetchMock.mock('/login/getaccesstoken/', { Model: 'Ĵ' });
   return fetchUserToken().should.eventually.equal('Ĵ');
 });
});
```
```
Testing a component (1/2)import Vue from 'vue';
import FinalCountdown from 'src/components/workflow/FinalCountdown';
describe('workflow/FinalCountDown component.', () => {
 const getComponent = (date) => {
 let vm = new Vue({
 template: '<div><final-countdown v-ref:component :date="date"></final-countdown></div>',
 components: {
   FinalCountdown
 },
 data: {
   date
 }
 });
 return vm;
 };


```

