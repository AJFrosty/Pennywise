function registerUser() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // User.Json Information
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            console.log('Fetched users:', users);

            // Does the Username Exist
            if (!users.hasOwnProperty(username)) {

                //New User Gets new ID 
                var userId = Object.keys(users).length;

                // Json Information to add after New user
                var user = {
                    name: name,
                    role: "Guest",
                    email: email,
                    password: password,
                    cookie: userId,
                    profile: {
                        username : username,
                        bio: "New PennyWise User!",
                        budget: 100.00,
                        spent: 0.00,
                        saved: 0.00
                      },
                    budget: {
                        expenses: {
                          Groceries: 0.00,
                          Clothing: 0.00,
                          Cosmetics: 0.00,
                          Technology: 0.00
                        }
                      }
                      
                };

                // Storing New User to add to THe Json File
                var updatedUsers = {
                    ...users,
                    [username]: user
                };

                window.location.href = '../Login/index.html';

                // Actually adding to the Json File
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUsers)
                })
                    .then(response => response.json())
                    .then(result => {
                        // GO To Login Site
                        console.log('Redirecting to login page');
                        window.location.href = "../Login/index.html";

                    })
                    .catch(error => console.error('Error updating user data:', error));
            } else {
                alert('Username already exists. Please choose a different username.');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}