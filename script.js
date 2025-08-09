class Budget {
    constructor(){
        this.incomes =[];
        this.expenses = [];
        this.totalIncome = 0;
        this.totalExpenses = 0;
    }

    addIncome(description, amount){
        if(description && amount > 0){
            this.incomes.push({description,amount})
            this.totalIncome += amount; 
            this.updateBuget();

        }
    }

    addExpense(description, amount){
        if(description && amount > 0){
            this.expenses.push({description,amount})
            this.totalExpenses += amount; 
            this.updateBuget();


        }       
    }   
        updateBuget() {
            const totalBuget= this.totalIncome - this.totalExpenses;
            document.getElementById('available-money').innerText = totalBuget;
            document.getElementById('earned').innerText = this.totalIncome;
            document.getElementById('spent').innerText = this.totalExpenses;

        }



    }




