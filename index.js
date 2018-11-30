const setCell = function(cellAddress, valueToSet) {
  data[cellAddress] = valueToSet;
}

const getValue = function(cellAddress) {
  if (data[cellAddress]) {

    // could name rawvalue, valuefromstorage, storedvalue
    // best to rename to "value" (it's a map w keys & actually *values*)
    let calculatedValue = data[cellAddress];
    if (calculatedValue[0] === '=') {
      // remove equals
      // could call this "equation"
      calculatedValue = calculatedValue.slice(1, calculatedValue.length);

      // wrap in data[_]
      // feedback: don't use getValue in the string -- if needed to change name then might forget needs to be changed here as well
      // rename stringToEval or expandedExpressionToEval ("eval" instead of "evaluate" to show it's specifically the JS "eval" function)
      calculatedValue = calculatedValue.split('+').map(x => `getValue('${x}')`).join('+');

    }

    return eval(calculatedValue);
  }
}

// could be improved
const doThing = function(shouldDo) {
  let a = 3;
  if (shouldDo) {
    a = 5;
  }

  let b = a + a;
  let c = b + a;
  return c;


// possibly better
const doThing = function(shouldDo) {
  if (shouldDo) {
    return doThingWithA(5)
  } else {
    return doThingWithA(3)
  }
}

const doThingWithA(a) {
  let b = a + a;
  let c = b + a;
  return c;
}


let data = {};

// test setting
setCell('A1', 1);
console.log(`SETCELL: expect ${data['A1']} to equal 1`);

//test getting
console.log(`GETCELL: expect ${getValue('A1')} to equal 1`);

// test setting calculated value
setCell('B1', 34);
setCell('C2', '=A1+B1');
console.log(`SETCELL: expect ${data['C2']} to equal =A1+B1`);

// test getting calculated value
console.log(`GETCELL: expect ${getValue('C2')} to equal 35`);

// test changing value referenced in equation
setCell('B1', 10);
console.log(`SETCELL: expect ${data['B1']} to equal 10`);

// test getting value of cell with equation (after change)
console.log(`GETCELL: expect ${getValue('C2')} to equal 11`);

// set C3 to C2+B1
setCell('C3', '=C2+B1');
console.log(`SETCELL: expect ${data['C3']} to equal =C2+B1`);

// test getting
console.log(`GETCELL: expect ${getValue('C3')} to equal 21`);

// console.log(data);
