const token = sessionStorage.getItem('token');
let newDesc; let newEditDesc; let monthlyExpenseCheck; let monthDigit; let monthName; let yearDigit;
let finalMonthlyExpense; let s1; let yourMonth; let yourMonthTag; let ivalue2;  let initialTotalExpense;  let initialMonthlyExpense;
const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
const btnOfNot=document.getElementById('noticeofmonths');
const noticeOfMonths = document.getElementById('noticeofmonths-container');
btnOfNot.addEventListener('click', () => {
    noticeOfMonths.classList.toggle('nom-active');
});
let page; let newArr;
let ITEMS_PER_PAGE = 5;
let parentEle = document.getElementById('div-id');
const pageEle = document.getElementById('pagination');
let childEle = document.createElement('div');
let count=1;
var forms = document.getElementById("myform");

forms.addEventListener('submit', (e) => {
    e.preventDefault();
    let expenseAmount = e.target.expenseAmount.value;
    let description = e.target.description.value;
    let categoryDetail = e.target.categoryDetail.value;
    let expenseAmountInt = parseFloat(expenseAmount);
    let dateOfExpense = e.target.dateOfExpense.value;
    if (document.getElementById('totalexp').value == "") {
        initialTotalExpense = 0;
    } else {
        let s = (document.getElementById('totalexp').value).slice(1);
        s = s.slice(0, s.length - 2);
        initialTotalExpense = parseFloat(s);
        console.log(initialTotalExpense);
    }
    let finalTotalExpense = initialTotalExpense + expenseAmountInt;
    console.log(finalTotalExpense);
    monthDigit = dateOfExpense.slice(5, 7);
    yearDigit = dateOfExpense.slice(0, 4);
    if (document.getElementById('monthlyexp').value == "") {
        initialMonthlyExpense = 0;
        monthlyExpenseCheck = monthDigit;
    } else {
        if (monthDigit == monthlyExpenseCheck) {
            s1 = (document.getElementById('monthlyexp').value).slice(1);
            s1 = s1.slice(0, s1.length - 2);
            initialMonthlyExpense = parseFloat(s1);
            console.log(initialMonthlyExpense);
        }
        else {
            let monthlyExpObj = {
                finalMonthlyExpense: finalMonthlyExpense,
                monthName: monthName,
                yearDigit
            };
            console.log('monthly expense object', monthlyExpObj);
            axios.post("http://localhost:5739/monthlyExpenseData", monthlyExpObj, { headers: { "Authorization": token } }).then((response) => {
                console.log(response);
                // for (var i = 0; i < response.data.length; i++) {
                //     printDetailsOnScreen(response.data[i]);
                // }
            }).catch((err) => {
                console.log('Error in yearly expenses api');
                console.log(err);
            });
            initialMonthlyExpense = 0;
            monthlyExpenseCheck = monthDigit;
        }
    }
    finalMonthlyExpense = initialMonthlyExpense + expenseAmountInt;
    switch (monthDigit) {
        case '01':
            monthName = "January";
            break;
        case '02':
            monthName = "February";
            break;
        case '03':
            monthName = "March";
            break;
        case '04':
            monthName = "April";
            break;
        case '05':
            monthName = "May";
            break;
        case '06':
            monthName = "June";
            break;
        case '07':
            monthName = "July";
            break;
        case '08':
            monthName = "August";
            break;
        case '09':
            monthName = "September";
            break;
        case '10':
            monthName = "October";
            break;
        case '11':
            monthName = "November";
            break;
        case '12':
            monthName = "December";
            break;
        default:
            monthName = "Not valid month";
    };
    let obj3 = {
        expenseAmount,
        description,
        categoryDetail,
        dateOfExpense,
        finalTotalExpense,
        finalMonthlyExpense,
        monthName
    };
    console.log(obj3);
    axios.post('http://localhost:5739/dailyExpensesData', obj3, { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        document.getElementById('totalexp').value = '₹' + `${finalTotalExpense}` + '/-';
        document.getElementById('monthlyexp').value = '₹' + `${finalMonthlyExpense}` + '/-';
        document.getElementById('monthTag').value = monthName;
        printDetailsOnScreen(response.data);
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem('token');
    axios.get("http://localhost:5739/domDailyExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            printDetailsOnScreen(response.data[i]);
        }
    }).catch((err) => console.log(err));

    axios.get("http://localhost:5739/domTotalExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        console.log('₹' + `${response.data[0].totalexpense}` + '/-');
        document.getElementById('totalexp').value = '₹' + `${response.data[0].totalexpense}` + '/-';
        document.getElementById('monthlyexp').value = '₹' + `${response.data[0].finalMonthlyExpense}` + '/-';
        document.getElementById('monthTag').value = response.data[0].monthName;
    }).catch((err) => console.log(err));
});

