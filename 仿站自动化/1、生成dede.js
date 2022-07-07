const fs = require('fs')
const cheerio = require('cheerio')

const { output_path, base_path, css_path } = require('./peizhi.js')
console.log(base_path)
const type_arr = ['index', 'list', 'article']
console.log(base_path)
for (let type_item of type_arr) {
  fs.readFile(base_path + type_item + '.html', 'utf-8', function (err, data) {
    if (err) return console.log('读取文件失败：' + err.message)
    const $ = cheerio.load(data)
    const $2 = cheerio.load(data)
    let scripts = $("script")
    let links = $("link")
    let dede_head = dede["head_" + type_item] + dede.head_pre
    $2("head").html(dede_head)
    $2("script").remove()
    $2("link").remove()
    $2("head").append(links)

    let count_obj = {}
    $2("div[class]").each(function (idx, el) {
      let cls = $2(this).attr("class")
      count_obj[idx] = {}
      count_obj[idx][cls] = count_obj[idx][cls] == undefined ? 1 : ++count_obj[idx][cls];
      count_obj[idx]["obj"] = $2(this)
    })
    let target_arr = []
    $2("li:has(a)").each(function (idx, el) {
      let flag = false
      for (let i in target_arr) {
        if ($(target_arr[i]).parent() === $2(this).parent()) {
          flag = true
          break
        }
      }
      if (!flag) {
        target_arr.push($2(this))
      }
    })
    for (let i in count_obj) {
      for (let l in count_obj[i]) {
        if (count_obj[i][l] > 1) {
          let flag = false
          for (let j in target_arr) {
            if ($(target_arr[j]) === $(count_obj[i]["obj"])) {
              flag = true
              break
            }
          }
          if (!flag) {
            target_arr.push($2(this))
          }
        }
      }
    }

    // 遍历target_arr 
    for (let i in target_arr) {
      let cls = target_arr[i].attr("class")
      if (target_arr[i].prev()) {
        let count = 0
        let len = target_arr[i].siblings().length;
        let sum = 0
        let ct = 0
        let avg = 0
        // console.log(len)
        target_arr[i].siblings().each(function () {

          if ($2(this).attr("class") == cls) {
            ++count;
            $2(this).find("a").each(function () {
              sum += $2(this).text().replace(" ", "").length
              ++ct
            })
          }
          // 如果全部兄弟元素相同
          if (count === len) {
            target_arr[i].siblings().remove()
            avg = sum / ct
            if (avg < 8) {
              target_arr[i].find("a").each(function () {
                $2(this).attr("href", "{dede:field.typeurl/}")
                $2(this).text("{dede:field.typename/}")
              })
              target_arr[i].parent().html("{dede:channelartlist typeid='1,2,3,4,5,6,7,8' row='" + (len + 1) + "'}" + target_arr[i].parent().html() + "{/dede:channelartlist}")

            } else {
              target_arr[i].find("a").each(function () {
                $2(this).attr("href", "[field:arcurl/]")
                if ($2(this).attr("title")) {
                  $2(this).attr("title", "[field:fulltitle/]")
                }
                $2(this).text("[field:fulltitle/]")
              })
              target_arr[i].parent().html("{dede:arclist  orderby='rand' typeid='1,2,3,4,5,6,7,8' row=" + (len + 1) + " }" + target_arr[i].parent().html() + "{/dede:arclist}")

            }
            count = 0
            sum = 0
            ct = 0
            avg = 0
          }
        })

      }
    }
    $2("a:parent").each(function () {
      let count = 0
      let that = $2(this)
      let len = that.siblings().length

      that.siblings().each(function () {
        if ($2(this).get(0).name === that.get(0).name) {
          ++count
        }
        // 如果相同类型 则判断是文章还是标签
        if (count === len) {
          let sum = 0
          let ct = 0
          let avg = 0
          that.siblings().each(function () {
            sum += $2(this).text().replace(" ", "").length
            ++ct
          })
          avg = sum / ct
          $2(this).siblings().remove()
          if (avg < 8) {
            $2(this).attr("href", "{dede:field.typeurl/}")
            $2(this).text("{dede:field.typename/}")
            $2(this).parent().html("{dede:channelartlist typeid='1,2,3,4,5,6,7,8' row='" + (len + 1) + "'}" + $2(this).parent().html() + "{/dede:channelartlist}")

          } else {
            $2(this).attr("href", "[field:arcurl/]")
            if ($2(this).attr("title")) {
              $2(this).attr("title", "[field:fulltitle/]")
            }
            $2(this).text("[field:fulltitle/]")
            $2(this).parent().html("{dede:arclist  orderby='rand' typeid='1,2,3,4,5,6,7,8' row=" + (len + 1) + " }" + $2(this).parent().html() + "{/dede:arclist}")

          }
          count = 0
        }
      })
    })
    $2("a[title]:parent").each(function () {
      if ($2(this).attr('href') !== "[field:arcurl/]" && $2(this).attr('href') !== "/" && $2(this).attr('href').indexOf('#') !== 0) {
        $2(this).attr('href', "[field:arcurl/]")
        $2(this).attr('title', "[field:fulltitle/]")
        $2(this).attr('href', "[field:arcurl/]")
        $2(this).text("[field:fulltitle/]")
      }
    })
    $2("a[href]:parent").each(function () {
      if ($2(this).attr('href') !== "/" && $2(this).attr('href').indexOf('#') !== 0) {
        if ($2(this).text().length > 8) {
          $2(this).attr('href', "[field:arcurl/]")
          $2(this).attr('title', "[field:fulltitle/]")
          $2(this).attr('href', "[field:arcurl/]")
          $2(this).text("[field:fulltitle/]")
        }
        if ($2(this).text().length > 2 && $2(this).text().length < 8) {
          $2(this).attr('href', "{dede:field.typeurl/}")
          $2(this).attr('title', "{dede:field.typename/}")
          $2(this).attr('href', "{dede:field.typeurl/}")
          $2(this).text("{dede:field.typename/}")
        }
      }
    })
    $2("img[alt]").each(function () {
      if ($2(this).parent().get(0).name == 'a') {
        $2(this).attr('alt', "[field:fulltitle/]")
        $2(this).parent().attr('href', "[field:arcurl/]")
        $2(this).parent().attr('title', "[field:fulltitle/]")
        $2(this).parent().attr('href', "[field:arcurl/]")
        $2(this).parent().text("[field:fulltitle/]")
      }
    })

    $2("li:parent").each(function () {
      let that = $2(this)
      let len = that.siblings().length

      that.siblings().each(function () {

        $2(this).siblings('li').remove()
        $2(this).parent().html("{dede:arclist  orderby='rand' typeid='1,2,3,4,5,6,7,8' row=" + (len + 1) + " }" + $2(this).parent().html() + "{/dede:arclist}")
      })
    })

    $2("body").append(scripts)
    // 替换描述
    let output = $2.html().replace(/>[^<]+\.\.\.\s*</ig, '>' + dede.desc + '<')
    output = output.replace("|", '')
    // 替换相对路径
    output = output.replace(/(=["']{0,1})static\//ig, '$1/static/')
    //  替换外部链接
    output = output.replace(/<link [^>]*?href=['"]*?http[^>]+>/ig, '')
    output = output.replace(/<script [^>]*?src=['"]*?http[^>]+><\/script>/ig, '')
    output = output.replace(/<script [^>]*?type=['"]*?application\/ld\+json[^>]+>[^<]+<\/script>/ig, '')
    output = output.replace(/<script[^>]*?>[^<]+hm.js[^<]+<\/script>/ig, '')
    output = output.replace(/<script[^>]*?>[^<]+push.js[^<]+<\/script>/ig, '')
    output = output.replace(/<script[^>]*?>[^<]+ _hmt [^<]+<\/script>/ig, '')



    // 如果是首页
    if (type_item == 'index') {

    }
    // 如果是列表页
    if (type_item == 'list') {
    }
    // 如果是文章页
    if (type_item == 'article') {

    }
    // console.log(output)
    let typename = 'index'
    if (type_item != 'index') {
      typename = type_item + '_' + 'article'
    }
    // 如果文件不存在
    if (!fs.existsSync(base_path + output_path)) {
      fs.mkdir(base_path + output_path, (mkdir_err) => {
        if (mkdir_err) {
          console.log(mkdir_err)
          return
        }
        console.log("创建文件成功")
      })
    }
    fs.writeFile(base_path + output_path + typename + ".htm", output, 'utf-8', function (errr) {
      if (errr) {
        console.log(errr)
        return
      }
      console.log("写入成功")
    })
  })

}

// let o = {}
// o.page = {}
// o.idx = {}
// o.len = {}
// for (let type_item of type_arr) {
//   let typename = type_item
//   if (type_item != 'index') {
//     typename = type_item + '_' + 'article'
//   }
//   o.page[type_item] = fs.readFileSync(base_path + typename + '.htm', 'utf-8')
//   // 总字数
//   o.len[type_item] = o.page[type_item].length
//   console.log(type_item + "的总字数" + o.len[type_item])
//   // 查找下标
//   o.idx[type_item] = 0
//   // 初始下标

//   o.idx[type_item] = o.page[type_item].indexOf("<body")
//   console.log(type_item + "的body下标为" + o.idx[type_item])
//   if (o.idx[type_item] > 0) {
//     o.idx[type_item] = o.page[type_item].indexOf(">", o.idx[type_item]) + 1
//     console.log(type_item + "的初始下标为" + o.idx[type_item])
//   }
// }










var dede = {}
dede.head_pre = `
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
<meta name="MobileOptimized" content="width">
<meta name="HandheldFriendly" content="true">
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Cache-Control" content="no-transform">
<meta http-equiv="Cache-Control" content="no-siteapp">
<meta name="renderer" content="webkit">`
dede.head_index = `
<title>{dede:global.cfg_webname/}</title>
<meta name="keywords" content="{dede:global.cfg_keywords/}"/>
<meta name="description" content="{dede:global.cfg_description/}"/>`
dede.head_list = `
<title>{dede:field.seotitle/}</title>
<meta name="keywords" content="{dede:field name='keywords'/}" />
<meta name="description" content="{dede:field name='description'  function='html2text(@me)'/}" />`
dede.head_article = `
<title>{dede:field.title/}</title>
<meta name="keywords" content="{dede:field.keywords/}" />
<meta name="description" content="{dede:field.description  function='html2text(@me)'/}" />`

dede.desc = `[field:description function="cn_substr(@me,250)"/]...`
dede.time = ``

dede.toMobile = `<script>
let mobile_url="http://chrctc.cn/"
if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {

  if (window.location.href.indexOf("?mobile") < 0) {

    try {

      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {

        window.location.href =mobile_url

      } else if (/iPad/i.test(navigator.userAgent)) {

      } else {

        window.location.href = mobile_url

      }

    } catch (e) {}

  }

}
</script>`
