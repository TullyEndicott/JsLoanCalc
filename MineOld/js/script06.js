
//let headings = [Month: "", 'Payment','Principal', 'Interest', 'Total Interest', 'Balance'];
let headings = [{Month: "", Payment: "", Principal: "", Interest: "", Total_Interest: "", Balance: "", Rate: ""}];

let amarat = [
    {currMon: "", monInterest: "", principal: "", rate: "", remBalance: ""},
];

let loanAmount = 250000;
let str ="";
let rate= 4.5;
let yearIntPC = 0 //.045
let months = 360;
let numMonths = 0;
let monthNumber = 0;
let interest = 0;
let total = 0;
let payment = 0;
let numRows = 0;
let downPay = 0;

const calcBtn = document.getElementById("calcBtn");

let table = document.querySelector("table");
let data2 = Object.keys(amarat[0]);
let data4 = Object.keys(headings[0]);

/**********************Start Over */
function  startOver(){

    document.querySelector("#loanAmount").value="";
    downPayment = document.querySelector("#downPay").value="";
    document.querySelector("#rate").value="";
    document.querySelector("#months").value="";
    
    document.getElementById("loan_info").innerHTML="";
    document.getElementById("table").innerHTML="";
}
//******************************** */
//Iputs ********************************
//********************************** */

calcAmount = function(){
    loanAmount = document.querySelector("#loanAmount").value;
    console.log(loanAmount);
    if (loanAmount <= 0 || isNaN(Number(loanAmount))){ //true if NaN ck for not a float
        alert("Please enter a valid loan amount - ex. 250000");
        document.querySelector("#loanAmount").value = "";
    }else{
        str = loanAmount.toLocaleString("en-US");
    
        str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert commas into string
        console.log(`loanAmountStr is ${str}`);
        document.getElementById("loanAmount").value = str; // amount with commas

        loanAmount = Number(loanAmount);
        console.log(loanAmount);
    }


}

valDownPay = function(){
    let downPayment = document.querySelector("#downPay").value;

    if (downPayment < 0 || isNaN(Number(downPayment))){ //true if NaN ck for not a float
        alert("Please enter a valid down payment amount - ex. 40000");
        document.querySelector("#downPay").value = "";
    }else{
        str = downPayment.toLocaleString("en-US");
        str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert commas into string
        document.getElementById("downPay").value = str; // amount with commas

        downPay = Number(downPayment);
    }

}

valInt = function(){
    rate = document.querySelector("#rate").value;
    if (rate <= 0 || isNaN(Number(rate))){ //true if NaN ck for not a float
        alert("Please enter a valid interest rate - ex. 4.5 instead of 4.5%");
        document.querySelector("#rate").value = "";
    }
    yearIntPC = rate/100;
    console.log(`rate is ${rate} yearIntPC is ${yearIntPC}`)
}

valMonths = function(){
    months= document.querySelector("#months").value;
    console.log(`months = ${months}`);
    if(months <= 0 || parseInt(months) != months){ //ck for integer paesInt forces inter, != cks to see if same as months variable
        alert("Please enter a valid number of monthes");
        document.loan_form.months.value = "";
    }
    console.log(`Number of months is ${months}`)
}

//*************************************** */
// Calculate the payment 
//***************************************** */

function calcPayment(loanAmount, downPay, yearIntPC, months){

    loanAmount = loanAmount - downPay;
//var monthly_payment = loan_amt*(i/12)*Math.pow((1+i/12), months) / (Math.pow((1+i/12), months) - 1);
    return (yearIntPC/12 * loanAmount) * Math.pow((1 + yearIntPC/12), months) / (Math.pow((1 + yearIntPC/12), months)-1);
   // return (yearIntPC/12 * Number(loanAmount)) * Math.pow((1 + yearIntPC/12), Number(months)) / (Math.pow((1 + yearIntPC/12), Number(months))-1);
}





//*****************
function calculate(loanAmount, months, rate, downPay){
    console.log("function calculate")
    //yearIntPC = rate/100; //4.5 to 0.045
    //payment = calcPayment(loanAmount, downPay, yearIntPC, months);
    let i = rate/100;
    
    payment = (i/12 * loanAmount) * Math.pow((1 + i/12), months) / (Math.pow((1 + i/12), months)-1);

    document.querySelector("#total").innerHTML = `$${payment.toFixed(2)}`; // leave #total for now4

   // let interestRatePerMonth = (interestRate / 100) / 12;
   // let yearIntPC = interestRate/100;



    genRA2(months, loanAmount, yearIntPC, payment);

    generateTable(table, amarat);

    generateTableHead(table, data4);
}

