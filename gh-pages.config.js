// gh-pages 只支持 hash router，因为使用 history 需要服务器支持，显然 github没有
var ghpages = require('gh-pages')
ghpages.publish('dist', {
  branch: 'dist',
  message: 'create a new commit'
  // repo: 'https://github.com/Raoul1996/vue-side-project.git'
}, function (err) {
  if (err) {console.log(err)}
})
