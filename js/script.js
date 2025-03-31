
document.addEventListener('DOMContentLoaded', function() {
    const USERS_KEY = 'learnhub_users';
    const CURRENT_USER_KEY = 'learnhub_current_user';

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function saveUser(user) {
        const users = getUsers();
    
        // Validate input
        if (!user.username || !user.password) {
            alert('Username and password are required.');
            return false;
        }
        var user = {
            username: user.username,
            password: user.password,
            user_bio: null,
            user_image: null
        }
        // Check if the username already exists (case-insensitive)
        const existingUser = users.find(u => u.username.toLowerCase() === user.username.toLowerCase());
        if (existingUser) {
            alert('Username already exists. Please choose a different username.');
            return false;
        }
    
        // Save the new user
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'index.html';
        return true;
    }

    function validateUser(email, password) {
        const users = getUsers();
        return users.find(user => user.username === email && user.password === password);
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

    function resetUser() {
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(USERS_KEY);
    }

    function updateUser(updatedUser) {
        const users = getUsers();
        const userIndex = users.findIndex(user => user.username === updatedUser.username);
        users.forEach(function(user) {
            if (user.username === updatedUser.username) {
                user.user_bio = updatedUser.user_bio;
                user.user_image = updatedUser.user_image;
            }
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        setCurrentUser(updatedUser);
        alert('Profile updated successfully!');
    }

    function registerUser(user) {
        const users = getUsers();
        const existingUser = users.find(u => u.email === user.email);
        
        if (existingUser) {
            if (existingUser.email === user.email) {
                alert('Email already exists');
                return false;
            }
        }
        
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return true;
    }



    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');

    // checking ig loginForm was existed
    if (loginForm) {
        console.log(getUsers());
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const user = validateUser(username, password);
            
            if (user) {
                console.log(user);
                setCurrentUser(user);
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password1 = document.getElementById('password1').value;
            const password2 = document.getElementById('password2').value;
            if (password1 !== password2) {
                alert('Password not match');
                return;
            }
            const user = {
                username: username,
                password: password1
            };

            saveUser(user);
        });
    }

    let btn_settings = document.getElementById('btnSettings');
    if (btn_settings) {
        // i will disable this part
    }

    let btn_logout = document.getElementById('btnLogout');
    if (btn_logout) {
        btn_logout.addEventListener('click', function() {
            clearCurrentUser();
            window.location.href = 'index.html';
        });
    }


    let usernameDisplayClass = document.querySelectorAll('.usernameDisplay');
    if (usernameDisplayClass) {
        const currentUser = getCurrentUser();
        if (currentUser) {
            usernameDisplayClass.forEach(function(el) {
                el.innerText = currentUser.username;
            });
        }
    }
    // check if current user was existed
    const currentUser = getCurrentUser();

    
    // QUIZ DATA STRUCTURE
    function getQuizData() {
        let quizProgress = localStorage.getItem('quizProgress');
        if (quizProgress) {
            quizProgress = JSON.parse(quizProgress);
        } else {
            quizProgress = {};
        }
    }
    getQuizData();

    let count_completed_courses = 0;
    document.querySelectorAll('.course-card').forEach(score => {
        // Get the index of the current course-card
        const number = Array.from(score.parentNode.children).indexOf(score);
        console.log(number - 1);
    
        // Get the data-course attribute
        const course = score.getAttribute('data-course');
        const user = getCurrentUser().username;
    
        // Parse quizProgress from localStorage
        let quizProgress = localStorage.getItem('quizProgress');
        quizProgress = quizProgress ? JSON.parse(quizProgress) : {};
    
        // Get the .quiz-result element inside the current course-card
        let quizResult = score.querySelector('.quiz-result');
        
        
        // Check if quizProgress exists for the user and course
        if (quizProgress[user] && quizProgress[user][course]) {
            const userCourseProgress = quizProgress[user][course];
            count_completed_courses++;
            quizResult.innerText = `Your best: ${(userCourseProgress.score/userCourseProgress.total)*100}%`; // Update the score display
        } else {
            quizResult.innerText = 'No progress yet'; // Default message if no progress exists
        }

        
        let completedCourses = document.getElementById('completedCourses');
        if (completedCourses) {
            completedCourses.innerText = count_completed_courses;
        }

    });

    let settings_section = document.getElementById('frmSettings');
    if (settings_section) {
        // when submit this form
        settings_section.addEventListener('submit', function(e) {
            e.preventDefault();
            // const user_password = document.getElementById('user_password').value;
            const username = localStorage.getItem(CURRENT_USER_KEY).username;
            const user_bio = document.getElementById('user_bio').value;
            const user_image = document.getElementById('user_image').value;
            console.log(user_bio);
            const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
            if (user) {
                // user.password = user_password;
                user.user_bio = user_bio;
                // about user_image to base64
                const reader = new FileReader();
                reader.readAsDataURL(document.getElementById('user_image').files[0]);
                reader.onload = function() {
                    const base64String = reader.result;
                    console.log(base64String);
                    user.user_image = base64String;
                    console.log(user);
                    updateUser(user);
                    setCurrentUser(user);
                    alert('Profile updated successfully!');
                    window.location.href = 'dashboard.html';
                };
            }
        });

    }

    let user_image = document.getElementById('user-image');
    if (user_image) {
        // change picture from local storage
        const currentUser = getCurrentUser();
        console.log(currentUser);
        if (currentUser && currentUser.user_image) {
            // decrypt the base64 string
            user_image.src = currentUser.user_image;
            // user_image.src = currentUser.user_image;
        }
    }
});