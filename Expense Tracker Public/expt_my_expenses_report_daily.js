const token = sessionStorage.getItem('token');
const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
let page; let newArr;
let ITEMS_PER_PAGE = 10;
let rows_per_page;
let parentEle = document.getElementById('dailyExpBoard');
const pageEle = document.getElementById('pagination');
let childEle = document.createElement('div');
let count=1;
window.addEventListener("DOMContentLoaded", () => {
    axios.get('http://localhost:5739/domDailyExpenses', { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        newArr = response.data;
        page = 1;
        document.getElementById('rowsNo').value=localStorage.getItem('itemsPerPage2');
        ITEMS_PER_PAGE=parseFloat(localStorage.getItem('itemsPerPage2'));
        printOnScreen(newArr, parentEle, ITEMS_PER_PAGE, page);
        displayPagination(newArr, pageEle, ITEMS_PER_PAGE);
        // console.log(newArr);
        // for (let i = 0; i < newArr.length; i++) {
        //     let dat = new Date(newArr[i].dateOfExpense);
        //     let yourDateOfExpense = dat.toDateString();
        //     childEle.innerHTML = childEle.innerHTML + `<h4><li style="margin-left:60px;position:fixed;"><pre><small>    <b><i>${yourDateOfExpense}</i></b>          <b><i>₹${newArr[i].expenseAmount}/-</i></b>                <b><i>${newArr[i].description}</i></b>                                    <b><i>${newArr[i].categoryDetail}</i></b></small></pre></li></h4>.`
        // }
        // parentEle.appendChild(childEle);

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
    // let btnArr = document.getElementsByClassName('btnPage');
    // for (let j = 0; j < btnArr.length; j++) {
    //     btnArr[j].addEventListener('click', function () {
    //         axios.get('http://localhost:5739/domDailyExpenses', { headers: { "Authorization": token } }).then((response) => {
    //             newArr = response.data;
    //             page = parseFloat(btnArr[j].innerText);
    //             printOnScreen(newArr, parentEle, ITEMS_PER_PAGE, page);
    //         }).catch((err) => console.log(err));
    //     });
    // };
    btnEle.addEventListener('click', function () {
        page=parseFloat(btnEle.innerText);
        let current_btn = document.getElementsByClassName('activ');
        // for(let k=0; k<current_btn.length;k++){
        current_btn[0].classList.remove('activ');
        // }
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













