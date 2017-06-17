
let connectDB = require('./connect')
let User = require('./models')
// initial
connectDB() // connect the server
/**
 *  @mobile: String,
 *  @password: String,
 // *  @token: String
 */
let mockUser = {
  mobile: '1503517219',
  password: '123456'
}
let userTest = new User(mockUser)

console.log('create mockUser successful')

userTest.save(function (err) {
  if (err) {
    console.log(`save error,${err}`)
  }
  console.log('save successful')
})

