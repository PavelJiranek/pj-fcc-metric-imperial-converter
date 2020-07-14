"use strict";
/*
*
*
*       Complete the handler logic below
*       
*       
*/
const R = require('ramda');
const RA = require('ramda-adjunct');

const fractionMatcher = /\d+\/\d+/;
const denominatorMatcher = /\/\d+/g;
const decimalMatcher = /\d+\.\d+/;
const numInputMatcher = /^\d+(\/\d+|\.?\d+\/\d+|\.\d+)?/; // matches num with optional decimal and/or fraction
const DEFAULT_NUM_INPUT = '1'; // 1 is default value when no num is provided

const hasFraction = R.test(fractionMatcher);
const hasInvalidFraction = R.pipe(
    R.match(denominatorMatcher),
    RA.lengthGte(2),
);
const roundToFixed5 = num => Number(num.toFixed(5));
const getFraction = R.match(fractionMatcher);
const getFractionValue = R.pipe(getFraction, R.head, eval, roundToFixed5);
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

const GAL_TO_L = 3.78541;
const LBS_TO_KG = 0.453592;
const MI_TO_KM = 1.60934;

class ConvertHandler {
  constructor() {
    this.INVALID_NUMBER = 'invalid number';
    this.INVALID_UNIT = 'invalid unit';
  }

  getNum = function (input) {
    if (hasInvalidFraction(input)) {
      return this.INVALID_NUMBER;
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


  getUnit = function (input) {
    const [unit] = input.match(unitMatcher) || [''];

    return VALID_UNITS.includes(unit) ? unit : this.INVALID_UNIT;
  };

  getReturnUnit = function (initUnit) {
    const normalizedUnit = initUnit.toLowerCase();

    return UNITS_CONVERSION_MAP[normalizedUnit];
  };

  spellOutUnit = function (unit) {
    const normalizedUnit = unit.toLowerCase();

    return UNITS_FULLNAME_MAP[normalizedUnit];
  };

  convert = function (initNum, initUnit) {
    const normalizedUnit = initUnit.toLowerCase();
    let result;

    switch (normalizedUnit) {
      case UNITS.GAL: {
        result = initNum * GAL_TO_L;
        break;
      }
      case UNITS.L: {
        result = initNum / GAL_TO_L;
        break;
      }
      case UNITS.MI: {
        result = initNum * MI_TO_KM;
        break;
      }
      case UNITS.KM: {
        result = initNum / MI_TO_KM;
        break;
      }
      case UNITS.LBS: {
        result = initNum * LBS_TO_KG;
        break;
      }
      case UNITS.KG: {
        result = initNum / LBS_TO_KG;
        break;
      }
    }
    return roundToFixed5(result);
  };

  getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