// ********************* generate main array - insert objects
// ********************** prepare object for amritiztion table and graph
//************** */
genRA2 = function(months, loanAmt, yearIntPC, payment){

    let remBalance = loanAmt;
    let currMon = 0;///
    monthlyPrincipal = 0;
    monthlyInterest = 0;
    //monthlyRate = Number(yrRate) / 1200;
    monthlyRate = yearIntPC/12;
    sw = 0; // A God fearing old fashioned switch
    monthNum = 0;
    cumInterest = 0;
    totInterest = 0;


    while(remBalance > 0){

        currMon++; //for while
    

        temp = {}; // move object declaration inside loop per https://stackoverflow.com/questions/36602160/how-to-push-object-to-array-from-for-loop-properly-in-javascript
        //towards_interest = (i/12)*current_balance; //portion of payment to the lender
        monthlyInterest = remBalance * monthlyRate; //remBalance * monthlyRate/12

        totInterest = totInterest + monthlyInterest; //Add monthly interest to total interest
        //totInterest = Number(totInterest);

        monthlyPrincipal = payment - monthlyInterest;

        remBalance = remBalance - monthlyPrincipal;

        console.log(`month=${currMon} remBalance=${remBalance} monthlyPrincipal=${monthlyPrincipal}`)
         
        //================ if lastPayment is not equal to payment  
           if(payment > remBalance){ //damned type wondering about
         /**/
            //if(currMon = months){ //damned type wondering about
                //monthly_payment = current_balance + towards_interest;
                payment = remBalance + monthlyInterest

               let lastInt = monthlyRate * remBalance;
                let lastPayment  = remBalance + lastInt;
                //lastPayment = parseFloat(lastPayment).toFixed(2)
                payment = lastPayment;
                monthlyInterest = lastInt;
                
                payment = remBalance + monthlyInterest;

                console.log(`last payment is ${payment}`);
            // break cancelBalLabel;
                sw = 1; //set switch to break out after temp object filled with last
                
             
            }
        

        //**************** fill 1 object and insert into array 
        temp.currMon = currMon; // current month
        temp.payment = payment.toFixed(2);
        temp.principal = monthlyPrincipal.toFixed(2);
        temp.monthlyInterest = monthlyInterest.toFixed(2); 
        temp.totInterest = totInterest.toFixed(2);
        temp.remBalance = remBalance.toFixed(2);
        temp.rate = rate;// ex. 4.5

        insertObject(amarat, temp, currMon);

        console.log(`For currMon ${currMon} payment is ${temp.payment} remBalance is ${remBalance} and monPrincipal is ${monthlyPrincipal}`);
    }

    function insertObject(arr, obj) {
        arr.push(obj); 
    }

}

generateTableHead = function(table) {
    //clear out amoratization table
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data4) {// amarat
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

generateTable = function(table, data){
    console.log(`numRows before generation ${numRows}`);
    numRows = 0;

    for (let element of data){
        let row = table.insertRow();
        numRows++;
       // console.log(numRows);

        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);

        }
    }
    console.log(`numRows AFTER generation ${numRows}`);
}



//********************************** */
//Clear Out old table if filled
//*************************************** */
function clearTable(){
    //clear out amoratization table
    let oldTable = document.getElementById("amoratTbl");
    oldTable.innerHTML = "";// only clears headings?
    amarat.length = 0 // reset amortization array

       //Clear out amarat table 8/24/2021 does not clear out if down payment changed
    // amarat = [
      //  {currMon: "", monthlyInterest: "", principal: "", rate: "", remBalance: ""},
    //];

    //deleteRows();// delete previous table rows
    if(numRows > 0){
        for(let i = 0; i <= numRows; i++){
            document.getElementById("amoratTbl").deleteRow(0);
        }
        numRows = 0; 
    }
}


// ******************************
// btnCalc calls this function
//*************************** */

function callCalc(){
        console.log("Calc btn")
    clearTable();
        console.log("Clear Table")
    calculate(loanAmount, months, rate, downPay);
}

//Watch btnCalc
calcBtn.addEventListener("click", callCalc);