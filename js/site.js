
// get values from inputs on the UI
function getValues() {
// reset the DOM

// get values from the 3 inputs stored into variables
    let loan = {};
    loan.balance = parseInt(document.getElementById("loanAmount").value);
    loan.term = parseInt(document.getElementById("termMonths").value);
    loan.rate = parseInt(document.getElementById("interestRate").value);

// put values into calculate loan function and run function
    let loanResultsArr = calculateLoan(loan);
// get results from calculate loan function into displayData function
    displayData(loanResultsArr);
}

// with the values selected calculate loan
function calculateLoan(loan) {
    let loanResultsArr = [];
    let balance = loan.balance;
    let principalPaymentsTotal = 0;
    let totalInterest = 0;

    let monthlyPayment = (loan.balance) * 
    (loan.rate / 1200) / (1 - Math.pow((1 + loan.rate / 1200), -loan.term));
    monthlyPayment = monthlyPayment.toFixed(2);
    monthlyPayment = parseFloat(monthlyPayment);

    for (let index = 1; index <= loan.term; index++) {
        let loanResultsObj = {};
        loanResultsObj.monthNum = index;
        loanResultsObj.payment = monthlyPayment;
        let interestPayment = balance * loan.rate/1200;
        interestPayment = interestPayment.toFixed(2)
        interestPayment = parseFloat(interestPayment);
        loanResultsObj.interestPayment = interestPayment;
        let principalPayment = monthlyPayment - interestPayment;
        principalPayment = principalPayment.toFixed(2);
        principalPayment = parseFloat(principalPayment);
        principalPaymentsTotal += principalPayment;
        loanResultsObj.principalPayment = principalPayment;
        totalInterest += interestPayment
        loanResultsObj.totalInterest = totalInterest;
        balance = balance - principalPayment;
        balance = balance.toFixed(2);
        balance = parseFloat(balance);
        loanResultsObj.remainingBalance = balance;

        loanResultsArr.push(loanResultsObj);
    }

    return loanResultsArr;
}

// display data onto the UI
function displayData(loanResultsArr) {
    let tableRows = "";
    let startingBalance = loanResultsArr[0].remainingBalance + loanResultsArr[0].principalPayment;
    let totalInterest = 0;
    let totalCost = 0;

    for (let index = 0; index <= loanResultsArr.length - 1; index++) {

        tableRows += `<tr>
            <td>${loanResultsArr[index].monthNum}</td>
            <td>${loanResultsArr[index].payment}</td>
            <td>${loanResultsArr[index].principalPayment}</td>
            <td>${loanResultsArr[index].interestPayment}</td>
            <td>${loanResultsArr[index].totalInterest}</td>
            <td>${loanResultsArr[index].remainingBalance}</td>
            </tr>`

            totalInterest += loanResultsArr[index].interestPayment;
    }
    document.getElementById("mainTable").classList.remove("invisible");
    document.getElementById("monthlyPayment").innerHTML = `$${loanResultsArr[0].payment}`;
    document.getElementById("totalPrincipal").innerHTML = `$${startingBalance}`;
    document.getElementById("totalInterest").innerHTML = `$${totalInterest}`;
    document.getElementById("totalCost").innerHTML = `$${startingBalance + totalInterest}`;
    document.getElementById("tableResults").innerHTML = tableRows;

}