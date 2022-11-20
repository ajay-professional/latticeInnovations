const formDet=document.getElementById('formId');
formDet.addEventListener("submit", (e)=>{
    e.preventDefault();
    let name2=e.target.name2.value;
    let email2=e.target.email2.value;
    let phone2=e.target.phone2.value;
    let pwd2=e.target.pwd.value;
    let obj2={
        name2,
        email2,
        phone2,
        pwd2
    };
    //console.log(obj2);
    axios.post('http://localhost:9898/addSignUpData', obj2).then((response) => {
        console.log(response);
        console.log('Successfully added signup details');
        // let parEle = document.getElementById('signupnotice');
        // let childEle = document.createElement('p');
        // childEle.innerHTML = '<h3 style="color:green;"><i><ins>Successfully added signup details. Loading to login page....</ins></i></h3>';
        // parEle.appendChild(childEle);
        // setTimeout(() => {
        //     childEle.remove();
        //     window.location.replace("file:///C:/Users/gulshan/Desktop/Expense%20Tracker%20Views/expt_login.html");
        // }, 3000);
        location.href="file:///C:/Users/gulshan/Desktop/sqView/logIn.html";
    }).catch(err => {
        console.log(err);
        console.log('Failed to add signup details');
    });
});
