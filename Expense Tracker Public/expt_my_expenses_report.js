const token = sessionStorage.getItem('token');
const user = localStorage.getItem('user');
const logoutbtn = document.getElementById('logoutFrom');
let yearDig;
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:5739/monthlyUserExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        let parentEle = document.getElementById('monthlyExpBoard');
        let childEle = document.createElement('ol');
        let newArr = response.data;
        console.log(newArr);
        let user2 = JSON.parse(user);
        console.log(user2.email);
        //console.log(newArr[0].signupEmail);
        for(let i=0; i<newArr.length;i++){
            childEle.innerHTML = childEle.innerHTML + `<h4><li style="position:fixed;margin-left:60px;"><pre>      <b><i>₹${newArr[i].finalMonthlyExpense}/-</i></b>                                <b><i>${newArr[i].monthName}</i></b>                               <b><i>${newArr[i].yearDigit}</i></b></pre></li></h4>.`
        }
        yearDig=newArr[newArr.length-1].yearDigit;
        console.log(childEle.innerHTML);
        parentEle.appendChild(childEle);
    }).catch((err) => console.log(err));

    
    axios.get("http://localhost:5739/domTotalExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        let parentEle = document.getElementById('yearlyExpBoard');
        let childEle = document.createElement('ol');
        let newArr = response.data;
        console.log(newArr);
        let user2 = JSON.parse(user);
        console.log(user2.email);
        //console.log(newArr[0].signupEmail);
        for(let i=0; i<newArr.length;i++){
            childEle.innerHTML = childEle.innerHTML + `<h4><li style="position:fixed;margin-left:60px;"><pre>        <b><i>₹${newArr[i].totalexpense}/-</i></b>                                                                      <b><i>${yearDig}</i></b></pre></li></h4>.`
        }
        parentEle.appendChild(childEle);
    }).catch((err) => console.log(err));
});
