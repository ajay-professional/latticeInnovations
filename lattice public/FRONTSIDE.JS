var forms = document.getElementById("patient_reg");

forms.addEventListener('submit', (e) => {
    e.preventDefault();
    let thename = e.target.thename.value;
    let addr = e.target.addr.value;
    let email2 = e.target.email2.value;
    let tel = e.target.tel.value;
    let pwd = e.target.pwd.value;
    let obj3 = {
        thename,
        addr,
        email2,
        tel,
        pwd
    };
    
    console.log(obj3);
    axios.post('http://localhost:6611/PatientDet', obj3).then((response) => {
        console.log(response);
        document.body.innerHTML = document.body.innerHTML + "<h4>Registration Successful!</h4>";
        setTimeout(() => {
            window.location.href = "file:///C:/Users/gulshan/Desktop/ajay-documents/lattice%20views/frontsidelogin.html";
        }, 3000);
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});