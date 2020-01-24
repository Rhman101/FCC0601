const validator = (originalInput) => {
    const input = originalInput.toLowerCase();
	let numberValid;
	let unitValid;
	const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
	let inputArray = Array.from(input);
	let numbersEndAt = undefined;
	let first = true;
	for (let i = inputArray.length - 1; i > -1; i--) {
		if (/[0123456789\.]/.test(inputArray[i]) == true) {
			if (numbersEndAt === undefined && first === true) {
				numbersEndAt = i;
				first = false;
			}
		}
    }
    
    let numberInput;
    let unitInput = inputArray.slice(numbersEndAt + 1, inputArray.length).join('');    
    if (units.findIndex((elem) => elem === unitInput) === -1) {
        unitValid = false;
    } else {
        unitValid = true;
    }
    if (unitInput === input) {
        numberInput = 1;
    } else {
        numberInput = inputArray.slice(0, numbersEndAt + 1).join('');
    }
    try {
        eval(numberInput);
    } catch (e) {
        // console.log('catchError', e);
        numberValid = false;
    }
    numberValid === undefined ? numberValid = true : numberValid = false;

	return {
        // numbersEndAt,
        numberInput,
        unitInput,
		numberValid: numberValid === undefined ? 'undefined' : numberValid,
		unitValid: unitValid === undefined ? 'undefined' : unitValid
	};
};

module.exports = validator;
