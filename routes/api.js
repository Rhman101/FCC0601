/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');
const validator = require('../controllers/validator');

module.exports = function(app) {
	var convertHandler = new ConvertHandler();

	app.route('/api/convert').get(function(req, res) {
		var input = req.query.input;
    const validatorResult = validator(input);
		if (!validatorResult.numberValid && !validatorResult.unitValid) {
			res.json({
				error: 'invalid number and unit input'
			});
		} else if (!validatorResult.numberValid && validatorResult.unitValid) {
			res.json({
				error: 'invalid number input'
			});
		} else if (validatorResult.numberValid && !validatorResult.unitValid) {
			res.json({
				error: 'invalid unit input'
			});
		} else {
      let inputNumber = validatorResult.numberInput;
      let inputUnit = validatorResult.unitInput;
			var initNum = convertHandler.getNum(inputNumber);
			var initUnit = convertHandler.getUnit(inputUnit);
			var returnUnit = convertHandler.getReturnUnit(initUnit);
			let initUnitSpelled = convertHandler.spellOutUnit(initUnit);
			let returnUnitSpelled = convertHandler.spellOutUnit(returnUnit);
			var returnNum = convertHandler.convert(initNum, initUnit);
			var string = convertHandler.getString(initNum, initUnitSpelled, returnNum, returnUnitSpelled);

			res.json({
				initNum,
				initUnit,
				returnNum,
				returnUnit,
        string
			});
		}
	});
};
