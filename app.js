require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const productsRouter = require('./routes/productsRoute');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/", (req, res) => {
  res.render("index", { titulo: "inicio" });
});

app.use('/products', productsRouter);
// catch 404 and forward to error handler
app.use(function (err,req, res, next) {
  next(createError(404));
  console.log(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  console.log(err)
});

app.listen(3001, () => {
  console.log("Server started on port 3000");
});

module.exports = app;
