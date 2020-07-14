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

const VALID_UNITS = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
const UNITS_CONVERSION_MAP = {
  'gal': 'l',
  'l': 'gal',
  'mi': 'km',
  'km': 'mi',
  'lbs': 'kg',
  'kg': 'lbs',
}

const UNITS_FULLNAME_MAP = {
  'gal': 'gallons',
  'l': 'liters',
  'mi': 'miles',
  'km': 'kilometers',
  'lbs': 'pounds',
  'kg': 'kilograms',
}
const UNITS = {
  GAL: 'gal',
  L: 'l',
  MI: 'mi',
  KM: 'km',
  LBS: 'lbs',
  KG: 'kg',
};
const unitMatcher = /[a-zA-Z]+/;
const INVALID_UNIT = 'invalid unit';

const GAL_TO_L = 3.78541;
const LBS_TO_KG = 0.453592;
const MI_TO_KM = 1.60934;

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
    const [unit] = input.match(unitMatcher);

    return VALID_UNITS.includes(unit) ? unit : INVALID_UNIT;
  };

  this.getReturnUnit = function (initUnit) {
    const normalizedUnit = initUnit.toLowerCase();

    return UNITS_CONVERSION_MAP[normalizedUnit];
  };

  this.spellOutUnit = function (unit) {
    const normalizedUnit = unit.toLowerCase();

    return UNITS_FULLNAME_MAP[normalizedUnit];
  };

  this.convert = function (initNum, initUnit) {
    const normalizedUnit = initUnit.toLowerCase();

    switch (normalizedUnit) {
      case UNITS.GAL: {
        return initNum * GAL_TO_L;
      }
      case UNITS.L: {
        return initNum / GAL_TO_L;
      }
      case UNITS.MI: {
        return initNum * MI_TO_KM;
      }
      case UNITS.KM: {
        return initNum / MI_TO_KM;
      }
      case UNITS.LBS: {
        return initNum * LBS_TO_KG;
      }
      case UNITS.KG: {
        return initNum / LBS_TO_KG;
      }
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
