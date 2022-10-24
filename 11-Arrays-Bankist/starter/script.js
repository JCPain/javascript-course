'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM Elements
// function to display movements (list)
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // textContent = 0

  // return sorted / unsorted movements
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// function to display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// function to display summary: incomes, out/withdrawals, interest
// takes the account object as a parameter
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0) // Get the deposits
    .map(deposit => (deposit * acc.interestRate) / 100) // Calculate the percentages
    .filter((int, i, arr) => {
      // return if percentage >= 1€
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0); // Calculate the totol interest;
  labelSumInterest.textContent = `${interest}€`;
};

// Computing Usernames
const createUsernames = function (accs) {
  // 2. loop through each account object, in each iteration, add a username property to each occount object
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ') // ['steven', 'thomas', 'williams']
      .map(name => name[0]) // ['s', 't', 'w']
      .join(''); // stw
  });
};

//1. pass the accounts array into the createUsernames function
createUsernames(accounts);
// console.log(accounts);

// Update UI
const updateUI = function (acc) {
  // Display movements (list)
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc); // pass entire account object

  // Display summary: income, out, interest
  calcDisplaySummary(acc);
};

// Event handlers
// LOGIN USER
let currentAccount; // global current user
const login = btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // Find current user
  // Look for username (e.g js), store in currentAccount
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // check if entered pin = account pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // if true...

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // prevent page reload
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clear inputs
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 && // transfer amount > 0?
    receiverAcc && // receiver acc exists?
    currentAccount.balance >= amount && // current acc balance >= transfer amount?
    receiverAcc?.username !== currentAccount.username // receiver acc !== current acc?
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount); // add - movement to current acc
    receiverAcc.movements.push(amount); // add + movement to receiver acc

    // Update UI
    updateUI(currentAccount);
  }
});

// REQUEST LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // any deposit >= 10% of requested loan amount?
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  // Clear inputs
  inputLoanAmount.value = '';
});

// CLOSE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username && // input username = current acc username?
    Number(inputClosePin.value) === currentAccount.pin // input pin = current acc pin?
  ) {
    // find the index
    // findIndex() returns the index of the FIRST value that matches the condition
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23);

    // Delete acc
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear inputs
  inputCloseUsername.value = inputClosePin.value = '';
});

// Sort
let sorted = false; // default = false
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted); // default = true
  sorted = !sorted; // default = true
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
/////////////////////////////////////////////////
// Simple Array Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE (mutates the array)
// console.log(arr.splice(2));
arr.splice(-1); // remove e
console.log(arr); // a, b, c, d
arr.splice(1, 2); // remove b, c
console.log(arr); // a, d

// REVERSE (mutates the array)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/

/*
/////////////////////////////////////////////////
// The new at Method
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0));
console.log('jonas'.at(-1));
*/

/*
/////////////////////////////////////////////////
// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('---- FOREACH ----');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...
*/

/*
/////////////////////////////////////////////////
// forEach With Maps and Sets

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

/*
/////////////////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
// Solution - JC
// const juliaArr = [3, 5, 2, 12, 7];
// const kateArr = [4, 1, 15, 8, 3];

// const juliaArr2 = [9, 16, 6, 8, 3];
// const kateArr2 = [10, 5, 6, 1, 4];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrect = dogsJulia.slice(1, -2);

//   // const dogsArr = [...dogsJuliaCorrect, ...dogsKate];
//   const dogsArr = dogsJuliaCorrect.concat(dogsKate);

//   dogsArr.forEach(function (age, i) {
//     const str =
//       age >= 3 ? `an adult, and is ${age} years old` : `still a puppy`;
//     console.log(`Dog number ${i + 1} is ${str}`);
//   });
// };

// console.log('---- Data 1: ----');
// checkDogs(juliaArr, kateArr);
// console.log('---- Data 2: ----');
// checkDogs(juliaArr2, kateArr2);

// Solution
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();

  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/*
/////////////////////////////////////////////////
// The map Method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// using for of loop
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescriptions);
*/

/*
/////////////////////////////////////////////////
// The filter Method

// Array methods are preferred due to:
// 1. method chaining
// 2. functional programming

// using filter method
// filter() returns all the elements that matches the condition

// get the deposits
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// using for of loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// get the withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
///////////////////////////////////////
// The reduce Method
console.log(movements);
// arr.reduce() - combine all array values to a single value
// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: Initial: ${acc} Current: ${cur}`);
//   const sum = acc + cur;
//   console.log(`Return: ${sum}`);
//   return sum;
// }, 0);

// Arrow function
const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

// using for of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
// acc is the current max value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
// console.log('\n');

// Minimum value - JC
// const min = movements.reduce(function (acc, cur) {
//   console.log(`Acc: ${acc} Curr: ${cur}`);
//   if (acc < cur) {
//     console.log(`ACCUMULATOR ${acc} is returned`);
//     return acc;
//   } else {
//     console.log(`CURRENT ${cur} is returned`);
//     return cur;
//   }
// }, movements[0]);

// console.log(min);
*/

