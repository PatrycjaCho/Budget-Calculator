// all variables
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const openModal = document.getElementById("openModal");
const formModal = document.querySelector('.formModal');

let moneyTotal = document.getElementById("moneyTotal");
let balance;


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
  document.getElementById("balance").value = budgetData.balance;
  document.getElementById("save").value = budgetData.save;
  document.getElementById("rent").value = budgetData.rent;
  document.getElementById("groceries").value = budgetData.groceries;
  document.getElementById("other").value = budgetData.other;
}

// open form on clicking
openModal.addEventListener("click", () => {
  formModal.showModal();
})

submitBtn.addEventListener("click", () => {
  formModal.close();
})


// save form input data to LS
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // get the values of inputs
  balance = parseFloat(document.getElementById("balance").value);
  const save = parseFloat(document.getElementById("save").value);
  const rent = parseFloat(document.getElementById("rent").value);
  const groceries = parseFloat(document.getElementById("groceries").value);
  const other = parseFloat(document.getElementById("other").value);

  // put the values in LS
  const budgetData = {
    balance: balance,
    save: save,
    rent: rent,
    groceries: groceries,
    other: other
  };
  localStorage.setItem("budgetData", JSON.stringify(budgetData));

  // update moneyTotal
  moneyTotal.textContent = `£${balance}`;

  // clear form 
  document.querySelector("form").reset();
});

// make cancel button also clear form
cancelBtn.addEventListener("click", () => {
  document.querySelector("form").reset();
})

