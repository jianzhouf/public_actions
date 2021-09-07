const fetch = require('node-fetch');
const sendMail = require('./sendMail');

const [cookie, user, pass, to] = process.argv.slice(2);
process.env.user = user;
process.env.pass = pass;
let score = 0;

const headers = {
  'content-type': 'application/json; charset=utf-8',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
  'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'sec-ch-ua-mobile': '?0',
  referer: 'https://juejin.cn/',
  accept: '*/*',
  cookie
};

// 抽奖
const drawFn = async () => {
  // 免费抽奖
  const draw = await fetch('https://api.juejin.cn/growth_api/v1/lottery/draw', {
    headers,
    method: 'POST',
    credentials: 'include'
  }).then((res) => res.json());
  console.log('抽奖次数',score)
  if (draw.err_no !== 0) {
    return;
  }
  
  drawFn(); 
  score+=1;
};

drawFn();
