const express = require('express');
const mongoose = require('mongoose');

//importujemy model deklatujemy go z duzej litery taka jest konwencja
const News = require('../models/news');
const router = express.Router();

//ten router bedzie sie odpalał w kazdym żądaniu np puy post get,dzieki temu bedziemy mogli zweryfikować wszytko co idzie w strone /admin
//wszystko co się znajduje w /admin bedzie chronione sesja wustarczy zweryfikowac istnienie sesji, pobierajac ja z request


router.all('*', (req, res, next) => {
    // console.log(req.session.admin);
    // console.log('to jest admin.js');

    if (!req.session.admin) {
        console.log('Ciastko nie jest spełnione');

        res.redirect('/login');
        return;
    }
    //aby wywolaly sie nasze pozostałem requesty musze podać next()
    next();
});

router.get('/', (req, res) => {
    // console.log(req.session.admin);
    //przekazujemy data do index.pug czyli dane z bazy danych
    News.find({}, (err, data) => {
        res.render('admin/index', {
            title: 'Admin',
            data
        });
    });
});

//tu pobieram sobie po kliknieciu w link 'dodaj' adres i renderuje plik z folderu 'admin/news-form.pug
router.get('/news/add', (req, res) => {
    res.render('admin/news-form', {
        title: 'Dodaj news',
        errors: {},
        daneForm: {}
    });
});

router.post('/news/add', (req, res) => {
    const daneForm = req.body;
    //tworzymy nowy obiekt modelu i go zapisac w bazie
    const newsData = new News(daneForm);
    //sprawdzamy poprawnosc danych ktore sa na require w models w news.js
    const errors = newsData.validateSync()
    // console.log(errors);

    //przekazujemy tablice errors bledow do formularza jako bledy
    newsData.save((err) => {
        if (err) {
            res.render('admin/news-form', {
                title: 'Dodaj news',
                errors,
                daneForm
            });

            return;
        }

        res.redirect('/admin')
    });

});

//usuwanie danych z bazy danych
router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin');
    })
});

module.exports = router;