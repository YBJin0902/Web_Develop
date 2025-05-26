app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// 中介層保護 Git server
function isLoggedIn(req, res, next) {
  if (req.session.user) return next();
  res.status(401).send('未登入');
}
