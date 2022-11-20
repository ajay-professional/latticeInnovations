const formDet2=document.getElementById('formId2');
formDet2.addEventListener("submit", (e)=>{
    e.preventDefault();
    let email2=e.target.email2.value;
    let pwd2=e.target.pwd.value;
    let obj3={
        email2,
        pwd2
    };
    axios.post('http://localhost:9898/addLogInData', obj3).then((response) => {
        sessionStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        console.log(response);
        console.log('Successfully added login details');
        location.href="file:///C:/Users/gulshan/Desktop/sqView/expt_home.html";
    }).catch(err => {
        console.log(err);
        console.log('Failed to add login details');
    });

});