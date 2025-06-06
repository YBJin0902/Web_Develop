import session from 'express-session';
import mysql from 'mysql2/promise';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 507;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1373326123240525925/Xyn0pOCuOVht13SNmCCokvwqKl8LKl5LY__5Yu4sjdz2aah42DB-EDZYolr5LEZiZWW7';
const BORROW_DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1380490573768818700/57_x3vs4HkO7gBb5TO6Mhp5FqNewKWHWAddX1QbNP8IaayuBRU-KjXExjxdQBWi4BZQg";


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'main')));
app.use(session({
  secret: 'usblab-secret',
  resave: false,
  saveUninitialized: false
}));

const db = await mysql.createConnection({
  host: 'localhost',
  port: 603,     
  user: 'root',          
  password: 'UsbLab507',  
  database: 'USbLab'
});

console.log('✅ 資料庫連線成功');

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

app.post('/api/notify-discord', async (req, res) => {
  const { machine, date, time, userId } = req.body;

  const content = `借用通知\n使用者：${userId}\n機台：${machine} 雕刻機\n日期：${date}\n時間：${time}\n`;

  try {
    const response = await fetch(BORROW_DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });

    res.json({ success: true });

  } catch (err) {
    console.error('[DISCORD] 發送錯誤：', err.message);
    res.status(500).json({ error: '發送 Discord 失敗' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('[LOGIN] name:', username, 'password:', password);

  try {
    const [rows] = await db.execute(
      'SELECT * FROM account WHERE name = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      req.session.user = rows[0].name;
      res.json({ success: true, username: rows[0].name });
    } else {
      res.status(401).send('❌ 帳號或密碼錯誤');
    }
  } catch (err) {
    console.error('[LOGIN] 資料庫錯誤:', err);
    res.status(500).send('❌ 資料庫錯誤');
  }
});


app.post('/register', async (req, res) => {
  const { id, username, password } = req.body;

  try {
    // 檢查是否已有相同帳號
    const [rows] = await db.execute(
      'SELECT * FROM account WHERE name = ?',
      [username]
    );

    if (rows.length > 0) {
      return res.status(400).send('❌ 帳號已存在');
    }

    // 寫入資料
    await db.execute(
      'INSERT INTO account (id, name, password, created_at) VALUES (?, ?, ?, NOW())',
      [id, username, password]
    );

    res.send('✅ 註冊成功');
  } catch (err) {
    console.error('[REGISTER] 資料庫錯誤:', err);
    res.status(500).send('❌ 註冊失敗');
  }
});


function checkLogin(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/USBLab/Login_Register/USBLab_login.html');
}

app.get('/USBLab/main/USBLab_home.html', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'USBLab', 'USBLab_home.html'));
});

app.get('/equipment', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT eq_name, eq_num, eq_cl_num, eq_place, eq_user, borrow_time
      FROM equipment
    `);
    res.json(rows);
  } catch (err) {
    console.error('[EQUIPMENT] 查詢錯誤:', err);
    res.status(500).send('❌ 資料庫查詢錯誤');
  }
});



app.listen(PORT, () => {
  console.log(`伺服器啟動：http://localhost:${PORT}`);
});
