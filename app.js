// module
const express       = require('express'),
      app           = express(),
      createError   = require('http-errors'),
      path          = require('path'),
      cookieParser  = require('cookie-parser'),
      logger        = require('morgan'),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      // RedisStore    = require('connect-redis')(session),
      passport      = require('passport'),
      flash         = require('connect-flash')

// utils
const connectMongoDb     = require('./db/connectMongoDb');

// routes module
const indexRouter   = require('./routes/index'),
      authRouter    = require('./routes/auth'),
      usersRouter   = require('./routes/users')

// DB
connectMongoDb();

// http
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//   }
// }))

app.use(cookieParser());
// app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// passport
app.use(passport.initialize());
// app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
