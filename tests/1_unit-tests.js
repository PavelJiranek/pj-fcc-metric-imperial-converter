/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('Whole number input', function (done) {
      const input = '32L';
      assert.strictEqual(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function(done) {
      const input = '4.5gal';
      assert.strictEqual(convertHandler.getNum(input), 4.5);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '1/2km';
      assert.strictEqual(convertHandler.getNum(input), 0.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '5.5/4lbs';
      assert.strictEqual(convertHandler.getNum(input), 6.25);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '5/4/2lbs';
      assert.strictEqual(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'km';
      assert.strictEqual(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      input.forEach(unit => {
        const matchedUnit = convertHandler.getUnit(unit);
        assert.strictEqual(matchedUnit, unit)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const invalidUnit = 'invalidUnit';
      assert.strictEqual(convertHandler.getUnit(invalidUnit), 'invalid unit')
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      const expect = ['gallons', 'litres', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      
      //done();
    });
    
    test('Mi to Km', function(done) {
      
      //done();
    });
    
    test('Km to Mi', function(done) {
      
      //done();
    });
    
    test('Lbs to Kg', function(done) {
      
      //done();
    });
    
    test('Kg to Lbs', function(done) {
      
      //done();
    });
    
  });

});
