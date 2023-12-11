document.addEventListener('DOMContentLoaded', function () {
    fetchUserExpenses();
});

//User Cookie Number
function getUserIdFromCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");
}

//Which user by cookie number
function findUserDataById(users, userId) {
    for (const userKey in users) {
        const user = users[userKey];
        if (user.cookie === parseInt(userId)) {
            return user;
        }
    }
    return null;
}

function createExpenseDiv(content) {
    const expenseDiv = document.createElement('div');
    expenseDiv.className = 'taggedExpense';
    expenseDiv.textContent = content;
    return expenseDiv;
}

//Display All Expenses by User
function displayUserExpenses(expenses) {
    const taggedExpenses = document.getElementById('taggedExpenses');
    taggedExpenses.innerHTML = ''; 

    for (const expenseName in expenses) {
        const formattedExpense = `🏷️${expenseName} - $${parseFloat(expenses[expenseName]).toFixed(2)}`;
        const expenseDiv = createExpenseDiv(formattedExpense);
        taggedExpenses.appendChild(expenseDiv);
    }
}

//Get All the expenses for the Current user
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

//Update JSON with the new Price Information
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
            let userData = findUserDataById(data, userId);

            if (userData && userData.budget && userData.budget.expenses) {
                userData.budget.expenses[expenseName] = expenseCost;

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
                        console.log('Expense updated in JSON:', data);
                    })
                    .catch(error => console.error('Error updating user data:', error));
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}

//Button Was clicked
function editExpense() {
    const selectedExpense = document.getElementById('expenseDropdown').value;
    const newExpenseCost = document.getElementById('newExpenseCost').value;

    if (selectedExpense && newExpenseCost.trim() !== '') {
        updateExpenseInJSON(selectedExpense, parseFloat(newExpenseCost));
        fetchUserExpenses(); 
    } else {
        alert('Please select an expense and enter a new cost.');
    }
}