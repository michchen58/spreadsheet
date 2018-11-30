const setCell = function(cellAddress, valueToSet) {
  // TO DO: cell already defined?
  data[cellAddress] = valueToSet;
}

const getValue = function(cellAddress) {


  // if cellAddress is an address
  if (data[cellAddress]) {
    console.log(`data[cellAddress] = ${data[cellAddress]}`)
    let storedValue = data[cellAddress].toString();

    if (storedValue.charAt(0) === '=') {
      let equation = storedValue.slice(1, storedValue.length);
      let numsToadd = equation.split('+');
      let calculatedEquation = numsToadd.reduce((total, val) =>
         Number(total) + (getValue(val) || 0)
      , 0);
      return calculatedEquation;
    } else {
      return Number(storedValue);
    }
  } else {
    // cellAddress is a number
    return Number(cellAddress);
  }
}

// possibly better
const doThing = function(shouldDo) {
  if (shouldDo) {
    return doThingWithA(5)
  } else {
    return doThingWithA(3)
  }
}

const doThingWithA = function(a) {
  let b = a + a;
  let c = b + a;
  return c;
}


let data = {};

// test setting
setCell('A1', 1);
console.log(`----SETCELL: expect ${getValue('A1')} to equal 1`);
//test getting
console.log(`----GETCELL: expect ${getValue('A1')} to equal 1`);


// test setting calculated value
setCell('B1', 34);
console.log(`----SETCELL: expect ${getValue('B1')} to equal 34`);

setCell('C2', '=A1+B1');
console.log(`----SETCELL: expect ${getValue('C2')} to equal =A1+B1`);

// test getting calculated value
console.log(`----GETCELL: expect ${getValue('C2')} to equal 35`);



// test changing value referenced in equation
setCell('B1', 10);
console.log(`----SETCELL: expect ${getValue('B1')} to equal 10`);


// test getting value of cell with equation (after change)
console.log(`----GETCELL: expect ${getValue('C2')} to equal 11`);


// set C3 to C2+B1
setCell('C3', '=C2+B1');
console.log(`----SETCELL: expect ${data['C3']} to equal =C2+B1`);

// test getting
console.log(`----GETCELL: expect ${getValue('C3')} to equal 21`);

setCell('C4', '=C3+100');
console.log(`----SETCELL: expect ${data['C4']} to equal =C3+100`);
console.log(`----GETCELL: expect ${getValue('C4')} to equal 121`);
