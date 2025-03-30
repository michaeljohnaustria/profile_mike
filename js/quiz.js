// quiz.js
const quizzes = {
    javascript: {
        title: "JavaScript Quiz",
        questions: [
            {
                question: "What does 'DOM' stand for?",
                options: [
                    "Document Object Model",
                    "Data Object Management",
                    "Digital Output Module",
                    "Display Object Method"
                ],
                answer: 0
            },
            {
                question: "Which keyword is used to declare variables in JavaScript?",
                options: [
                    "var",
                    "let",
                    "const",
                    "All of the above"
                ],
                answer: 3
            }
        ]
    },
    python: {
        title: "Python Quiz",
        questions: [
            {
                question: "How do you print 'Hello World' in Python?",
                options: [
                    "console.log('Hello World')",
                    "print('Hello World')",
                    "echo 'Hello World'",
                    "printf('Hello World')"
                ],
                answer: 1
            },
            {
                question: "Which of these is NOT a Python data type?",
                options: [
                    "list",
                    "tuple",
                    "array",
                    "dictionary"
                ],
                answer: 2
            }
        ]
    }
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const course = urlParams.get('course');
    
    if (course && quizzes[course]) {
        currentQuiz = quizzes[course];
        document.getElementById('quizTitle').textContent = currentQuiz.title;
        document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
        showQuestion();
    } else {
        window.location.href = 'dashboard.html';
    }

    // Next button
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    
    // Submit button
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
});

function showQuestion() {
    const question = currentQuiz.questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide/show navigation buttons
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('submitBtn').classList.add('hidden');
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;
    
    // Highlight selected answer
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    // Show appropriate button
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        document.getElementById('nextBtn').classList.remove('hidden');
    } else {
        document.getElementById('submitBtn').classList.remove('hidden');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function submitQuiz() {
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });
    
    // Save results
    const user = getCurrentUser();
    if (user) {
        user.quizResults = user.quizResults || {};
        user.quizResults[currentQuiz.title.replace(' Quiz', '').toLowerCase()] = {
            score: Math.round((score / currentQuiz.questions.length) * 100)
        };
        updateUser(user);
        setCurrentUser(user);
    }
    
    // Show results
    alert(`You scored ${score} out of ${currentQuiz.questions.length}`);
    window.location.href = 'dashboard.html';
}