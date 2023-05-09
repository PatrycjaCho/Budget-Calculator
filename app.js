// all variables
const submitBtn = document.getElementById("submitBtn")
const openModal = document.getElementById("openModal")
const formModal = document.querySelector('.formModal')

const balanceInput = document.getElementById("balance")
const moneyTotal = document.getElementById("moneyTotal")

// make it check if there is already data in storage 

// open form on clicking
openModal.addEventListener("click", () => {
  formModal.showModal()
})

submitBtn.addEventListener("click", () => {
  formModal.close()
})


// save form input data to LS
submitBtn.addEventListener("click", function () {

  const balance = document.getElementById("balance").value;
  const spend = document.getElementById("spend").value;
  const rent = document.getElementById("rent").value;
  const groceries = document.getElementById("groceries").value;
  const other = document.getElementById("other").value;

  moneyTotal.textContent = `£${balanceInput.value}`;
  balanceInput.addEventListener("change", () => {
    const balance = balanceInput.value
    moneyTotal.textContent = `£${balance}`
  })

  const budgetData = {
    balance: balance,
    spend: spend,
    rent: rent,
    groceries: groceries,
    other: other
  };

  localStorage.setItem("budgetData", JSON.stringify(budgetData));
})

// update moneyTotal
