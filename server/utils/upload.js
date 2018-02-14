const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const userModel = require('../model/user')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)

  return new Promise((resolve, reject) => {
    let result = {
      success: false,
      message: '',
      data: null
    }

    // 解析请求文件事件
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function () {
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `/${fileType}/${fileName}`
        }
        const {id} = ctx.state.user
        const avatar = result.data.pictureUrl
        userModel.updateUserAvatar({id, avatar})
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', function () {
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function (err) {
      console.log(err)
      reject(result)
    })

    req.pipe(busboy)
  })
}
module.exports = {
  uploadFile
}
