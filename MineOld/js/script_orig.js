let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" },
    { name: "Poggio Scali", height: 1520, place: "Parco Foreste Casentinesi" },
    { name: "Pratomagno", height: 1592, place: "Parco Foreste Casentinesi" },
    { name: "Monte Amiata", height: 1738, place: "Siena" }
  ];

//let headings = [Month: "", 'Payment','Principal', 'Interest', 'Total Interest', 'Balance'];
let headings = [{Month: "", Payment: "", Principal: "", Interest: "", Total_Interest: "", Balance: ""},];

let amarat = [
    {currMon: "", monInterest: "", principal: "", rate: "", remBalance: ""},
];

/*
1	4000.00	341.51	15.00	326.51	3673.49
2	3673.49	341.51	13.78	327.74	3345.75
3	3345.75	341.51	12.55	328.97	3016.78
4	3016.78	341.51	11.31	330.20	2686.58
5	2686.58	341.51	10.07	331.44	2355.14
6	2355.14	341.51	8.83	332.68	2022.46
7	2022.46	341.51	7.58	333.93	1688.53
8	1688.53	341.51	6.33	335.18	1353.34
9	1353.34	341.51	5.08	336.44	1016.91
10	1016.91	341.51	3.81	337.70	679.21
11	679.21	341.51	2.55	338.97	340.24
12	340.24	341.51	1.28	340.24	-0.00
*/
//let amarat = [];
let testRA = [
    {numMon: "1", monInterest: "15.00", principal: "326.51", rate: "4.5", remBalance: "3673.49"},
    {numMon: "2", monInterest: "13.78", principal: "327.74", rate: "4.5", remBalance: "3345.75"},
    {numMon: "3", monInterest: "12.55", principal: "328.97", rate: "4.5", remBalance: "3016.78"},
    {numMon: "4", monInterest: "11.31", principal: "330.20", rate: "4.5", remBalance: "2686.58"},
    {numMon: "5", monInterest: "10.07", principal: "331.44", rate: "4.5", remBalance: "2355.14"},
    {numMon: "6", monInterest: "8.83", principal: "332.68", rate: "4.5", remBalance: "2022.46"},
    {numMon: "7", monInterest: "7.58", principal: "333.93", rate: "4.5", remBalance: "1688.53"},
    {numMon: "8", monInterest: "6.33", principal: "335.18", rate: "4.5", remBalance: "1353.34"},
    {numMon: "9", monInterest: "5.08", principal: "336.44", rate: "4.5", remBalance: "1016.91"},
    {numMon: "10", monInterest: "3.81", principal: "337.70", rate: "4.5", remBalance: "679.21"},
    {numMon: "11", monInterest: "2.55", principal: "338.97", rate: "4.5", remBalance: "340.24"},
    {numMon: "12", monInterest: "1.28", principal: "340.24", rate: "4.5", remBalance: "-0.00"},
]

//initial values
let amount = 250000;
let price = 250000;
let str ="";
let rate = 4.5;
let months = 360;
let interest = 0;
let total = 0;
let numRows = 0;

const calcBtn = document.getElementById("calcBtn");

let table = document.querySelector("table");
let data = Object.keys(mountains[0]);
let data2 = Object.keys(amarat[0]);
let data3 = Object.keys(testRA[0]);
let data4 = Object.keys(headings[0]);

calcAmount = function(){

    amount = document.querySelector("#amount").value;
    
    str = amount.toLocaleString("en-US");
    //str = amount.toString().replace(/B(?=(d{3})+(?!d))/g, ","); //DOES NOT WORK Why?
    str = str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // insert commas into string
    //console.log(`This is amount ${amount}`);
    document.getElementById("amount").value = str; // amount with commas

    price = Number(amount);
}



calcInt = function(){
    rate = document.querySelector("#rate").value;
    //console.log(`And this is price before Number ${price}`);// number
    //price = parseFloat(price.replace(/,/g, ''))// remove commas
    //price = Number(price);
    


}

calcMonths = function(){
    months = document.querySelector("#months").value;

   // interest = (price * (rate * 0.01)) / months;
    //console.log(`And this is price after Number ${price}`);
    
    //total = ((startingLoanAmount / months) + interest).toFixed(2);
  
    //document.querySelector("#total").innerHTML = `$${total}`;
    
    //document.getElementById("total").value = total; 

}


// totalPayments should be the total number of payments expected to be made for the life of the loan: years * 12
// interestRate: eg. 6.2% should be passed as 0.062

function calculate(startingLoanAmount, totalPayments, interestRate)
{
    //clear out amoratization table
    let oldTable = document.getElementById("amoratTbl");
    oldTable.innerHTML = "";// only clears headings?
    amarat.length = 0 // reset amortization array

   // document.getElementById("amoratTbl").innerHTML = "";// delete headings
    //deleteRows();// delete table rows

    console.log(`And this is months ${totalPayments}`);
    console.log(`And this is rate ${interestRate * 0.01}`);
    console.log(`And this is price ${startingLoanAmount}`);
    console.log(`And this is interest ${rate}`);


    let interestRatePerMonth = interestRate / 1200;

    total = startingLoanAmount * interestRatePerMonth * (Math.pow(1 + interestRatePerMonth, totalPayments)) / (Math.pow(1 + interestRatePerMonth, totalPayments) - 1);

    total = total.toFixed(2);

    console.log(`And this is total ${total}`);

    document.querySelector("#total").innerHTML = `$${total}`;


    genRA2(months, price, rate, total);
    //generateTestTable(table, testRA);

   //genTable(table, amarat); 
    generateTable(table, amarat);
    //generateTable(table, mountains);
   generateTableHead(table, data4);

   //amarat.forEach(element => {
    //   console.log(element.principal);//prints lastt element 12 times
       
   //});

   //printRA(amarat);
   /*
    for(let i =0; i <= amarat.length; i++){
        console.log(`${amarat[i].principal} ${amarat[i].remBalance}`);
    }
    */

     // backwards but it generaates tbody auto in an empty table
     //generateTable(table, testRA);
  //generateTable(table, mountains); // generate the table first
  //generateTableHead(table, data); // then the head
    
}


