let loan_amt = document.loan_form.loan_amt.value;
let months = document.loan_form.months.value;
let rate = document.loan_form.rate.value;
let extra = document.loan_form.extra.value ;

function startOver() {
    //alert("startOver reached")
    //document.getElementById("loan_form").reset();
    
    document.loan_form.loan_amt.value = "";
    document.loan_form.months.value = "";
    document.loan_form.rate.value = "";
    document.loan_form.extra.value = "0";
    document.getElementById("loan_info").innerHTML = "";
    document.getElementById("table").innerHTML = "";
    //document.getElementById("inloanAmt").innerHTML = "";
    //document.getElementById("inPeriod").innerHTML = "360";
    
    //console.log()
    //document.getElementById("loan_form").reset();
}

function validate(){

    loan_amt = document.loan_form.loan_amt.value;
    months = document.loan_form.months.value;
    rate = document.loan_form.rate.value;
    extra = document.loan_form.extra.value ;
    // isNaN is checking for float or not number
    if(loan_amt <= 0 || isNaN(Number(loan_amt))){
        alert("invalid loan amount");
        document.loan_form.loan_amt.value = "";
    }
    else if(months <= 0 || parseInt(months) != months){ //parseInt of monts is integer
        alert("invalid months");
        document.loan_form.months.value = "";
    }
    else if(rate <= 0 || isNaN(Number(rate))){
        alert("invalid rate");
        document.loan_form.rate.value = "";
    }
    else if(extra < 0 || isNaN(Number(extra))){
        alert("invalid extra amount");
        document.loan_form.extra.value = "0";
    }
    else{
        //alert("Validated");
        calculate(parseFloat(loan_amt), parseInt(months), parseFloat(rate), parseFloat(extra));
    }

}

function calculate(loan_amt, months, rate, extra){

    let i = Number(rate) / 1200;
   
    let monthly_payment = Number(loan_amt) * i * Math.pow((1 + i), Number(months)) / (Math.pow((1 + i) , Number(months)) - 1);
    monthly_payment = monthly_payment.toFixed(2);
    //alert(monthly_payment);

    let info = "";
    info += "<table width = '250'>"
    info += "<tr><td>Loan Amount: </td>";
    info += "<td align='right'>" + loan_amt + "</td></tr>";

    info += "<tr><td>Num of Months: </td>";
    info += "<td align='right'>" + months + "</td></tr>";
    
    info += "<tr><td>Interest Rate: </td>";
    info += "<td align='right'>" + rate + "%</td></tr>";
    
    info += "<tr><td>Monthly Payment: </td>";
    info += "<td align='right'>" + `$${monthly_payment}` + "</td></tr>";

    info += "<tr><td>Extra Payment: </td>";
    info += "<td align='right'>" + `$${extra}` + "</td></tr>";

    let totPayment = parseFloat(monthly_payment) + parseFloat(extra);

    info += "<tr><td>Total Monthly Payment: </td>";
    info += "<td align='right'>" + `$${totPayment}` + "</td></tr>"; 
    
    info += "</table>";

    //document.getElementById("loan_info").innerHTML = `The monthly payment is: $${monthly_payment}`;
    document.getElementById("loan_info").innerHTML = info; //info is a string containing all of the html table code

    //--------------------------------------------------------------

    let table ="";
    table += "<table cellpadding='15' border='1'>"
    //table += "<table  class='fixed_header' cellpadding='15' border='1'>"
       // table += "<thead>"
          //  table += "<tr>"

          //  table += "</tr>";
       // table += "</thead>"
        //table += "<tbody>"
            table += "<tr>"
                table += "<td width='30'>0</td>";
                table += "<td width='60'>&nbsp;</td>";
                table += "<td width='60'>&nbsp;</td>";
                table += "<td width='60'>&nbsp;</td>";
                table += "<td width='85'>&nbsp;</td>";
                table += "<td width='70'>" + `${loan_amt.toFixed(2)}`  + "</td>";
            table += "</tr>";

    let current_balance = Number(loan_amt);
    let payment_counter = 1;
    let total_interest = 0;
    let towards_interest  = 0;
    let towards_balance = 0;
    let period = Number(months);

    monthly_payment = Number(monthly_payment) + Number(extra);


   for(let index=0; index <= (period -1); index++){
       /**/

        towards_interest = i * current_balance;

        console.log(`towards_interest ${towards_interest.toFixed(2)}`);
        //console.log(`current_balance ${current_balance.toFixed(2)}`);


        total_interest = total_interest + towards_interest;
        towards_balance = monthly_payment - towards_interest;//
    
        current_balance = (current_balance - towards_balance).toFixed(2);

        //display row
        table += "<tr>";
            table += "<td>" + payment_counter + "</td>";
            table += "<td>" + Number(monthly_payment).toFixed(2) + "</td>";
            table += "<td>" + Number(towards_balance).toFixed(2) + "</td>";
            table += "<td>" + Number(towards_interest).toFixed(2) + "</td>";
            table += "<td>" + Number(total_interest).toFixed(2) + "</td>";
            table += "<td>" + Number(current_balance).toFixed(2) + "</td>";
        table += "</tr>";

        payment_counter++;
        console.log(current_balance);

        if(monthly_payment > current_balance){
            monthly_payment = current_balance + towards_interest;
            break;
        }
        
       // console.log(months, index);
   }
 
console.log(payment_counter);


        // table += "</tbody>";
    table += "</table>";

    document.getElementById("table").innerHTML = table;
}