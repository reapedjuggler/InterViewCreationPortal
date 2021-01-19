const route = require('express').Router();

// These would be triggered from the HTML page which is rendered as 
// a interface at the very start
route.get('/display', require('./display').route);
route.post('/create', require('./create').route);

exports = module.exports = {
    route,
}