document.addEventListener('DOMContentLoaded', function () {
    const userId = document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");
    fetchUserData();
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data;
            let userData = null;
            for (const userKey in users) {
                const user = users[userKey];
                if (user.cookie === parseInt(userId)) {
                    userData = user;
                    break;
                }
            }
            document.getElementById('editForm').addEventListener('submit', function (event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                updateUserData(formData, userData, users, userId);
            })
        });
});

const fetchUserData = () => {
    // Fetch user data based on the user-id cookie
    const userId = document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");

    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const users = data;
            let userData = null;
            for (const userKey in users) {
                const user = users[userKey];
                if (user.cookie === parseInt(userId)) {
                    userData = user;
                    break;
                }
            }

            // Check if the user with the given ID exists
            if (userData) {
                // Pre-fill form fields with current user data
                document.getElementById('username').value = userData.profile.username;
                document.getElementById('bio').value = userData.profile.bio;
                document.getElementById('budget').value = userData.profile.budget;
            } else {
                console.error('User not found for userId:', userId);
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
};

const updateUserData = (formData, userData, users, id) => {
    const username = Object.keys(users)[id];

    const updatedUser = {
        ...users,
        [username]: {
            ...userData,
            profile: {
                ...userData.profile,
                username: formData.get('username'),
                bio: formData.get('bio'),
                budget: parseFloat(formData.get('budget')),
            }
        }
    };

    fetch('http://localhost:3000/users', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = './index.html';
        })
        .catch(error => console.error('Error updating user data:', error));
};
