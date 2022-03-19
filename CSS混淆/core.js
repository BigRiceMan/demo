fs.readFile(base_path2 + $(el).attr('href'), 'utf-8', function (err2, data2) {
  if (err2) return console.log('读取文件失败：' + err2.message)
  $("*[class]").each(function (idx, el) {
    let cn = $(el).attr('class')
    if (cn.split(" ").length > 0 && cn.split(" ").length < 2) {
      if (data2) {
        let subidx = data2.indexOf(cn)
        if (subidx > -1) {
          let supidx = data2.indexOf("{", subidx)
          let cn_css = data2.slice(subidx, supidx)
          if (cn == cn_css.replace(" ", "")) {
            console.log("原cn:" + cn + "现cn:" + cn_css.slice(0, cn.length))
          }
        }
      }
    }
  })
})