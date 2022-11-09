const token = sessionStorage.getItem('token');
const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
let page; let newArr;
let rows_per_page;
let ITEMS_PER_PAGE = 10;
let parentEle = document.getElementById('dailyExpBoard');
const pageEle = document.getElementById('pagination');
let childEle = document.createElement('div');
let count=1;
document.getElementById('buypremium').addEventListener('click', function (e) {
    try {
        axios.get('http://localhost:5739/purchase/premiummembership', { headers: { "Authorization": token } }).then((response) => {
            console.log(response);
            let options = {
                "key": response.data.key_id,
                "name": "Expense Tracker Premium",
                "order_id": response.data.orderId,
                "prefill": {
                    "name": "Test User",
                    "email": "test.user@example.com",
                    "contact": "7003442036"
                },
                "theme": {
                    "color": "#3399cc"
                },
                "handler": function (response) {
                    console.log(response);
                    axios.post('http://localhost:5739/purchase/updatetransactionstatus', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, { headers: { "Authorization": token } }).then(() => {
                        const paynotice = document.createElement('p');
                        paynotice.innerHTML = '<h3 style="color:green;"><i><ins>TRANSACTION SUCCESSFUL! You are a Premium User Now !</ins></i></h3>';
                        document.getElementById('dailyexpensesnotice').appendChild(paynotice);
                        setTimeout(() => {
                            paynotice.remove();
                            window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_home_premium.html");
                        }, 3000);
                    }).catch(() => {
                        alert('Something went wrong. Try Again!!!');
                        const paynotice = document.createElement('p');
                        paynotice.innerHTML = '<h3 style="color:red;"><i><ins>TRANSACTION FAILED! Try Again </ins></i></h3><button id="buypremium" style="background-color:blue; border:1px black solid; border-radius:5px;color:white;margin-left:370px;z-index:2;">Try Again?</button>';
                        document.getElementById('dailyexpensesnotice').appendChild(paynotice);
                        setTimeout(() => {
                            paynotice.remove();
                        }, 6000);
                    })
                }
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
    
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
        }).catch((err) => {
            console.log(err);
            console.log('Hey error in daily expense');
            const paynotice = document.createElement('p');
            paynotice.innerHTML = '<h3 style="color:red;"><i><ins>TRANSACTION FAILED! Try Again </ins></i></h3><button id="buypremium" style="background-color:blue; border:1px black solid; border-radius:5px;color:white;margin-left:370px;z-index:2;">Try Again?</button>';
            document.getElementById('dailyexpensesnotice').appendChild(paynotice);
            setTimeout(() => {
                paynotice.remove();
            }, 6000);
        })
    } catch (err) {
        console.log(err);
        const paynotice = document.createElement('p');
        paynotice.innerHTML = '<h3 style="color:red;"><i><ins>TRANSACTION FAILED! Try Again </ins></i></h3><button id="buypremium" style="background-color:blue; border:1px black solid; border-radius:5px;color:white;margin-left:370px;z-index:2;">Try Again?</button>';
        document.getElementById('dailyexpensesnotice').appendChild(paynotice);
        setTimeout(() => {
            paynotice.remove();
        }, 6000);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:5739/domDailyExpenses', { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        newArr = response.data;
        page = 1;
        document.getElementById('rowsNo').value=localStorage.getItem('itemsPerPage2');
        ITEMS_PER_PAGE=parseFloat(localStorage.getItem('itemsPerPage2'));
        printOnScreen(newArr, parentEle, ITEMS_PER_PAGE, page);
        displayPagination(newArr, pageEle, ITEMS_PER_PAGE);
    }).catch((err) => console.log(err));
});

function printOnScreen(newArr, parentEle, ITEMS_PER_PAGE, page) {
    childEle.innerHTML="";
    if(ITEMS_PER_PAGE==5){
        count=(page*5)-4;
    }else if(ITEMS_PER_PAGE==10){
      count=(page*10)-9;
    }else if(ITEMS_PER_PAGE==15){
        count=(page*15)-14; 
    }else{
        count=(page*20)-19;
    }
    let start = ITEMS_PER_PAGE * (page - 1);
    console.log(start);
    let end = start + ITEMS_PER_PAGE;
    console.log(end);
    let paginatedExpense = newArr.slice(start, end);
    console.log(paginatedExpense);
    for (let i = 0; i < paginatedExpense.length; i++) {
        let dat = new Date(paginatedExpense[i].dateOfExpense);
        let yourDateOfExpense = dat.toDateString();
        childEle.innerHTML = childEle.innerHTML + `<h6><b><pre><span style="margin-left:175px;position:relative;"><b style="font-family: Arial, Helvetica, sans-serif;"><i>${count}.</i></b>    <b><i>${yourDateOfExpense}</i></b>          <b><i>₹${paginatedExpense[i].expenseAmount}/-</i></b>                <b><i>${paginatedExpense[i].description}</i></b>                                       <b><i>${paginatedExpense[i].categoryDetail}</i></b></span></pre></b></h6>.`
        parentEle.appendChild(childEle);
        count=count+1;
    };
};

function displayPagination(newArr, pageEle, ITEMS_PER_PAGE) {
    pageEle.innerHTML="";
    let page_count = Math.ceil(newArr.length / ITEMS_PER_PAGE);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = createPageBtn(i, newArr);
        pageEle.appendChild(btn);
    };
}

function createPageBtn(pages, newArr) {
    let btnEle = document.createElement('button');
    btnEle.innerText = pages;
    if (page == pages) {
        btnEle.classList.add('activ');
    }
    btnEle.classList.add('btnPage');
    btnEle.addEventListener('click', function () {
        page=parseFloat(btnEle.innerText);
        let current_btn = document.getElementsByClassName('activ');
        current_btn[0].classList.remove('activ');
        btnEle.classList.add('activ');
        printOnScreen(newArr, parentEle, ITEMS_PER_PAGE, page);
    });
    return btnEle;
}
document.getElementById('subRowsNo').addEventListener('click', ()=>{
    rows_per_page=document.getElementById('rowsNo').value;
    localStorage.setItem('itemsPerPage2', rows_per_page);
    ITEMS_PER_PAGE=parseFloat(rows_per_page);
    location.reload();
});



