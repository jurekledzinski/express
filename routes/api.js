const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

// /api?&sort=-1
router.get('/', (req, res) => {
    console.log(req.query)
    const search = req.query.search || '';
    let sort = req.query.sort || defaultSort;

    if (sort == 0) {
        sort = defaultSort;
    }

    const findNews = News
        .find({
            title: new RegExp(search.trim(), 'i')
        })
        .sort({
            created: sort
        }).select('_id title description');

    findNews.exec((err, data) => {
        console.log(search)
        res.json(
            data
        );
    });
});

// localhost:3000/api/id tu w linku
//pobranie  jednego art za pomoca id
router.get('/:id', (req, res) => {
    //dostep do id mamy z obiektu request i params no i nasze id/ dalej findById wyszkujemy na podstawie tego id
    const id = req.params.id;
    const findNews = News
        .findById(id).select('_id title description');


    findNews.exec((err, data) => {
        res.json(
            data
        );
    });
});

module.exports = router;