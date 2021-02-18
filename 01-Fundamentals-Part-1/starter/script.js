/*
// Values and Variables
// Value = Smallest unit of information in JavaScript
let js = 'amazing';
// if (js === 'amazing') alert('JavaScript is FUN!');
// 40 + 8 + 23 - 10;

// Displaying literal values in the console
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

// Declaring a variable
let firstName = "Matilda";

// Variable naming convention in JavaScript (Camelcase Notation)
// let firstNamePerson

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Note:
// Variables can be considered as a box which can store a value
// Variable names cannot start with a number
// Variable names can only contain numbers, letters, underscores or the dollar sign
// Avoid reserved keywords
// Do not use uppercase letters in the beginning of variable names
// Variables that are all in uppercase are for constants
// Variable names should be descriptive

// Varaible name conventions
let jonas_matilda = "JM";
let $function = 27;
let name = "Jonas"; // "name" is a reserved keyword, avoid using it

let person = "jonas";
let PI = 3.1415;

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

// not advisable
let job1 = "programmer";
let job2 = "teacher";

console.log(myFirstJob);
//-------------------------------------------------------------------------------------------------------------------
// Data Types
let javascriptIsFun = true;
console.log(javascriptIsFun); // true

// console.log(typeof true);
console.log(typeof javascriptIsFun); // boolean
// console.log(typeof 23);
// console.log(typeof 'Jonas');

javascriptIsFun = 'YES!';
console.log(typeof javascriptIsFun); // string

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null);
//------------------------------------------------------------------------------------------------------------------
// let, const and var
let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;
// const job;

var job = 'programmer';
job = 'teacher';

lastName = 'Schmedtmann';
console.log(lastName);\
//-------------------------------------------------------------------------------------------------------------------
// Basic operators
// Math oprerators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5; // 15
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x);

// Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(now - 1991 > now - 2018);
//-------------------------------------------------------------------------------------------------------------------
// Operator precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y; // undefined
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y); // 10 10

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/
//-------------------------------------------------------------------------------------------------------------------
// Coding Challenge #1
/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both versions)
3. Create a boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

TEST DATA 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
TEST DATA 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

GOOD LUCK 😀
*/

// Test data 1
// const massMark = 78;
// const heightMark = 1.69;
// const massJohn = 92;
// const heightJohn = 1.95;

// Test data 2
const massMark = 95;
const heightMark = 1.88;
const massJohn = 85;
const heightJohn = 1.76;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);
