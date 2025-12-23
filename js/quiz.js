// Question base
const questions = [
    {
        question: "Who was Darth Maul's master?",
        answers: [
            { text: "Darth Vader", correct: false },
            { text: "Count Dooku", correct: false },
            { text: "Darth Sidious", correct: true },
            { text: "Darth Plagueis", correct: false }
        ]
    },
    {
        question: "Which planet was Maul born on?",
        answers: [
            { text: "Tatooine", correct: false },
            { text: "Dathomir", correct: true },
            { text: "Coruscant", correct: false },
            { text: "Mandalore", correct: false }
        ]
    },
    {
        question: "Who cut Darth Maul in half?",
        answers: [
            { text: "Qui-Gon Jinn", correct: false },
            { text: "Anakin Skywalker", correct: false },
            { text: "Mace Windu", correct: false },
            { text: "Obi-Wan Kenobi", correct: true }
        ]
    },
    {
        question: "What was the name of Maul's brother?",
        answers: [
            { text: "Savage Opress", correct: true },
            { text: "Pre Vizsla", correct: false },
            { text: "Feral", correct: false },
            { text: "Asajj Ventress", correct: false }
        ]
    },
    {
        question: "What is the Sith 'Rule of Two'?",
        answers: [
            { text: "Only two lightsabers per Sith", correct: false },
            { text: "One Master, One Apprentice", correct: true },
            { text: "Two planets under control", correct: false },
            { text: "Always fight with two blades", correct: false }
        ]
    },
    {
        question: "Which group did Maul lead after his resurrection?",
        answers: [
            { text: "The Inquisitors", correct: false },
            { text: "501st Legion", correct: false },
            { text: "The Shadow Collective", correct: true },
            { text: "The Sith Order", correct: false }
        ]
    },
    {
        question: "What Jedi did Maul have a long-standing rivalry with?",
        answers: [
            { text: "Yoda", correct: false },
            { text: "Obi-Wan Kenobi", correct: true },
            { text: "Anakin Skywalker", correct: false },
            { text: "Ahsoka Tano", correct: false }
        ]
    },
    {
        question: "How many aprentices did Darth Sidious have?",
        answers: [
            { text: "One", correct: false },
            { text: "Two", correct: false },
            { text: "Three", correct: true },
            { text: "Four", correct: false }
        ]
    },
    {
        question: "How many times did first Death Star managed to destroy a planet?",
        answers: [
            { text: "One", correct: true },
            { text: "Two", correct: false },
            { text: "Three", correct: false },
            { text: "None", correct: false }
        ]
    },
    {
        question: "What was the name of the planet where the Death Star has fired its superlaser for the first time?",
        answers: [
            { text: "Alderaan", correct: false },
            { text: "Jedha", correct: true },
            { text: "Yavin IV", correct: false },
            { text: "Scarif", correct: false }
        ]
    }
];
// DOM elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const restartTesterButton = document.getElementById('restart-tester-btn');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
// Counters
let currentQuestionIndex = 0;
let score = 0;
let testerMode = false;
let shuffledQuestions;
// Button handlers
document.getElementById('start-normal-btn').addEventListener('click', () => {
    startQuiz(false);
});
document.getElementById('start-tester-btn').addEventListener('click', () => {
    startQuiz(true);
});
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
if (restartTesterButton) {
    restartTesterButton.addEventListener('click', () => {
        startQuiz(true);
    });
}
document.getElementById('restart-btn').addEventListener('click', () => {
    startQuiz(false);
});
// Functions
function startQuiz(isTesterMode) {
    testerMode = isTesterMode;
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add('transparent');

    setTimeout(() => {
        startScreen.classList.add('hide');
        questionScreen.classList.remove('hide');
        questionScreen.classList.add('transparent');
        resultScreen.classList.add('hide');

        setNextQuestion();
        setTimeout(() => {
            questionScreen.classList.remove('transparent');
        }, 50);
    }, 500);
}
function setNextQuestion() {
    resetState();
    
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        showResults();
    }
}
function showQuestion(question) {
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    
    if (testerMode) {
        document.getElementById('score-display').innerText = `Score: ${score} (TEST MODE)`;
    } else {
        document.getElementById('score-display').innerText = `Score: ${score}`;
    }

    questionElement.innerText = question.question;

    const answersToDisplay = [...question.answers].sort(() => Math.random() - 0.5);

    answersToDisplay.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('quiz-btn');
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
            
            if (testerMode) {
                button.classList.add('tester-highlight');
            }
        }
        
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
function resetState() {
    nextButton.classList.remove('visible');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        score++;
        document.getElementById('score-display').innerText = `Score: ${score}`;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    nextButton.classList.add('visible');
}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
function showResults() {
    questionScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    
    document.getElementById('final-score').innerText = `You scored ${score} out of ${questions.length}`;
    
    const rankElement = document.getElementById('sith-rank');
    
    if (score === questions.length) {
        rankElement.innerText = "SITH LORD";
        rankElement.style.color = "#FFD700";
    } else if (score >= 4) {
        rankElement.innerText = "SITH APPRENTICE";
        rankElement.style.color = "#B22222";
    } else {
        rankElement.innerText = "UNWORTHY";
        rankElement.style.color = "#555";
    }

    if (testerMode) {
        restartTesterButton.classList.remove('hide');
        document.getElementById('restart-btn').innerText = "Attempt Again (Normal)";
    } else {
        restartTesterButton.classList.add('hide');
        document.getElementById('restart-btn').innerText = "Attempt Again";
    }
}