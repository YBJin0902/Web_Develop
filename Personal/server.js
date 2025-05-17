const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 907;

app.use(bodyParser.json());

// 靜態檔案位置（讓前端檔案可存取）
app.use(express.static(path.join(__dirname, 'main')));

// 根目錄導向 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

