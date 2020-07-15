const express = require('express');
const router = express.Router();
//takie jest hasło do logowania, pseudo baza danych :)
const login = "admin";
const password = '123';

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

//proces logowania bedzie publicznie dostepny dlatego w roucie indeksowym

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Logowanie'
  });
});

//pseudo autoryzacja logowania noramlnie z poziomu bazy danych

router.post('/login', (req, res) => {
  const body = req.body;

  if (body.login === login && body.password === password) {
    //podajemy nazwe dla naszej sesji tu 1, kiedy sie zalogujemy prawidlowo
    req.session.admin = 1;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
  // console.log(req.body);
});

//musimy wyeksportowac modul router by wykorzystac w app.js gdzie pobieramy z jego pomoca nasz index i users bez prekazania tu i w users.js nie mogłbym go 
//requirowac w app.js var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//i wywolac
//app.use('/', indexRouter);
//app.use('/users', usersRouter);


module.exports = router;