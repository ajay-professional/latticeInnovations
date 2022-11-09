const token = sessionStorage.getItem('token');
const user = localStorage.getItem('user');
const logoutbtn = document.getElementById('logoutFrom');
let yearDig;
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
});
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
        let dd=new Date();
        yearDig=dd.getFullYear();
        for(let i=0; i<newArr.length;i++){
            childEle.innerHTML = childEle.innerHTML + `<h4><li style="position:fixed;margin-left:60px;"><pre>        <b><i>₹${newArr[i].totalexpense}/-</i></b>                                                                      <b><i>${yearDig}</i></b></pre></li></h4>.`
        }
        parentEle.appendChild(childEle);
    }).catch((err) => console.log(err));
});
