

//let headings = [Month: "", 'Payment','Principal', 'Interest', 'Total Interest', 'Balance'];
let headings = [{Month: "", Payment: "", Principal: "", Interest: "", Total_Interest: "", Balance: "", Rate: ""}];

let amarat = [
    {currMon: "", monInterest: "", principal: "", rate: "", remBalance: ""},
];

let loanAmount = 250000;
//let loanAmount = 250000;
let str ="";
let rate = 4.5;
let months = 360;
let numMonths = 0;
let interest = 0;
let total = 0;
let payment = 0;
let numRows = 0;
let downPay = 0;

const calcBtn = document.getElementById("calcBtn");

let table = document.querySelector("table");
let data2 = Object.keys(amarat[0]);
let data4 = Object.keys(headings[0]);


//  **************************************************
//Inputs
// ********************************************

function validate(){
    var loan_amt = document.loan_form.loan_amt.value; //float
    var months = document.loan_form.months.value; //int
    var rate = document.loan_form.rate.value; //float
    var extra = document.loan_form.extra.value; //float

   // from mine loanAmount = document.querySelector("#amount").value;

    if (loanAmount <= 0 || isNaN(Number(loanAmount))){ //true if NaN ck for not a float
        alert("Please enter a valid loan amount - ex. 250000");
        document.loan_form.loanAmount.value = ""; //reset to ""
    }
    
    else if(months <= 0 || parseInt(months) != months){ //ck for integer paesInt forces inter, != cks to see if same as months variable
        alert("Please enter a valid number of monthes");
        document.loan_form.months.value = ""; //reset to ""
    }
    
    else if(rate <= 0 || isNaN(Number(rate))){
        alert("Please enter a valid interest rate - ex. 4.5 instead of 4.5%");
        document.loan_form.rate.value = "";
    }
    
    else if(extra < 0 || isNaN(Number(extra))){
        alert("Please enter a valid extra payment amout ex. 200 for $200");
        document.loan_form.extra.value = "";
    }
    
    else{
       // alert("Validation complete");
        calculate(parseFloat(loan_amt), parseInt(months), parseFloat(rate), parseFloat(extra));
    }

}

calcAmount = function(){
    loanAmount = document.querySelector("#loanAmount").value;
    console.log(loanAmount);
    if (loanAmount <= 0 || isNaN(Number(loanAmount))){ //true if NaN ck for not a float
        alert("Please enter a valid loan amount - ex. 250000");
        document.querySelector("#loanAmount").value = "";
        //document.loan_form.loanAmount.value = "";
    }else{
        str = loanAmount.toLocaleString("en-US");
    
        //str = loanAmount.toString().replace(/B(?=(d{3})+(?!d))/g, ","); //DOES NOT WORK Why?
        str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert commas into string
        console.log(`loanAmountStr is ${str}`);
        document.getElementById("loanAmount").value = str; // amount with commas
        //price = Number(loanAmount);
        loanAmount = Number(loanAmount);
        console.log(loanAmount);
    }


}

calcDownPay = function(){
    let downPayment = document.querySelector("#downPay").value;

    if (downPayment < 0 || isNaN(Number(downPayment))){ //true if NaN ck for not a float
        alert("Please enter a valid down payment amount - ex. 40000");
        document.querySelector("#downPay").value = "";
        //document.loan_form.loanAmount.value = "";
    }else{
        //let downPayment = document.querySelector("#downPay").value;
        //console.log(`Down payment is ${downPayment}`);
        str = downPayment.toLocaleString("en-US");
        //str = amount.toString().replace(/B(?=(d{3})+(?!d))/g, ","); //DOES NOT WORK Why?
        str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert commas into string
        //console.log(`This is amount ${amount}`);
        document.getElementById("downPay").value = str; // amount with commas
        downPay = Number(downPayment);
    }

}

calcInt = function(){
    rate = document.querySelector("#rate").value;
    if (rate <= 0 || isNaN(Number(rate))){ //true if NaN ck for not a float
        alert("Please enter a valid interest rate - ex. 4.5 instead of 4.5%");
        document.querySelector("#rate").value = "";
        //document.loan_form.loanAmount.value = "";
    
    }
}

calcMonths = function(){
    numMonths = document.querySelector("#months").value;
    console.log(`numMonths = ${numMonths}`);
    if(months <= 0 || parseInt(months) != months){ //ck for integer paesInt forces inter, != cks to see if same as months variable
        alert("Please enter a valid number of monthes");
        document.loan_form.months.value = "";
    }
}



// numMonths should be the total number of payments expected to be made for the life of the loan: years * 12
// interestRate: eg. 6.2% should be passed as 6.2

