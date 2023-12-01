function tagExpense() {
    const expenseInput = document.getElementById('expenseInput').value;
    const expenseCost = document.getElementById('expenseCost').value;
    const taggedExpenses = document.getElementById('taggedExpenses');

    if (expenseInput.trim() !== '' && expenseCost.trim() !== '') {
        const formattedExpense = `🏷️${expenseInput} - $${parseFloat(expenseCost).toFixed(2)}`;

        const taggedExpense = document.createElement('div');
        taggedExpense.className = 'taggedExpense';
        taggedExpense.textContent = formattedExpense;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function (event) {
            event.preventDefault();
            removeExpense(taggedExpense, expenseInput);
        };

        taggedExpenses.appendChild(taggedExpense);
        taggedExpenses.appendChild(removeButton);

        updateExpenseInJSON(expenseInput, parseFloat(expenseCost));

        document.getElementById('expenseInput').value = '';
        document.getElementById('expenseCost').value = '';
    } else {
        alert('Please enter both expense name and cost.');
    }
}

function updateExpenseInJSON(expenseName, expenseCost) {
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data;
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");

            let userData = null;
            for (const userKey in users) {
                const user = users[userKey];
                if (user.cookie === parseInt(userId)) {
                    userData = user;
                    break;
                }
            }

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
                        console.log('Expense added to JSON:', data);
                    })
                    .catch(error => console.error('Error updating user data:', error));
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}

function removeExpense(taggedExpense, expenseName) {
    fetch('http://localhost:3000/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            var users = data;
            const userId = document.cookie.replace(/(?:(?:^|.*;\s*)user-id\s*=\s*([^;]*).*$)|^.*$/, "$1");

            let userData = null;
            for (const userKey in users) {
                const user = users[userKey];
                if (user.cookie === parseInt(userId)) {
                    userData = user;
                    break;
                }
            }

            if (userData && userData.budget && userData.budget.expenses) {
                const expenses = userData.budget.expenses;

                // Display user's expenses for selection
                const expenseList = Object.keys(expenses).join('\n');
                const selection = prompt(`Select an expense to remove:\n${expenseList}`);

                if (selection !== null && expenses.hasOwnProperty(selection)) {
                    // Remove the selected expense from the user's JSON data
                    delete userData.budget.expenses[selection];

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
                            console.log('Expense removed from JSON:', data);

                            // Remove the expense and button from the UI
                            taggedExpense.parentNode.removeChild(taggedExpense);
                            taggedExpense.nextSibling.parentNode.removeChild(taggedExpense.nextSibling);
                        })
                        .catch(error => console.error('Error updating user data:', error));
                }
            }
        })
        .catch(error => console.error('Error fetching or parsing user data:', error));
}
