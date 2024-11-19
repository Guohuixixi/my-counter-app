const express = require('express')
const app = express()

let counter = 0;  // 用于跟踪访问的计数器

function getCountImage(count) {
  // 将计数转为 6 位数的字符串
  const countArray = count.toString().padStart(6, '0').split('');
  
  // 创建 SVG 内容：显示计数值
  const parts = countArray.reduce((acc, next, index) => `
    ${acc}
    <rect id="Rectangle" fill="#000000" x="${index * 32}" y="0.5" width="29" height="29"></rect>
    <text id="0" font-family="Courier" font-size="24" font-weight="normal" fill="#00FF13">
        <tspan x="${index * 32 + 7}" y="22">${next}</tspan>
    </text>
  `, '');

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="189px" height="30px" viewBox="0 0 189 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>Count</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        ${parts}
      </g>
  </svg>`;
}

// 路由：返回计数器的 SVG 图像
app.get('/count.svg', (req, res) => {
  counter++;  // 增加计数
  
  // 设置 HTTP 响应头，确保每次都重新获取图像
  res.set({
    'content-type': 'image/svg+xml',
    'cache-control': 'max-age=0, no-cache, no-store, must-revalidate'
  });

  // 返回生成的 SVG 图像
  res.send(getCountImage(counter));
});

// 启动服务器
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
