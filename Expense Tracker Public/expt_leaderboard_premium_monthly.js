const token = sessionStorage.getItem('token');
const user=localStorage.getItem('user');
const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
let monthName;
window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:5739/leaderboardMonthlyExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        let parentEle = document.getElementById('leaderboard');
        let childEle = document.createElement('ol');
        let newArr=response.data.sort((a, b)=>{
            return a.finalMonthlyExpense-b.finalMonthlyExpense;

        });
        console.log(newArr);
        let user2=JSON.parse(user);
        console.log(user2.email);
        for (let i = 0; i < newArr.length; i++) {
            if(user2.email===newArr[i].signupEmail){
                childEle.innerHTML = childEle.innerHTML + `<h4><li><pre style="background:rgb(68, 171, 211);width:725px;"><b><i>${newArr[i].username}</i></b>                                         <b><i>₹${newArr[i].finalMonthlyExpense}/-</i></b></pre></li></h4>.`
            }
            else{
                childEle.innerHTML = childEle.innerHTML + `<h4><li><pre><b><i>${newArr[i].username}</i></b>                                           <b><i>₹${newArr[i].finalMonthlyExpense}/-</i></b></pre></li></h4>.`
            }
        }
        // let dd=new Date();
        // let ddmonth=dd.getMonth()+1;
        // switch (ddmonth){
        //     case 1:
        //         monthName = "January";
        //         break;
        //     case 2:
        //         monthName = "February";
        //         break;
        //     case 3:
        //         monthName = "March";
        //         break;
        //     case 4:
        //         monthName = "April";
        //         break;
        //     case 5:
        //         monthName = "May";
        //         break;
        //     case 6:
        //         monthName = "June";
        //         break;
        //     case 7:
        //         monthName = "July";
        //         break;
        //     case 8:
        //         monthName = "August";
        //         break;
        //     case 9:
        //         monthName = "September";
        //         break;
        //     case 10:
        //         monthName = "October";
        //         break;
        //     case 11:
        //         monthName = "November";
        //         break;
        //     case 12:
        //         monthName = "December";
        //         break;
        //     default:
        //         monthName = "Not valid month";
        // };
        document.getElementById('leadmonth').value= newArr[0].monthName;
        console.log(childEle.innerHTML);
        parentEle.appendChild(childEle);
    }).catch((err) => console.log(err));
});