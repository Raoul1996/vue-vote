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
 * 拼接 url 函数
 * @param url 传入的 base Url
 * @param query 传入的query
 * @param params 传入的 params
 * @returns {*}
 */
export function query2url (url, query, params) {
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
 * @param params 需要跳转的路由的 params 参数
 * @param query 需要跳转的路由的 query 参数
 * @param fix 如果路由地址前面不是 '/'，是否添加
 */
export function goto (that, path, params, query, fix = true) {
  if (typeof path === 'object') {
    // 如果传入的 path 是一个数组，那么就进行拼接
    if (Array.isArray(path)) {
      let temp = ''
      for (let i = 0; i < path.length; i++) {
        if (path[i][0] === '/') temp = temp + path[i]
        else temp = temp + '/' + path[i]
      }
      path = temp
      // console.log(path)
    }
  }
  // 修复不是绝对地址的情况，需要根据 fix 的值进行判断
  if (path[0] !== '/' && fix) {
    let pathArr = path.split('')
    pathArr.unshift('/')
    path = pathArr.join('')
  }
  // console.log(path)
  that.$router.push(query2url(path, query, params))
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
