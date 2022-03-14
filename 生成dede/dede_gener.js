const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

fs.readFile(path.join(__dirname, 'index-1.html'), 'utf-8', function (err, data) {
  if (err) return console.log('读取文件失败：' + err.message)
  const $ = cheerio.load(data)
  const $2 = cheerio.load(data)
  let scripts = $("script")
  let links = $("link")
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
              console.log($2(this).attr("href"))
              $2(this).attr("href", "{dede:field.typeurl/}")
              $2(this).text("{dede:field.typename/}")
            })
            target_arr[i].parent().html("{dede:channelartlist typeid='3' row='" + len + "'}" + target_arr[i].parent().html() + "{/dede:channelartlist}")

          } else {
            target_arr[i].find("a").each(function () {
              $2(this).attr("href", "[field:arcurl/]")
              $2(this).text("[field:title/]")
            })
            target_arr[i].parent().html("{dede:arclist  typeid='' row=" + len + " }" + target_arr[i].parent().html() + "{/dede:arclist}")

          }
          count = 0
          sum = 0
          ct = 0
          avg = 0
        }
      })

    }
  }
  let a_arr = []
  $2("a:parent").each(function () {

  })
  console.log($2.html())

})
















var dede = {}
dede.head_index = `	<title>{dede:global.cfg_webname/}</title>
<meta name="keywords" content="{dede:global.cfg_keywords/}"/>
<meta name="description" content="{dede:global.cfg_description/}"/>`
