function ajaxPage(sId, url) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        console.log(1)
        IncludeJS(sId, url, xhr.responseText);
      } else {
        console.log('错误')
      }
    }
  }
  //  true表示同步
  xhr.open('GET', url, true)
  xhr.send(null)
}
function IncludeJS(sId, fileUrl, source) {
  if ((source != null) && (!document.getElementById(sId))) {
    var body = document.body;
    var oScript = document.createElement("script");
    oScript.language = "javascript";
    oScript.type = "text/javascript";
    oScript.id = sId;
    oScript.defer = true;
    oScript.text = source;
    body.appendChild(oScript);
  } else {
    console.log('错误3')
  }
}
ajaxPage('srcA', 'https://code.jquery.com/jquery-3.6.0.js')
console.log('动态加载js成功')