/*
///////////////////////////////////////
// Coding challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
// Solution - JC
// const calcAverageHumanAge = ages => {
//   // 1. Convert dog to human age
//   const dogToHumanAge = ages.map(dogAge =>
//     dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
//   );
//   // console.log(`Ages: ${dogToHumanAge}`);

//   // 2. Exclude minors
//   const adults = dogToHumanAge.filter(age => age >= 18 && age);
//   // console.log(`Adults: ${adults}`);

//   // 3. Calculate the average
//   const averageAge = adults.reduce((acc, cur) => acc + cur);
//   const average = averageAge / adults.length;
//   console.log(average);
//   // console.log(`${Math.round(average)}`);
//   // return average
// };

// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // Data 1
// calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // Data 2

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  // const average =
  //   adults.reduce((acc, age, i, arr) => acc + age, 0) / adults.length;

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3. (2+3)/2 = 2.5. === 2/2 + 3/2 = 2.5

  return average;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
///////////////////////////////////////
// The Magic of Chaining Methods

const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const calcAverageHumanAge2 = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};

const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4)) // dog -> human age
    .filter(age => age >= 18) // if legal, return
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0); // average

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

/*
///////////////////////////////////////
// The find Method

// retrieve an element of an array based on a condition
// returns the FIRST value that matches the condition

const firstWithdrawal = movements.find(mov => mov < 0); // condition -> boolean
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// using for of loop
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') console.log(acc);
}
*/

/*
///////////////////////////////////////
// some and every
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION (returns boolean)
// true, if any element matches the condition
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0); // any movement in the array are deposits?
console.log(anyDeposits);

// EVERY (returns boolean)
// true, only if every element matches the condition
console.log(movements.every(mov => mov > 0)); // every movement in the array are deposits?
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0; // check if movement is a deposit
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300]
*/

/*
///////////////////////////////////////
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap (flat only goes 1 level deep)
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) // map then flat
  .reduce((acc, cur) => acc + cur, 0);
console.log(overalBalance2);
*/

/*
///////////////////////////////////////
// Sorting Arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1; // b (SMALLER) first then a (switch order)
//   }
//   if (a < b) {
//     return -1; // a (SMALLER) first then b (keep order)
//   }
// });

// using shorthand
// a - b = (-) keep [a, b]
// a - b = (+) switch [b, a]
movements.sort((a, b) => a - b);
console.log('Ascending:', movements); // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// Descending
// movements.sort((a, b) => {
//   if (a > b) {
//     return -1; // a (BIGGER) first then b (keep order)
//   }
//   if (a < b) {
//     return 1; // b (BIGGER) first then a (switch order)
//   }
// });

// using shorthand
// b - a = (-) keep [a, b]
// b - a = (+) switch [b, a]
movements.sort((a, b) => b - a);
console.log('Descending:', movements); // [3000, 1300, 450, 200, 70, -130, -400, -650]

// [200, 450, -400, 3000, -650, -130, 70, 1300]
*/

/*
///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x); // [empty × 7]
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1); // fill() mutates the array

console.log(x); // [empty × 3, 1, 1, empty × 2]
arr.fill(23, 2, 6);
console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// Get the movements from UI and store in array using from()
labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    // 1st parameter: // iterable or array like object
    document.querySelectorAll('.movements__value'), // loop through the NodeList(object) using from()

    // 2nd parameter: map fn
    el => Number(el.textContent.replace('€', '')) // for each element of the NodeList, do..
  );
  console.log(movementsUI); // [1300, 70, -130, -650, 3000, -400, 450, 200]
});
*/

