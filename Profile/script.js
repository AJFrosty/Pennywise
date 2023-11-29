const fetchUserData = () => {
    const userId = document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");
    console.log('userId:', userId);

    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data;
            console.log('users:', data.users);

            let userData = null;
            for (const userKey in users) {
                const user = users[userKey];
                if (user.cookie === parseInt(userId)) {
                    userData = user;
                    break;
                }
            }

            if (userData) {
                updateProfilePage(userData);
            } else {
                console.error('User not found for userId:', userId);
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
};

const updateProfilePage = (userData) => {
    // PROFILE
    const usernameElement = document.querySelector('.username');
    const pageTitleElement = document.querySelector('.page-title');
    usernameElement.textContent = userData.profile.username;
    pageTitleElement.textContent = userData.role;

    // BIO
    const bioTextElement = document.querySelector('.bio-text');
    bioTextElement.textContent = userData.profile.bio;

    // DATA
    const savedValueElement = document.querySelector('.value.saved');
    const spentValueElement = document.querySelector('.value.spent');
    const budgetValueElement = document.querySelector('.value.budget');
    savedValueElement.textContent = `$${userData.profile.saved.toFixed(2)}`;
    spentValueElement.textContent = `$${userData.profile.spent.toFixed(2)}`;
    budgetValueElement.textContent = `$${userData.profile.budget.toFixed(2)}`;
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('editButton').addEventListener('click', function () {
        window.location.href = './edit.html';
    });
});

fetchUserData();