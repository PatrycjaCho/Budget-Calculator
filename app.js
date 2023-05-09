// top variables
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const openModal = document.getElementById("openModal");
const formModal = document.querySelector(".formModal");

let moneyTotal = document.getElementById("moneyTotal");
let balance;

let calculatedMoneyLeft = document.getElementById("calculatedMoneyLeft")

// bottom variables
const openAddIncome = document.getElementById("openAddIncome")
const addIncomeModal = document.querySelector(".addIncomeModal")

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

submitBtn.addEventListener("click", () => {
  formModal.close();
})

cancelBtn.addEventListener("click", () => {
  formModal.close();
  document.querySelector("form").reset();
})


// save form input data to LS
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

  // clear form 
  document.querySelector("form").reset();
});







openAddIncome.addEventListener("click", () => {
  addIncomeModal.showModal()
})