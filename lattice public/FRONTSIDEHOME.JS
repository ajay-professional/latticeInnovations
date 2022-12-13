const logoutbtn = document.getElementById('logoutFrom');
logoutbtn.addEventListener('click', () => {
    window.location.replace("file:///C:/Users/gulshan/Desktop/ajay-documents/lattice%20views/frontsidelogin.html");
});
const fetchBtn1 = document.getElementById('detHosp1');
fetchBtn1.addEventListener("click", (e) => {
    axios.get('http://localhost:6611/hospDetail/1').then((response) => {
        document.body.innerHTML = document.body.innerHTML + `<pre><h4>Hospital Name:  ${response.data.hosp_name} , Total Psychiatrist Count:   ${response.data.psych_totalCount} , Total Patients Count:   ${response.data.pat_totalCount}</h4></pre>`;
        console.log(response.data);
        axios.get('http://localhost:6611/psychDetail/1').then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                document.body.innerHTML = document.body.innerHTML + `<pre><h4>Id:  ${response.data[i].psych_id} ,Psychiatrist Name:   ${response.data[i].psych_name} , Patients Count:   ${response.data[i].pat_count}</h4></pre>`;
            }
        }).catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        });
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});

const fetchBtn2 = document.getElementById('detHosp2');
fetchBtn2.addEventListener("click", (e) => {
    axios.get('http://localhost:6611/hospDetail/2').then((response) => {
        document.body.innerHTML = document.body.innerHTML + `<pre><h4>Hospital Name:  ${response.data.hosp_name} , Total Psychiatrist Count:   ${response.data.psych_totalCount} , Total Patients Count:   ${response.data.pat_totalCount}</h4></pre>`;
        console.log(response.data);
        axios.get('http://localhost:6611/psychDetail/2').then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                document.body.innerHTML = document.body.innerHTML + `<pre><h4>Id:  ${response.data[i].psych_id} ,Psychiatrist Name:   ${response.data[i].psych_name} , Patients Count:   ${response.data[i].pat_count}</h4></pre>`;
            }
        }).catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        });
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});

const fetchBtn3 = document.getElementById('detHosp3');
fetchBtn3.addEventListener("click", (e) => {
    axios.get('http://localhost:6611/hospDetail/3').then((response) => {
        document.body.innerHTML = document.body.innerHTML + `<pre><h4>Hospital Name:  ${response.data.hosp_name} , Total Psychiatrist Count:   ${response.data.psych_totalCount} , Total Patients Count:   ${response.data.pat_totalCount}</h4></pre>`;
        console.log(response.data);
        axios.get('http://localhost:6611/psychDetail/3').then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                document.body.innerHTML = document.body.innerHTML + `<pre><h4>Id:  ${response.data[i].psych_id} ,Psychiatrist Name:   ${response.data[i].psych_name} , Patients Count:   ${response.data[i].pat_count}</h4></pre>`;
            }
        }).catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        });
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});

const fetchBtn4 = document.getElementById('detHosp4');
fetchBtn4.addEventListener("click", (e) => {
    axios.get('http://localhost:6611/hospDetail/4').then((response) => {
        document.body.innerHTML = document.body.innerHTML + `<pre><h4>Hospital Name:  ${response.data.hosp_name} , Total Psychiatrist Count:   ${response.data.psych_totalCount} , Total Patients Count:   ${response.data.pat_totalCount}</h4></pre>`;
        console.log(response.data);
        axios.get('http://localhost:6611/psychDetail/4').then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                document.body.innerHTML = document.body.innerHTML + `<pre><h4>Id:  ${response.data[i].psych_id} ,Psychiatrist Name:   ${response.data[i].psych_name} , Patients Count:   ${response.data[i].pat_count}</h4></pre>`;
            }
        }).catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        });
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});

const fetchBtn5 = document.getElementById('detHosp5');
fetchBtn5.addEventListener("click", (e) => {
    axios.get('http://localhost:6611/hospDetail/5').then((response) => {
        document.body.innerHTML = document.body.innerHTML + `<pre><h4>Hospital Name:  ${response.data.hosp_name} , Total Psychiatrist Count:   ${response.data.psych_totalCount} , Total Patients Count:   ${response.data.pat_totalCount}</h4></pre>`;
        console.log(response.data);
        axios.get('http://localhost:6611/psychDetail/5').then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                document.body.innerHTML = document.body.innerHTML + `<pre><h4>Id:  ${response.data[i].psych_id} ,Psychiatrist Name:   ${response.data[i].psych_name} , Patients Count:   ${response.data[i].pat_count}</h4></pre>`;
            }
        }).catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
            console.log(err);
        });
    }).catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>";
        console.log(err);
    });
});
