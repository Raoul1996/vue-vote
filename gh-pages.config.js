var ghpages = require('gh-pages')
ghpages.publish('dist', {
  branch: 'gh-pages',
  message: 'create a new commit'
  // repo: 'https://github.com/Raoul1996/vue-side-project.git'
}, function (err) {
  if (err) {console.log(err)}
})
