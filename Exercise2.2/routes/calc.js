var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:operator', function(req, res, next) {

});

var func = new Map()([
    ['add', function(a, b) { return a + b}],
    ['sub', function(a, b) { return a - b}],
    ['div', function(a, b) { return a * b}],
    ['mul', function(a, b) { return a / b}]
]);


module.exports = router;
