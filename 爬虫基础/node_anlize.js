const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios');
const { userAgents } = require('userAgents');

//这里只做测试，所以用变量存，而实际应用中，应该使用数据缓存
const expiryTime = 10 * 60 * 1000;// 过期间隔时间，毫秒
let ips = null; //代理ip
let time = null;// 存储代理IP的时间，判断是否过期，如果过期重新请求


// 要访问的目标页面 
fetch("https://www.baidu.com/sugrec?prod=pc_his&from=pc_web&json=1&sid=31254_26350&hisdata=%5B%7B%22time%22%3A1644284299%2C%22kw%22%3A%22%E4%BE%A0%E9%9A%90%E9%98%81%E5%90%A7%22%7D%2C%7B%22time%22%3A1646181505%2C%22kw%22%3A%22%E6%9C%BA%E6%A2%B0%E5%88%B6%E9%80%A0%22%7D%2C%7B%22time%22%3A1646182283%2C%22kw%22%3A%22%E6%9C%BA%E6%A2%B0%E5%8A%A0%E5%B7%A5%E9%87%8D%E8%A6%81%E6%80%A7%22%7D%2C%7B%22time%22%3A1646377702%2C%22kw%22%3A%22seo%E6%8E%92%E5%90%8D%22%7D%2C%7B%22time%22%3A1646379109%2C%22kw%22%3A%22%E5%A4%87%E6%A1%88%E6%8E%89%22%7D%2C%7B%22time%22%3A1646379618%2C%22kw%22%3A%22%E5%B0%8F%E7%8C%AB%22%7D%2C%7B%22time%22%3A1646380368%2C%22kw%22%3A%22vue3%20cli%22%7D%2C%7B%22time%22%3A1646381892%2C%22kw%22%3A%22%E7%94%A8sass%20less%20%E8%BF%98%E6%98%AF%20study%22%7D%2C%7B%22time%22%3A1646382138%2C%22kw%22%3A%22css%E6%A1%86%E6%9E%B6%22%7D%2C%7B%22time%22%3A1646382199%2C%22kw%22%3A%22sass%22%7D%5D&_t=1647330703581&req=2&bs=%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9reference&csor=0", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-ch-ua": "\"\\\"Not\\\\A;Brand\";v=\"99\", \"Chromium\";v=\"86\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "PSTM=1618286377; BIDUPSID=9B9D8D2E21C62AB51822A3BBCBF7C4AC; __yjs_duid=1_641fba7d9054f2065f5431c7b682778c1618295517519; H_WISE_SIDS=107316_110085_127969_164870_179350_181589_182235_183327_184010_184286_186159_186635_186743_187282_187432_187447_187828_188452_188553_188741_188870_189660_189732_190033_190145_190474_190622_190654_190680_190683_190792_191067_191256_191369_191371_191414_191433_191502_191528_191810_192010_192017_192206_192351_192597_192677_192902_193194_193284_193491_193559_193758_193891_194038_194085_194131_194233_194318_194513_194519_194583_194599_194869_194876_194887_194922_194987_195004_195047_195154_195173_195189_195342_195473_195477_195533_195538_195542_195591_195623_195654_195679_195765_195912_196000_196273_196275_196320_196383_196428_196644_196753_196899; BD_UPN=12314753; MCITY=-198%3A; BCLID_BFESS=8013384448740447305; BDSFRCVID_BFESS=TXCOJeCmHC9W4qJDX37u8dovteKK0gOTHbudLFtbsVBvQ58VJeC6EG0Ptf8g0Ku-cAmKogKK0gOTH6KF_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tR4HoILKJCK3f-opMtI_KJLH-qKX5-RLfanv5h7F5lOVOh8w3TOayx0RDNJtqP3ybjn-ahkM5h7xOboGbMvP5-Dy345qQ6LOQeQ-5KQN3KJmfbL9bT3v5DuSLfci2-biWbRM2MbdJqvP_IoG2Mn8M4bb3qOpBtQmJeTxoUJ25DnJhhCGe4bK-TryeHAetx5; BDUSS=kwOEJrN3RicWFoNm04WlpqaUhFOVVoMUt0RTgwYm8yZVRWWVlUODN-REJoVTlpSUFBQUFBJCQAAAAAAAAAAAEAAADEYnRNYjkxODY5NDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMH4J2LB-CdiYk; BDUSS_BFESS=kwOEJrN3RicWFoNm04WlpqaUhFOVVoMUt0RTgwYm8yZVRWWVlUODN-REJoVTlpSUFBQUFBJCQAAAAAAAAAAAEAAADEYnRNYjkxODY5NDIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMH4J2LB-CdiYk; BAIDUID=04EC3B1C2E607ACEA9571E812F3A2507:FG=1; BDORZ=FFFB88E999055A3F8A630C64834BD6D0; ispeed_lsm=2; delPer=0; BD_CK_SAM=1; PSINO=6; BDRCVFR[TExvHSeyiCm]=mk3SLVN4HKm; BD_HOME=1; H_PS_PSSID=31254_26350; COOKIE_SESSION=444_0_4_3_20_14_0_1_4_4_0_4_269_0_713_0_1647329092_0_1647328379%7C9%23518724_36_1639960917%7C9; sug=3; sugstore=1; ORIGIN=0; bdime=0; H_PS_645EC=ac8b83fC8bfJhl%2B10b7CHHytjMb64Tlyst2p0MdPnmpSLwmogsB6G03t03%2FsDL7mXAIKDt6spu6b; BA_HECTOR=ah01a424ak05258kil1h30hce0q"
  },
  "referrer": "https://www.baidu.com/s?ie=UTF-8&wd=%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9reference&tn=44004473_26_oem_dg",
  "referrerPolicy": "unsafe-url",
  "body": null,
  "method": "GET",
  "mode": "cors"
})
  .then(response => console.log(response.json()))
  .then(data => console.log(data));
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function main() {
  await sleep(1500)
}



