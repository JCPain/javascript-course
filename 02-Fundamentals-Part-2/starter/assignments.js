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

// Introduction to arrays
// const populations = [1441, 126, 111, 146]; // 146 = Russia
// console.log(populations.length === 4);
// const percentages = [
//     percentageOfWorld1(populations[0]),
//     percentageOfWorld1(populations[1]),
//     percentageOfWorld1(populations[2]),
//     percentageOfWorld1(populations[3])
// ];
// console.log(percentages);

// Basic array operations (methods)
const neighbours = ['Malaysia', 'Indonesia', 'Japan'];

neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes('Germany')) {
    console.log('Probably not a central European country :D');
}

neighbours[neighbours.indexOf('Malaysia')] = 'India';
console.log(neighbours);

const myCountry = {
    country: 'Philippines',
    capital: 'Manila',
    language: 'tagalog',
    population: 111,
    neighbours: ['Malaysia', 'Indonesia', 'Japan']
};

// Dot vs. Bracket Notation
// 'Finland has 6 million finnish-speaking people, 3 neighbouring countries and a capital called Helsinki.'
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry['language']}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`,);

myCountry.population += 2;
console.log(myCountry.population);

myCountry['population'] -= 2;
console.log(myCountry.population);

// Object Methods
const myCountry2 = {
    country: 'Philippines',
    capital: 'Manila',
    language: 'tagalog',
    population: 111,
    neighbours: ['Malaysia', 'Indonesia', 'Japan'],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this['language']}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`);
    },
    checkIsland: function () {
        this.isIsland = this.neighbours.length === 0 ? true : false;
    }
    
    // Even simpler version (see why this works...)
    // this.isIsland = !Boolean(this.neighbours.length);
};

myCountry2.describe();
myCountry2.checkIsland();
console.log(myCountry2);

// Iteration: The for Loop
for(let voter = 1; voter <= 50; voter++) {
    console.log(`Voter number ${voter} is currently voting`);
}

// Looping Arrays, Breaking and Continuing
// const populations = [1441, 126, 111, 146];

// const percentages2 = [];

// for(let i = 0; i < populations.length; i++) {
//     const perc = percentageOfWorld1(populations[i]);
//     percentages2.push(perc);
// }

// console.log(percentages2);

// Looping Backwards and Loops in Loops
const listOfNeighbours = [
    ['Canada', 'Mexico'], 
    ['Spain'],
    ['Norway', 'Sweden','Russia'],
];

for(let i = 0; i < listOfNeighbours.length; i++) {
    for(let country = 0; country < listOfNeighbours[i].length; country++) {
        console.log(`Neighbour: ${listOfNeighbours[i][country]}`);
    }
}

// The while Loop
let populations = [1441, 126, 111, 146];

const percentages3 = [];
let i = 0;
while(i < populations.length) {
    const perc = percentageOfWorld1(populations[i]);
    percentages3.push(perc);
    i++;
}

console.log(percentages3);

