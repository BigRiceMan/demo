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
    "标题": obj.arc.title,
    "内容": obj.arc.body

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