/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');
let validator = require('../controllers/validator');
var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(validator(input).numberInput),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '4.5km';
      assert.equal(convertHandler.getNum(validator(input).numberInput), 4.5)
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '5/3L';
      assert.equal(convertHandler.getNum(validator(input).numberInput), '5/3')
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '5/3.53gal';
      assert.equal(convertHandler.getNum(validator(input).numberInput), '5/3.53')
      done();
    });
    
    test('Invalid Input (double dot)', function(done) {
      const input = '5..2gal';
      assert.equal(validator(input).numberValid, false)
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'kg';
      assert.equal(convertHandler.getNum(validator(input).numberInput), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let input = `3.1${ele}`;
        assert.equal(convertHandler.getNum(validator(input).numberInput), 3.1);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = '5.31gall';
      assert.equal(validator(input).unitValid, false);
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });

  });  

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const inputNumber = '5.4/3';
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallon','liters','miles','kilometers','pounds','kilograms'];
      input.forEach((elem, index) => {
        assert.equal(convertHandler.spellOutUnit(validator(elem).unitInput), expect[index]);
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [1, 'l'];
      const expected = 0.26417;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [1, 'mi'];
      const expected = 1.60934;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [1, 'km'];
      const expected = 0.62137;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [1, 'lbs'];
      const expected = 0.45359;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [1, 'kg'];
      const expected = 2.20462;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);  
      done();
    });
    
  });

});