var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/gettime', function(req, res, next) {
    var todayDate = new Date(Date.now());
    var thisYearVappu = new Date(todayDate.getFullYear(), 4, 1);
    var nextYearVappu = new Date(todayDate.getFullYear() + 1, 4, 1);

    var nextVappu = todayDate > thisYearVappu ? nextYearVappu : thisYearVappu;

    var diff = (nextVappu.getTime() - todayDate.getTime()) / 1000;

    res.send({"seconds" : Math.round(diff)});


});

module.exports = router;