function printDetailsOnScreen(det) {
    if (det.description.indexOf(" ") != -1) {
        newDesc = det.description.replaceAll(" ", "#");
    } else {
        newDesc = det.description;
    }
    monthlyExpenseCheck = det.dateOfExpense.slice(5, 7);
    let dat = new Date(det.dateOfExpense);
    let yourDateOfExpense = dat.toDateString();
    yourMonth = yourDateOfExpense.slice(4, 7);
    
    console.log((document.getElementById('monthTag').value).slice(0, 3));
    let parentNode = document.getElementById('div-id');
    parentNode.innerHTML = parentNode.innerHTML + `<li id='${det.id}-${det.expenseAmount}-${yourMonth}' style="text-align:left;"><pre style="font-size:15px;"><b>On:</b> <i>${yourDateOfExpense}</i>,     <b>Amount:</b> <i>₹${det.expenseAmount}/-</i>,     <b>Description:</b><i style="position:relative;width:15px;height:2px;">${det.description}</i>,     <b>Category:</b><i>${det.categoryDetail}</i>     <button id="del" onclick=deleteUser('${det.id}-${det.expenseAmount}-${yourMonth}') style="background-color:blue; border:1px black solid; border-radius:5px;color:white;">Delete expense</button>  <button id="edit" onclick=editUserDetails('${det.expenseAmount}','${det.description}','${det.categoryDetail}','${det.id}-${det.expenseAmount}') style="background-color:blue; border:1px black solid; border-radius:5px;color:white;">Edit expense</button>.</pre></li>`
}
function editUserDetails(eval, dval, cvalue, ivalue) {
    document.getElementById('number').value = eval;
    document.getElementById('text').value = dval;
    document.getElementById('list').value = cvalue;
    deleteUser(ivalue);
}
function deleteUser(ivalue) {
    console.log(ivalue);
    const token = sessionStorage.getItem('token');
    let s1 = (document.getElementById('totalexp').value).slice(1);
    s1 = s1.slice(0, s1.length - 2);
    let initialTotalExpense = parseFloat(s1);
    let arrDelVal = ivalue.split('-');
    const expenseid = arrDelVal[0];
    const expenseamount = parseFloat(arrDelVal[1]);
    yourMonthTag = (document.getElementById('monthTag').value).slice(0, 3);
    console.log(expenseamount);
    let finalTotalExpense = initialTotalExpense - expenseamount;
    document.getElementById('totalexp').value = '₹' + `${finalTotalExpense}` + '/-';
    ivalue2 = `${expenseid}` + `-${finalTotalExpense}`;
    let s2 = (document.getElementById('monthlyexp').value).slice(1);
    s2 = s2.slice(0, s2.length - 2);
    let finalMonthlyExpense = parseFloat(s2);
    let monthName = document.getElementById('monthTag').value;
    if (arrDelVal[2] == yourMonthTag) {
        let s3 = (document.getElementById('monthlyexp').value).slice(1);
        s3 = s3.slice(0, s3.length - 2);
        let initialMonthlyExpense = parseFloat(s3);
        finalMonthlyExpense = initialMonthlyExpense - expenseamount;
        document.getElementById('monthlyexp').value = '₹' + `${finalMonthlyExpense}` + '/-';
    }
    ivalue2 = `${expenseid}` + `-${finalTotalExpense}` + `-${finalMonthlyExpense}` + `-${monthName}`;
    console.log(ivalue2);
    axios.delete(`http://localhost:5739/deleteExpenseFromDatabase/${ivalue2}`, { headers: { "Authorization": token } }).then((response) => console.log("Successful" + response)).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
    removeFromScreen(ivalue);
}
function removeFromScreen(ivalue) {
    let parentNode = document.getElementById('div-id');
    let childnode = document.getElementById(ivalue);
    parentNode.removeChild(childnode);
}
function clearDetails() {
    document.getElementById('number').value = " ";
    document.getElementById('text').value = " ";
    document.getElementById('list').value = " ";
}





