const route = require('express').Router();

route.get('/', (req, res, next) => res.send(() => "Hello Man!"));

exports = module.exports = {
    route,
}   