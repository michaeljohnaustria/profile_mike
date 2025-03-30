// dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Profile dropdown
    const profileSection = document.querySelector('.profile-section');
    if (profileSection) {
        profileSection.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelector('.dropdown-content').classList.toggle('show');
        });
    }

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-content');
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    });

    // Quiz buttons
    document.querySelectorAll('.quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const course = this.closest('.course-card').getAttribute('data-course');
            window.location.href = `quiz.html?course=${course}`;
        });
    });

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            clearCurrentUser();
            window.location.href = 'index.html';
        });
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Settings functionality would go here');
        });
    }

    // Display user data
    const currentUser = getCurrentUser();
    if (currentUser) {
        const usernameElements = document.querySelectorAll('.username, #usernameDisplay');
        usernameElements.forEach(el => {
            el.textContent = currentUser.username;
        });

        // Load quiz results
        if (currentUser.quizResults) {
            for (const [course, result] of Object.entries(currentUser.quizResults)) {
                const resultElement = document.getElementById(`${course}-result`);
                if (resultElement) {
                    resultElement.textContent = `Your best: ${result.score}%`;
                }
            }
        }
    } else {
        window.location.href = 'index.html';
    }
});