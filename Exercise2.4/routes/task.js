var express = require('express');
var router = express.Router();
var dbcontext = require('../models/user')
var mongoose = require('mongoose');

router.post('/', function(req, res, next) {
    TaskModel.create({
        "name": req.body.name
    },
    function(err, taskInstance) {
        if(err) {
            res.status(400)
            res.send({
                message: err,
            });
        } else {
            res.status(201);
            res.send({
                message: "Task successfully created",
                id : taskInstance._id
            });
        }
    });

});

module.exports = router;
