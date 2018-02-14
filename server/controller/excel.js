// const fileModel = require('../model/vote')
// const ERROR = require('../utils/errorMap')
/* eslint-disable */
const path = require('path')
const {uploadFile} = require('../utils/upload')
const {sprintf} = require('printj')
const {IncomingForm} = require('formidable')
const {fork} = require('child_process')
const logit = require('../utils/xlsx/_logit')
const subprocess = fork('utils/xlsx/koasub.js')
const get_data = async (ctx, type) => {
  await new Promise((resolve, reject) => {
    const cb = (data) => {
      ctx.response.body = Buffer(data)
      subprocess.removeListener('message', cb)
      resolve()
    }
    subprocess.on('message', cb)
    subprocess.send(['get data', type])
  })
}

const get_file = async (ctx, file) => {
  await new Promise((resolve, reject) => {
    const cb = (data) => {
      ctx.response.body = Buffer(data)
      subprocess.removeListener('message', cb)
      resolve()
    }
    subprocess.on('message', cb)
    subprocess.send(['get file', file])
  })
}

const load_data = async (ctx, file) => {
  await new Promise((resolve, reject) => {
    const cb = (data) => {
      ctx.response.body = data
      subprocess.removeListener('message', cb)
      resolve(data)
    }
    subprocess.on('message', cb)
    subprocess.send(['load data', file])
  })
}

const post_data = async (ctx) => {
  const keys = Object.keys(ctx.request._files), k = keys[0]
  const data = await load_data(ctx, ctx.request._files[k].path)
}


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

  static async analysis(ctx) {
    const form = new IncomingForm()
    let data = {}
    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) return reject(err)
        ctx.request._fields = fields
        ctx.request._files = files
        resolve()
      })
    }).then(async () => {
      if (ctx.request.query.f) {
        await load_data(ctx, ctx.request.query.f)
      } else {
        await post_data(ctx)
      }
    })
    ctx.body = ctx.response.body[1]
  }
}

module.exports = fileController
