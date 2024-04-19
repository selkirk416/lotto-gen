const readline = require('readline');
const prompt = require('prompt-sync')();
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');

function random_int(lower, upper) {
  // returns a random integer inclusive
  lower = Math.ceil(lower);
  upper = Math.floor(upper);
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

function random_int_ex(bound, exlcusions) {
  // this is just like random_int except it removes selected numbers from the pool
  // exlcusions is an array of ints
  // bound is an array of two values, the lower bound and then the upper bound inclusive
  let pool = []
  for (let i = bound[0]; i <= bound[1]; i++) {
    if (!exlcusions.includes(i)) pool.push(i);
  }
  return pool[Math.floor(Math.random()*pool.length)];
}

function LottoResult(numbers, special) {
  this.numbers = numbers;
  this.special = special;
}

// Powerball
// Select 5 white ball numbers from 1 to 69 and a single red Powerball number from 1 to 26
function powerball() {
  // limits is the lower bound and then the upper bound inclusive
  let limits = [1, 69];
  // starred are the previously chosen numbers
  let starred = [];
  let n_1 = random_int(limits[0], limits[1]);
  starred.push(n_1);
  let n_2 = random_int_ex(limits, starred);
  starred.push(n_2);
  let n_3 = random_int_ex(limits, starred);
  starred.push(n_3);
  let n_4 = random_int_ex(limits, starred);
  starred.push(n_4);
  let n_5 = random_int_ex(limits, starred);
  starred.push(n_5);
  let red = random_int(1, 26);
  starred.push(`\x1B[31m${red}\x1B[0m`);

  return starred;
}


// MegaMillions
// Select 5 white ball numbers from 1 to 70 and a single gold Mega Ball number from 1 to 25
function megamillions() {
  let limits = [1, 70];
  let starred = [];
  let n_1 = random_int(limits[0], limits[1]);
  starred.push(n_1);
  let n_2 = random_int_ex(limits, starred);
  starred.push(n_2);
  let n_3 = random_int_ex(limits, starred);
  starred.push(n_3);
  let n_4 = random_int_ex(limits, starred);
  starred.push(n_4);
  let n_5 = random_int_ex(limits, starred);
  starred.push(n_5);
  let yel = random_int(1, 25);
  starred.push(`\x1B[33m${yel}\x1B[0m`);

  return starred;
}

// select 5 numbers from 1 to 39
function michigan_fantasy5() {
  let limits = [1, 39];
  let n_1 = random_int(limits[0], limits[1]);
  let n_2 = random_int_ex(limits, [n_1]);
  let n_3 = random_int_ex(limits, [n_1, n_2]);
  let n_4 = random_int_ex(limits, [n_1, n_2, n_3]);
  let n_5 = random_int_ex(limits, [n_1, n_2, n_3, n_4]);
  return [n_1, n_2, n_3, n_4, n_5];
}

// select 6 numbers from 1 to 47
function michigan_lotto47() {
  let limits = [1, 47];
  let n_1 = random_int(limits[0], limits[1]);
  let n_2 = random_int_ex(limits, [n_1]);
  let n_3 = random_int_ex(limits, [n_1, n_2]);
  let n_4 = random_int_ex(limits, [n_1, n_2, n_3]);
  let n_5 = random_int_ex(limits, [n_1, n_2, n_3, n_4]);
  let n_6 = random_int_ex(limits, [n_1, n_2, n_3, n_4, n_5]);
  return [n_1, n_2, n_3, n_4, n_5, n_6];
}


console.log("Which lotto are you playing?");
console.log("1) Powerball");
console.log("2) MegaMillions");
console.log("3) Michigan Fantasy 5");
console.log("4) Michigan Lotto47");
let choosen_numbers = [];
let results = {};
let decision_lotto = prompt();
decision_lotto = parseInt(decision_lotto);
console.log("How many draws would you like? (Please choose between 1-5)");
let decision_nums = prompt();
decision_nums = parseInt(decision_nums);

switch (decision_lotto) {
  case 1:
    [...Array(decision_nums)].forEach((_, i) => {
      choosen_numbers.push(powerball());
    });
    let powerball_table = new AsciiTable3('Powerball numbers')
      .setAligns(AlignmentEnum.CENTER)
      .addRowMatrix(choosen_numbers);
    powerball_table.setStyle('unicode-double');
    console.log(powerball_table.toString());
    break;
  case 2:
    [...Array(decision_nums)].forEach((_, i) => {
      choosen_numbers.push(megamillions());
    });
    let megamillions_table = new AsciiTable3('Mega Millions numbers')
      .setAligns(AlignmentEnum.CENTER)
      .addRowMatrix(choosen_numbers);
    megamillions_table.setStyle('unicode-mix');
    console.log(megamillions_table.toString());
    break;
  case 3:
    [...Array(decision_nums)].forEach((_, i) => {
      choosen_numbers.push(michigan_fantasy5());
    });
    let fantasy5_table = new AsciiTable3('Fantasy5 numbers')
      .setAligns(AlignmentEnum.CENTER)
      .addRowMatrix(choosen_numbers);
    fantasy5_table.setStyle('unicode-round');
    console.log(fantasy5_table.toString());
    break;
  case 4:
    [...Array(decision_nums)].forEach((_, i) => {
      choosen_numbers.push(michigan_lotto47());
    });
    let lotto47_table = new AsciiTable3('Lotto47 numbers')
      .setAligns(AlignmentEnum.CENTER)
      .addRowMatrix(choosen_numbers);
    lotto47_table.setStyle('unicode-single');
    console.log(lotto47_table.toString());
    break;
  default:
    console.log("Please choose one of the listed options.");
}