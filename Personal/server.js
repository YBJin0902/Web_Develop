const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // 或用 axios
const app = express();
const PORT = 907;

const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1373326123240525925/Xyn0pOCuOVht13SNmCCokvwqKl8LKl5LY__5Yu4sjdz2aah42DB-EDZYolr5LEZiZWW7'

app.use(bodyParser.json());

// 靜態檔案位置（讓前端檔案可存取）
app.use(express.static(path.join(__dirname, 'main')));

// 根目錄導向 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

app.post('/send-discord', async (req, res) => {
  const message = req.body.message;

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `💬 使用者留言：\n${message}` })
    });

    const result = await response.text();
    console.log('Discord 回應:', response.status, result);

    if (response.ok) {
      res.status(200).send('ok');
    } else {
      res.status(500).send('Discord 發送失敗');
    }
  } catch (err) {
    console.error('傳送失敗：', err);
    res.status(500).send('error');
  }
});



app.listen(PORT, () => {
  console.log(`伺服器啟動：http://localhost:${PORT}`);
});
