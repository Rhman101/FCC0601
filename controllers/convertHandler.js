/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    return input;
  };
  
  this.getUnit = function(input) {
    return input;
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      gal: 'l', 
      lbs: 'kg', 
      mi: 'km',
      l: 'gal', 
      kg: 'lbs', 
      km: 'mi',
    }
    return units[initUnit]; 
  };

  this.spellOutUnit = function(unit) {
    const unitsSpellOut = {
      gal: 'gallon', 
      lbs: 'pounds', 
      mi: 'miles',
      l: 'liters', 
      kg: 'kilograms', 
      km: 'kilometers',
    }
    return unitsSpellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const conversion = [['gal', 'l', 3.78541], ['lbs', 'kg', 0.453592], ['mi', 'km', 1.60934]];
    let evaluated;
    if (conversion.find((elem) => elem[0] === initUnit) !== undefined) {
      let index = conversion.findIndex((elem) => elem[0] === initUnit);
      evaluated = eval(initNum) * conversion[index][2];
    } else {
      let index = conversion.findIndex((elem) => elem[1] === initUnit);
      evaluated = eval(initNum) / conversion[index][2]
    }
    // return (Math.round(evaluated * 100000) / 100000);
    return new Number(Number.parseFloat(evaluated).toFixed(5));
  };
  
  this.getString = function(initNum, initUnitSpelled, returnNum, returnUnitSpelled) {
    return `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
  };
  
}

module.exports = ConvertHandler;
