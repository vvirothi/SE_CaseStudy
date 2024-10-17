const users = {
    "devs": { password: "2004", passwords: {} }
}; 
let currentUser = null;

function showElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove('hidden');
    }
}

function hideElement(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.add('hidden');
    }
}

function showDisplayBox() {
    showElement('output-box');
}

function hideDisplayBox() {
    hideElement('output-box');
    const outputBox = document.getElementById('output-box');
    if (outputBox) {
        outputBox.innerHTML = ""; // Clear content
    }
}

function showSignUp() {
    hideElement('homepage');
    showElement('signup-form');
    hideDisplayBox();
}

function showSignIn() {
    hideElement('homepage');
    showElement('signin-form');
    hideDisplayBox();
}

function signUp() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    if (username && password) {
        if (users[username]) {
            displayOutput("Username already exists. Please choose a different one.");
        } else {
            users[username] = { password, passwords: {} };
            displayOutput(`Sign-up successful for ${username}!`);
            goToHomepage();
        }
    } else {
        displayOutput("Please enter both username and password.");
    }
    clearFields(['new-username', 'new-password']);
}

function signIn() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.querySelector('#user-page h2').innerHTML = `Welcome, <strong>${username}</strong>!`;
        showUserPage();
    } else {
        displayOutput("Invalid credentials!");
    }
    clearFields(['username', 'password']);
}

function showUserPage() {
    hideElement('signin-form');
    showElement('user-page');
    hideDisplayBox();
}

function showInsertPassword() {
    hideElement('user-page');
    showElement('insert-password-section');
    hideDisplayBox();
}

function showSelectPassword() {
    hideElement('user-page');
    showElement('select-password-section');
    hideDisplayBox();
}

function showUpdatePassword() {
    hideElement('user-page');
    showElement('update-password-section');
    hideDisplayBox();
}

function showDeletePassword() {
    hideElement('user-page');
    showElement('delete-password-section');
    hideDisplayBox();
}

function goToUserPage() {
    ['insert-password-section', 'select-password-section', 'update-password-section', 'delete-password-section'].forEach(hideElement);
    showElement('user-page');
    hideDisplayBox();
}

function saveInsertPassword() {
    const name = document.getElementById('password-name').value.trim();
    const password = document.getElementById('password-value').value;
    if (name && password) {
        users[currentUser].passwords[name] = password;
        displayOutput(`Password saved for <strong>${name}</strong>!`);
        clearFields(['password-name', 'password-value']);
    } else {
        displayOutput("Please enter both name and password.");
    }
}

function selectPassword() {
    const name = document.getElementById('select-password-name').value.trim();
    const password = users[currentUser].passwords[name];
    if (password) {
        displayOutput(`<strong>${name}:</strong> ${password}`);
    } else {
        displayOutput("Name not found.");
    }
    clearFields(['select-password-name']);
}

function selectAllPasswords() {
    const passwords = users[currentUser].passwords;
    if (Object.keys(passwords).length === 0) {
        displayOutput("You haven't saved any passwords yet.");
    } else {
        let output = "<strong>Your saved passwords:</strong><br>";
        for (const [name, password] of Object.entries(passwords)) {
            output += `<strong>${name}:</strong> ${password}<br>`;
        }
        displayOutput(output);
    }
}

function updatePassword() {
    const name = document.getElementById('update-password-name').value.trim();
    const newPassword = document.getElementById('update-password-value').value;
    if (users[currentUser].passwords[name]) {
        users[currentUser].passwords[name] = newPassword;
        displayOutput(`Password updated for <strong>${name}</strong>!`);
        clearFields(['update-password-name', 'update-password-value']);
    } else {
        displayOutput("Name not found.");
    }
}

function deletePassword() {
    const name = document.getElementById('delete-password-name').value.trim();
    if (users[currentUser].passwords[name]) {
        delete users[currentUser].passwords[name];
        displayOutput(`Password deleted for <strong>${name}</strong>!`);
        clearFields(['delete-password-name']);
    } else {
        displayOutput("Name not found.");
    }
}

function deleteAllPasswords() {
    users[currentUser].passwords = {};
    displayOutput("All passwords deleted!");
}

function goToHomepage() {
    ['signup-form', 'signin-form', 'user-page'].forEach(hideElement);
    showElement('homepage');
    currentUser = null;
    hideDisplayBox();
}

function displayOutput(message) {
    const outputBox = document.getElementById('output-box');
    if (outputBox) {
        outputBox.innerHTML = `<p id="output-message">${message}</p>`;
    }
    showDisplayBox();
}

function clearFields(fieldIds) {
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.value = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('show-signup-btn').addEventListener('click', showSignUp);
    document.getElementById('show-signin-btn').addEventListener('click', showSignIn);
    document.getElementById('signup-btn').addEventListener('click', signUp);
    document.getElementById('signin-btn').addEventListener('click', signIn);
    document.getElementById('save-insert-password-btn').addEventListener('click', saveInsertPassword);
    document.getElementById('select-password-btn').addEventListener('click', selectPassword);
    document.getElementById('select-all-passwords-btn').addEventListener('click', selectAllPasswords);
    document.getElementById('update-password-btn').addEventListener('click', updatePassword);
    document.getElementById('delete-password-btn').addEventListener('click', deletePassword);
    document.getElementById('delete-all-passwords-btn').addEventListener('click', deleteAllPasswords);
    document.getElementById('show-insert-password-btn').addEventListener('click', showInsertPassword);
    document.getElementById('show-select-password-btn').addEventListener('click', showSelectPassword);
    document.getElementById('show-update-password-btn').addEventListener('click', showUpdatePassword);
    document.getElementById('show-delete-password-btn').addEventListener('click', showDeletePassword);

    document.querySelectorAll('.go-home-btn').forEach(button => button.addEventListener('click', goToHomepage));
    document.querySelectorAll('.go-user-page-btn').forEach(button => button.addEventListener('click', goToUserPage));
});
