// ==UserScript==
// @name         Finder
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @icon         https://www.google.com/s2/favicons?domain=baidu.com
// @include      *
// @require      http://libs.baidu.com/jquery/2.0.0/jquery.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// ==/UserScript==
(function (window) {
  // Tool为内置工具包
  var Tool = function () { }
  Tool.prototype.uniq = function (arr) {
    // 去重
    var temp = []
    for (var i = 0; i < arr.length; i++) {
      if (temp.indexOf(arr[i]) == -1) {
        temp.push(arr[i])
      }
    }
    return temp
  }
  Tool.prototype.sleep = function (numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime)
        return;
    }
  }
  Tool.prototype.ajaxPage = function (sId, url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log(1)
          Tool.prototype.IncludeJS(sId, url, xhr.responseText, callback);
        } else {
          console.log('错误')
        }
      }
    }
    //  true表示同步
    xhr.open('GET', url, true)
    xhr.send(null)
  }
  Tool.prototype.IncludeJS = function (sId, fileUrl, source, callback) {
    if ((source != null) && (!document.getElementById(sId))) {
      var body = document.body;
      var oScript = document.createElement("script");
      oScript.language = "javascript";
      oScript.type = "text/javascript";
      oScript.id = sId;
      oScript.defer = true;
      oScript.text = source;
      body.appendChild(oScript);
      console.log('动态加载js成功')
      callback && callback()
    } else {
      console.log('错误3')
    }
  }
  Tool.prototype.createButton = function (text, callback) {
    let node = document.createElement("div")
    if (!text) { text = '下载word' }
    let txt = document.createTextNode(text)
    node.setAttribute('style', 'position:fixed;z-index:999999;width:60px;height:60px;right:0;bottom:0;background:orange;line-height:28px;font-size:16px;color:#fff;cursor:pointer;border-radius:10px;text-align:center;overflow:hidden;')
    node.appendChild(txt)
    document.body.appendChild(node)
    node.onclick = function () {
      callback && callback()
    }
  }
  // source为初始数据源
  var Source = {
    guessPageElement: {
      name: '页面',
      typeArr: ['首页', '列表页', '文章页', "频道页"],
      judeg: 'let countP=0; let isArtice=false;document.querySelectorAll("p").forEach((el,idx)=>{let pW=parseInt(getComputedStyle(el).width); let bW=parseInt(getComputedStyle(document.body).width); let rate=pW/bW; if(rate>=0.3){countP++; if(countP>=3){isArtice=true; } } });if(countP<=5) {page_weight[2] += 2; }else{page_weight[2] += 3; }var lc_h =location.href; var db_text=document.body.innerText; var db_html=document.body.innerHTML; var curUrl_len=lc_h.split("/").length; if(curUrl_len>4){if(/[^\/]+\.html$/.test(lc_h)){page_weight[2]+=3; page_weight[1]+=1; page_weight[3]+=1; } if(db_text.indexOf("上一页")>-1){page_weight[1]+=1; } if(db_text.indexOf("上一页")>-1){page_weight[1]+=1; } if(db_html.indexOf("pagination")>-1){page_weight[1]+=1; } if(/共[0-9]+页/.test(db_text)){page_weight[1]+=1; } if(db_text.indexOf("作者：")>-1){page_weight[2]+=1; } if(db_text.indexOf("来源：")>-1){page_weight[2]+=1; } if(db_text.indexOf("更新时间：")>-1){page_weight[2]+=1; } if(page_weight[0]<3&&page_weight[1]<3&&page_weight[2]<3){page_weight[3]+=2; } }else{if(lc_h.indexOf("index.html")>-1){page_weight[0]+=9; }else if(curUrl_len==3){page_weight[0]+=9; }else{page_weight[0]+=2; page_weight[1]+=2; page_weight[3]+=2; } }'
    },
    guessTypeElement: {
      name: '页面类型',
      typeArr: ["资讯网站", "视频网站", "电商网站", "工具网站", "导航网站"],
      judeg: 'var title=document.title;if(title.indexOf("资讯")>-1){page_weight[0]+=2; }else if (title.indexOf("视频")>-1) {page_weight[1]+=2; }else if (title.indexOf("购物")>-1){page_weight[2]+=2; }else if (title.indexOf("工具")>-1) {page_weight[3]+=2; }else if(title.indexOf("导航")>-1){page_weight[4]+=2; }else{page_weight[0]+=1; } if(this.findTextCount&&this.findTextCount("￥").length>8){page_weight[2]+=3; } var shipinCount=document.getElementsByTagName("source").length; if(shipinCount>30){page_weight[1]+=3; }'
    }
  }
  var tool = new Tool()
  var Finder = function (el) {
    for (var k in el) {
      this[k] = el[k]
    }
  }
  Finder.prototype.hasText = function (node, text) {
    // 支持正则
    var reg = new RegExp(text, "g")
    if (node && node.innerText) {
      var mc = node.innerText.match(reg)
      if (mc) {
        return mc.length > 0
      }
    }
  }
  Finder.prototype.findTextEle = function (text) {
    // 很大的缺陷 只能查一次
    var data = []
    var count = 100
    var idx = 0
    document.body.click()
    document.body.click()
    var selection
    while (window.find(text)) {
      if (idx > count) { break }
      selection = window.getSelection()
      if (selection.anchorNode) {
        data.push(selection.anchorNode.parentElement)
      }
      idx++
    }
    window.scrollTo(0, 0)
    return data
  }
  Finder.prototype.findInnerText = function () {
    var node = document.body
    var nodeArr = node.children
    var data = ""
    // 排除script Style标签里的文字
    for (var j in nodeArr) {
      if (nodeArr[j].nodeName != 'SCRIPT' && nodeArr[j].nodeName != "STYLE" && nodeArr[j].nodeName != "NOSCRIPT") {
        data += nodeArr[j].innerText
      }
    }
    return data
  }
  Finder.prototype.findTextCount = function (text) {
    var count = 0
    var data = this.findInnerText()
    var reg = new RegExp(text, "g")
    // 页面文字
    var mc = data.match(reg)
    if (mc) {
      count = mc.length
    }
    return count
  }
  Finder.prototype.findSpilderHref = function () {
    // 返回Array classNameArr
    var aArr = document.getElementsByTagName("a")
    var nameArr = []
    var countObj = {}
    for (var i = 0; i < aArr.length; i++) {
      var temp = aArr[i].className
      // 排除空值
      if (temp == "") { continue; }
      var count = 0
      if (nameArr.length != 0) {
        for (var j in nameArr) {
          if (nameArr[j] != temp) {
            count += 1
          }
        }
      }
      if (count == nameArr.length) {
        nameArr.push(temp)
        countObj[temp] = 1
      } else {
        countObj[temp] += 1
      }
    }
    var max = 0
    for (var k in countObj) {
      if (countObj[k] > max) {
        max = countObj[k]
      }
    }
    var data = []
    for (var l in countObj) {
      if (countObj[l] == max) {
        data.push(l)
      }
    }
    // console.log("判断 a标签最多的class名为：" + data, "次数为：", max)
    return data
  }
  Finder.prototype.findNavBrother = function (node, arr, nodename, zindex) {
    // 同导航层级数应该相同
    if (node) {
      if (!nodename) { nodename = "A" }
      if (!arr) {
        arr = []
      }
      if (node.nextElementSibling && node.nextElementSibling.nodeName == nodename) {
        while (node.nextElementSibling && node.nextElementSibling.nodeName == nodename) {
          zindex = 0
          // console.log("有直接兄弟节点")
          node = node.nextElementSibling
          arr.push(node)
          this.findNavBrother(node, arr, nodename, zindex)
        }
      } else {
        if (zindex == 0) {
          // console.log("第0级同级节点查找结束")
          return arr
        } else {
          // console.log("无直接兄弟节点,查找父亲兄弟节点")
          if (!node.parentElement) {
            // console.log("没找到直接兄弟节点")
            return arr
          } else {
            // console.log("正在寻找父节点")
            var PN = node.parentElement
            var pindex = 1
            while (!PN.nextElementSibling) {
              if (PN.parentElement) {
                PN = PN.parentElement
                pindex = pindex + 1
              } else {
                // console.log("没找到父节点")
                return arr
              }
            }
            if (zindex && zindex != pindex) {
              // console.log("没找到同级节点")
              return arr
            } else {
              zindex = pindex
              // console.log("正在查找同级节点")
            }
            // console.log("正在寻找兄弟节点")
            var CN = PN.nextElementSibling
            while (CN.firstElementChild && (CN.firstElementChild.nodeName != nodename)) {
              if (CN.firstElementChild) {
                CN = CN.firstElementChild
              } else {
                // console.log("没找到子节点")
                return arr
              }
            }
            if (!CN.firstElementChild) {
              return arr
            }
            CN = CN.firstElementChild
            // console.log("CN=", CN)
            if (CN.innerText != "") {
              // console.log("找到兄弟节点")
              arr.push(CN)
              // console.log("zindex为:" + zindex)
              this.findNavBrother(CN, arr, nodename, zindex)
            }
          }
        }
      }
    } else {
      // console.log("找不到节点")
    }
  }
  Finder.prototype.findNav = function () {
    var a = document.querySelectorAll("a")
    var shouye = []
    var navArr = []
    for (var i = 0; i < a.length; i++) {
      if (a[i] && a[i].innerText.indexOf("首页") != -1) {
        if (a[i].getBoundingClientRect().top < 150 && a[i].getBoundingClientRect().top >= 0) {
          var fSize = parseInt(getComputedStyle(a[i])["fontSize"])
          if (fSize > 12) {
            // 一般导航字体大于12
            shouye.push(a[i])
          }
        }
      }
    }
    this.findNavBrother(shouye[0], navArr, "A")
    return navArr
  }
  Finder.prototype.isContent = function (node) {
    var maxWidth = parseInt(getComputedStyle(document.body).width.replace('auto', '0').replace('px', ''))
    var computed = parseInt(getComputedStyle(node).width.replace('auto', '0').replace('px', ''))
    // 计算比率 如果 55%<=X<=85%则为主体内容
    var ratio = computed / maxWidth
    if ((ratio >= 0.55) && (ratio <= 0.85)) {
      return true
    } else {
      return false
    }
  }
  Finder.prototype.guessType = function (el) {
    if (!el) { return }
    var page_name = el.name
    var page_str = el.typeArr
    var page_weight = []
    for (var k in page_str) {
      page_weight.push(0)
    }
    // 简单的判断
    if (typeof el.judeg == "string") {
      eval(el.judeg)
    }
    // 需要扩展判断
    for (var j in page_str) {
      if ("列表页" == page_str[j]) {
        if (this.findFenye()) {
          page_weight[j] += 5
          console.log("扩展判断生效")
        }
      }

    }


    var MaxValue = Math.max.apply(null, page_weight)
    for (var i = 0; i < page_weight.length; i++) {
      if (page_weight[i] == MaxValue) {
        console.log("猜测当前" + page_name + "为", page_str[i])
        return page_str[i]
      }
    }
  }
  Finder.prototype.guessListChild = function (nodeRoot = document.body) {
    // 不准确
    // 找最多同名className的元素 DIV和LI TD 优先
    if (!nodeRoot) { console.log("找不到"); return }
    var nodes = nodeRoot.querySelectorAll("[class]")
    var classArr = []
    var targetObj
    if (!nodes) { console.log("找不到"); return }
    for (var k in nodes) {
      if (nodes[k].nodeName == 'DIV' || nodes[k].nodeName == 'LI' || nodes[k].nodeName == 'TD' || nodes[k].nodeName == 'A' || nodes[k].nodeName == 'ARTICLE') {
        if (nodes[k].className) {
          classArr.push(nodes[k].className.trim())
        }
      }
    }
    var countArr = {}
    for (var j in classArr) {
      if (!(classArr[j] in countArr)) {
        countArr[classArr[j]] = 0
      } else {
        countArr[classArr[j]] += 1
      }
    }
    var computed = 6
    var maxW = 0
    // 列表页 一般是 7个
    // 一般宽度大 字数多 的才是列表页内容 优先选宽度大的
    for (var n in countArr) {
      if (countArr[n] > computed) {
        var cn = "."
        cn += n.split(" ").join(".")
        var obj = nodeRoot.querySelector(cn)
        if (obj.offsetWidth > maxW) {
          maxW = obj.offsetWidth
          targetObj = obj
        }
      }
    }
    return targetObj
  }
  Finder.prototype.guessBody = function (nodeRoot = document.body) {
    // 猜测网页主体部分
    if (!nodeRoot) { console.log("找不到"); return }
    nodeRoot = nodeRoot
    var nodes = nodeRoot.children
    if (!nodes) { console.log("找不到"); return }
    var temp = {}
    var computed = 0
    var targetObj
    for (var k in nodes) {
      if (nodes[k].nodeType == 1 && nodes[k].nodeName != 'SCRIPT' && nodes[k].nodeName != 'STYLE') {
        if (nodes[k].innerText) {
          temp[k] = nodes[k].innerText.length;
          if (temp[k] > computed) {
            computed = temp[k]
            targetObj = nodes[k]
          }
        }
      }
    }
    if (!targetObj) { console.log("找不到"); return }
    if (targetObj.innerText.length < 20) { console.log("找不到"); return }
    if (this.isContent(targetObj)) {
      // console.log("找到了 targetObj的值为"+targetObj)
      return targetObj
    } else {
      return this.guessBody(targetObj)
    }
  }
  Finder.prototype.findSource = function () {
    window.find('{')
  }
  Finder.prototype.analysePage = function () {
    var allArr = document.querySelectorAll("a")
    var fSizeArr = []
    for (var j = 0; j < allArr.length; j++) {
      var fSize = parseInt(getComputedStyle(allArr[j])["fontSize"])
      fSizeArr.push(fSize)
    }
    // console.log(fSizeArr)
    var copyArr = tool.uniq(fSizeArr).sort().reverse()
    // zindex层级
    var zindex = copyArr.length
    // 一般最后两个是正文的要剪2
    if (zindex > 4) {
      zindex = zindex - 2
    } else if (zindex > 2) {
      zindex = zindex - 1
    }
    console.log("开始分析页面")
    var obj = {}
    obj["基本属性"] = {}
    obj["基本属性"]["标题"] = document.title
    if (document.querySelector('meta[name="description"]')) {
      obj["基本属性"]["描述"] = document.querySelector('meta[name="description"]').content
    }
    obj["当前页面"] = this.guessType(Source.guessPageElement)
    obj["基本属性"]["导航"] = this.findNav()
    obj["基本属性"]["主体部分"] = this.guessBody(document.body)
    if (obj["当前页面"] == "首页") {
      obj["当前页面类型"] = this.guessType(Source.guessTypeElement)
      obj["重要标签"] = []
      for (let i = 0; i < zindex; i++) {
        obj["重要标签"]["z" + (i + 1) + "Arr"] = []
        obj["重要标签"]["z" + (i + 1) + "Text"] = []
        for (let j = 0; j < fSizeArr.length; j++) {
          if (fSizeArr[j] == copyArr[i]) {
            if (allArr[j].innerText != "") {
              var patt = /[\u4e00-\u9fa5]{10,}/;
              // 如果少于10个中文字符才加入
              if (!patt.test(allArr[j].innerText)) {
                obj["重要标签"]["z" + (i + 1) + "Arr"].push(allArr[j])
                obj["重要标签"]["z" + (i + 1) + "Text"].push(allArr[j].innerText)
              }
            }
          }
        }
      }
      obj["基本属性"]["标签集合"] = {}
      obj["基本属性"]["标签集合"]["JS标签"] = document.scripts
      obj["基本属性"]["标签集合"]["CSS标签"] = document.styleSheets
      obj["基本属性"]["标签集合"]["A标签"] = document.querySelectorAll("a")
      obj["基本属性"]["标签集合"]["img标签"] = document.images
      obj["基本属性"]["标签集合"]["iframe标签"] = document.frames
    }
    if (obj["当前页面"] == "列表页") {
      obj["列表页属性"] = this.handleList()
    }
    if (obj["当前页面"] == "文章页") {
      obj["文章页属性"] = this.handleAticle()
      tool.createButton('下载文章', () => {
        tool.ajaxPage(Math.random().toString().replace('0.', '').slice(5), 'https://bigriceman.github.io/demo/get_word.js', () => {
          if (obj["文章页属性"] && obj["文章页属性"]["正文"]) {
            $(obj["文章页属性"]["正文"]).wordExport(document.title || document.location.host)
          } else if (this.guessBody(document.body)) {
            let tmp = this.guessBody(document.body)
            $(tmp).wordExport(document.title || document.location.host)
          } else {
            let tep_1 = prompt('找不到文章,请手动指定标签')
            if ($(tep_1 + "").innerText) {
              $(tep_1 + "").wordExport(document.title || document.location.host)
            }
          }
        })

      })
    }
    return obj
  }
  Finder.prototype.findFenye = function () {

    var fenyeObj = {}
    // 1、获得列表内容
    var listContent = this.guessListChild()
    if (!listContent) { console.log("找不到"); return fenyeObj }
    // 2、寻找分页
    var listH = listContent.offsetHeight
    var listT = listH + listContent.offsetTop
    var listW = listContent.offsetWidth
    var commonParent = document.body
    var is_find_fenye = false
    //三种情况 分页在子元素 分页在兄弟元素 分页在父元素
    // 一般 分页和列表页的宽度相同 利用这一点可以找出最大共同父元素 然后就只用分析子元素这一情况就OK了
    // while(commonParent.parentNode&&commonParent.parentNode.offsetWidth==listW){
    //     commonParent=commonParent.parentNode
    // }
    // 该死的百度 再加一层父元素才保险
    //误差值为500
    var diff = 500
    // 一般分页为div元素
    var divs = commonParent.querySelectorAll("div,ul,ol,section,article")
    // console.log("divs的值是：",divs)
    // 找出误差值为80内的
    for (var k in divs) {
      // console.log("divs[k].offsetTop的值是：",divs[k].offsetTop)
      if (divs[k].offsetTop > listT - 70 && divs[k].offsetTop <= diff + listT) {
        // 判断innerText是否为分页
        // 分页的特征 1 2 3  5 分页为数字 且经过鼠标为cursor:pointer 一般为span 和a button标签
        var temp = divs[k].querySelectorAll("*")
        // console.log("temp的值是：",temp)
        for (var j in temp) {
          if (temp[j].nodeName !== 'DIV' && temp[j].nodeName !== 'I' && temp[j].nodeName !== 'EM' && temp[j].nodeName !== 'SCRIPT' && temp[j].nodeName !== 'STYLE') {
            // 元素只含有数字 且鼠标为可点击状态
            if (/^\d$/.test(temp[j].innerText)) {
              if (temp[j].nodeName == 'BUTTON' || getComputedStyle(temp[j]).cursor == "pointer") {
                fenyeObj = temp[j]
                is_find_fenye = true
                console.log("找到了分页")
                break
              }
            }
          }
        }
      }
    }
    while (fenyeObj) {
      if (fenyeObj.nodeName == 'DIV' || fenyeObj.nodeName == 'UL') {
        return fenyeObj
      } else {
        fenyeObj = fenyeObj.parentNode
      }
    }
    if (!fenyeObj) { console.log("找不到分页") }

  }
  Finder.prototype.handleList = function () {

    // 同理寻找获取更多 案例比较少 就不写了
    // 获取分页链接
    // 如果没有分页则是查看更多获取
    var listObj = {}
    var listChild = this.guessListChild()
    var listContent = listChild.parentNode
    if (!listContent) { console.log("找不到"); return listObj }
    var fenyeObj = this.findFenye()
    var listPageSet = new Set()
    if (fenyeObj) {
      console.log("有分页 获取分页链接")
      var fy_obj = fenyeObj.querySelectorAll("a")
      for (let k in fy_obj) {
        if (fy_obj[k].nodeName == 'A' && fy_obj[k].href && fy_obj[k].href.indexOf("javascript") < 0) {
          listPageSet.add(fy_obj[k])
        }
      }
      if (listPageSet.size > 0) {
        listObj["分页链接"] = Array.from(listPageSet)
      } else {
        console.log("需要点击才能触发分页")
        listObj["分页链接"] = "找不到"
      }
    } else {
      console.log("没分页 自动刷新机制")
      // 注意这里DOM 高度改变了需要重新获取
      // var count=20
      // do{
      //     scrollBy(0,listT)
      //     // 3秒缓冲时间
      //     tool.sleep(1000)
      //     count--
      // }while(count>=0)
    }
    // 4、获取文章链接
    console.log("开始寻找文章链接")
    var articleSet = new Set()
    var articles = listContent.querySelectorAll("a")
    var listH = listContent.offsetHeight


    // 平均高度
    var avg_height = listChild.offsetHeight
    var avg_width = listChild.offsetWidth
    //  误差值为60
    var diff = 40
    for (let k in articles) {
      if (articles.length > 0 && articles[k].href && articles[k].href.indexOf("javascript") < 0) {
        var weight = getComputedStyle(articles[k]).fontWeight.replace("inherit", "0").replace("bold", 400)
        var aH = articles[k].offsetHeight
        var aW = articles[k].offsetWidth
        if (weight > 300 || (aH <= avg_height && aH >= avg_height - 40 && aW >= avg_width - 80 && aw <= avg_width)) {
          // 含有中文字符 且字数大于6
          if (articles[k].innerText && articles[k].innerText.length > 6 && /[\u4e00-\u9fa5]/.test(articles[k].innerText)) {
            articleSet.add(articles[k])

          }
        }

      }
    }
    if (articleSet.size > 0) {
      listObj["文章链接"] = Array.from(articleSet)
    } else {
      listObj["文章链接"] = "找不到"
    }

    return listObj
  }
  Finder.prototype.handleAticle = function () {
    var body = this.guessBody(document.body)
    if (!body) { return data }
    var data = {}
    var arr = body.querySelectorAll("*")
    var titleH = 0
    var titleT = 0
    var maxSize = 0
    var temp, weight
    // 标题最少6个字符
    var patt = /[\u4e00-\u9fa5]{6,40}/;
    for (let k in arr) {
      if (arr[k].innerText && patt.test(arr[k].innerText)) {
        temp = parseInt(getComputedStyle(arr[k]).fontSize.replace("inherit", "0"))
        // 文章标题一般font-weight 为400
        weight = parseInt(getComputedStyle(arr[k]).fontWeight.replace("inherit", "0").replace("bold", 400))
        if (temp > maxSize && weight > 300) {
          maxSize = temp
          data["标题"] = arr[k]
          titleH = arr[k].offsetHeight
          titleT = arr[k].offsetTop
        }
      }
    }
    // 获取正文 一般正文是div 正文至少要一百个字
    var divs = body.querySelectorAll("div,article,section")
    var acls = body
    var diff = 100

    maxSize = 0
    for (let k in divs) {
      if (divs[k].innerText && divs[k].innerText.length > 100) {
        var divT = divs[k].offsetTop
        if (divT > titleH + titleT && divT < titleH + titleT + diff) {
          temp = divs[k].innerText.length
          if (temp > maxSize) {
            maxSize = temp
            data["正文"] = divs[k]
          }
        }
      }
    }
    if (data["标题"] && data["正文"]) {
      data["标题"] = data["标题"].innerText
      data["正文"] = data["正文"].innerHTML
    }
    return data
  }
  window.Finder = Finder
  var GUI = function (el) {
    for (var k in el) {
      this[k] = el[k]
    }
  }
  GUI.prototype.init = function () {
    var div = document.createElement("div")
    div.style.width = this.width || '300px';
    div.style.height = this.height || '300px';
    div.style.position = 'fixed'
    div.style.top = 0
    div.style.right = 0
    div.style.zIndex = 99999
    div.style.background = 'orange'
    div.style.padding = '15px'
    window.finder = new Finder()
    var obj = finder.analysePage()
    var title = obj["基本属性"]["标题"]
    var page = obj["当前页面"]
    div.innerHTML = ''
    div.innerHTML += "<h3>" + "标题：" + title + "</h3>"
    div.innerHTML += "<h3>" + "当前页面：" + page + "</h3>"
    div.innerHTML += "<hr>"
    if (page == "列表页") {
      div.innerText += "<button id='getListJSON' >" + "获取列表页json" + "</button>"
    }
    if (page == '文章页') {
      div.innerText += "<button id='getAclJSON'>" + "获取文章页json" + "</button>"
    }

    document.body.appendChild(div)

  }
  GUI.prototype.CopyJSON = function (obj) {
    var json = JSON.stringify(obj)
    console.log("获取JSON")

  }

  window.finder = new Finder()
  var obj = finder.analysePage()
})(window)
