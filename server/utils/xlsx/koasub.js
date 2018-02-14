/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
const XLSX = require('xlsx')
let data = "a,b,c\n1,2,3".split("\n").map(x => x.split(","))
/* eslint-disable no-undef */
process.on('message', ([m, data] = _) => {
  /* eslint-disable indent */
  switch (m) {
    case 'load data':
      load_data(data)
      break
    case 'get data':
      get_data(data)
      break
    case 'get file':
      get_file(data)
      break
    default:
      throw m
  }
})

function load_data(file) {
  let wb = XLSX.readFile(file)
  /* generate array of arrays */
  let data = []
  wb.SheetNames.forEach((item, index) => {
    data[index] = XLSX.utils.sheet_to_json(wb.Sheets[item], {header: 1})
  })
  process.send(['done', data])
}

/* helper to generate the workbook object */
function make_book() {
  let ws = XLSX.utils.aoa_to_sheet(data)
  let wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
  return wb
}

function get_data(type) {
  let wb = make_book()
  /* send buffer back */
  process.send(XLSX.write(wb, {type: 'buffer', bookType: type}))
}

function get_file(file) {
  let wb = make_book()
  /* write using XLSX.writeFile */
  XLSX.writeFile(wb, file)
  process.send("wrote to " + file + "\n")
}
