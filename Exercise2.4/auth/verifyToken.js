var expressjwt = require('express-jwt');
var config = require('../config');
var revokedTable = require('../models/revoked');

var revokedCheck = function(req, payload, done){
    var issuer = payload.iss;
    var tokenId = payload.jti;

    revokedTable.findOne({ issuer: issuer, tokenId: tokenId }).exec(
        function(err, token) {
            if(err || token === undefined) {
                return done(err);
            } else {
                return done(null, false);
            }
        });

};

var verifier = expressjwt({
                   secret: config.secret,
                   isRevoked: revokedCheck
               });

module.exports = verifier;