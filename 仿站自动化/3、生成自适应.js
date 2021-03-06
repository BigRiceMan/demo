const fs = require('fs')
const cheerio = require('cheerio')
const { css } = require('cheerio/lib/api/css')

const { web_name, base_path, css_path } = require('./peizhi.js')
let data = fs.readFileSync(base_path + 'index.htm', 'utf-8')
const $ = cheerio.load(data)
let css_data = fs.readFileSync(base_path + css_path + "index_output.css", 'utf-8')
if (css_data) {
  // 匹配CSS
  let match_arr = [...css_data.matchAll(/([\r\n]|\})([^\{]+)\{[^\}]*?width:([^;]*?)px/g)]
  let match_arr2 = [...css_data.matchAll(/([\r\n]|\})([^\{]+)\{[^\}]*?height:([^;]*?)px/g)]


  let str = '<style>@media screen and (max-width: 960px) {'
  for (let item of match_arr) {
    if (parseInt(item[3]) >= 350) {

      str += item[2] + "{width:100%;padding:0;margin:0;}"
    }
    if (parseInt(item[3]) < 350) {
      str += item[2] + "{display:none;}"
    }
  }
  str += "}</style>";
  $("body").append(str)
  let str2 = '<style>@media screen and (max-width: 960px) {'
  for (let item of match_arr2) {
    if (parseInt(item[3]) >= 300) {

      str2 += item[2] + "{display:none;}"
    }
  }
  str2 += "}</style>";
  $("body").append(str2)


  fs.writeFile(base_path + 'index.htm', $.html(), 'utf-8', (err) => {
    if (err) return console.log(err)
    console.log("写入成功")
  })

}

