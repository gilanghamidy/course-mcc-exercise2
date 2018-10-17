var express = require('express');
var router = express.Router();

var funcMap = [];
funcMap['add'] = function(a, b) { return a + b};
funcMap['sub'] = function(a, b) { return a - b};
funcMap['div'] = function(a, b) { return a / b};
funcMap['mul'] = function(a, b) { return a * b};



/* GET users listing. */
router.get('/:operator', function(req, res, next) {
    var selectedFunc = funcMap[req.params.operator];

    var validationMessage = null;

    if(req.query.first === undefined && req.query.second === undefined)
        validationMessage = "Missing both parameters";
    else if(req.query.first === undefined)
        validationMessage = "Missing first required parameter";
    else if(req.query.second === undefined)
        validationMessage = "Missing second required parameter";

    if(validationMessage != null)
    {
        res.status(400);
        res.send({"message" : validationMessage})
    }
    else
    {
        var operand1 = parseFloat(req.query.first);
        var operand2 = parseFloat(req.query.second);

        if(operand2 === 0 && req.params.operator === "div")
            validationMessage = "Division by zero is not allowed";

        if(isNaN(operand1) && isNaN(operand2))
            validationMessage = "Both parameters are not numbers";
        else if(isNaN(operand1))
            validationMessage = "The first parameter is not a number";
        else if(isNaN(operand2))
            validationMessage = "The second parameter is not a number";

        if(validationMessage != null)
        {
            res.status(400);
            res.send({"message" : validationMessage})
        }
        else
        {
            var result = selectedFunc(operand1, operand2);
            res.status(200);
            res.send({"result" : "" + result.toFixed(3) });
        }
    }
});


module.exports = router;
