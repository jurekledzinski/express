var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    //podajemy required także ponieważ to zabezpieczy że te pola muszą byc wypelnione aby zostały dodane do bazy danych 
    title: {
        type: String,
        required: [true, 'Pole tytuł jest wymagane']
    }, // String is shorthand for {type: String}
    description: {
        type: String,
        required: [true, 'Pole opis jest wymagane']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//musimy go wyeksportowac podajemy nazwe modelu gdzie bedzie uzywana w mognod atlas to 'News' a jako parametr przekazujemy schemat tzn. model tu 'newsSchema'
module.exports = mongoose.model('News', newsSchema)