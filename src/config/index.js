const productionUrl = 'https://api.raoul1996.cn'
const developmentUrl = 'http://127.0.0.1:3000'
let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = developmentUrl
} else {
  baseUrl = productionUrl
}
export { baseUrl}
