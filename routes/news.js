const express = require('express');
const router = express.Router();
//pobieramy nasz model gddzie mamy dostep do danych
const News = require('../models/news');


router.get('/', (req, res) => {
    console.log(req.query)
    //tu jest aktualna wyszukiwana wartość wpisana w stronie w inputcie szukaj, jeset ona dostepna z  query stringa 
    //jak cos wpiszesz i nacisniesz szukaj to w adresie w jego parametrach dodany zostanie parametr search=wpisany tekst tu
    const search = req.query.search || '';
    // wyszukujemy dane tu, w metodzie sort pola do sortowania podajemy w formie obiektu,modelu mamy klucz created dlatego tutaj takze podajemy, bedzie sortowało po czasie dodania artykułu, aby posortować dane malejąco musimu użyć -1, gdybyśmy chcieli posortować rosnąco dajemy 1, a 0 to sortowanie domyślne
    //find() pierwszym atrybutem w find() jest obiekt w którym podaje wartości dzieki ktorym zawezamy wyniki wyszukiwania
    //w find() w podanym obiekcie podajemy nasz tytul ktory podalismy w modelu i po nim bedziemy wyszkuiwac nasze artykuły 
    //dajemy serach jako wartosc title:  z regexp dzieki temu bedzie wyszkiwany kazdy teskt bez wzgledu na rozmiar czy czesc zdania w tytule

    //trim() do usuniecia pustych znaków// jesli search bedzie pustym stringime na poczatku jak wpiszemy to do serach prypisujemy 
    //const search = req.query.search || ''; teraz trim powinnien dzialac proprawnie i po wpisaniu ze spacja wyszuka slowo, jak
    //serach bedzie by było undefined to bedzie przypisane do niego pusty string i trim zadziala
    const findNews = News
        .find({
            title: new RegExp(search.trim(), 'i')
        })
        .sort({
            created: -1
        });

    //metoda exec z ktorej bedziemy pobierali nasze dane i renderujemy nasz plik news.pug w folderze views przesyłay do niego data z models,
    //przekazujemy jeszcze  search czyli to co wpisujemy w wyszukiwarke  i przypisujemy to search ta jego wartosc do value w inpucie o name=search gdzie wyszukujemy news.pug dzieki temu po przejsciu na inny link w menu pozostanie w aktualnosciach tzn. news to co wyszukaliśmy
    //metoda sort to jest metoda w moongoose w dokumentacji


    findNews.exec((err, data) => {
        console.log(search)
        res.render('news', {
            title: 'News',
            data,
            search
        });
    });
});

module.exports = router;