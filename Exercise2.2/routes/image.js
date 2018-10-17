var express = require('express');
var fs = require('fs');
var request = require('request');

var router = express.Router();

function retrieveAndRecurse(arrayData, arrayResult, res) {
    var currentData = arrayData.pop();

    arrayResult.push({
        "name" : currentData.url,
        "type" : "TEST",
        "size" : "123"
    });

    if(Array.isArray(arrayData) && currentData.length !== 0)
        retrieveAndRecurse(arrayData, arrayResult, res);
    else
        res.send(arrayResult);

    return;

    request
        .get('http://localhost' + currentData.url)
        .on('response', function(response) {
            var type = response.headers['content-type'].replace('image/', '').toUpperCase();
            var fileName = response.headers['content-disposition'];
            var size = parseInt(response.headers['content-length']) / 1000;

            arrayResult.push({
                "name" : fileName,
                "type" : type,
                "size" : size
            });

            if(Array.isArray(currentData) && currentData.length != 0)
                retrieveAndRecurse(arrayData, arrayResult, res);
            else
                res.send(arrayResult);
        });

}


/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('images.json', 'utf8', function (err, data) {
        if (err)
            throw err;

        var imageArr = JSON.parse(data);
        retrieveAndRecurse(imageArr, [], res);
    });
});

module.exports = router;
