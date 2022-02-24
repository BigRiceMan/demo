let form = document.createElement('form')
form.id = 'form'
form.innerHTML = `
<div id="box1"> <h3 id="info">加载js</h3><input type="text" name="box1_va" id="box1_va"><input type="text" name="box1_vb" id="box1_vb"><select name="box1_vo" id="box1_vo"></select> <button id="box1_vs" name="box1_vs">添加</button> </div> <style> #box1 { background-color: #eee; font-size: 14px; overflow: hidden; padding: 0 20px; position: fixed; top: 0; right: 0; z-index: 999999999; } #box1 input { display: block; height: 16px; padding: 2px 5px; font-size: 14px; line-height: 20px; margin: 10px auto; width: 90px; } #box1 select { display: block; padding: 2px 5px; font-size: 14px; line-height: 20px; margin: 10px auto; width: 100%; cursor: pointer; } #box1 button { display: block; padding: 2px 5px; font-size: 14px; line-height: 20px; margin: 10px auto; width: 100%; cursor: pointer; } </style>`
form.onsubmit = function () {
  return false
}
form['box1_va'].value = ''
form['box1_vb'].value = ''
form['box1_vo'].add(new Option('请选择', 0))
form['box1_vo'].add(new Option('jquery', 1))
form['box1_vo'].add(new Option('导出word', 2))
form['box1_vo'].onchange = function () {
  form['box1_va'].value = ''
  form['box1_vb'].value = ''
  let idx = this.selectedIndex
  let v = this.options[idx].value
  switch (v) {
    case '1':
      form['box1_vb'].value = 'https://code.jquery.com/jquery-3.6.0.js'
      break
    case '2':
      form['box1_vb'].value = 'http://119.91.209.163:3000/js_plugin/get_word.js'
      break
    default:
      return
  }
}
form['box1_vs'].onclick = function (e) {
  if (!form['box1_vb'].value) { return }
  if (!form['box1_va'].value) { form['box1_va'].value = Math.random().toString().replace('0.', '').slice(5) }
  ajaxPage(form['box1_va'].value, form['box1_vb'].value)
}
document.body.appendChild(form)