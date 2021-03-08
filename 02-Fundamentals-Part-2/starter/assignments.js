'use strict';
// Functions
function describeCountry(country, population, capitalCity) {
    return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descPhilippines = describeCountry('Philippines', 111, 'Manila');
const descFinland = describeCountry('Finland', 6, 'Helsinki');
const descJapan = describeCountry('Japan', 126, 'Tokyo');

console.log(descPhilippines);
console.log(descFinland);
console.log(descJapan);

// Function expression
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const percChina1 = percentageOfWorld1(1441);
const percJapan1 = percentageOfWorld1(126);
const percPhilippines1 = percentageOfWorld1(111);
console.log(percChina1, percJapan1, percPhilippines1);

// Function declaration
const percentageOfWorld2 = function(population) {
    return (population / 7900) * 100;
}

const percChina2 = percentageOfWorld2(1441);
const percJapan2 = percentageOfWorld2(126);
const percPhilippines2 = percentageOfWorld2(111);
console.log(percChina2, percJapan2, percPhilippines2);

// Arrow function
const percentageOfWorld3 = population => (population / 7900) * 100;

const percChina3 = percentageOfWorld3(1441);
const percJapan3 = percentageOfWorld3(126);
const percPhilippines3 = percentageOfWorld3(111);
console.log(percChina3, percJapan3, percPhilippines3);

// Functions calling other functions
const describePopulation = function(country, population) {
    const percentage = percentageOfWorld1(population);
    const description = `${country} has ${population} million people, which is about ${percentage}% of the world.`;
    console.log(description);
}

describePopulation('China', 1441);
describePopulation('Japan', 126);
describePopulation('Philippines', 111);
