// storage.js
const USERS_KEY = 'learnhub_users';
const CURRENT_USER_KEY = 'learnhub_current_user';

function getUsers() {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
}

function saveUser(user) {
    const users = getUsers();
    const existingUser = users.find(u => u.email === user.email);
    
    if (existingUser) return false;
    
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
}

function validateUser(email, password) {
    const users = getUsers();
    return users.find(user => user.email === email && user.password === password);
}

function getCurrentUser() {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

function updateUser(updatedUser) {
    const users = getUsers();
    const index = users.findIndex(u => u.email === updatedUser.email);
    
    if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    }
    
    return false;
}