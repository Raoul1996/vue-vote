const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: '',
  auth: {
    user: '',
    pass: '' // 授权码, 通过QQ获取
  }
})

const mail = (options) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: '', // 发送者
      to: options.email, // 接受者,可以同时发送多个以逗号隔开
      subject: options.subject, // 标题
      html: options.email
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err)
      }
      resolve(info)
    })
  })
}

module.exports = mail
