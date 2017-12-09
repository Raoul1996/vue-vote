'use strict'

/**
 * 延时函数
 * @param ms 延时时间
 * @returns {Promise}
 */
export function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
    console.log(`sleep ${ms / 1000}s`)
  })
}

/**
 * 拼接 url
 * @param url
 * @param params
 * @returns {*}
 */
export function params2url (url, params) {
  if (params) {
    if (typeof params === 'object') {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          url = url + '/' + params[key]
        }
      })
    } else {
      url = url + '/' + params
    }
  }
  return url
}

/**
 * 拼接 url 函数
 * @param url 传入的 base Url
 * @param query 传入的query
 * @returns {*}
 */
export function query2url (url, query) {
  let dataStr = '' // 数据拼接字符串
  if (query) {
    Object.keys(query).forEach(key => {
      dataStr += key + '=' + query[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }
  return url
}

/**
 * 路由跳转
 * @param that 传入的this
 * @param path 需要跳转的路由地址
 * @param fix 如果路由地址前面不是 '/'，是否添加
 */
export function goto (that, path, fix = true) {
  // 修复不是绝对地址的情况，需要根据 fix 的值进行判断
  if (path[0] !== '/' && fix) {
    let pathArr = path.split('')
    pathArr.unshift('/')
    path = pathArr.join('')
  }
  that.$router.push(path)
}

/**
 * 延时跳转函数
 * @param that 传入的 this
 * @param path 跳转的路由地址
 * @param ms 延时时间
 * @returns {Promise.<void>}
 */
export async function lazyGoto (that, path, ms = 1000) {
  await sleep(ms)
  goto(that, path)
}
