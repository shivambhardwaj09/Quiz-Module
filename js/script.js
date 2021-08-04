const quizTitle = document.getElementById('quiz-title');

// VARIABLES FOR STARTING THE QUIZ
const startQuizContainer = document.querySelector('[quiz-start-container]');
const startQuizButton = document.querySelector('[quiz-start-button]');

// VARIABLES FOR MANIPULATING THE QUIZ
const quizContainer = document.querySelector('[data-quiz-body]');
const quizQuestion = document.querySelector('[data-quiz-question]');
const quizQuestionOptions = document.querySelector('[data-quiz-question-options]');
const quizQuestionAnsweredStatus = document.querySelector('[data-quiz-question-answered-status]');
const updateStatus = document.getElementById('status');
const quizQuestionNextButton = document.querySelector('[quiz-question-next]');
const quizQuestionClearButton = document.querySelector('[quiz-question-clear]');
const quizQuestionSubmitButton = document.querySelector('[quiz-question-submit]');
const quizQuestionRestartButton = document.querySelector('[quiz-restart-button]');
const quizQuestionScoreButton = document.querySelector('[quiz-score-button]');

// VARIABLE FOR APPENDING THE DYNAMICALLY GENERATED LIST OF ANSWER KEY
const answerKeyContainer = document.querySelector('[answer-key-container]');
const listParent = document.querySelector('[list-parent]');

let shuffledQuestions, currentQuestionIndex;
let exist, scoreCount;

startQuizButton.addEventListener('click', startGame);
quizQuestionRestartButton.addEventListener('click', reStartGame);
quizQuestionClearButton.addEventListener('click', clearSelection);
quizQuestionSubmitButton.addEventListener('click', selectAnswer);
quizQuestionNextButton.addEventListener('click', () => {
    exist = false;
    currentQuestionIndex++;
    setNextQuestion();
});
quizQuestionScoreButton.addEventListener('click', showScoreAndAnswerKey);

// TO START THE GAME BY SHOWING US THE BASIC FORMAT
function startGame() {
    startQuizContainer.style.display = 'none';
    answerKeyContainer.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    scoreCount = 0;
    quizContainer.classList.remove('hide');
    setNextQuestion();
}

function reStartGame() {
    if (confirm('Do you really wish to play the Quiz Again'))
        startGame();
}

// TO DISPLAY THE BASIC QUESTION FORMAT ON THE SCREEN
function setNextQuestion() {
    resetQuestionState();
    showQuestionAndOptions(shuffledQuestions[currentQuestionIndex]);
}

function resetQuestionState() {
    quizQuestionAnsweredStatus.classList.add('hide');
    quizQuestionClearButton.classList.remove('hide');
    quizQuestionSubmitButton.classList.remove('hide');
    quizQuestionNextButton.classList.add('hide');
    quizQuestionScoreButton.classList.add('hide');
    while (quizQuestionOptions.firstChild) {
        quizQuestionOptions.removeChild(quizQuestionOptions.firstChild);
    }
}

// RENDERING ALL THE QUESTIONS DYNAMICALLY
function showQuestionAndOptions(question) {
    quizQuestion.innerText = question.question;
    question.answers.forEach(answer => {
        const option = document.createElement('div');
        option.classList.add('option');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = "name";
        radio.id = answer.id;
        radio.value = answer.text;
        radio.style.opacity = "0";
        const label = document.createElement('label');
        label.htmlFor = answer.id;
        if (answer.correct) {
            radio.dataset['correct'] = answer.correct;
            label.dataset.correct = answer.correct;
        }
        const span = document.createElement('span');
        span.classList.add('custom-checkbox');
        label.appendChild(span);
        label.append(answer.text);
        option.appendChild(radio);
        option.appendChild(label);
        quizQuestionOptions.appendChild(option);
    });
}

// TO REMOVE ALL THE SELECTION OVER THE RADIO BUTTONS
function clearSelection() {
    let selectedElement = document.getElementsByName('name');
    selectedElement.forEach(element => {
        element.checked = false;
    });
}

// TO MANIPULATE THE CORRECT OR WRONG ANSWER OVER THE SELECTED ANSWER
function selectAnswer() {
    let getSelectedValue = document.querySelector('input[name="name"]:checked');
    if (getSelectedValue !== null) {
        questions.forEach(question => {
            // console.log(typeof(quizQuestion.textContent));
            if (question.question === quizQuestion.textContent) {
                question.answers.forEach(answer => {
                    if ((answer.correct).toString() === getSelectedValue.dataset.correct) {
                        exist = true;
                    }
                });
            }
        });
        setStatusClass(exist);
        if (shuffledQuestions.length > currentQuestionIndex+1) {
            quizQuestionNextButton.classList.remove('hide');
        } else {
            quizQuestionScoreButton.classList.remove('hide');
        }
    } else {
        return alert('please select a valid option first');
    }
}

function setStatusClass(exist) {
    clearStatusClass();
    if (!exist) {
        quizQuestionAnsweredStatus.classList.remove('hide');
        quizQuestionAnsweredStatus.style.background = "red";
        updateStatus.innerText = 'Incorrect';
        
    } else {
        quizQuestionAnsweredStatus.classList.remove('hide');
        quizQuestionAnsweredStatus.style.background = "lightgreen";
        updateStatus.innerText = 'Correct';
        scoreCount++;
    }
}

function clearStatusClass() {
    quizQuestionClearButton.classList.add('hide');
    quizQuestionSubmitButton.classList.add('hide');
}

function showScoreAndAnswerKey() {
    quizTitle.innerText = 'Score : ' + scoreCount.toString();
    quizContainer.classList.add('hide');
    answerKeyContainer.classList.remove('hide');
    questions.forEach(question => {
        let qString = question.question;
        question.answers.forEach(answer => {
            if (answer.correct) {
                const list = document.createElement('li');
                const span = document.createElement('span');
                span.innerText = answer.text;
                span.classList.add('list-parent-li-span');
                list.classList.add('list-parent-li');
                list.textContent = qString + " - " + span.innerText; 
                listParent.appendChild(list);
            }
        });
    });
    quizQuestionRestartButton.classList.remove('hide');
}

// CREATING A SET OF QUESTIONS STATICALLY
const questions = [
    {
        question: 'What is the sum of 2+2',
        answers: [
            {
                id: "1",
                text: '4',
                correct: true
            },
            {
                id: "2",
                text: '7',
                correct: false
            },
            {
                id: "3",
                text: '8',
                correct: false
            },
            {
                id: "4",
                text: '3',
                correct: false
            },
        ]
    },
    {
        question: 'What is the sum of 4+4',
        answers: [
            {
                id: "5",
                text: '4',
                correct: false
            },
            {
                id: "6",
                text: '5',
                correct: false
            },
            {
                id: "7",
                text: '8',
                correct: true
            },
            {
                id: "8",
                text: '10',
                correct: false
            },
        ]
    },
    {
        question: 'What is the sum of 6+6',
        answers: [
            {
                id: '9',
                text: '4',
                correct: false
            },
            {
                id: "10",
                text: '8',
                correct: false
            },
            {
                id: "11",
                text: '12',
                correct: true
            },
            {
                id: "12",
                text: '10',
                correct: false
            },
        ]
    }
];