class Budget {
  constructor() {
    this.incomes = [];
    this.expenses = [];
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  addIncome(description, amount) {
    if (description && amount > 0) {
      this.incomes.push({ description, amount });
      this.totalIncome += amount;
      this.updateBuget();
      this.renderItem('income', description, amount)
    }
  }

  addExpense(description, amount) {
    if (description && amount > 0) {
      this.expenses.push({ description, amount });
      this.totalExpenses += amount;
      this.updateBuget();
      this.renderItem('expense', description, amount)
    }
  }
  updateBuget() {
    const totalBuget = this.totalIncome - this.totalExpenses;
    document.getElementById("available-money").innerText = totalBuget;
    document.getElementById("earned").innerText = this.totalIncome;
    document.getElementById("spent").innerText = this.totalExpenses;
  }

  renderItem(type, description, amount) {
    const container =
      type === "income"
        ? document.querySelector(".income-list")
        : document.querySelector(".expense-list");
        
        if(!container){
            console.error("container not found for type, expected income or expense list")
            return;
        }

    const createDiv = document.createElement("div");
    createDiv.classList.add("item");

    const descriptionElement = document.createElement("h4");
    descriptionElement.innerText = description;

    const amountElement = document.createElement("div");
    amountElement.classList.add(`item-${type}`);
    amountElement.innerHTML = `<p class="${type}-symbol">$</p><span class="${type}-amount">${amount}</span>`;

    const deleteButton = document.createElement("i");
    deleteButton.className ="bx bx-trash";
    deleteButton.addEventListener("click", () => {
      container.removeChild(createDiv);
      this.removeItem(type, amount);
    });

    createDiv.appendChild(descriptionElement);
    createDiv.appendChild(amountElement);
    createDiv.appendChild(deleteButton);
    container.appendChild(createDiv);
  }
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

document.addEventListener("DOMContentLoaded", () => {
  const budget = new Budget();

  document.getElementById("add-income").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    if (description && amount > 0) {
      budget.addIncome(description, amount);
      document.getElementById("description").value = "";
      document.getElementById("amount").value = "";
    } else {
      alert("Please enter a valid income description and amount.");
    }
  });

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
