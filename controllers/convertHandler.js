/*
*
*
*       Complete the handler logic below
*       
*       
*/
const R = require('ramda');

const fractionMatcher = /\d+\/\d+/;
const multipleFractionMatcher = /\d+(\/\d+){2,}/;
const decimalMatcher = /\d+\.\d+/;
const numInputMatcher = /^\d+(\/\d+|\.?\d+\/\d+|\.\d+)?/; // matches num with optional decimal and/or fraction
const DEFAULT_NUM_INPUT = '1'; // 1 is default value when no num is provided
const INVALID_NUMBER = 'invalid number';

const hasFraction = R.test(fractionMatcher);
const hasInvalidFraction = R.test(multipleFractionMatcher);
const getFraction = R.match(fractionMatcher);
const getFractionValue = R.pipe(getFraction, R.head, eval);
const isDecimal = R.test(decimalMatcher);

function ConvertHandler() {
  this.getNum = function (input) {
    if (hasInvalidFraction(input)) {
      return INVALID_NUMBER;
    }
    const [numInput] = input.match(numInputMatcher) || [DEFAULT_NUM_INPUT];

    if (hasFraction(numInput)) {
      if (isDecimal(numInput)) {
        const wholeNum = parseInt(numInput, 10);
        const fractionValue = getFractionValue(numInput);
        return wholeNum + fractionValue;
      }
      return getFractionValue(numInput);
    }
    return Number(numInput);
  }


  this.getUnit = function (input) {
    let result;

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };

}

module.exports = ConvertHandler;
