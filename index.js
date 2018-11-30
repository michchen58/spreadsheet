let data = {};

const setCell = function(cellAddress, valueToSet) {
  data[cellAddress] = valueToSet;
}

const getValue = function(cellContents) {
  let storedValue = data[cellContents];

  let isEquation = storedValue
                 ? storedValue.toString().charAt(0) === '='
                 : false;
  if (isEquation) {
    let equation = storedValue.slice(1, storedValue.length);
    let valuesToSum = equation.split('+');
    let sum = valuesToSum.reduce(
      (tot, val) => (tot + getValue(val)),
      0
    );
    return sum;
  } else {
    if (cellContents.match(/[a-z]{1,}\d{1,}/i)) {
      return Number(storedValue);
    } else {
      return Number(cellContents);
    }
  }
}


console.log('--- test simple get/set ---');
setCell('A1', 1);
console.log(`setCell: expect ${data['A1']} to equal 1`);
console.log(`getCell: expect ${getValue('A1')} to equal 1`);


console.log('\n--- test calculated values ---');
setCell('B1', 34);
console.log(`setCell: expect ${data['B1']} to equal 34`);
setCell('C2', '=A1+B1');
console.log(`setCell: expect ${data['C2']} to equal =A1+B1`);
console.log(`getCell: expect ${getValue('C2')} to equal 35`);


console.log('\n--- test changing value referenced in equation ---');
setCell('B1', 10);
console.log(`setCell: expect ${data['B1']} to equal 10`);
console.log(`getCell: expect ${getValue('C2')} to equal 11`);

console.log('\n--- test calculated values >1 reference deep ---');
setCell('C3', '=C2+B1');
console.log(`setCell: expect ${data['C3']} to equal =C2+B1`);
console.log(`getCell: expect ${getValue('C3')} to equal 21`);


console.log('\n--- test equation including both references and numbers ---');
setCell('C4', '=C3+100');
console.log(`setCell: expect ${data['C4']} to equal =C3+100`);
console.log(`getCell: expect ${getValue('C4')} to equal 121`);
