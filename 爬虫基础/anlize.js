// ==UserScript==
// @name         anlizePage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require     https://code.jquery.com/jquery-2.2.4.js
// @require     https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @include        *
// @icon         https://icons.duckduckgo.com/ip2/easyai.tech.ico
// @grant        none
// ==/UserScript==
jQuery.noConflict();
(function (jQuery) {
  let $ = jQuery
  window.obj = {}
  obj.root_el = $("*:visible")
  // 寻找主体
  obj.body_el = obj.root_el.filter(function (idx) { return $(this).offset().top > 70 })
  obj.body_computedArea = obj.body_el.map((idx, ele) => { return $(ele).width() * $(ele).height() })
  // 计算总面积
  obj.body_maxValue = Math.max.apply(null, obj.body_computedArea)
  // 最大的面积的元素
  obj.body_maxValueId = Array.from(obj.body_computedArea).indexOf(obj.body_maxValue)
  obj.body_targetEl = obj.body_el[obj.body_maxValueId]

  // 生成采集侠对象
  obj.cjx = {}
  // 当前编码模式
  obj.cjx.charSet = document.characterSet

  //判定为首页 
  obj.index = {}
  obj.index.tmp = $(obj.root_el).find('img[src],div[class]').filter((idx, el) => {
    if (el.nodeName === 'DIV') {
      if ($(el).css("background-image") == 'none') {
        return false
      }
    }
    return $(el).height() >= 250 && $(el).offset().top <= 300 && $(el).width() >= 300
  })
  if (location.pathname == '/' || location.pathname.indexOf('/index.') == 0) {
    console.log("大概率首页")
  } else if (obj.index.tmp.length > 0) {
    console.log("可能为首页")
  } else {
    console.log("不为首页")
  }
  // 是否有自动加载
  // 获取列表
  // 列表的特征
  // 多个文章组成
  // 高度比较高
  // 宽度小于等于主体部分
  // 有文字描述
  // 有标题
  // 有链接
  // 有列表才有分页
  // obj.nav.tmp = $('body a[href]:contains(首页)').filter((idx, el) => { 
  //   return $(el).offset().top<301
  // }).each((idx,el)=>{

  // }) 
  obj.nav = {}
  obj.nav["2nd"] = {}
  obj.nav["2nd"]['len'] = 0
  obj.nav["3rd"] = {}
  obj.nav["3rd"]['len'] = 0
  obj.nav['more'] = {}
  obj.nav["more"]['len'] = 0

  obj.host = location.host
  obj.nav.tmp = $('a[href]:parent').filter((idx, el) => {
    let cur_url = completionUrl($(el).attr('href'))
    let flag = false
    if (cur_url.indexOf(location.protocol + "//" + location.host) != 0) {
      return false
    }
    if (cur_url.indexOf('.htm') > -1) {
      return false
    }
    if (cur_url.indexOf('.asp') > -1) {
      return false
    }
    if (cur_url.indexOf('.php') > -1) {
      return false
    }
    if (cur_url.indexOf('.jsp') > -1) {
      return false
    }
    let txt = $(el).text().replace(' ', '')
    if (txt.length > 1 && txt.length < 9) {
      flag = true
    }
    if (txt.indexOf('/') > 0) {
      if (txt.length > 3 && txt.length < 17) {
        flag = true
      }
    }
    if (flag) {
      let cur_url_arr = cur_url.split("/")
      for (let key in cur_url_arr) {
        if (cur_url_arr[key] == "") {
          cur_url_arr.splice(key, 1)
        }
      }
      // console.log(cur_url_arr.length) 
      if (cur_url_arr.length == 3) {
        obj.nav["2nd"].name = el.innerText.replace(" ", "")
        obj.nav["2nd"].name.href = cur_url_arr
        nav["2nd"].len = nav["2nd"].len + 1
        obj.nav["2nd"].name.id = nav["2nd"].len
      } else if (cur_url_arr.length == 4) {
        obj.nav["3rd"].name = el.innerText.replace(" ", "")
        nav["3rd"].len = nav["3rd"].len + 1
        obj.nav["3rd"].name.href = cur_url_arr
        obj.nav["3rd"].name.id = nav["3rd"].len
      } else {
        if (cur_url_arr.length > 4) {
          obj.nav["more"].name = el.innerText.replace(" ", "")
          obj.nav["more"].name.href = cur_url_arr
          nav["more"].len = nav["more"].len + 1
          obj.nav["more"].name.id = nav["more"].len
        }
      }
    }
    return flag

  })
  if (obj.nav['2nd'].len > 0) {
    obj.nav.2nd>0
  }

  obj.list = {}
  obj.list.root = $(obj.body_targetEl).find('*:parent')
  obj.list.title = $(obj.list.root).find('a').filter((idx, el) => {
    return (parseInt($(el).css('font-weight')) > 500 || parseInt($(el).css('font-size')) >= 16) && $(el).text().trim().length > 4 && $(el).text().trim().length < 40 && $(el).offset().top > 0 && $(el).offset().left > 0
  })
  obj.list.computedLeft = Array.from(obj.list.title.map((idx, ele) => { return $(ele).offset().left }))
  obj.list.el = []
  if (obj.list.computedLeft.length > 0) {
    count_obj = {}
    for (let item of obj.list.computedLeft) {
      count_obj[item] = count_obj[item] == undefined ? 0 : ++count_obj[item]
    }
    // 得到排列数组 获取最多的数的值
    count_tmp = 0
    for (let key in count_obj) {
      if (count_tmp < count_obj[key]) {
        count_tmp = count_obj[key]
      }
    }
    // 如果是等于最大值,则获取maxValue
    for (let key in count_obj) {
      if (count_obj[key] == count_tmp) {
        obj.list.maxValue = key
      }
    }
    for (let key in obj.list.computedLeft) {
      if (obj.list.computedLeft[key] == obj.list.maxValue) {
        obj.list.el.push(obj.list.title[key])
      }
    }
  }
  // 是否有列表
  obj.has_list = obj.list.el.length > 2
  if (obj.has_list) {
    let tmp1 = $(obj.list.el).eq(0).parent()
    let tmp2 = $(obj.list.el).eq(1)
    while (tmp1.has(tmp2).length == 0) {
      tmp1 = tmp1.parent()
    }
    obj.list.elWrap = tmp1[0]
  }
  // 寻找分页
  // 有列表才有分页 一般分页在下面
  if (obj.list.elWrap) {
    obj.pagelist_el = obj.root_el.filter(function (idx) { return $(this).offset().top > 70 && /^[1-9]+$/.test($(this).text().replace(" ", "")) && $(this).css("cursor") === 'pointer' && $(this).offset().top > $(obj.list.elWrap).offset().top + $(obj.list.elWrap).height() })
    obj.pagelist_computedTop = Array.from(obj.pagelist_el.map((idx, ele) => { return $(ele).offset().top }))
    obj.pagelist_targetEl = []
    if (obj.pagelist_computedTop.length > 0) {
      var count_obj = {}
      for (let item of obj.pagelist_computedTop) {
        count_obj[item] = count_obj[item] == undefined ? 0 : ++count_obj[item]
      }
      // 得到排列数组 获取最多的数的值
      var count_tmp = 0
      for (let key in count_obj) {
        if (count_tmp < count_obj[key]) {
          count_tmp = count_obj[key]
        }
      }
      // 如果是等于最大值,则获取maxValue
      for (let key in count_obj) {
        if (count_obj[key] == count_tmp) {
          obj.pagelist_maxValue = key
        }
      }
      for (let key in obj.pagelist_computedTop) {
        if (obj.pagelist_computedTop[key] == obj.pagelist_maxValue) {
          obj.pagelist_targetEl.push(obj.pagelist_el[key])
        }
      }
    }
  }
  // 是否有分页
  obj.has_pagelist = obj.pagelist_targetEl && obj.pagelist_targetEl.length > 2
  if (obj.has_pagelist) {
    let tmp1 = $(obj.pagelist_targetEl).eq(0).parent()
    let tmp2 = $(obj.pagelist_targetEl).eq(1)
    while (tmp1.has(tmp2).length == 0) {
      tmp1 = tmp1.parent()
    }
    obj.pagelist_targetElWrap = tmp1[0]
  }




  // 文章页开始
  obj.arc = {}
  obj.arc.root = $(obj.body_targetEl).find('*:parent:visible')
  // 获取文章标题
  obj.arc.tmp_title = $(obj.arc.root).filter((idx, el) => {
    return parseInt($(el).css('font-weight')) >= 700 && parseInt($(el).css('font-size')) >= 16 && $(el).text().trim().length > 4 && $(el).text().trim().length < 40 && (el.nodeName === 'H1' || el.nodeName === 'H2' || el.nodeName === 'H3' || el.nodeName === 'div')
  })
  obj.arc.title = undefined
  if (obj.arc.tmp_title.length > 1) {
    obj.arc.computedFontSize = Array.from(obj.arc.tmp_title.map((idx, el) => { return parseInt($(el).css('font-size')) }))
    obj.arc.maxValue = Math.max.apply(null, obj.arc.computedFontSize)
    // 最大的面积的元素
    obj.arc.maxValueId = Array.from(obj.arc.computedFontSize).indexOf(obj.arc.maxValue)
    obj.arc.title = obj.arc.tmp_title[obj.arc.maxValueId]
  } else {
    obj.arc.title = obj.arc.tmp_title[0]
  }
  // 获取文章内容
  if (obj.arc.title) {
    obj.arc.tmp_body = $(obj.arc.root).filter((idx, el) => {
      return $(el).text().trim().length >= 200 && $(el).offset().top > $(obj.arc.title).offset().top
    })
  }
  obj.arc.body = undefined
  if (obj.arc.tmp_body) {
    if (obj.arc.tmp_body.length > 1) {
      obj.arc.computedWidth = Array.from(obj.arc.tmp_body.map((idx, ele) => { return $(ele).width() * $(ele).height() }))
      // 计算总面积
      obj.arc.maxValue = Math.max.apply(null, obj.arc.computedWidth)
      // 最大的面积的元素
      obj.arc.maxValueId = Array.from(obj.arc.computedWidth).indexOf(obj.arc.maxValue)
      obj.arc.body = obj.arc.tmp_body[obj.arc.maxValueId]
    } else {
      obj.arc.body = obj.arc.tmp_body[0]
    }
  }
  var page = {
    'body': obj.body_targetEl,
    'list': obj.list.elWrap,
    "pagelist": obj.pagelist_targetElWrap,
    "arcTitle": obj.arc.title
  }
  if (obj.has_list) {
    page["是否有列表"] = "是"
  } else {
    page["是否有列表"] = "否"
  }
  if (obj.has_pagelist) {
    page["是否有分页"] = "是"
    obj.list.pagelist_link = _.uniq(Array.from($(obj.pagelist_targetElWrap).find('a[href]').map((idx, el) => { return $(el).attr('href') })))
    for (let key in obj.list.pagelist_link) {
      if (obj.list.pagelist_link[key].indexOf(':') < 0) {
        let str = ""
        str = location.protocol
        if (obj.list.pagelist_link[key].indexOf('//') == 0) {
          str += obj.list.pagelist_link[key]
        } else if (obj.list.pagelist_link[key].indexOf('/') == 0) {
          str += "//" + location.host + obj.list.pagelist_link[key]
        } else {
          let tmp = location.pathname.split('/')
          str += "//" + location.host + tmp.slice(0, tmp.length - 1).join("/") + '/' + obj.list.pagelist_link[key]
        }
        obj.list.pagelist_link[key] = str
      }
    }
    let a = obj.list.pagelist_link[1].split("")
    let b = obj.list.pagelist_link[2].split("")
    let diff = _.difference(a, b).join("")
    // if(confirm("检查到分页,是否采集分页网址")){}
    if (/\d+/.test(diff)) {
      let idx = a.indexOf(diff)
      if (idx > -1) {
        obj.cjx.listUrl = obj.list.pagelist_link[1].replace(diff, '[' + diff + '-' + '300' + ']')
        let arcUrl_tmp = $(obj.list.elWrap).find(a[href])[0].href
        obj.cjx.arcUrl = .
      }
    }



  } else {
    page["是否有分页"] = "否"
  }
  window.page = page
})(jQuery)



function completionUrl(str) {
  if (!str) { return }
  if (str.indexOf(':') < 0) {
    let str = ""
    str = location.protocol
    if (str.indexOf('//') == 0) {
      str += str
    } else if (str.indexOf('/') == 0) {
      str += "//" + location.host + str
    } else {
      let tmp = location.pathname.split('/')
      str += "//" + location.host + tmp.slice(0, tmp.length - 1).join("/") + '/' + str
    }
  }
  return str
}