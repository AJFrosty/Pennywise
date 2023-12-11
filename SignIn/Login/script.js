function login() {
    var usernameInput = document.getElementById('username').value;
    var passwordInput = document.getElementById('password').value;

    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data;

            if (users && users.hasOwnProperty(usernameInput)) {
                var userObject = users[usernameInput];
                var userPassword = userObject ? userObject.password : null;

                if (userPassword && userPassword === passwordInput) {
                    document.cookie = `user-id=${userObject.cookie}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure`;
                    window.location.href = "../../Profile/index.html";
                } else {
                    alert('Incorrect password. Please try again.');
                }
            } else {
                alert('Username not found. Please check your username or register.');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Error fetching user data. Please check the console for details.');
        });
}