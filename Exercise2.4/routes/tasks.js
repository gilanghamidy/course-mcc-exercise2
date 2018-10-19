var express = require('express');
var router = express.Router();
var dbcontext = require('../models/user')
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
    TaskModel.find().exec(function(err, taskInstances) {
            if(err) {
                res.status(400)
                res.send({
                    message: err,
                });
            }
            else
            {
                res.status(200);
                res.send(taskInstances);
            }
        });

});

router.get('/:postId', function(req, res, next) {
    TaskModel.findOne({ _id: req.params.postId }).exec(
        function(err, taskInstance) {
            if(err) {
                res.status(400)
                res.send({
                    message: err,
                });
            }
            else
            {
                res.status(200);
                res.send(taskInstance);
            }

        });

});

router.put('/:postId', function(req, res, next) {
    TaskModel.updateOne(
        { _id: req.params.postId },
        req.body,
        function(err, updateRes) {
        if(err) {
            res.status(400)
            res.send({
                message: err,
            });
        } else {
            TaskModel.findOne({ _id: req.params.postId }).exec(
            function(err, taskInstance) {
                if(err) {
                    res.status(400)
                    res.send({
                        message: err,
                    });
                }
                else
                {
                    res.status(200);
                    res.send({
                        message: "Task successfully updated",
                        id: taskInstance._id,
                        name: taskInstance.name,
                        created_date: taskInstance.created_date,
                        status: taskInstance.status
                    });
                }

            });



        }
    })

});

router.delete('/:postId', function(req, res, next) {
    Task.remove( { _id: req.params.postId }, function(err) {
        if(err) {
            res.status(400)
            res.send({
                message: err,
            });
        } else {
            res.status(200);
            res.send({
                message: "Task successfully deleted",
                id : req.params.postId
            });
        }
    })

});



module.exports = router;
