const token = sessionStorage.getItem('token');
const user=localStorage.getItem('user');
const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:5739/leaderboardUserExpenses", { headers: { "Authorization": token } }).then((response) => {
        console.log(response);
        let parentEle = document.getElementById('leaderboard');
        let childEle = document.createElement('ol');
        let newArr=response.data.sort((a, b)=>{
            return a.totalexpense-b.totalexpense;

        });
        console.log(newArr);
        let user2=JSON.parse(user);
        console.log(user2.email);
        for (let i = 0; i < newArr.length; i++) {
            if(user2.email===newArr[i].signupEmail){
                childEle.innerHTML = childEle.innerHTML + `<h4><li><pre style="background:rgb(68, 171, 211);width:725px;"><b><i>${newArr[i].username}</i></b>                                         <b><i>₹${newArr[i].totalexpense}/-</i></b></pre></li></h4>.`
            }
            else{
                childEle.innerHTML = childEle.innerHTML + `<h4><li><pre><b><i>${newArr[i].username}</i></b>                                           <b><i>₹${newArr[i].totalexpense}/-</i></b></pre></li></h4>.`
            }
        }
        console.log(childEle.innerHTML);
        parentEle.appendChild(childEle);
    }).catch((err) => console.log(err));
});