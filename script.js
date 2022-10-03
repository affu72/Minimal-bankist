"use strict";

const mainApp = document.querySelector(".app");
const containerMovements = document.querySelector(".section-movement");
const balanceValue = document.querySelector(".balance-value");
const loginAction = document.querySelector(".login-action-input");
const labelWelcome = document.querySelector(".welcome");

const inVal = document.querySelector(".in-value");
const outVal = document.querySelector(".out-value");
const interestVal = document.querySelector(".interest-value");

const loginBtn = document.querySelector(".login-btn");
const transferBtn = document.querySelector(".btn-transfer");
const closeAccBtn = document.querySelector(".close-account-btn");
const requestLoanBtn = document.querySelector(".request-loan-btn");
const sortMovementsBtn = document.querySelector(".sort-btn");

const inputUsername = document.querySelector(".username");
const inputPin = document.querySelector(".pin");
const inputTransfer = document.querySelector(".input-transfer-to");
const inputTransferValue = document.querySelector(".input-transfer-value");
const inputLoan = document.querySelector(".input-loan");
const CloseAccountUsername = document.querySelector(".username-close-account");
const closeAccPin = document.querySelector(".pin-close-account");

const dateLabel = document.querySelector(".date");

const timeLabel = document.querySelector(".time");

const account1 = {
  owner: "Afzal Nomani",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDate: [
    "2022-10-01T17:19:47.000Z",
    "2020-11-07T04:23:43.000Z",
    "2020-11-03T00:07:10.000Z",
    "2022-10-01T02:20:52.000Z",
    "2020-08-20T23:46:49.000Z",
    "2020-07-16T20:41:38.000Z",
    "2022-09-27T04:38:41.000Z",
    "2022-10-02T10:31:12.000Z",
  ],

  locale: "hi-IN",
  currency: "INR",
};

const account2 = {
  owner: "Parveen Sultana",
  movements: [5000, 235, -845, 8000, -700, -130, 70, 1300],
  interestRate: 1.5, // %
  pin: 2222,

  movementsDate: [
    "2020-12-25T04:42:00.000Z",
    "2020-10-18T16:55:46.000Z",
    "2020-10-01T01:10:36.000Z",
    "2020-07-21T10:24:26.000Z",
    "2020-06-30T20:17:50.000Z",
    "2020-05-11T22:04:55.000Z",
    "2020-03-01T11:55:15.000Z",
    "2020-01-25T02:17:35.000Z",
  ],

  locale: "en-US",
  currency: "USD",
};

const account3 = {
  owner: "Imran Ahmad",
  movements: [10, 20, -400, -3000, 650, -130, 70, 400],
  interestRate: 1.2, // %
  pin: 3333,
  movementsDate: [
    "2020-11-09T06:34:16.000Z",
    "2020-08-29T12:09:16.000Z",
    "2020-08-26T07:50:51.000Z",
    "2020-07-21T09:58:08.000Z",
    "2020-05-26T08:20:21.000Z",
    "2020-04-06T15:26:08.000Z",
    "2020-03-13T21:45:08.000Z",
    "2020-02-29T20:22:18.000Z",
  ],
  locale: "ar-SA",
  currency: "AED",
};

const account4 = {
  owner: "Parvez Alam Khan",
  movements: [426, 985, -400, 658, -231, -28, 70, 472],
  interestRate: 1.8, // %
  pin: 4444,
  movementsDate: [
    "2020-12-08T01:45:00.000Z",
    "2020-10-07T17:38:27.000Z",
    "2020-10-02T04:33:18.000Z",
    "2020-05-07T01:59:54.000Z",
    "2020-04-19T06:27:08.000Z",
    "2020-03-10T00:41:38.000Z",
    "2020-01-31T02:18:56.000Z",
    "2022-01-10T01:20:31.000Z",
  ],
  locale: "ar-OM",
  currency: "OMR",
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["INR", "Indian Rupee"],
]);

//