function calculate(loanAmount, numMonths, interestRate, downPay)
{
    //clear out amoratization table
    let oldTable = document.getElementById("amoratTbl");
    oldTable.innerHTML = "";// only clears headings?
    amarat.length = 0 // reset amortization array


    console.log(`And this is months ${numMonths}`);
    console.log(`And this is rate ${interestRate * 0.01}`);
    console.log(`And this is loanAmount ${loanAmount}`);
    console.log(`And this is down payment ${downPay}`);
    console.log(`And this is interest ${rate}`);

    //from BrianVeitch
    /**
    let i = rate/100;
    var monthly_payment = loan_amt*(i/12)*Math.pow((1+i/12), months) / (Math.pow((1+i/12), months) - 1);
     * 
     */


    let interestRatePerMonth = (interestRate / 100) / 12;
    let yearIntPC = interestRate/100;

    console.log(`And this is monthly interest ${interestRatePerMonth}`);
    console.log(`And this is yearly interest ${yearIntPC}`);

    loanAmount = loanAmount - downPay;

    payment = (yearIntPC/12 * Number(loanAmount)) * Math.pow((1 + yearIntPC/12), Number(numMonths)) / (Math.pow((1 + yearIntPC/12), Number(numMonths))-1);
    //total = (interestRatePerMonth * loanAmount) / (1- (Math.pow((1 + interestRatePerMonth), (-numMonths))));
    //total = startingLoanAmount * interestRatePerMonth * (Math.pow(1 + interestRatePerMonth, numMonths)) / (Math.pow(1 + interestRatePerMonth, numMonths) - 1);

    //payment = payment.toFixed(2);

    console.log(`And this is payment ${payment.toFixed(2)}`);

    document.querySelector("#total").innerHTML = `$${payment.toFixed(2)}`;


    //genRA2(numMonths, price, yearIntPC, payment);
    genRA2(numMonths, loanAmount, yearIntPC, payment);

    generateTable(table, amarat);

    generateTableHead(table, data4);
    
}

// ******************************
// btnCalc calls this function
//*************************** */

function callCalc(){
    //initVals();
    //Clear out amarat table 8/24/2021 does not clear out if down payment changed
    let amarat = [
        {currMon: "", monInterest: "", principal: "", rate: "", remBalance: ""},
    ];

    //deleteRows();// delete previous table rows
    if(numRows > 0){
        for(let i = 0; i <= numRows; i++){
            document.getElementById("amoratTbl").deleteRow(0);
        }
        numRows = 0; 
    }
    //loanAmount = price - downPay;
    calculate(loanAmount, numMonths, rate, downPay);
}



// ********************* generate main array - insert objects
// ********************** prepare object for amritiztion table and graph
//************** */
genRA2 = function(numMonths, loanAmt, yearIntPC, payment){
    let remBalance = Number(loanAmt);
    let currMon = 0;///
    monPrincipal = 0;
    monInt = 0;
    //monRate = Number(yrRate) / 1200;
    monRate = yearIntPC/12;
    sw = 0; // A God fearing old fashioned switch
    monthNum = 0;
    cumInterest = 0;
    totInterest = 0;

   //for(let i = 0; i <= numMonths - 1; i++){
    while(remBalance > 0){
   // cancelBalLabel: While(remBalance >= monPrincipal) {

       // currMon =+ 1;//for for loop
        currMon++; //for while
        console.log(`For currMon ${currMon} remBalance is ${remBalance} and monPrincipal is ${monPrincipal}`);

        temp = {}; // move object declaration inside loop per https://stackoverflow.com/questions/36602160/how-to-push-object-to-array-from-for-loop-properly-in-javascript
        //towards_interest = (i/12)*current_balance; //portion of payment to the lender
        monInt = (remBalance * Number(monRate)).toFixed(2); //remBalance * monRate/12
        //monInt = (monRate/12) * remBalance;
        console.log(`remBalance is ${remBalance}`);
        console.log(`Monthly interest is ${monInt}`);
        console.log(`monRate is ${monRate}`);

        totInterest = Number(totInterest ) + Number(monInt); //Add monthly interest to total interest

        //totInterest = Number(totInterest).toFixed(2);
        totInterest = Number(totInterest);

        //monPrincipal = (Number(payment) - Number(monInt)).toFixed(2); //monthly payment - monthly Interest
        monPrincipal = (Number(payment) - Number(monInt));

        console.log(`Monthly principal is ${monPrincipal}`)

        //remBalance = (remBalance - Number(monPrincipal)).toFixed(2); //remBalance - monthly principal
        remBalance = (remBalance - Number(monPrincipal));

        //console.log(totInterest);
        //================ if lastPayment is not equal to payment
            if(Number(payment) > Number(remBalance)){ //damned type wondering about
            //if(payment > remBalance){
            // monthly_payment = current_balance + towards_interest;
                let lastInt = monRate * remBalance;
                let lastPayment  = remBalance + lastInt;
                lastPayment = parseFloat(lastPayment).toFixed(2)
                payment = lastPayment;
                monInt = 0;
                
                payment = remBalance + monInt;

                console.log(`last payment is ${payment}`);
            // break cancelBalLabel;
                sw = 1; //set switch to break out after temp object filled with last
            }

        //**************** fill 1 object and insert into array */
        temp.currMon = currMon; // current month
        temp.payment = Number(payment).toFixed(2);

        console.log(`temp.payment is ${temp.payment}`);

        temp.principal = Number(monPrincipal).toFixed(2);
        temp.monInterest = Number(monInt).toFixed(2); 
        temp.totInterest = Number(totInterest).toFixed(2);
        temp.remBalance = Number(remBalance).toFixed(2);
        //console.log(temp.remBalance);
        console.log(`remBalance is ${temp.remBalance}`)
        temp.rate = rate;

        insertObject(amarat, temp, currMon);


        //if(sw === 1){ //REMEMBER - can't be used with ternary
           //  break cancelBalLabel;
        //}
        
    }

    //function insertObject(arr, obj, index) {
    function insertObject(arr, obj) {
        // append object
        arr.push(obj);   
        //console.log(`${arr[index].remBalance} ${arr[index].principal}`);
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

//initVals();
calcBtn.addEventListener("click", callCalc);
