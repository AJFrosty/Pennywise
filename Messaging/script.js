const users = ['Charles', 'Jake', 'Sally'];
let activeUser = null;

const conversations = {
    Charles: [
        { user: 'Charles', message: 'Remember for the new year we are working towards saving 15% of your income!' },
        { user: 'You', message: 'Thank you for the reminder! Also thankyou for your mentorship' },
    ],
    Jake: [
        { user: 'Jake', message: 'There is a new Grocery Store near you that sells 86% of your daily monthly groceries for 12% Less than you usually get them' },
        { user: 'Jake', message: 'I will send you the location in a moment' },
    ],
    Sally: [
        { user: 'Sally', message: 'How are things going? Remember to treat yourself since you saved $213.00 more than you anticipated for 2023!' },
        { user: 'You', message: 'Everything is fine, and will do!' },
    ],
};

document.addEventListener('DOMContentLoaded', displayUsers);

function displayUsers() {
    const userListContainer = document.getElementById('userList');
    users.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.className = 'user';
        userElement.textContent = user;
        userElement.addEventListener('click', () => setActiveUser(user));
        userListContainer.appendChild(userElement);
    });

    // Set the first user as active by default
    setActiveUser(users[0]);
}

function setActiveUser(user) {
    activeUser = user;
    displayConversation();
}

function displayConversation() {
    const conversationContainer = document.getElementById('conversation');
    conversationContainer.innerHTML = '';

    const conversation = conversations[activeUser];
    conversation.forEach((msg) => {
        const messageElement = document.createElement('div');
        messageElement.className = msg.user === 'You' ? 'sent' : 'received';
        messageElement.innerHTML = `<div class="message-bubble">${msg.message}</div>`;
        conversationContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the conversation
    conversationContainer.scrollTop = conversationContainer.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        const conversation = conversations[activeUser];
        conversation.push({ user: 'You', message });

        displayConversation();

        // Clear input
        messageInput.value = '';
    }
}
