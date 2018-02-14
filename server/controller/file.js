'use strict'
// const fileModel = require('../model/vote')
// const ERROR = require('../utils/errorMap')
const path = require('path')
const {uploadFile} = require('../utils/upload')

class fileController {
  static async index(ctx) {
    // ctx.body = 'index'
    ctx.body = 'hello upload'
  }

  static async upload(ctx) {
    let result = {success: false}
    let serverFilePath = path.join(__dirname, '../public')
    result = await uploadFile(ctx, {
      fileType: 'file',
      path: serverFilePath
    })
    ctx.body = result
  }
}

module.exports = fileController
