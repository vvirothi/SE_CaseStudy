// Initialize Firebase Database
const database = firebase.database();

let currentUser = null;

function signUp() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    if (username && password) {
        database.ref('users/' + username).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                displayOutput("Username already exists. Please choose a different one.");
            } else {
                database.ref('users/' + username).set({
                    password: password,
                    passwords: {}
                }).then(() => {
                    displayOutput(`Sign-up successful for ${username}!`);
                    goToHomepage();
                }).catch((error) => {
                    displayOutput("Error signing up: " + error.message);
                });
            }
        });
    } else {
        displayOutput("Please enter both username and password.");
    }
    clearFields(['new-username', 'new-password']);
}

function signIn() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    database.ref('users/' + username).once('value').then((snapshot) => {
        if (snapshot.exists() && snapshot.val().password === password) {
            currentUser = username;
            document.querySelector('#user-page h2').innerHTML = `Welcome, <strong>${username}</strong>!`;
            showUserPage();
        } else {
            displayOutput("Invalid credentials!");
        }
    }).catch((error) => {
        displayOutput("Error signing in: " + error.message);
    });
    clearFields(['username', 'password']);
}

function saveInsertPassword() {
    const name = document.getElementById('password-name').value.trim();
    const password = document.getElementById('password-value').value;
    if (name && password) {
        database.ref(`users/${currentUser}/passwords/${name}`).set(password)
        .then(() => {
            displayOutput(`Password saved for <strong>${name}</strong>!`);
            clearFields(['password-name', 'password-value']);
        })
        .catch((error) => {
            displayOutput("Error saving password: " + error.message);
        });
    } else {
        displayOutput("Please enter both name and password.");
    }
}

function selectPassword() {
    const name = document.getElementById('select-password-name').value.trim();
    database.ref(`users/${currentUser}/passwords/${name}`).once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            displayOutput(`<strong>${name}:</strong> ${snapshot.val()}`);
        } else {
            displayOutput("Name not found.");
        }
    })
    .catch((error) => {
        displayOutput("Error retrieving password: " + error.message);
    });
    clearFields(['select-password-name']);
}

function selectAllPasswords() {
    database.ref(`users/${currentUser}/passwords`).once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            let output = "<strong>Your saved passwords:</strong><br>";
            snapshot.forEach((childSnapshot) => {
                output += `<strong>${childSnapshot.key}:</strong> ${childSnapshot.val()}<br>`;
            });
            displayOutput(output);
        } else {
            displayOutput("You haven't saved any passwords yet.");
        }
    })
    .catch((error) => {
        displayOutput("Error retrieving passwords: " + error.message);
    });
}

function updatePassword() {
    const name = document.getElementById('update-password-name').value.trim();
    const newPassword = document.getElementById('update-password-value').value;
    database.ref(`users/${currentUser}/passwords/${name}`).set(newPassword)
    .then(() => {
        displayOutput(`Password updated for <strong>${name}</strong>!`);
        clearFields(['update-password-name', 'update-password-value']);
    })
    .catch((error) => {
        displayOutput("Error updating password: " + error.message);
    });
}

function deletePassword() {
    const name = document.getElementById('delete-password-name').value.trim();
    database.ref(`users/${currentUser}/passwords/${name}`).remove()
    .then(() => {
        displayOutput(`Password deleted for <strong>${name}</strong>!`);
        clearFields(['delete-password-name']);
    })
    .catch((error) => {
        displayOutput("Error deleting password: " + error.message);
    });
}

function deleteAllPasswords() {
    database.ref(`users/${currentUser}/passwords`).remove()
    .then(() => {
        displayOutput("All passwords deleted!");
    })
    .catch((error) => {
        displayOutput("Error deleting passwords: " + error.message);
    });
}

// The rest of your functions (showElement, hideElement, etc.) can remain the same
