const route = require('express').Router();
const Table = require('../../models/Table')

// route.get('/', (req, res, next) => res.send("Keep Grinding"));

// To Render the list
route.get('/', (req, res, next) => {

    console.log(" in display\n\n");

    Table.find({}, (err, data) => {
        res.render("index.ejs", {
            table: data,
        });
    });

    return;

});


exports = module.exports = {
    route,
}   