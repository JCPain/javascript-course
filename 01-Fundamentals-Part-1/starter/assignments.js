// Values and Variables
const country = 'Philippines';
const continent = 'Asia';
let population = 110;

// console.log('Country: ' + country);
// console.log('Continent: ' + continent);
// console.log('Population: ' + population);

// Data Types
const isIsland = true;
let language;

// console.log(typeof isIsland);
// console.log(typeof population);
// console.log(typeof country);
// console.log(typeof language);

// let, const and var
language = 'Tagalog';
// isIsland = false;
console.log(language);

// Basic Operators
console.log(population / 2);
population++;
console.log(population);
console.log(population > 6);
console.log(population < 33);

const description1 = country + ' is in ' + continent + ', and its ' + population + ' million people speak ' + language;
console.log(description1);

// Strings and Template Literals
const description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(description);

// Taking Decisions: if / else Statements
population = 13;
if (population > 33) {
    console.log(`${country}'s population is above average`);
} else {
    console.log(`${country}'s population is ${33 - population} million below average`);
}

// Type Conversion and Coercion
console.log('9' - '5'); // -> 4
console.log('19' - '13' + '17'); // -> '617'
console.log('19' - '13' + 17); // -> 23
console.log('123' < 57); // -> false
console.log(5 + 6 + '4' + 9 - 4 - 2); // -> 1143