/*
///////////////////////////////////////
// Array Methods Practice
// 1. Calculate the total deposits of all the accounts
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum); // 25180

// 2. Count how many deposits there have been in the bank with at least $1,000.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// Prefixed ++ operator
let a = 10;
console.log(++a);
console.log(a);

// 3. Object containing total sum of deposits and withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// Using empty object as accumulator - JC
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((sums, cur) => {
//     const type = cur > 0 ? 'deposits' : 'withdrawals';
//     if (sums[type] == null) sums[type] = 0;
//     sums[type] += cur;
//     return sums;
//   }, {});
// console.log(sums);

// 4. Convert a string to title case with some exceptions
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));


// 4. Convert a string to title case and remove exceptions - JC
// this is a nice title -> This Is Nice Title
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .filter(word => !exceptions.includes(word))
//     .join(' ');
//   return capitalize(titleCase);
// };

// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

// CHALLENGE on using reduce() on previous exercises on map and filter() -------------------------------------------------------------------------------------
// movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// map -> reduce()
// const eurToUsd = 1.1;
// const movementsUSD = movements.reduce((acc, mov) => {
//   acc.push(mov * eurToUsd);
//   return acc;
// }, []);

// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.reduce((acc, mov, i) => {
//   acc.push(
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
//   );
//   return acc;
// }, []);

// console.log(movementsDescriptions);

// filter -> reduce()
// get the deposits
// const deposits = movements.reduce((acc, mov) => {
//   mov > 0 && acc.push(mov);
//   return acc;
// }, []);

// console.log(movements);
// console.log(deposits);

// get the withdrawals
// const withdrawals = movements.reduce((acc, mov) => {
//   mov < 0 && acc.push(mov);
//   return acc;
// }, []);
// console.log(withdrawals);

// Coding Challenge #1 using reduce()
// Convert dog ages to human ages
// Group adult dogs and puppies based on their ages
// Store the result inside an object
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();

//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   // console.log(dogs);

//   const dogsObj = dogs.reduce((obj, dogAges, i) => {
//     const type = dogAges >= 3 ? 'adult' : 'puppy';
//     if (obj[type] == null) obj[type] = [];
//     const str =
//       type === 'adult'
//         ? `an ${type}, and is ${dogAges} years old`
//         : `still a ${type} 🐶`;
//     obj[type].push(`Dog number ${i + 1} is ${str}`);
//     return obj;
//   }, {});
//   return dogsObj;
// };

// console.log(checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]));
// console.log(checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]));

// Coding Challenge #3 using reduce()
// const calcAverageHumanAge = ages =>
//   ages
//     .reduce((acc, age, i, arr) => {
//       const humanAge = age <= 2 ? 2 * age : 16 + age * 4; // convert dog -> human age
//       humanAge >= 18 && acc.push(humanAge); // get ages >= 18
//       return acc;
//     }, [])
//     .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // get average

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]); // 44
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]); // 47.333333333333336
// console.log(avg1, avg2);

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// console.log(dogs);

// Solution - JC
// (dogsArr => {
//   // Check if a dog eats too little or too much
//   const foodBelowOkay = obj => obj.curFood < obj.recommendedFood * 0.9;
//   const foodAboveOkay = obj => obj.curFood > obj.recommendedFood * 1.1;

//   // Check if a dog eats an okay amount
//   const eatingOkayFunc = obj =>
//     obj.curFood > obj.recommendedFood * 0.9 &&
//     obj.curFood < obj.recommendedFood * 1.1;

//   // 1. Add a recommended food portion to each dog
//   dogsArr.forEach(
//     dog => (dog['recommendedFood'] = Math.trunc(dog.weight ** 0.75 * 28))
//   );

//   // 2.
//   const dogSarah = dogsArr.find(dog => dog.owners.includes('Sarah'));
//   const sarah = dogSarah.owners.filter(name => name === 'Sarah').join();
//   const str = `'s dog eats too`;
//   if (foodBelowOkay(dogSarah)) console.log(`${sarah}${str} little`);
//   else if (foodAboveOkay(dogSarah)) console.log(`${sarah}${str} much`);

//   // 3.
//   const eating = dogsArr.reduce(
//     (acc, dog) => {
//       if (foodBelowOkay(dog)) acc.ownersEatTooLittle.push(...dog.owners);
//       else if (foodAboveOkay(dog)) acc.ownersEatTooMuch.push(...dog.owners);
//       return acc;
//     },
//     { ownersEatTooMuch: [], ownersEatTooLittle: [] }
//   );
//   // console.log(eating);

//   // 4.
//   for (const [key, value] of Object.entries(eating)) {
//     const owner = value.join(' and ');
//     if (key === 'ownersEatTooLittle')
//       console.log(`${owner}'s dogs eats too little`);
//     else if (key === 'ownersEatTooMuch')
//       console.log(`${owner}'s dogs eats too much`);
//   }

//   // 5.
//   const eatingExactly = dogsArr.some(
//     obj => obj.curFood === obj.recommendedFood
//   );
//   console.log('Eating Exactly', eatingExactly);

//   // 6.
//   const eatingOkay = dogsArr.some(obj => eatingOkayFunc(obj));
//   console.log('Eating Okay', eatingOkay);

//   // 7.
//   const eatingOkArr = dogsArr.filter(obj => eatingOkayFunc(obj));
//   console.log(eatingOkArr);

//   // 8.
//   const sortedDogs = dogsArr
//     .slice()
//     .sort((a, b) => a.recommendedFood - b.recommendedFood);
//   console.log(sortedDogs);
// })(dogs);

// Solution
// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!"
//  "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eats too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eats too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
