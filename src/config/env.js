/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */
const productionUrl = 'https://api.raoul1996.cn'
const developmentUrl = 'http://127.0.0.1:3000'
const unKnowUrl = 'https://api.raoul196.cn'
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = developmentUrl
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = productionUrl
} else {
  baseUrl = unKnowUrl
}

export {
  baseUrl
}
