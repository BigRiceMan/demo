const fs = require('fs')
const cheerio = require('cheerio')
<<<<<<< HEAD
const base_path = `D://Users/zsbigdata01/Desktop/集团官网/www.77cn.com.cn/`
const base_path2 = `H://桌面/1首页/www.chagougou.com/`
=======
const base_path2 = `D://Users/zsbigdata01/Desktop/集团官网/www.feimiao.cn/`
const base_path = `H://桌面/1首页/www.chagougou.com/`
>>>>>>> 258612597b14ba40014c8c035e1751358ee661e8

let css_str = ""
let tmp = ""
let data = fs.readFileSync(base_path2 + 'index.htm', 'utf-8')
const $ = cheerio.load(data)
$("link").each((idx, el) => {
  if ($(el).attr('href').indexOf("css") < 0) return
  tmp = fs.readFileSync(base_path2 + $(el).attr('href'), 'utf-8')
  if (!tmp) {
    console.log("读取失败")
  } else {
    css_str += tmp + '\r\n'
    $(el).remove()
  }
})
// console.log(output)
fs.writeFileSync(base_path2 + "css/index_output.css", css_str, 'utf-8')
$("head").append('<link type="text/css" rel="stylesheet" href="css/index_output.css">')

let css_data = fs.readFileSync(base_path2 + "css/index_output.css", 'utf-8')

if (css_data) {
  let cn_arr = new Set()
  let id_el = []
  $("*[class]").each(function (idx, el) {
    let cn = $(el).attr('class')
    if (cn.split(" ").length > 0) {
      cn.split(" ").forEach(function (el, idx) {
        if (el != "") {
          cn_arr.add(el.replace(" ", ""))
        }
      })
    }
  })
  cn_arr = Array.from(cn_arr).sort((a, b) => { return a.length < b.length })
  cn_arr.forEach(function (cn, idx) {
    if (!cn) { return }
    let tmp = Math.random().toString().slice(2, 7)
    let subidx = css_data.indexOf(cn)
    if (subidx > -1) {
      let supidx = subidx + cn.length
      let cn_css = css_data.slice(subidx, supidx)
      if (cn == cn_css.replace(" ", "") || cn == cn_css.replace(",", "")) {
        let that = $('.' + cn)
        if (!that) return;
        that.each(function (index, ele) {
          $(ele).removeClass(cn)
          console.log($(ele).attr("class"))
          console.log("---------")
          $(ele).addClass(cn + "_" + tmp)
          console.log($(ele).attr("class"))

        })
<<<<<<< HEAD
        let reg = new RegExp("\\.(" + cn + ")+((\\s)|(\\,))", "g")
=======
        let reg = new RegExp("\\.(" + cn + ")+((\\s)|(\\,)|{)", "g")
>>>>>>> 258612597b14ba40014c8c035e1751358ee661e8
        css_data = css_data.replace(reg, "." + "$1_" + tmp + "$2")

      }
      cn_css = null
    }

  })


  $("*[id]").each(function (idx, el) {
    let id = $(el).attr('id')
    if (id.split(" ").length > 0 && id.split(" ").length < 2) {
      if (css_data) {
        let subidx = css_data.indexOf(id)
        if (subidx > -1) {
          let supidx = css_data.indexOf(" ", subidx)
          let id_css = css_data.slice(subidx, supidx)
          if (id == id_css.replace(" ", "")) {
            let tmp = Math.random().toString().slice(2, 7)
            css_data = css_data.slice(0, subidx) + id + "_" + tmp + " " + css_data.slice(supidx)
            id_el.push(
              {
                el: $(el),
                tmp: id + "_" + tmp
              })
          }
        }
      }
    }
  })


  id_el.forEach(function (el, idx) {

    el["el"].attr('id', el["tmp"])
  })
  fs.writeFileSync(base_path2 + "css/index_output.css", css_data, 'utf-8')
  fs.writeFile(base_path2 + 'index.htm', $.html(), 'utf-8', function (err) {
    if (err) return console.log(err)
    console.log("写入成功")
  })
}


















var dede = {}
dede.head_index = `	<title>{dede:global.cfg_webname/}</title>
<meta name="keywords" content="{dede:global.cfg_keywords/}"/>
<meta name="description" content="{dede:global.cfg_description/}"/>`
dede.desc = `[field:description function="cn_substr(@me,250)"/]...`
