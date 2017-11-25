export function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
    console.log(`sleep ${ms / 1000}s`)
  })
}

export function goto (that, path) {
  that.$router.push(path)
}

export async function lazyGoto (that, path, ms = 1000) {
  await sleep(ms)
  that.$router.push(path)
}

export function query2url (url, query, params) {
  if (params) {
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url = url + '/' + params[key]
      }
    })
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
