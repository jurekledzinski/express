//zaimportowany moduł do przechwycania bledow http do przechwycenia
var createError = require('http-errors');
//import express
var express = require('express');
//ddo pobiernia sciezek
var path = require('path');
//sluzy do wsparcia do parsowania cookie
var cookieParser = require('cookie-parser');
//loger sluzy do rzucania logów w trybie developerskim
var logger = require('morgan');

//tu mamy dwa importy stron, startowej i uzytkownika
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//uruchamiamy nasz server czyli wywołujemy funkcje express()
var app = express();

// view engine setup, konfigurujemy nasz katalog gdzie beda nasze szablony w pug (w tym wypadku uzywamy template pug)
app.set('views', path.join(__dirname, 'views'));
//ustawiamy silnik do szblonow pug
app.set('view engine', 'pug');

//wywolanie expressu i uzywamy tutaj metody use() do przekazywania dalszych middelwaresow czyli rozszerzen które bedziemy wykorzystywali w expressie, za pomocą use bedziemy doinstalowywali biblioteke do sessji wiece tez bedziemy uzywac use(), bedziemy doinstalowywali biblioteke do obslugi mongodb ktora bedziemy wykorzystywac w projekcie
app.use(logger('dev'));
//uprości nam przesylanie api, parsuje automatycznie z js do json i z json do js, json który bedzie w body
app.use(express.json());
//urlencoded mowi do body parser by wyciagnac dane z formularza i dodac je wlasciwosci body obiektu request tzn. req.body. tu np name
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
//ustawiamy sciezke do plików statycznych, tzw asety ładowane po stronie klineta np js, w katalogu asset bedzie wszystko dostepne po stronie przegladarki dostepne dla klienta
app.use(express.static(path.join(__dirname, 'public')));



//deklaracje routingow tu mamy wywolane za pomoca use(), '/' deklaracja adresu pod ktorym dotepny bedzie dany router
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler, przechwytujemy bledy adresu za pomoca biblioteki http-errors
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler, pozostałe bledy
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;