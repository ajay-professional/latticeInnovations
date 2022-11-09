const token = sessionStorage.getItem('token');
const createBtn = document.getElementById('btn-grp-name');
createBtn.addEventListener('click', () => {
  let groupName = document.getElementById('grp-name').value;
  document.getElementById('grp-name').value = "";
  let grObj = {
    groupName
  };
  axios.post('http://localhost:5040/addGroupNameInDatabase', grObj).then((response) => {
    console.log(response.data.name_of_group);
    console.log('Successfully added signup details');
    let parEle = document.getElementById('grp_name');
    parEle.innerHTML = parEle.innerHTML + `<li><button id="${response.data.name_of_group}"><b>${response.data.name_of_group}</b></button></li>`;
    document.getElementById(`${response.data.name_of_group}`).addEventListener('click', () => {
      localStorage.setItem('group_name', `${response.data.name_of_group}`);
      location.href = "file:///C:/Users/gulshan/Desktop/Group%20Chat%20Views/gchat_groupUI.html";
    });
  }).catch(err => {
    console.log(err);
    console.log('Failed to add signup details');
  });
});

window.addEventListener('DOMContentLoaded', () => {
  axios.get('http://localhost:5040/groupChatDOM', { headers: { "Authorization": token } }).then((response) => {
    console.log(response);
    console.log('Successfully added signup details');
    let parEle = document.getElementById('grp_name');
    for (let i = 0; i < response.data.length; i++) {
      parEle.innerHTML = parEle.innerHTML + `<li><button id="${response.data[i].name_of_group}"><b>${response.data[i].name_of_group}</b></button></li>`;
      document.getElementById(`${response.data[i].name_of_group}`).addEventListener('click', () => {
        location.href = "file:///C:/Users/gulshan/Desktop/Group%20Chat%20Views/gchat_groupUI.html";
      });
    };
  }).catch(err => {
    console.log(err);
    console.log('Failed to add signup details');
  });
});