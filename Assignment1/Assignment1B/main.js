function DisplayData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let html = ` <center>
    <table border='2px'>
        <thead>
            <tr>
                <th>
                    Username
                </th>
                <th>
                    Password
                </th>
            </tr>
        </thead>
        <tbody>
    `;
    users.forEach(element => {
        html += `
            <tr>
                <td>${element?.username}</td>
                <td>${element?.password}</td>
            </tr>
        `
    })

    html += '</tbody> </table></center>';

    const w = open()
    w.document.body.innerHTML = html;
}

function addAndDisplayData(data) {
    let arr = JSON.parse(localStorage.getItem('users')) || []; // if array not present in localStorage then take empty array
    arr.unshift(data); // add element at the start of array
    localStorage.setItem('users', JSON.stringify(arr));
    DisplayData();
}

document.forms.registrationForm.addEventListener("Login", formSubmit)

function formSubmit(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let postObj = { username, password };

    $.ajax({
        type: 'POST',
        url: 'https://jsonplaceholder.typicode.com/users',
        data: JSON.stringify(postObj),
        contentType: "application/json",

        success: function (newUser) {
            addAndDisplayData(postObj)
        },
        error: function (error) {
            console.log(error)
            addAndDisplayData(postObj)
        }
    });

}