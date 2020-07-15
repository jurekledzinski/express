const express = require('express');
const router = express.Router();

/* GET home page. */
//jakko callback przekazuje to co ma się wykonać to co ma się wykonać po przechwyceniu tego adresu
//w req mamy wszystkie dane nagłowki ktore uzykownik nam wysyła np. parametry querystringu parametry w naszym adresie np.localhoset:3000?param=wartosc&param2=wartosc od znaku zapytania to sa parametry typu query, w req te paramtery mozemy przechwytywac
//res informacja co ten serwer ma zwrócić no bo nasz serwer sklada sie z dwóch rzeczy req i res,
//req to co my wysylamy, res to co my bedziemy zwracac uzytkownikowi czy to bedzie uzytkownik typu api, czy to przegladarka ktora odwiedzaja nasi uzytkownicy
//res.render tu renderujemy template po przez system szablonow pug, wskazujemy nazwe szablonu tu index.pug z views, drugi parametr to obiekt a w nim wszystkie dodatkowe parametry przekazywane do naszego szablonu, mozna tu przekazywac nieskonczenie wiele parametrow typu string liczby tablice zmienne 
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

//musimy wyeksportowac modul router by wykorzystac w app.js gdzie pobieramy z jego pomoca nasz index i users bez prekazania tu i w users.js nie mogłbym go 
//requirowac w app.js var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//i wywolac
//app.use('/', indexRouter);
//app.use('/users', usersRouter);


module.exports = router;