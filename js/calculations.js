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
  starred.push(red);

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
  starred.push(yel);

  return starred;
}

module.exports.powerball = powerball;
module.exports.megamillions = megamillions;