const currDate = new Date();
// const date = `${currDate.getDate()}`.padStart(2, 0);
// const month = `${currDate.getMonth() + 1}`.padStart(2, 0);
// const year = currDate.getFullYear();
// const hrs = `${currDate.getHours()}`.padStart(2, 0);
// const min = `${currDate.getMinutes()}`.padStart(2, 0);
// const sec = currDate.getSeconds();

//we can use now internationalization API to do above thing.

// const formattedDate = new Intl.DateTimeFormat(local, options).format(currDate);

/************************************GENERATING RANDOM DATE ***************************/
// const randomNum = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// const rand = [];
// for (let i = 0; i < 8; i++) {
//   const d = randomNum(1, 31);
//   const m = randomNum(0, 11);
//   const y = randomNum(2020, 2020);
//   const h = randomNum(0, 23);
//   const mi = randomNum(0, 59);
//   const sec = randomNum(0, 59);

//   rand.push(new Date(y, m, d, h, mi, sec).toISOString());
// }

// console.log(rand.sort().reverse());

/************************************END ***************************/
const formateDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

  const daysPassed = Math.round(calcDaysPassed(date, currDate));

  if (daysPassed == 0) return `TODAY`;

  if (daysPassed == 1) return `YESTERDAY`;

  if (daysPassed <= 7) return `${daysPassed} DAYS AGO`;

  // const movYear = date.getFullYear();
  // const movMonth = `${date.getMonth() + 1}`.padStart(2, 0);
  // const moveDay = `${date.getDate()}`.padStart(2, 0);

  // return `${moveDay}/${movMonth}/${movYear}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formateCurr = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const display = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  containerMovements.innerHTML = "";
  movs.forEach((mov, i) => {
    const movDates = new Date(acc.movementsDate[i]);
    const displayDate = formateDate(movDates, acc.locale);

    const type = mov > 0 ? "deposit" : "withdrawal";

    const formattedMov = formateCurr(mov, acc.locale, acc.currency);
    const html = `<div class="movement-row">
        <div class="movement-type-${type} movement-type">${i + 1}.${type}</div>
        <div class="movement-date">${displayDate}</div>
        <div class="movement-value">${formattedMov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcPrintBalance = function (account) {
  // creating and updating new property
  account.balance = account.movements.reduce((acc, ele) => acc + ele);

  const formattedBalance = formateCurr(
    account.balance,
    account.locale,
    account.currency
  );
  balanceValue.textContent = formattedBalance;
};

const calDisplaySummary = function (account) {
  // dateLabel.textContent = `${date}/${month}/${year}, ${hrs}:${min}`;
  const inBalnace = account.movements
    .filter((ele) => ele > 0)
    .reduce((acc, curr) => acc + curr, 0);

  inVal.textContent = formateCurr(inBalnace, account.locale, account.currency);

  const outBalance = account.movements
    .filter((ele) => ele < 0)
    .reduce((acc, curr) => acc + curr, 0);

  // outVal.textContent = `${outBalance.toFixed(2)}€`;
  outVal.textContent = formateCurr(
    outBalance,
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter((deposit) => deposit > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, curr) => acc + curr, 0);

  // interestVal.textContent = `${interest.toFixed(2)}€`;
  interestVal.textContent = formateCurr(
    interest,
    account.locale,
    account.currency
  );
};

const createUsername = function (accounts) {
  accounts.forEach((ele) => {
    ele.username = ele.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((ele) => ele[0])
      .join("");
  });
};
createUsername(accounts);

const updateUI = function (currentAccount) {
  // calculate and dipslay moements

  display(currentAccount);

  // calculate and dipslay balanceValue

  calcPrintBalance(currentAccount);

  // calculate Display Summary
  calDisplaySummary(currentAccount);
};

//fake login

// updateUI(accounts[0]);
// mainApp.style.opacity = 100;

/********** EVENT HANDLER  *********/

let currentAccount, timer;

const StartLogOutTimer = function () {
  let t = 300;

  const tick = function () {
    const min = String(Math.trunc(t / 60)).padStart(2, 0);
    const sec = String(t % 60).padStart(2, 0);

    timeLabel.textContent = `${min}:${sec} min`;

    if (t === 0) {
      mainApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
      clearInterval(timer);
    }
    t--;
  };

  tick();
  timer = setInterval(tick, 1000);
  return timer;
};

loginBtn.addEventListener("click", function (e) {
  // prevent Form for submittting
  e.preventDefault();

  // evaluating current account
  currentAccount = accounts.find((acc) => acc.username === inputUsername.value);

  /* 
  let invalid = "";
   if (!currentAccount) {
     invalid = `<span class="invalid">Invalid user</span>`;
     loginAction.insertAdjacentHTML("afterbegin", invalid);
   } else
   */

  if (currentAccount?.pin === +inputPin.value) {
    // update welcome label
    labelWelcome.innerHTML = `Welcome back, <span class ="user-first-name">${currentAccount.owner
      .split(" ")
      .at(0)}</span>`;

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",

      hour: "numeric",
      minute: "numeric",
      // weekday: "short",
    };
    // const locale = navigator.language;

    dateLabel.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(currDate);

    if (timer) clearInterval(timer);
    timer = StartLogOutTimer();

    // displaying UI
    mainApp.style.opacity = 100;

    inputPin.blur();

    updateUI(currentAccount);
  }
  // clear input fileds
  inputUsername.value = inputPin.value = "";
});

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferValue.value;
  const toAccount = accounts.find(
    (acc) => acc.username === inputTransfer.value
  );
  inputTransferValue.value = inputTransfer.value = "";

  if (
    toAccount &&
    transferAmount > 0 &&
    transferAmount <= currentAccount.balance &&
    toAccount.username !== currentAccount.username
  ) {
    toAccount.movements.push(transferAmount);
    currentAccount.movements.push(-transferAmount);
    currentAccount.movementsDate.push(new Date().toISOString());
    toAccount.movementsDate.push(new Date().toISOString());
    updateUI(currentAccount);

    clearInterval(timer);
    timer = StartLogOutTimer();
  }
});

//Request loan section--> only sanction the loan if atleast one deposit should be there with atleast 10% of requested loan amount.

requestLoanBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // const loanValue = +inputLoan.value;

  //rounding the loan value, here type coersion so no need to convert to number

  const loanValue = Math.floor(inputLoan.value);
  if (
    loanValue > 0 &&
    currentAccount.movements.some((ele) => ele >= loanValue * 0.1)
  ) {
    //simulatng loan failitty after 3sec
    setTimeout(function () {
      // add loan
      currentAccount.movements.push(loanValue);
      //add date
      currentAccount.movementsDate.push(new Date().toISOString());
      //update ui
      updateUI(currentAccount);
    }, 2500);
  }
  clearInterval(timer);
  timer = StartLogOutTimer();
  inputLoan.value = "";
});

closeAccBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === CloseAccountUsername.value &&
    currentAccount.pin === +closeAccPin.value
  ) {
    const closeAccountIndex = accounts.findIndex(
      (acc) => acc.username === CloseAccountUsername.value
    );

    accounts.splice(closeAccountIndex, 1);
    mainApp.style.opacity = 0;
    labelWelcome.textContent = "Login to get started";
  }

  // clear input field
  CloseAccountUsername.value = "";
  closeAccPin.value = "";
});

let sort = true;
sortMovementsBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // const copy = currentAccount.movements.slice().sort((a, b) => a - b);
  if (sort) {
    display(currentAccount, sort);
    sort = false;
    console.log("sort hua");
  } else {
    display(currentAccount, sort);
    sort = true;
  }
  // updateUI(currentAccount);
});

/******* MAP Method ******
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToInr = 80;

// const inrMovements = movements.map(function (ele) {
//   return ele * euroToInr;
// });

// const inrMovements = movements.map((ele) => ele * euroToInr);
// console.log(inrMovements);

// const movDescription = movements.map((ele, i) => {
//   return `Movemenet ${i + 1}. You ${
//     ele > 0 ? "Deposited" : "Withdrew"
//   } ${Math.abs(ele)}`;
// });

// console.log(movDescription);

/**** Computing Username *****/
// username is just the initials of names in lowerCase

// const user = "Afzal Nomani"; //username = an.
// const username = user
//   .toLocaleLowerCase()
//   .split(" ")
//   .map((ele) => ele[0])
//   .join("");
// console.log(username);

/******* FILTER METHOD *********/

// const deposits = movements.filter((val) => val > 0);
// console.log(deposits);

// const withdrawals = movements.filter((ele) => ele < 0);
// console.log(withdrawals);

// /********* REDUCE **********/

// const balance = movements.reduce(function (acc, ele /*, i, arr */) {
//   console.log(acc);
//   return acc + ele;
// }, 0);

// console.log(balance);

// const max = movements.reduce((acc, val) => {
//   return acc > val ? acc : val;
// }, movements[0]);

// console.log(max);

/****** Challenge ********/
// const calcAverageHumanAge = function (ages) {
//   return ages
//     .map((ele) => {
//       return ele <= 2 ? 2 * ele : 16 + 4 * ele;
//     })
//     .filter((val) => val >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const depositSum = movements
//   .filter((ele) => ele > 0)
//   .map((ele) => 1.1 * ele)
//   .reduce((acc, curr) => acc + curr, 0);

// console.log(depositSum);

/************ FIND METHOD ************

console.log(movements.find((ele) => ele > 0));

const account = accounts.find((acc) => acc.owner.endsWith("Nomani"));

// console.log(account);

/************* SOME method ************

console.log(movements.some((ele, i, arr) => ele > 300));

/********* FLAT METHOD **********/

// const allMovement = accounts.map((acc) => acc.movements);
// const flatArray = allMovement.flat();

// const allBalance = flatArray.reduce((acc, ele) => acc + ele, 0);

// const allbalance = accounts
//   .map((acc) => acc.movements)
//   .flat()
//   .reduce((acc, curr) => acc + curr, 0);

// // balance in bank.
// console.log(allbalance);

/************** new Array, fill method **********

// const x = new Array(2, 3, 5, 6, 7, 9, 5);

// console.log(x.map((ele) => 14 * ele));

const x = new Array(7);
console.log(x.fill().map(() => 5));

// console.log(x);

/************* Array.from ********

const y = Array.from({ length: 7 }, (_, i) => {
  // console.log(i, ele, arr,e); //undefinded, undefined.
  return 5 + i;
  // console.log(ele);
});
console.log(y);

// 100 random dixe roll

console.log(
  Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6) + 1)
);

const obj = {
  a: 1,
  b: 2,
  c: 3,
  length: 6,
};

// console.log(obj);

// console.log(
//   Array.from(obj, (ele) => {
//     console.log(ele);
//   })
// );

// console.log(
//   Array.from("Afzal", (ele, i) => {
//     console.log(ele);
//     return "affu";
//   })
// );
// const na = "Afzal nomani";
// console.log(na.length);

const ar = Array.from("afzal", (ele) => ele + "n");
console.log(ar);

/******calculating movements balance withoud using the array *****

balanceValue.addEventListener("click", () => {
  const movbalnece = Array.from(
    document.querySelectorAll(".movement-value"),
    (ele) => Number(ele.textContent.replace("€", ""))
  ).reduce((acc, curr) => acc + curr, 0);

  console.log(movbalnece);
});

/************** ARRAY PRACTICE *************

// 1.TOTAL DEPOSIT GREATER THAN EQUAL TO 1000.
const deposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((sum, curr) => (curr >= 1000 ? sum + curr : sum), 0);

console.log(deposit1000);

// 2.COUNT OF DEPOSIT >=1000.
// const numDepost1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((ele) => ele >= 1000).length;

const numDepost1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0);

console.log(numDepost1000);

//3.
const { deposits, withdrawal } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (accumulator, curr) => {
      // curr >= 0?
      // ? (accumulator.deposits += curr)
      // : (accumulator.withdrawal += curr);
      accumulator[curr > 0 ? "deposits" : "withdrawal"] += curr;

      return accumulator;
    },
    { deposits: 0, withdrawal: 0 }
  );

console.log(deposits, withdrawal);

//using reduce gettng result of map mathod.
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(
  arr.reduce((acc, curr) => {
    acc.push(curr * 5);
    return acc;
  }, [])
);

/**********************************************************************/

/* NEW SECTION-> NUMBER, DATE AND TIME WITH INTERNATIONALIZATION */

/******************************************************************** 
console.log(23 === 23.0);
const base2 = 0.1 + 0.7;
console.log(base2);

// conversion
console.log("23", +"23");

// parsing

console.log(Number.parseInt("20")); //20
console.log(Number.parseInt("20px")); //20
console.log(Number.parseInt("a20px")); //NAN

console.log(Number.parseInt(30, 10));

console.log(Number.parseInt("0xeee", 16));

const parseInt = function (str) {
  return str + 5;
};

console.log(parseInt("222")); //2225 own function
console.log(Number.parseInt("222")); // global function

// isNAN

console.log(isNaN(+"23x"));
console.log(isNaN(3 / 0)); //because this retun infinity

//isFinite
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.1));

// math
console.log(Math.max("100", 56, 56));

console.log(Math.max(2, 3, +"23", -"23"));

//Math.random

console.log(Math.trunc(Math.random() * 20) + 1);
const arrr = new Array(20);
arrr.fill(0);

// for (let i = 0; i < 20; i++) {
//   const n = Math.trunc(Math.random() * 20);
//   const abc = `<span class="num">${n}</span>`;
//   document.body.insertAdjacentHTML("afterend", abc);
//   document.querySelector(".num").style.border = `1px solid red`;
//   document.querySelector(".num").fontSize = `20px`;
// }

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(2, 7));

console.log(Math.round(24.5));

console.log(+(2.345).toFixed(2));

console.log(-2 % 0);

// date and time

const now = new Date();
console.log(now);

console.log(new Date("12 12 11"));

console.log(new Date(95, 13, 31));

console.log(new Date(3 * 24 * 60 * 60 * 1000));

console.log(Date.now());
console.log(now.getTime());

console.log(new Date(-24 * 3600 * 1000));

const dob = new Date("feb 21 1999");

// const ms = Date.now() - dob.getTime();
// const sec = ms / 1000;
// const min = sec / 60;
// const hrs = min / 60;
// const day = hrs / 24;
// const year = day / 365.25;

// console.log(year);
// const month = year % 12;

// console.log(
//   Math.trunc(year),
//   Math.trunc(month),
//   Math.trunc(day % 30),
//   Math.trunc(hrs % 24),
//   Math.trunc(min % 60),
//   Math.trunc(sec % 60),
//   Math.trunc(ms % 1000)
// );

// console.log(+new Date());

const calcDaysPassed = (date1, date2) =>
  Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);

console.log(calcDaysPassed(new Date(2022, 8, 27), new Date(2022, 9, 2)));

// API

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",

  hour: "numeric",
  minute: "numeric",
  second: "numeric",

  hour12: false,
};

console.log(
  new Intl.DateTimeFormat(["en-GB", "hi-IN"], options).format(
    new Date(2022, 10, 2, 15, 30, 35)
  )
);
console.log(navigator.geolocation);

//number formating

const num = 3882514.34;
const numOption = {
  // style: "percent",

  // style: "unit",
  // unit: "mile-per-hour",
  // unit: "day",

  style: "currency",
  // currency: "USD",
  currency: "EUR",

  useGrouping: true,
};

console.log(new Intl.NumberFormat("hi-IN", numOption).format(num));
console.log(new Intl.NumberFormat("en-US", numOption).format(num));
console.log(new Intl.NumberFormat("ar-SY", numOption).format(num));
console.log(new Intl.NumberFormat("de-DE", numOption).format(num)); //GERMANY

// timer

setTimeout(() => console.log("hey there"), 1000);

console.log("waiting...");

// setInterval(() => console.log("hello"), 1000);

*/
