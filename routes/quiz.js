const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

router.get('/', (req, res) => {
    //zmieniamy nasz sesje domyslnie z undefined po wejsciu na strone quiz na true dzikei negacji logicznej, potem zaminei sie false po oddaniu głosu, przesyłamy show w rnder i dzieki temu mozemy pozniej renderowac guiz.pug tzn. jesli jest true pokaz quiz jesli jest false
    //nie bedzie quizu

    const show = !req.session.vote;


    Quiz.find({}, (err, data) => {
        let sum = 0;

        data.forEach(item => {
            sum += item.vote;
        });

        res.render('quiz', {
            title: 'Quiz',
            data,
            show,
            sum
        });
    });


});

router.post('/', (req, res) => {
    //z tego body zwracane jest id pory roku wybranej, req.body.quiz, quiz dlatego poniewaz w input w quiz.pug do name przypisalismy quiz
    //to nam wskazuje na ten input i przekazuje wartosc id inputa wybranego tzn pory roku
    const id = req.body.quiz

    Quiz.findOne({
        _id: id
    }, (err, data) => {
        data.vote++;
        data.save((err) => {
            //ustawiamy session ciastka na 1 co posłuzy jako zabezpiecznie by nie oddac glosu wiecej niz jeden raz
            req.session.vote = 1;
            res.redirect('/quiz');
        });
    });


});

module.exports = router;