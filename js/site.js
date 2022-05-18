
let amarat = [
    {currMon: "", monInterest: "", principal: "", rate: "", remBalance: ""},
];

const btnCalc = document.getElementById("btnCalc");

let table = document.querySelector("resultd");
let data2 = Object.keys(amarat[0]);
//let data4 = Object.keys(headings[0]);


function  startOver(){

    document.loanForm.loanAmt.value="";
    document.loanForm.months.value="";
    document.loanForm.termInterest.value="";
  
    
    document.getElementById("loan_info").innerHTML="";
    document.getElementById("table").innerHTML="";
}

//validate inputs
function validate(){
    var loanAmt = document.loanForm.loanAmt.value; //float
    var months = document.loanForm.months.value; //int
    var termInterest = document.loanForm.termInterest.value; //float
 

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
        calculate(parseFloat(loanAmt), parseInt(months), parseFloat(termInterest));
    }

}

function calculate(loanAmt, months, termInterest){
    let  total = 0;

    let i = termInterest/100;
    var monthly_payment = loanAmt*(i/12)*Math.pow((1+i/12), months) / (Math.pow((1+i/12), months) - 1);

    var info = ""; // a really big string holding a table

    info += "<table width='250'>";
    info += "<tr><td>Loan Amount:</td>";
    info += "<td align='right'>$" + loanAmt + "</td></tr>";

    info += "<tr><td>Num of Months:</td>";
    info += "<td align='right'>" + months + "</td></tr>";

    info += "<tr><td>Interest Rates:</td>";
    info += "<td align='right'>" + termInterest + "%</td></tr>";

    info += "<tr><td>Monthly Payment:</td>";
    info += "<td align='right'>$" + round2(monthly_payment, 2) + "</td></tr>";

    info += "<tr><td>Total Payment:</td>";
    info += "<td align='right'>$" + round2(monthly_payment, 2) + "</td></tr>";

    info += "</table>";

    document.getElementById("loan_info").innerHTML = info;
    //alert("monthly_payment = " + (round2(monthly_payment, 2)));


    //******************************************** */

    var table ="";

    table += "<table>";

        table += "<tr>";
            table += "<td class='amortheader30'>0</td>"; // month number
            table += "<td class='amortheader60'>&nbsp;</td>"; // payment
            table += "<td class='amortheader60'>&nbsp;</td>"; // Principle
            table += "<td class='amortheader60'>&nbsp;</td>"; // interest
            table += "<td class='amortheader85'>&nbsp;</td>"; // total interest
            table += "<td class='amortheader70'>" + round2(loanAmt, 2) + "</td>"; // balance
        table += "</tr>";

        var current_balance = loanAmt;
        var towards_balance = current_balance;
        var payment_counter = 1;
        var total_interest = 0;
        var towards_interest = 0;


        monthly_payment = monthly_payment;

       while(current_balance > 0){
            //create rows



            towards_interest = (i/12)*current_balance; //portion of payment to the lender

            if(monthly_payment > current_balance){
                monthly_payment = current_balance + towards_interest;
            }

            towards_balance = monthly_payment - towards_interest;
            total_interest = total_interest + towards_interest;
            current_balance = current_balance - towards_balance;

        table += "<tr>";
            table += "<td class='amortd'>" + payment_counter + "</td>"; // month number
            table += "<td class='amortd'>" + round2(monthly_payment, 2) + "</td>";           
            table += "<td class='amortd'>" + round2(towards_balance, 2) + "</td>";
            table += "<td class='amortd'>" + round2(towards_interest, 2) + "</td>";   
            table += "<td class='amortd'>" + round2(total_interest, 2) + "</td>";   
            table += "<td class='amortd'>" + round2(current_balance, 2) + "</td>";      
        table += "</tr>";

        payment_counter++;

    }

    table += "</table>"

    document.getElementById("table").innerHTML = table;
}

function round2(num, dec){
    return (Math.round(num*Math.pow(10, dec))/Math.pow(10, dec)).toFixed(dec);
    //return Number.parseFloat(num).toPrecision(2);
}