// auth.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const showRegister = document.getElementById('showRegister');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const user = validateUser(email, password);
            
            if (user) {
                setCurrentUser(user);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Registration functionality would go here');
        });
    }

    // Redirect to dashboard if already logged in
    if (getCurrentUser() && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
    }
});