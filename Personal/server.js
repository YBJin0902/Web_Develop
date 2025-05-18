import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 907;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1373326123240525925/Xyn0pOCuOVht13SNmCCokvwqKl8LKl5LY__5Yu4sjdz2aah42DB-EDZYolr5LEZiZWW7';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'main')));

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