function callCalc(){
    //deleteRows();// delete prev. table rows
    if(numRows > 0){
        for(let i = 0; i <= numRows; i++){
            document.getElementById("amoratTbl").deleteRow(0);
        }
        numRows = 0; 
    }
    //deleteRows();// delete table rows

    calculate(price, months, rate);
    //genRA(months, price, rate, total);
}

printRA = function(ra){
    for (let i=0; i <= ra.length; i++){

    }
}


genRA2 = function(months, loanAmt, yrRate, payment){
    let remBalance = loanAmt;
    let currMon = 0;
    monPrincipal = 0;
    monInt = 0;
    monRate = yrRate / 1200;
    monthNum = 0;
    cumInterest = 0;
    totInterest = 0;

    //let raLen = 0;

    for(let i = 0; i <= months - 1; i++){

        temp = {}; // move object declaration inside loop per https://stackoverflow.com/questions/36602160/how-to-push-object-to-array-from-for-loop-properly-in-javascript
        monInt = (remBalance * monRate).toFixed(2);
        console.log(monInt);
        totInterest =+ monInt;

        totInterest = totInterest.toFixed(2);
        monPrincipal = (payment - monInt).toFixed(2);
        remBalance = (remBalance - monPrincipal).toFixed(2);

        //console.log(totInterest);

        temp.currMon = i + 1; // current month
        temp.payment = payment;
        temp.principal = monPrincipal;
        temp.monInterest = monInt; 
        temp.totInterest = totInterest;
        temp.remBalance = remBalance;
        //console.log(temp.remBalance);
        temp.rate = rate;



       //raLen = amarat.length;
       //amarat = [...amarat, temp];
        insertObject(amarat, temp, i)
        //amarat[i].push(temp);
       //console.log(i)
     // console.log(`${temp.currMon} ${amarat[i].principal}`)

}

    function insertObject(arr, obj, index) {

        // append object
        arr.push(obj);
        
        //console.log(`${arr[index].remBalance} ${arr[index].principal}`);
    }


genRA = function(months, price, rate, payment){
    let cumInt = 0; // cumulative interest
    let remBalance = 0; //ex. 250000
    let monPrincipal = 0;
    let monInt = 0;
    let monRate = rate / 1200; //0.045/1200
    let temp ={};
    remBalance = price;
    for (let i = 0; i <= months;  i++){
      //  var a=[], b={};
       // a.push(b); 
       temp.numMon = i;
       monInt = (payment - (remBalance * monRate)).toFixed(2);//1266.71 - 937.21
       temp.monInterest = monInt; 
       monPrincipal  = (payment - monInt).toFixed(2);
       temp.principal = monPrincipal;
       temp.rate = rate;
       remBalance = (remBalance - monPrincipal).toFixed(2);
       temp.remBalance = remBalance;
       
       amarat.push(temp);
        //console.log(i)
       //console.log(`${temp.numMon} ${monRate}`)


    }

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
/*
function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
      }
  }
*/

genTable = function(table, ra){
    for (let i = 0; i <= ra.length -1; i++){
        let row = table.insertRow();
        for(let j = 0; j <= ra[key] -1; j++){
            let cell = row.insertCell();
            let text = document.createTextNode(ra[key]);
            cell.appendChild(text);
        }
    }


    for (let element of data){
        let row = table.insertRow();
        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


generateTable = function(table, data){

    console.log(`numRows before generation ${numRows}`);

    numRows = 0;

    for (let element of data){
        let row = table.insertRow();
        numRows++;
        console.log(numRows);

        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);

        }
    }
    console.log(`numRows AFTER generation ${numRows}`);
}

function deleteRows() {
    if(numRows > 0){
        for(let i = 0; i <= numRows; i++){
            document.getElementById("amoratTbl").deleteRow(0);
        }
        numRows = 0; 
    }
    return

  }

function generateMtnTable(table, data){
    for (let element of data){
        let row = table.insertRow();
        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function generateTestTable(table, data){
    for (let element of data){
        let row = table.insertRow();
        for(key in element){
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
/*
function generateTable(months, price, rate, payment){
    let outstandingBal = price;
    let ratePerMonth = rate / 1200;

    for (let i = 0; i <= (months -1); i++){


        let row = table.insertRow(); //make new row

        let cell = row.insertCell(); // create the cell
        let text = document.createTextNode(element[key]); // text for the cell
        cell.appendChild(text); // insert text into cell
        
    }
}
*/
//function displayMessage(){
 ///   document.getElementById("msg").innerHTML = "The button has been clicked.";
//}   
// get reference to button
//var btn = document.getElementById("myBtn");
// add event listener for the button, for action "click"

calcBtn.addEventListener("click", callCalc);


//test of reged
//const str = (1234567890).toString().replace(/B(?=(d{3})+(?!d))/g, ",");
//console.log(str)
//
//test of reged
//let str = amount.toString().replace(/B(?=(d{3})+(?!d))/g, ",");
//console.log(str)
//