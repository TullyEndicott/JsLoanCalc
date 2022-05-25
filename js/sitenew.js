/*let amarat = [
    {month: "", payment: "", principal: "", monInterest: "", totInterest: "", remBalance: ""},
];*/

let amarat = [];  //amarat is thr array, temp is the object

const btnCalc = document.getElementById("btnCalc");

let table = document.querySelector("results");
//let data2 = Object.keys(amarat);
//let data4 = Object.keys(headings[0]);




//validate inputs
function getValues(){
    var loanAmt = document.loanForm.loanAmt.value; //text
    var months = document.loanForm.months.value; //int
    var termInterest = document.loanForm.termInterest.value; //text
    loanAmt = loanAmt.replace(/[^\d.-]/g, '');
    termInterest = termInterest.replace(/[^\d.-]/g, '');

    if (loanAmt <= 0 || isNaN(Number(loanAmt))){ //true if NaN ck for not a float
        alert("Please enter a valid loan amount - ex. 250000");
        document.loanForm.loanAmt.value = "";
    }
    
    else if(months <= 0 || parseInt(months) != months){ //ck for integer paresInt forces inter, != cks to see if same as months variable
        alert("Please enter a valid number of monthes");
        document.loanForm.months.value = "";
    }
    
    else if(termInterest <= 0 || isNaN(Number(termInterest))){
        alert("Please enter a valid interest termInterest - ex. 4.5 instead of 4.5%");
        document.loanForm.termInterest.value = "";
    }
    
    else{
       // alert("Validation complete");
        //calculate(parseFloat(loanAmt), parseInt(months), parseFloat(termInterest));
        loanAmt = parseFloat(loanAmt).toFixed(2);
        months = parseInt(months);
        termInterest = parseFloat(termInterest);

        amarat = calculate(loanAmt, months, termInterest);


        displayData(amarat, loanAmt);
    }

}



function calculate(loanAmt, months, i){ //25000, 60, 4.5

    let currentBalance = loanAmt;
    let towardsBalance = currentBalance ;
    let totalInterest = 0;
    let towardsInterest = 0;
    
    //let i = termInterest/100;
    let payment = loanAmt*(i/1200)*Math.pow((1+i/1200), months) / (Math.pow((1+i/1200), months) - 1);
    //let payment = loanAmt*(i/12)*Math.pow((1+i/12), months) / (Math.pow((1+i/12), months) - 1);

    for (let index = 1; index <= months; index++) {

        //make a temp object
        temp = {}; // move object declaration inside loop per https://stackoverflow.com/questions/36602160/how-to-push-object-to-array-from-for-loop-properly-in-javascript
        //remBalance = remBalance - towardsPrin
        // towardsInt = remBalance * (i/1200)
        // towardsPrin = payment - towardsInt
        currMon = index;
        towardsInterest = currentBalance * (i/1200); //remBalance * monthlyRate/12
        towardsBalance = payment - towardsInterest;
        totalInterest = totalInterest + towardsInterest;
        currentBalance = currentBalance - towardsBalance; //250000 - 300

        // temp{} is one time use per iteration
        temp.currMon = currMon; // current month
        temp.payment = payment.toFixed(2);
        temp.principal = towardsBalance.toFixed(2);
        temp.monthlyInterest = towardsInterest.toFixed(2); 
        temp.totInterest = totalInterest.toFixed(2);
        temp.remBalance = Math.abs(currentBalance.toFixed(2));
        //temp.rate = i;// ex. 4.5

        insertObject(amarat, temp);
    }

    function insertObject(arr, obj) {
        arr.push(obj); 
    }

    return amarat;
}


function displayData(amarat, loanAmt){

    let tableBody = document.getElementById("results"); //the table
    //get the header row template
    let templateHeader = document.getElementById("lcHeader")
    //get the row from the template in app.html
    let templateRow = document.getElementById("lcTemplate");

    let payment = amarat[0].payment;
    let totalInterest = amarat[amarat.length-1].totInterest;
    //let totalInterest = amarat[amarat.length-1].totInterest;
    let totCost = parseFloat(loanAmt) + parseFloat(totalInterest);

    //document.getElementById("payment").querySelector.innerHTML = `$${payment}`;
   // document.getElementById("totPrin").querySelector.innerHTML = `$${loanAmt}`;
   // document.getElementById("totInt").querySelector.innerHTML = `$${totalInterest}`;
    //document.getElementById("totCost").querySelector.innerHTML = `$${totCost}`;

    document.getElementById("payment").innerHTML = `$${payment}`;
    document.getElementById("totPrin").innerHTML = `$${parseFloat(loanAmt).toFixed(2)}`;
    document.getElementById("totInt").innerHTML = `$${totalInterest}`;
    document.getElementById("totCost").innerHTML = `$${totCost}`;

    //clear table
    tableBody.innerHTML = "";

    //Print the header
    let tableRow = document.importNode(templateHeader.content, true); //'true' gets everything in app.html template
    let rowCols = tableRow.querySelectorAll("th"); //rowCols init as array
    rowCols[0].textContent = "Month";
    rowCols[1].textContent = "Payment";
    rowCols[2].textContent = "Principal";
    rowCols[3].textContent = "Interest";
    rowCols[4].textContent = "Total Interest";
    rowCols[5].textContent = "Balance";
    tableBody.appendChild(tableRow);

    //Print the table
    for(let index = 0; index <= Object.keys(amarat).length - 1; index++){

        let tableRow = document.importNode(templateRow.content, true); //'true' gets everything in app.html template

        let rowCols = tableRow.querySelectorAll("td"); //rowCols init as array

        rowCols[0].textContent = amarat[index].currMon;
        rowCols[1].textContent = amarat[index].payment;
        rowCols[2].textContent = amarat[index].principal;
        rowCols[3].textContent = amarat[index].monthlyInterest;
        rowCols[4].textContent = amarat[index].totInterest;
        rowCols[5].textContent = amarat[index].remBalance;

        tableBody.appendChild(tableRow);

    }

}



function  startOver(){

    document.loanForm.loanAmt.value="";
    document.loanForm.months.value="";
    document.loanForm.termInterest.value="";
  
    
    document.getElementById("loan_info").innerHTML="";
    document.getElementById("table").innerHTML="";

    let tableBody = getElementById("results");
    let templateRow = document.getElementById("lcTemplate");
    tableBody.innerHTML = ""; //Clear the table

    amarat.length = 0 //reset amarat object
}

btnCalc.addEventListener("click", getValues);