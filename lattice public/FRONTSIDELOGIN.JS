const formLogin = document.getElementById('loginForm');
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email2 = e.target.email2.value;
    const password2 = e.target.password2.value;
    const obj2 = {
        email2,
        password2
    }
    axios.post('http://localhost:6611/loginByUser', obj2).then((response) => {
        sessionStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        let parEle = document.getElementById('loginnotice');
        let childEle = document.createElement('p');
        childEle.innerHTML = '<h3 style="color:green;"><i><ins>Successfully added login details!</ins></i></h3>';
        parEle.appendChild(childEle);
        setTimeout(() => {
            childEle.remove();
            window.location.href = "file:///C:/Users/gulshan/Desktop/ajay-documents/lattice%20views/frontsidehome.html";
        }, 3000);
    }).catch(err => {
        console.log(err);
        if (err.response.status === 401) {
            alert("Incorrect password !");
        }
        if (err.response.status === 404) {
            alert("This user is not registered. Please sign up first !");
        }
        console.log('Failed to add login details');
    });
});
