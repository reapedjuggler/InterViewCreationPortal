const route = require('express').Router();

route.post('/', (req, res, next) => res.send(() => "Hello Man!"));

exports = module.exports = {
    route,
}