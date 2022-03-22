const fs = require('fs')
const cheerio = require('cheerio')
<<<<<<< HEAD
const base_path = `D://Users/zsbigdata01/Desktop/集团官网/www.77cn.com.cn/`
const base_path2 = `H://桌面/1首页/www.chagougou.com/`
=======
const base_path = `D://Users/zsbigdata01/Desktop/集团官网/www.feimiao.cn/`
>>>>>>> 258612597b14ba40014c8c035e1751358ee661e8


console.log(base_path2)
fs.readFile(base_path2 + 'index.html', 'utf-8', function (err, data) {
  if (err) return console.log('读取文件失败：' + err.message)
  const $ = cheerio.load(data)
  const $2 = cheerio.load(data)
  let scripts = $("script")
  let links = $("link")
  $2("head").html("")
  $2("head").html(dede.head_index)
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
      if ($2(target_arr[i]).parent() === $2(this).parent()) {
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
          if ($2(target_arr[j]) === $(count_obj[i]["obj"])) {
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
            target_arr[i].parent().html("{dede:channelartlist typeid='3' row='" + (len + 1) + "'}" + target_arr[i].parent().html() + "{/dede:channelartlist}")

          } else {
            target_arr[i].find("a").each(function () {
              $2(this).attr("href", "[field:arcurl/]")
              if ($2(this).attr("title")) {
                $2(this).attr("title", "[field:title/]")
              }
              $2(this).text("[field:title/]")
            })
            target_arr[i].parent().html("{dede:arclist  typeid='' row=" + (len + 1) + " }" + target_arr[i].parent().html() + "{/dede:arclist}")

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
          $2(this).parent().html("{dede:channelartlist typeid='3' row='" + (len + 1) + "'}" + $2(this).parent().html() + "{/dede:channelartlist}")

        } else {
          $2(this).attr("href", "[field:arcurl/]")
          if ($2(this).attr("title")) {
            $2(this).attr("title", "[field:title/]")
          }
          $2(this).text("[field:title/]")
          $2(this).parent().html("{dede:arclist  typeid='' row=" + (len + 1) + " }" + $2(this).parent().html() + "{/dede:arclist}")

        }
        count = 0
      }
    })
  })
  $2("a[title]:parent").each(function () {
    if ($2(this).attr('href') !== "[field:arcurl/]" && $2(this).attr('href') !== "/" && $2(this).attr('href').indexOf('#') !== 0) {
      $2(this).attr('href', "[field:arcurl/]")
      $2(this).attr('title', "[field:title/]")
      $2(this).attr('href', "[field:arcurl/]")
      $2(this).text("[field:title/]")
    }
  })
  $2("a[href]:parent").each(function () {
    if ($2(this).attr('href') !== "/" && $2(this).attr('href').indexOf('#') !== 0) {
      if ($2(this).text().length > 8) {
        $2(this).attr('href', "[field:arcurl/]")
        $2(this).attr('title', "[field:title/]")
        $2(this).attr('href', "[field:arcurl/]")
        $2(this).text("[field:title/]")
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
      $2(this).attr('alt', "[field:title/]")
      $2(this).parent().attr('href', "[field:arcurl/]")
      $2(this).parent().attr('title', "[field:title/]")
      $2(this).parent().attr('href', "[field:arcurl/]")
      $2(this).parent().text("[field:title/]")
    }
  })

  $2("li:parent").each(function () {
    let that = $2(this)
    let len = that.siblings().length

    that.siblings().each(function () {

      $2(this).siblings('li').remove()
      $2(this).parent().html("{dede:arclist  typeid='' row=" + (len + 1) + " }" + $2(this).parent().html() + "{/dede:arclist}")
    })
  })

  $2("body").append(scripts)
  let output = $2.html().replace(/>[^<]+\.\.\.\s*</ig, '>' + dede.desc + '<')
  output = output.replace("|", '')
  // console.log(output)
  fs.writeFile(base_path2 + "index.htm", output, 'utf-8', function (errr) {
    if (errr) {
      console.log(err)
      return
    }
    console.log("写入成功")
  })
})
















var dede = {}
dede.head_index = `	<title>{dede:global.cfg_webname/}</title>
<meta name="keywords" content="{dede:global.cfg_keywords/}"/>
<meta name="description" content="{dede:global.cfg_description/}"/>`
dede.desc = `[field:description function="cn_substr(@me,250)"/]...`
