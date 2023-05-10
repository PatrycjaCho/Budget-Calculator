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
const expenseTab = document.getElementById("expenseTab")
const incomeTab = document.getElementById("incomeTab")

// make it check if there is already data in storage 
let budgetData = JSON.parse(localStorage.getItem("budgetData"));

//make it display data from storage with new function UpdateUI
if (budgetData) {
  updateUI(budgetData);
}
else {
  moneyTotal.textContent = "£0.00";
}
document.querySelector("form").reset();

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
}

// open form on clicking
openModal.addEventListener("click", () => {
  formModal.showModal();
})

cancelBtn.addEventListener("click", () => {
  formModal.close();
  document.querySelector("form").reset();

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

    // put the values in LS
    const budgetData = {
      balance: balance,
      income: income,
      save: save,
      rent: rent,
      memberships: memberships,
      other: other,
      moneyLeft: moneyLeft
    };
    localStorage.setItem("budgetData", JSON.stringify(budgetData));

    // update moneyTotal and moneyLeft
    moneyTotal.textContent = `£${balance}`;
    calculatedMoneyLeft.textContent = `£${moneyLeft}`;

    // close form 
    formModal.close();

    // clear form 
    document.querySelector("form").reset();
  }
});

// the add Income Button

openAddIncome.addEventListener("click", () => {
  addIncomeModal.showModal()
})

cancelAddIncome.addEventListener("click", () => {
  addIncomeModal.close();
});

addIncomeSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  // get the value of input
  let addIncome = parseFloat(document.getElementById("addIncome").value);

  // check if valid
  let isValid = true;
  if (isNaN(addIncome) || addIncome === 0) {
    isValid = false;
    document.getElementById("addIncomeError").textContent = "Income is required and should be a number greater than 0";
  } else {
    document.getElementById("addIncomeError").textContent = "";
  }

  if (isValid) {
    // add income to an array
    const arrIncome = [addIncome];
    // check if you already have an array in LS
    let existingIncomeArr = JSON.parse(localStorage.getItem("arrIncome"));
    // if not create an existin array for the future
    if (!existingIncomeArr) {
      existingIncomeArr = [];
    }

    // add new array to existing array
    existingIncomeArr.unshift(arrIncome);

    // save to local storage
    localStorage.setItem("arrIncome", JSON.stringify(existingIncomeArr));

    // close modal and reset form
    addIncomeModal.close();
    document.querySelector("form").reset();

    // add input to incomeExpenseTab
  }
});

// the add Expense button 

openAddExpense.addEventListener("click", () => {
  addExpenseModal.showModal()
})

cancelAddExpense.addEventListener("click", () => {
  addExpenseModal.close();
});

addExpenseSubmit.addEventListener("click", function (event) {
  event.preventDefault();

  let addExpense = parseFloat(document.getElementById("addExpense").value);

  let isValid = true;
  if (isNaN(addExpense) || addExpense === 0) {
    isValid = false;
    document.getElementById("addExpenseError").textContent = "Expense is required and should be a number greater than 0";
  } else {
    document.getElementById("addExpenseError").textContent = "";
  }

  if (isValid) {
    const arrExpense = [addExpense];
    let existingExpenseArr = JSON.parse(localStorage.getItem("arrExpense"));
    if (!existingExpenseArr) {
      existingExpenseArr = [];
    }

    existingExpenseArr.unshift(arrExpense);

    localStorage.setItem("arrExpense", JSON.stringify(existingExpenseArr));

    addExpenseModal.close();
    document.querySelector("form").reset();
  }
});

