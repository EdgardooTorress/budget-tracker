class Budget {
  constructor() {
    //Arrays to store individual incomes and expenses
    this.incomes = [];
    this.expenses = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  addIncome(description, amount) {
    if (description && amount > 0) {
      //Store income as an object in the array
      this.incomes.push({ description, amount });
      // increase the income
      this.totalIncome += amount;
      //Update the income in the screen
      this.updateBuget();
      // show it as list in the tracker
      this.renderItem('income', description, amount)
    }
  }

  //Same logic as addIncome
  addExpense(description, amount) {
    if (description && amount > 0) {
      this.expenses.push({ description, amount });
      this.totalExpenses += amount;
      this.updateBuget();
      this.renderItem('expense', description, amount)
    }
  }
  //Refresh displayed totals
  updateBuget() {
    //Calculate the avaliable money in the budget
    const totalBuget = this.totalIncome - this.totalExpenses;
    // Get the element to manipulate the DOM
    document.getElementById("available-money").innerText = totalBuget;
    document.getElementById("earned").innerText = this.totalIncome;
    document.getElementById("spent").innerText = this.totalExpenses;
  }
// create and put the new list item in the DOM
  renderItem(type, description, amount) {
    //pick the correct list
    const container =
      type === "income"
        ? document.querySelector(".income-list")
        : document.querySelector(".expense-list");
        
        if(!container){
            console.error("container not found for type, expected income or expense list")
            return;
        }

        // create the outer div
    const createDiv = document.createElement("div");
    createDiv.classList.add("item");

    //add description element
    const descriptionElement = document.createElement("h4");
    descriptionElement.innerText = description;

    //add amount element
    const amountElement = document.createElement("div");
    amountElement.classList.add(`item-${type}`);
    amountElement.innerHTML = `<p class="${type}-symbol">$</p><span class="${type}-amount">${amount}</span>`;
        // add delete icon
    const deleteButton = document.createElement("i");
    deleteButton.className ="bx bx-trash";
    deleteButton.addEventListener("click", () => {
      container.removeChild(createDiv);
      this.removeItem(type, amount);
    });
    // create the iteam
    createDiv.appendChild(descriptionElement);
    createDiv.appendChild(amountElement);
    createDiv.appendChild(deleteButton);
    container.appendChild(createDiv);
  }
  // remove an item from array and adjust total
  removeItem(type, amount){
    if(type === 'income'){
        this.totalIncome -= amount;
        this.incomes = this.incomes.filter(item => item.amount !== amount);
    }else{
        this.totalExpenses -= amount;
        this.expenses = this.expenses.filter(item => item.amount !== amount);
    }
    this.updateBuget();
}}

// When page finishis loading
document.addEventListener("DOMContentLoaded", () => {
  const budget = new Budget();
// income button click
  document.getElementById("add-income").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    if (description && amount > 0) {
      budget.addIncome(description, amount);
      //clear inputs
      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    } else {
      alert("Please enter a valid income description and amount.");
    }
  });
// Expenses button click
  document.getElementById("add-expense").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    if (description && amount > 0) {
      budget.addExpense(description, amount);
      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    } else {
      alert("Please enter a valid expense description and amount.");
    }
  });
});
