// top variables
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const openModal = document.getElementById("openModal");
const formModal = document.querySelector(".formModal");

let moneyTotal = document.getElementById("moneyTotal");
let balance;

let calculatedMoneyLeft = document.getElementById("calculatedMoneyLeft");

// bottom variables
const openAddIncome = document.getElementById("openAddIncome");
const addIncomeModal = document.querySelector(".addIncomeModal");
const addIncomeSubmit = document.getElementById("addIncomeSubmit");
const cancelAddIncome = document.getElementById("cancelAddIncome");

const openAddExpense = document.getElementById("openAddExpense");
const addExpenseModal = document.querySelector(".addExpenseModal");
const addExpenseSubmit = document.getElementById("addExpenseSubmit");
const cancelAddExpense = document.getElementById("cancelAddExpense");

const incomeExpenseTab = document.getElementById("incomeExpenseTab")

// make it check if there is already data in storage 
let budgetData = JSON.parse(localStorage.getItem("budgetData"));

//make it display data from storage with new function UpdateUI
if (budgetData) {
  updateUI(budgetData);
}
else {
  moneyTotal.textContent = "£0.00";
}
// document.getElementById("initialForm").reset(); - removed

// the updateUI function 
function updateUI(budgetData) {
  moneyTotal.textContent = `£${budgetData.balance}`;
  calculatedMoneyLeft.textContent = `£${budgetData.moneyLeft}`
  document.getElementById("balance").value = budgetData.balance;
  document.getElementById("income").value = budgetData.income;
  document.getElementById("save").value = budgetData.save;
  document.getElementById("rent").value = budgetData.rent;
  document.getElementById("memberships").value = budgetData.memberships;
  document.getElementById("other").value = budgetData.other;

  const income = budgetData['income']
  const salaryInfo = document.getElementById("salaryInfo")
  const salaryInfoP = document.createElement("p")
  salaryInfoP.textContent = `£${income}`
  salaryInfo.append(salaryInfoP)
  salaryInfoP.className = "infoText"

  const expense = budgetData["expense"]
  const expenseInfo = document.getElementById("expensesInfo")
  const expenseInfoP = document.createElement("p")
  expenseInfoP.textContent = `£${expense}`
  expenseInfo.append(expenseInfoP)
  expenseInfoP.className = "infoText"

  const save = budgetData["save"]
  const goalInfo = document.getElementById("goalInfo")
  const goalInfoP = document.createElement("p")
  goalInfoP.textContent = `£${save}`
  goalInfo.append(goalInfoP)
  goalInfoP.className = "infoText"
}

// open form on clicking
openModal.addEventListener("click", () => {
  formModal.showModal();
})

cancelBtn.addEventListener("click", () => {
  formModal.close();
  addExpenseModal.close();
  document.getElementById("initialForm").reset();
  //clear error messages if form has been canceled
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = "";
  })
})


// submit button actions 
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // get the values of inputs
  balance = parseFloat(document.getElementById("balance").value);
  const income = parseFloat(document.getElementById("income").value);
  const save = parseFloat(document.getElementById("save").value);
  const rent = parseFloat(document.getElementById("rent").value);
  const memberships = parseFloat(document.getElementById("memberships").value);
  const other = parseFloat(document.getElementById("other").value);

  // check if valid input
  let validInput = true;
  if (isNaN(balance)) {
    validInput = false;
    document.getElementById("balanceError").textContent = "Balance is required";
  } else {
    document.getElementById("balanceError").textContent = "";
  }

  if (isNaN(income)) {
    validInput = false;
    document.getElementById("incomeError").textContent = "Income is required";
  } else {
    document.getElementById("incomeError").textContent = "";
  }
  if (isNaN(save)) {
    validInput = false;
    document.getElementById("saveError").textContent = "Saving amount is required";
  } else {
    document.getElementById("saveError").textContent = "";
  }

  if (isNaN(rent)) {
    validInput = false;
    document.getElementById("rentError").textContent = "Rent is required";
  } else {
    document.getElementById("rentError").textContent = "";
  }
  if (isNaN(memberships)) {
    validInput = false;
    document.getElementById("membershipsError").textContent = "Memberhips are required";
  } else {
    document.getElementById("membershipsError").textContent = "";
  }

  if (isNaN(other)) {
    validInput = false;
    document.getElementById("otherError").textContent = "Other expenses are required";
  } else {
    document.getElementById("otherError").textContent = "";
  }

  // actions if form is valid
  if (validInput) {

    // calculate moneyLeft
    let moneyLeft = income - save - (rent + memberships + other);
    // calculate expense later used in for "monthly expenses" in UI
    let expense = rent + memberships + other;
    // put the values in LS
    const budgetData = {
      balance: balance,
      income: income,
      save: save,
      rent: rent,
      memberships: memberships,
      other: other,
      moneyLeft: moneyLeft,
      expense: expense
    };
    localStorage.setItem("budgetData", JSON.stringify(budgetData));

    // update moneyTotal and moneyLeft
    moneyTotal.textContent = `£${balance}`;
    calculatedMoneyLeft.textContent = `£${moneyLeft}`;

    // close form 
    formModal.close();

    // clear form 
    addExpenseModal.close();
    // document.getElementById("initialForm").reset(); - removed 
    location.reload()

  }
});


