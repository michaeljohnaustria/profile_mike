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

    // Quiz buttons
    document.querySelectorAll('.quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const course = this.closest('.course-card').getAttribute('data-course');
            window.location.href = `quiz.html?course=${course}`;
        });
    });

});