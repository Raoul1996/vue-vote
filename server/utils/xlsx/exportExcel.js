const nodeExcel = require('excel-export')

module.exports = (_headers, rows) => {
  let conf = {}
  conf.name = 'sheet1'
  conf.cols = []
  for (let i = 0; i < _headers.length; i++) {
    let col = {}
    col.caption = _headers[i].caption
    col.type = _headers[i].type
    conf.cols.push(col)
  }
  conf.rows = rows
  let result = nodeExcel.execute(conf)
  return result
}
