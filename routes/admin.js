const express = require('express');
const router = express.Router();

//ten router bedzie sie odpalał w kazdym żądaniu np puy post get,dzieki temu bedziemy mogli zweryfikować wszytko co idzie w strone /admin
//wszystko co się znajduje w /admin bedzie chronione sesja wustarczy zweryfikowac istnienie sesji, pobierajac ja z request


router.all('*', (req, res, next) => {
    console.log(req.session.admin);
    console.log('to jest admin.js');

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
    res.render('admin', {
        title: 'Admin'
    });
});

module.exports = router;