// the add Income Button

openAddIncome.addEventListener("click", () => {
  addIncomeModal.showModal()
})

cancelAddIncome.addEventListener("click", () => {
  addIncomeModal.close();
  document.getElementById("incomeForm").reset();
  
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = "";})
});

addIncomeSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  // get the value of input
  let addIncome = parseFloat(document.getElementById("addIncome").value);
  let addDateIncome = document.getElementById("dateIncome").value;

  // check if valid
  let isValid = true;
  if (isNaN(addIncome) || addIncome === 0) {
    isValid = false;
    document.getElementById("addIncomeError").textContent = "Income is required and should be a number greater than 0";
  } else {
    document.getElementById("addIncomeError").textContent = "";
  }

  if (addDateIncome === '') {
    isValid = false;
    document.getElementById("addIncomeDateError").textContent = "Please select a date";
  } else {
    document.getElementById("addIncomeDateError").textContent = "";
  }


  if (isValid) {
    //arrIncome and arrExpense remved in favor of cashflows
    // 
    // const arrIncome = [addIncome];
    // check if you already have an array in LS
    // let existingIncomeArr = JSON.parse(localStorage.getItem("arrIncome"));
    // if not create an existin array for the future
    // if (!existingIncomeArr) {
    //   existingIncomeArr = [];
    // }

    // add new array to existing array
    // existingIncomeArr.unshift(arrIncome); - removed 

    // save to local storage
    // localStorage.setItem("arrIncome", JSON.stringify(existingIncomeArr)); - removed

    let cashflows = JSON.parse(localStorage.getItem("cashflows")) || {}
    cashflowsOnDate = cashflows[addDateIncome] || []

    cashflowsOnDate.push({
      cashflow: addIncome,
    })
    cashflows[addDateIncome] = cashflowsOnDate
    localStorage.setItem("cashflows", JSON.stringify(cashflows));

    // Update total
    const currTotal = budgetData['balance'];
    let new_total = currTotal + addIncome
    budgetData['balance'] = new_total

    const currMoneyLeft = budgetData['moneyLeft']
    let new_moneyLeft = currMoneyLeft + addIncome
    budgetData['moneyLeft'] = new_moneyLeft

    localStorage.setItem("budgetData", JSON.stringify(budgetData));

    // close modal and reset form
    addIncomeModal.close();
    document.getElementById("incomeForm").reset();
    location.reload()
  }
});

// the add Expense button 

openAddExpense.addEventListener("click", () => {
  addExpenseModal.showModal()
})

cancelAddExpense.addEventListener("click", () => {
  addExpenseModal.close();
  document.getElementById("expenseForm").reset();
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = "";})

});

addExpenseSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  let addExpense = parseFloat(document.getElementById("addExpense").value);
  let addDateExpense = document.getElementById("dateExpense").value
  let isValid = true;
  if (isNaN(addExpense) || addExpense === 0) {
    isValid = false;
    document.getElementById("addExpenseError").textContent = "Expense is required and should be a number greater than 0";
  } else {
    document.getElementById("addExpenseError").textContent = "";
  }

  if (addDateExpense === '') {
    isValid = false;
    document.getElementById("addExpenseDateError").textContent = "Please select a date";
  } else {
    document.getElementById("addExpenseDateError").textContent = "";
  }

  if (isValid) {
    // all removed - cashflows applied instead
    // const arrExpense = [addExpense];
    // let existingExpenseArr = JSON.parse(localStorage.getItem("arrExpense"));
    // if (!existingExpenseArr) {
    //   existingExpenseArr = [];
    // }

    // existingExpenseArr.unshift(arrExpense);

    // localStorage.setItem("arrExpense", JSON.stringify(existingExpenseArr));

    let cashflows = JSON.parse(localStorage.getItem("cashflows")) || {}
    cashflowsOnDate = cashflows[addDateExpense] || []

    cashflowsOnDate.push({
      cashflow: -addExpense,
    })
    cashflows[addDateExpense] = cashflowsOnDate
    localStorage.setItem("cashflows", JSON.stringify(cashflows));

    const currTotal = budgetData['balance'];
    let new_total = currTotal - addExpense
    budgetData['balance'] = new_total

    const currMoneyLeft = budgetData['moneyLeft']
    let new_moneyLeft = currMoneyLeft - addExpense
    budgetData['moneyLeft'] = new_moneyLeft


    localStorage.setItem("budgetData", JSON.stringify(budgetData));

    //close modal, reset form
    addExpenseModal.close();
    document.getElementById("expenseForm").reset();
    location.reload()
  }
}
);



const tab = document.getElementById('incomeExpenseTab')

// Should be of the format: {"2023-01-01": [{"cashflow": -1}]}
const cashflows = JSON.parse(localStorage.getItem("cashflows"))

// Get all dates from cashflows, sort ascending then reverse for descending
const sortedDates = Object.keys(cashflows).sort().reverse()

// Iterate through each of our sorted dates
for (let j = 0; j < sortedDates.length; j++) {
  const date = sortedDates[j]  // Actually get the date
  const cashflowArr = cashflows[date]  // Extract our list of cashflows: [{"cashflow": -1}]

  // Create a div to contain all the elements for this date
  const dayBox = document.createElement('div')
  dayBox.className = "dayBox"

  // Create a p to put date in and add to dayBox
  const boxDate = document.createElement('p')
  boxDate.className = 'boxDate'
  boxDate.textContent = date
  dayBox.append(boxDate)

  // For each cashflow add a cashflow div
  for (let i = 0; i < cashflowArr.length; i++) {

    // Pull "cashflow" from our element in list
    const { cashflow } = cashflowArr[i]

    // Create div and ps
    const incomeExpense = document.createElement('div')
    const incomeExpenceP = document.createElement('p')
    const incomeExpenceValueP = document.createElement('p')

    // Add our ps to the div
    incomeExpense.append(incomeExpenceP)
    incomeExpense.append(incomeExpenceValueP)

    // Add our div to our dayBox
    dayBox.append(incomeExpense)

    if (cashflow < 0) {
      // This is an expense so set contents & classes correctly
      incomeExpenceP.textContent = "EXPENSE:"
      incomeExpense.className = "expenseBox"
      incomeExpenceValueP.className = "redText"
    }
    else {
      // This is an income so set contents & classes correctly
      incomeExpenceP.textContent = "INCOME:"
      incomeExpense.className = "incomeBox"
      incomeExpenceValueP.className = "greenText"
    }

    // Always set the cashflow text
    incomeExpenceValueP.textContent = `£ ${cashflow}`
  }

  // Now that we have built our entire box for the day - add to tab
  tab.append(dayBox)
}

// ad dataInfo - move it somewhere else !!!
// const income = budgetData['income']
// const salaryInfo = document.getElementById("salaryInfo")
// const salaryInfoP = document.createElement("p")
// salaryInfoP.textContent = `£${income}`
// salaryInfo.append(salaryInfoP)
// salaryInfoP.className = "infoText"

// const expense = budgetData["expense"]
// const expenseInfo = document.getElementById("expensesInfo")
// const expenseInfoP = document.createElement("p")
// expenseInfoP.textContent = `£${expense}`
// expenseInfo.append(expenseInfoP)
// expenseInfoP.className = "infoText"

// const save = budgetData["save"]
// const goalInfo = document.getElementById("goalInfo")
// const goalInfoP = document.createElement("p")
// goalInfoP.textContent = `£${save}`
// goalInfo.append(goalInfoP)
// goalInfoP.className = "infoText"

