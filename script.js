// Simple in-memory storage (will reset on reload)
const users = {};
let currentUser = null;

function showSignUp() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
}

function showSignIn() {
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('signin-form').classList.remove('hidden');
}

function signUp() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    if (username && password) {
        users[username] = { password, passwords: {} };
        alert("Sign-up successful!");
        goToHomepage();
    } else {
        alert("Please enter both username and password.");
    }
}

function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (users[username] && users[username].password === password) {
        currentUser = username;
        showUserPage();
    } else {
        alert("Invalid credentials!");
    }
}

function showUserPage() {
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('user-page').classList.remove('hidden');
}

function showNewPassword() {
    const name = prompt("Enter name for new password:");
    const password = prompt("Enter the password:");
    if (name && password) {
        users[currentUser].passwords[name] = password;
        alert("Password saved!");
    }
}

function showFindPassword() {
    const choice = prompt("Enter 1 to display all passwords, 2 to find a specific password:");
    if (choice === "1") {
        alert(JSON.stringify(users[currentUser].passwords, null, 2));
    } else if (choice === "2") {
        const name = prompt("Enter the name to find:");
        const password = users[currentUser].passwords[name];
        if (password) {
            alert(`Password for ${name}: ${password}`);
        } else {
            alert("Name not found.");
        }
    }
}

function showEditPassword() {
    const name = prompt("Enter name to edit password:");
    if (users[currentUser].passwords[name]) {
        const newPassword = prompt("Enter new password:");
        users[currentUser].passwords[name] = newPassword;
        alert("Password updated!");
    } else {
        alert("Name not found.");
    }
}

function showDeletePassword() {
    const name = prompt("Enter name to delete password:");
    if (users[currentUser].passwords[name]) {
        delete users[currentUser].passwords[name];
        alert("Password deleted!");
    } else {
        alert("Name not found.");
    }
}

function goToHomepage() {
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById('signin-form').classList.add('hidden');
    document.getElementById('user-page').classList.add('hidden');
    document.getElementById('homepage').classList.remove('hidden');
}
