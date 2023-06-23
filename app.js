// Variables
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const openModal = document.getElementById("openModal");
const formModal = document.querySelector(".formModal");
let moneyTotal = document.getElementById("moneyTotal");
let balance;
let calculatedMoneyLeft = document.getElementById("calculatedMoneyLeft");
const openAddIncome = document.getElementById("openAddIncome");
const addIncomeModal = document.querySelector(".addIncomeModal");
const addIncomeSubmit = document.getElementById("addIncomeSubmit");
const cancelAddIncome = document.getElementById("cancelAddIncome");
const openAddExpense = document.getElementById("openAddExpense");
const addExpenseModal = document.querySelector(".addExpenseModal");
const addExpenseSubmit = document.getElementById("addExpenseSubmit");
const cancelAddExpense = document.getElementById("cancelAddExpense");
const incomeExpenseTab = document.getElementById("incomeExpenseTab")

// Check if there is already data in storage 
let budgetData = JSON.parse(localStorage.getItem("budgetData"));

// If data in storage - update the page with it 
if (budgetData) {
  updateUI(budgetData);
}
// If no data - display total of £0.
else {
  moneyTotal.textContent = "£0.00";
}

// Function to display data if in storage 
function updateUI(budgetData) {
  // DATA TAB
  // Get data from storage 
  document.getElementById("balance").value = budgetData.balance;
  document.getElementById("income").value = budgetData.income;
  document.getElementById("save").value = budgetData.save;
  document.getElementById("rent").value = budgetData.rent;
  document.getElementById("memberships").value = budgetData.memberships;
  document.getElementById("other").value = budgetData.other;

  // Calculate and print 'total bablance' and 'left to spend' with data 
  moneyTotal.textContent = `£${budgetData.balance}`;
  calculatedMoneyLeft.textContent = `£${budgetData.moneyLeft}`

  // Create new paragraphs and fill them with data
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

  // CASHFLOWS TAB
  const tab = document.getElementById('incomeExpenseTab')

  // Get cashflows from local storage OR get an empty dictionary
  const cashflows = JSON.parse(localStorage.getItem("cashflows")) || {}

  // Get all dates from cashflows, sort ascending then reverse for descending
  // Should be of the format: {"2023-01-01": [{"cashflow": -1}]}
  const sortedDates = Object.keys(cashflows).sort().reverse()

  // Iterate through each of sorted dates
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
      // Pull cashflow from an element in list
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
        // Expense
        incomeExpenceP.textContent = "EXPENSE:"
        incomeExpense.className = "expenseBox"
        incomeExpenceValueP.className = "redText"
      }
      else {
        // Income
        incomeExpenceP.textContent = "INCOME:"
        incomeExpense.className = "incomeBox"
        incomeExpenceValueP.className = "greenText"
      }
      incomeExpenceValueP.textContent = `£ ${cashflow}`
    }

    // Now that we have built our entire box for the day - add to tab
    tab.append(dayBox)
  }
}

// Open form on clicking
openModal.addEventListener("click", () => {
  formModal.showModal();
})
// Close form on clicking 'close'
closeButton = document.getElementById("closeButton")
closeButton.addEventListener("click", () => {
  formModal.close()
})

// Cancel form
cancelBtn.addEventListener("click", () => {
  formModal.close();
  addExpenseModal.close();
  document.getElementById("initialForm").reset();
  // Clear error messages if form has been canceled
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = "";
  })
})


// Submit button actions 
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Get the values of inputs
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

  // Actions if form is valid
  if (validInput) {

    // Calculate moneyLeft
    let moneyLeft = income - save - (rent + memberships + other);
    // Calculate monthly expenses
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
    element.textContent = "";
  })
});

addIncomeSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  // Get the value of input
  let addIncome = parseFloat(document.getElementById("addIncome").value);
  let addDateIncome = document.getElementById("dateIncome").value;

  // Check if valid
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
    // using Math.abs to prevent using negative values on input
    addIncome = Math.abs(addIncome)
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

// The add Expense button 
openAddExpense.addEventListener("click", () => {
  addExpenseModal.showModal()
})

cancelAddExpense.addEventListener("click", () => {
  addExpenseModal.close();
  document.getElementById("expenseForm").reset();
  document.querySelectorAll('.error').forEach((element) => {
    element.textContent = "";
  })

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

    addExpense = Math.abs(addExpense)
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
S
    localStorage.setItem("budgetData", JSON.stringify(budgetData));

    addExpenseModal.close();
    document.getElementById("expenseForm").reset();
    location.reload()
  }
}
);

// Pre saved button - filling the storage with data
preSavedData = document.getElementById("preSavedData")
preSavedData.addEventListener("click", () => {

  budgetData = {
    balance: 1000,
    income: 2500,
    save: 500,
    rent: 550,
    memberships: 150,
    other: 200,
    moneyLeft: 1100,
    expense: 900
  };

  localStorage.setItem("budgetData", JSON.stringify(budgetData));

  const fakeCashFlows = {
    "2023-05-12": [{ cashflow: 50 }, { cashflow: -125 }, { cashflow: 75 }],
    "2023-05-11": [{ cashflow: 75 }, { cashflow: -12 }]
  }

  localStorage.setItem("cashflows", JSON.stringify(fakeCashFlows))
  location.reload()
})

