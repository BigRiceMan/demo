
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
  title_name = title_name ? title_name : '我的表单'
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
  0: ["梨", "苹果", "香蕉", "桔子", "金桔", "橙子", "柚子", "榴莲", "西瓜", "桃子", "葡萄", "香梨", "蛇果", "红毛丹", "蛇皮果", "布朗", "李子", "沙果", "哈密瓜", "香瓜", "猕猴桃", "龙眼", "荔枝", "菠萝", "杨梅", "杨桃", "椰子", "山楂", "草莓", "蓝莓", "黑莓", "桑葚", "覆盆子"],
  1: ["湖南省", "湖北省", "广东省", "广西区", "河南省", "河北省", "山东省", "山西省", "新疆区", "黑龙江省", "浙江省", "江苏省", "江西省", "云南省", "贵州省", "福建省", "吉林省", "安徽省", "四川省", "西藏区", "", "辽宁省", "宁夏区", "青海省", "甘肃省", "陕西省", "海南省", "内蒙古区", "台湾省", "北京市", "上海市", "重庆市", "天津市", "香港区", "澳门区"],
  2: ["北京鸭梨", "京白梨", "白鸡", "烧鸭", "油鸡", "果脯", "北京蜂王精", "北京秋梨膏", "茯苓夹饼", "北京酥糖", "六必居酱菜", "北京织毯", "北京雕漆", "", "景泰蓝", "北京玉器", "内画壶", "北京葡萄酒", "北京白凤龙", "安宫牛黄丸", "", "虎骨酒", "京绣", "桃补花", "涮羊肉", "北京酸菜", "大磨盘柿", "密云金丝小枣", "", "少峰山玫瑰花", "门头沟大核桃"]
}
let Builder = function () {
  $("input")
}