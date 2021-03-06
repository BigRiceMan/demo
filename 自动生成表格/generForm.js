
let form_obj = {
  type: ['<input type="text/>', '<input type="password/>', '<input type="radio/>',
    '<input type="check/>', '<input type="file/>', '<input type="button/>',
    '<button></button>', '<select></select>', '<textarea></textarea>'
  ],
  bodyMode: [
    'ipt[text]_one',
    'ipt[pwd]_one',
    'txtarea_one',
    'ipt[text]+btn',
    'ipt[pwd]+btn',
    'ipt[file]+btn',
    'radio+small_word',
    'radio+many_word',
    'check+small_word',
    'check+many_word',
    'select+'
  ],
  endMode: [
    [
      'cb_agree',
      'submit+reset'
    ],
    [
      'cb_agree',
      'submit_one'
    ]
  ]
}

let generate = function (form_width, prefix, title_name, count) {
  prefix = prefix || 'box'
  form_width = form_width > 599 ? form_width : 600
  title_name = title_name ? title_name : 'ๆ็่กจๅ'
  count = count > 5 ? count : 5
  let $_div = $('<div></div>').css(
    {

      'width': form_width + 'px',
      'margin': '0 auto',
      'background-color': '#e8e8e8',
      'padding': '20px',
      'border-radius': '5px',
      'box-shadow': 'inset 0 0 5px 5px',
    }
  ).attr('id', prefix)
  let $_tit = $('<h1></h1>').css({
    'height': '40px',
    'line-height': '40px',
    'font-size': '22px',
    'text-align': 'center',
  }).attr('id', prefix + 'tit').text(title_name)
  $_tit.appendTo($_div)
  let $_form = $('<form></form>').attr('id', prefix + 'form')
  $_form.appendTo($_div)
  let bodyModeLen = form_obj.bodyMode.length
  let endModeLen = form_obj.endMode[0].length
  for (let t = 0; t < count; t++) {
    let $_divItem = $('<div></div>').attr('class', prefix + 'form' + 'item')
    if (t > bodyModeLen) {
      buildHTML($_div, form_obj.bodyMode[parseInt(Math.floor(Math.random() * bodyModeLen))])
    } else {
      buildHTML($_div, form_obj.bodyMode[t])
    }
  }
  for (let n = 0; n < endModeLen; n++) {
    buildHTML($_div, form_obj.endMode[0])
  }

  $_div.html(`
  <style>
  p {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  textarea,
  select {
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 100%;
    background-color: #fff;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"],
  select,
  option {
    text-align: center;
    cursor: pointer;
  }

  textarea {
    display: block;
    width: 100%;
    height: 100%;
    resize: none;
  }

  input[type="file"] {
    width: 100%;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    opacity: 0;
    cursor: pointer;
  }

  .text-center {
    text-align: center;
  }
</style>
  `)
  $_div.appendTo($(document.body))
}

let buildHTML = function (obj, type) {

}


let nv = {
  button: {
    0: 'btn',
    1: 'button'
  },
  text: {
    0: 'text',
    1: 'txt'
  },
  password: {
    0: 'pwd',
    1: 'pasword'
  }

}
let rv = {
  0: ["ๆขจ", "่นๆ", "้ฆ่", "ๆกๅญ", "้ๆก", "ๆฉๅญ", "ๆๅญ", "ๆฆด่ฒ", "่ฅฟ็", "ๆกๅญ", "่ก่", "้ฆๆขจ", "่ๆ", "็บขๆฏไธน", "่็ฎๆ", "ๅธๆ", "ๆๅญ", "ๆฒๆ", "ๅๅฏ็", "้ฆ็", "็็ดๆก", "้พ็ผ", "่ๆ", "่?่", "ๆจๆข", "ๆจๆก", "ๆคฐๅญ", "ๅฑฑๆฅ", "่่", "่่", "้ป่", "ๆก่", "่ฆ็ๅญ"],
  1: ["ๆนๅ็", "ๆนๅ็", "ๅนฟไธ็", "ๅนฟ่ฅฟๅบ", "ๆฒณๅ็", "ๆฒณๅ็", "ๅฑฑไธ็", "ๅฑฑ่ฅฟ็", "ๆฐ็ๅบ", "้ป้พๆฑ็", "ๆตๆฑ็", "ๆฑ่็", "ๆฑ่ฅฟ็", "ไบๅ็", "่ดตๅท็", "็ฆๅปบ็", "ๅๆ็", "ๅฎๅพฝ็", "ๅๅท็", "่ฅฟ่ๅบ", "", "่พฝๅฎ็", "ๅฎๅคๅบ", "้ๆตท็", "็่็", "้่ฅฟ็", "ๆตทๅ็", "ๅ่ๅคๅบ", "ๅฐๆนพ็", "ๅไบฌๅธ", "ไธๆตทๅธ", "้ๅบๅธ", "ๅคฉๆดฅๅธ", "้ฆๆธฏๅบ", "ๆพณ้จๅบ"],
  2: ["ๅไบฌ้ธญๆขจ", "ไบฌ็ฝๆขจ", "็ฝ้ธก", "็ง้ธญ", "ๆฒน้ธก", "ๆ่ฏ", "ๅไบฌ่็็ฒพ", "ๅไบฌ็งๆขจ่", "่ฏ่ๅคน้ฅผ", "ๅไบฌ้ฅ็ณ", "ๅญๅฟๅฑ้ฑ่", "ๅไบฌ็ปๆฏฏ", "ๅไบฌ้ๆผ", "", "ๆฏๆณฐ่", "ๅไบฌ็ๅจ", "ๅ็ปๅฃถ", "ๅไบฌ่ก่้", "ๅไบฌ็ฝๅค้พ", "ๅฎๅฎซ็้ปไธธ", "", "่้ชจ้", "ไบฌ็ปฃ", "ๆก่กฅ่ฑ", "ๆถฎ็พ่", "ๅไบฌ้ธ่", "ๅคง็ฃจ็ๆฟ", "ๅฏไบ้ไธๅฐๆฃ", "", "ๅฐๅณฐๅฑฑ็ซ็ฐ่ฑ", "้จๅคดๆฒๅคงๆ?ธๆก"]
}
let Builder = function () {
  $("input")
}