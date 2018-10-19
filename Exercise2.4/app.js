var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var auth = require('./auth/verifyToken');
var config = require('./config');
var hasher = require('bcryptjs');
var user = require('./models/user');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

function generateToken(userId) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        id: userId
    }, config.secret);
}



app.get('/register', function(req, res) {
    res.json({
       message: 'Register User Page'
    });
});

app.post('/register', function(req, res) {
    var validate = 'email' in req.body &&
        'username' in req.body &&
        'password' in req.body &&
        'passwordConf' in req.body;

    if (!validate) {
        res.status(400);
        res.json({message: 'Incomplete register parameter.'});
        return;
    }

    validate = req.body.password == req.body.passwordConf;

    if (!validate) {
        res.status(400);
        res.json({message: 'Passwords do not match.'});
        return;
    }

    user.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: hasher.hashSync(req.body.password, 10)
        }, function (err, userInstance) {
            if (err) {
                res.status(500).send({message: 'Error while registering user.'});
            } else {
                res.status(200);
                res.send({
                    message: "User has been successfully registered.",
                    auth: true,
                    token: generateToken(userInstance._id)
                });
            }
        });
    });

app.get('/login', function(req, res) {
    res.json({
        message: 'Login Page'
    });
});

app.post('/login', function(req, res) {

});

app.get('/profile', auth, function (req, res) {
    if (!req.user.id) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }

    user.findOne({_id: req.user.id}).exec(function(err, userInstance) {
        if(err) {
            res.status(500).send({
                message: err,
                auth: false,
            });
        }
        else
        {
            res.status(200).json({
                message: "User logged in!",
                username: userInstance.username,
                email: userInstance.email,
                auth: true,
                token: req.headers.authorization.replace('Bearer ', ''),
                userId: req.user.id
            });
        }

    })


});


app.get('/logout', auth, function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
    }
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({message: 'Unauthorized'});
    }
});


module.exports = app;
