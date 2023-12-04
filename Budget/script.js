//Runs the Function TO Get this Operation Running!
document.addEventListener('DOMContentLoaded', function () {
    fetchUserExpenses();
});

//Get All the Expenses from the Users.json file
function fetchUserExpenses() {
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userId = getUserIdFromCookie();
            const userData = findUserDataById(data, userId);

            if (userData && userData.budget && userData.budget.expenses) {
                displayUserExpenses(userData.budget.expenses);
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}

//Based on User Cookie(Logged In User) it'll say which user we should focus on
function getUserIdFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");
}

//Find the user that's logged in cookie from the JSON file
function findUserDataById(users, userId) {
    for (const userKey in users) {
        const user = users[userKey];
        if (user.cookie === parseInt(userId)) {
            return user;
        }
    }
    return null;
}

//Display the expenses for the logged in user on the site
function displayUserExpenses(expenses) {
    const taggedExpenses = document.getElementById('taggedExpenses');
    taggedExpenses.innerHTML = ''; // Clear existing content

    for (const expenseName in expenses) {
        const formattedExpense = `🏷️${expenseName} - $${parseFloat(expenses[expenseName]).toFixed(2)}`;
        const expenseDiv = createExpenseDiv(formattedExpense);
        const removeButton = createRemoveButton(expenseName, expenseDiv);

        taggedExpenses.appendChild(expenseDiv);
        taggedExpenses.appendChild(removeButton);
    }
}

//Creates a div tag to put expenses
function createExpenseDiv(content) {
    const expenseDiv = document.createElement('div');
    expenseDiv.className = 'taggedExpense';
    expenseDiv.textContent = content;
    return expenseDiv;
}

//Makes a remove button if the there's an expense that the user might want to get rid of
function createRemoveButton(expenseName, expenseDiv) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        removeExpenseFromUI(expenseName, expenseDiv);
    };
    return removeButton;
}

//If you delete the expense then remove the button!
function removeExpenseFromUI(expenseName, expenseDiv) {
    if (confirm(`Are you sure you want to remove the expense "${expenseName}"?`)) {
        expenseDiv.parentNode.removeChild(expenseDiv);
        removeExpenseFromJSON(expenseName);
    }
}

//Remove the actual expense from the JSON user data
function removeExpenseFromJSON(expenseName) {
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userId = getUserIdFromCookie();
            const userData = findUserDataById(data, userId);

            if (userData && userData.budget && userData.budget.expenses) {
                delete userData.budget.expenses[expenseName];

                fetch(`http://localhost:3000/users`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Expense removed from JSON:', data);
                    })
                    .catch(error => console.error('Error updating user data:', error));
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}

//Tag the expense that was added on to the site
function tagExpense() {
    const expenseInput = document.getElementById('expenseInput').value;
    const expenseCost = document.getElementById('expenseCost').value;

    if (expenseInput.trim() !== '' && expenseCost.trim() !== '') {
        const formattedExpense = `🏷️${expenseInput} - $${parseFloat(expenseCost).toFixed(2)}`;
        const taggedExpense = createExpenseDiv(formattedExpense);
        const removeButton = createRemoveButton(expenseInput, taggedExpense);

        const taggedExpenses = document.getElementById('taggedExpenses');
        taggedExpenses.appendChild(taggedExpense);
        taggedExpenses.appendChild(removeButton);

        updateExpenseInJSON(expenseInput, parseFloat(expenseCost));

        // Clear input fields after tagging
        document.getElementById('expenseInput').value = '';
        document.getElementById('expenseCost').value = '';
    } else {
        alert('Please enter both expense name and cost.');
    }
}

//Add that expense into the JSON file after adding to the site
function updateExpenseInJSON(expenseName, expenseCost) {
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const userId = getUserIdFromCookie();
            const userData = findUserDataById(data, userId);

            if (userData && userData.budget && userData.budget.expenses) {
                userData.budget.expenses[expenseName] = expenseCost;

                // Update the JSON on the server
                fetch(`http://localhost:3000/users`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Expense added to JSON:', data);
                    })
                    .catch(error => console.error('Error updating user data:', error));
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}
