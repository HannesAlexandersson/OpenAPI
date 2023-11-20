//https://opentdb.com/api_config.php
//creating base nodes and elements &token=YOURTOKENHERE
//fetching the session token
let sessionToken = '&token=';
const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const fetchSessionToken = async () => {
    const response = await fetch(sessionTokenUrl);
    const tokenData = await response.json();    
    sessionToken += tokenData.token.toString();
    return sessionToken;
};
fetchSessionToken();

const easyUrl = `https://opentdb.com/api.php?amount=1&difficulty=easy${sessionToken}`;
const mediumUrl = `https://opentdb.com/api.php?amount=1&difficulty=medium${sessionToken}`;
const hardUrl = `https://opentdb.com/api.php?amount=1&difficulty=hard${sessionToken}`;
const baseUrl = `https://opentdb.com/api.php?amount=1${sessionToken}`;
let apiUrl = baseUrl;
const  triviaWrapper = document.querySelector('#trivia-wrapper');
let answerArray = [];
const triviaAnswerList = document.querySelector('#answer-list');
const startBtn = document.querySelector('#start-btn');
startBtn.classList.add('btn', 'btn-primary');
const feedbackAlert = document.getElementById('feedback-alert');
let shuffledAnswers = [];
let points = 0;
//difficulty variables
const diffList = document.querySelector('#diff-list');
const diffBtn = document.querySelector('#fetch-cta');
diffBtn.innerText = 'SELECT DIFFICULTY';

// Event listener for the select element
diffList.addEventListener('change', () => {
    // Get the selected difficulty level
    const selectedDifficulty = diffList.value;

    // Set the appropriate URL based on the selected difficulty
    
    switch (selectedDifficulty) {
      case 'easy':
        apiUrl = easyUrl;
        break;
      case 'medium':
        apiUrl = mediumUrl;
        break;
      case 'hard':
        apiUrl = hardUrl;
        break;
      case 'mixed':
        apiUrl = baseUrl; 
        break;
      default:
        apiUrl = baseUrl;
    }
// Enable the button and display the selected difficulty level on click
    diffBtn.disabled = false; 

    diffBtn.addEventListener('click', () => {
        const displayDifficulty = document.createElement('h2');
        displayDifficulty.innerText = `Difficulty: ${selectedDifficulty}`;
        triviaWrapper.appendChild(displayDifficulty);
        if (displayDifficulty.classList.contains('hide')) {
            displayDifficulty.classList.remove('hide');
        };
    });        
});


//timer variables
let timeLeft = 10;
let timer = document.getElementById('timeLeft');
const timerBtn = document.querySelector('#timer-button');
const timerWrapper = document.querySelector('.timer-wrapper');
let timerEnabled = false;

//Creating nodes and elements for the 'rule-set', css animation for the actuall display
let ruleSetBtn = document.querySelector('#rule-set');
let ruleSetWrapper = document.querySelector('#rule-set-wrapper');
let ruleWrapper = document.querySelector('#rule-wrapper');
let pointWrapper = document.querySelector('#points-wrapper');



//toggle the rule-set animation
ruleSetBtn.addEventListener('click', toggleRules);
function toggleRules() {
    if(ruleSetWrapper.classList.contains('is-open') && ruleWrapper.classList.contains('hide')) {
        pointWrapper.classList.add('hide');
        ruleWrapper.classList.remove('hide');
    }else if (ruleSetWrapper.classList.contains('is-open')){
        ruleSetWrapper.classList.remove('is-open');
    }else{
        ruleSetWrapper.classList.add('is-open');
    };
    if (ruleWrapper.classList.contains('hide')) {
        ruleWrapper.classList.remove('hide');
        pointWrapper.classList.add('hide');
    };
};
//fetching the trivia game
const fetchTrivia = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const question = data['results'][0];    
    displayTrivia(question);
    //storing the correct answer in a separate variable for to be able to compare it with the user input for correct/wrong
    const correctAnswer = question['correct_answer'];    
    answerArray.push(question['correct_answer']);    
    question['incorrect_answers'].forEach((answer) => {
        const incorrectAnswer = answer;
        answerArray.push(incorrectAnswer);
    });//remove the hide class from the answer list
    if (triviaAnswerList.classList.contains('hide')) {
        triviaAnswerList.classList.remove('hide');
    }
    //start the timer OM timer enablad
    if(timerEnabled){
        //runTimer(document.querySelector('.timer'));
        runTimer(timerWrapper);
    }  
    
    displayAnswers(answerArray,correctAnswer);
    //hide the start button after it has been clicked
    startBtn.classList.add('hide');
};

//display the question
const displayTrivia = (question) =>{
    triviaWrapper.innerHTML = `
        <h5 class="category">Category: ${question['category']}</h5>
        <h5 class="difficulty">Difficulty: ${question['difficulty']}</h5>
        <h2 class="question">${question['question']}</h2>
    `;    
};

//event listener for the start button, the callback function fetches the trivia game
startBtn.addEventListener('click', fetchTrivia);


//display the answers after shuffling the array so that the correct answer isn't always the first one
const displayAnswers = (answerArray, correctAnswer) => {    
    const shuffledAnswers = shuffleArray(answerArray);
    
    shuffledAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = answer;
        
        // Storing the correct answer
        button.dataset.correct = (answer === correctAnswer).toString();

        // Adding an event listener to each button, the callback func sort out wrong from right answers
        button.addEventListener('click', handleAnswerClick);        
        triviaAnswerList.appendChild(button);
    });    
    triviaWrapper.appendChild(triviaAnswerList);
};
// Callback function for the event listeners of the answer buttons
const handleAnswerClick = (event) => {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    // Checking if the user selected the correct answer
    if (isCorrect) {
        // User selected the correct answer OBS add a way to continue the game here
        showFeedback('Correct!', 'alert-success');
        points++;
        //reset timer for next question
        stopAndResetTimer();
        displayPoints();
        if(triviaAnswerList.classList.contains('hide')){
            triviaAnswerList.classList.remove('hide');
        }else{
            triviaAnswerList.classList.add('hide');
        }
        displayNextQuestionButton();
        
    } else {
        // User selected the wrong answer OBS add a break to the game here
        showFeedback('Wrong!', 'alert-danger');
        points = 0;
        //reset timer for next question
        stopAndResetTimer();
        if(triviaAnswerList.classList.contains('hide')){
            triviaAnswerList.classList.remove('hide');
        }else{
            triviaAnswerList.classList.add('hide');
        }
        displayRestartButton();
    }    
};


// Function to shuffle an array so that the correct answer isn't always the first one
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

//timer logic
timerBtn.addEventListener('click', () => {
    if (timerWrapper.classList.contains('hide')) {
        timerWrapper.classList.remove('hide');
        showFeedback('Timer ACTIVATED', 'alert-success');
        timerEnabled = true;
    }else{
        timerWrapper.classList.add('hide');
        showFeedback('Timer DEACTIVATED!', 'alert-danger');
        timerEnabled = false;
    }
});
function isTimeLeft() {
    return timeLeft > -1;
  }
let countdownTimer;
function runTimer(timerElement) {
    const timerCircle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
	timerCircle.style.strokeDashoffset = 1;
    
	countdownTimer = setInterval(function(){
		if(timerEnabled && isTimeLeft()){
			const timeRemaining = timeLeft--;
			const normalizedTime = (10 - timeRemaining) / 10;      
			timerCircle.style.strokeDashoffset = normalizedTime;
            timer.innerHTML = timeRemaining;
		} else {
			clearInterval(countdownTimer);
			timerElement.classList.remove('animatable');
            showFeedback("TIME'S UP!", 'alert-danger');
            triviaAnswerList.classList.add('hide');
            
            const restartBtn = document.createElement('button');
            restartBtn.innerText = 'Restart Game';
            restartBtn.classList.add('btn', 'btn-primary');
            restartBtn.addEventListener('click', () => {
                location.reload();
            });
            triviaWrapper.appendChild(restartBtn);
		}  
	}, 1000);
}

function stopAndResetTimer() {
    clearInterval(countdownTimer);
    timeLeft = 10; // Reset the timer to its initial value    
};

//TIMER LOGIC END
// bootsrtap logic: 
function showFeedback(message, alertClass) {
    feedbackAlert.textContent = message;
    feedbackAlert.className = `alert ${alertClass}`;
    feedbackAlert.style.display = 'block';   
}
// noticed I created alot of buttons, so I created a function for it, But then I realized it would be even more work to go back and redo all buttons I had already created, only to redo them with the function :)
const createButton = (text, classes, clickHandler) => {
    const button = document.createElement('button');
    button.innerText = text;
    classes.forEach((className) => button.classList.add(className));
    button.addEventListener('click', clickHandler);
    return button;
};

// Function to display the "Next Question" button
const displayNextQuestionButton = () => {
    const nextQuestionBtn = createButton('Next Question', ['btn', 'btn-primary'], () => {
        // Clear the existing answer buttons
        clearAnswerButtons();
        // empty the arrays so that the next question can be fetched
        answerArray.splice(0, answerArray.length);
        shuffledAnswers.splice(0, shuffledAnswers.length);
        fetchTrivia();
    });

    triviaWrapper.appendChild(nextQuestionBtn);
};
// Function to display the "Restart Game" button
const displayRestartButton = () => {
    const restartBtn = createButton('Restart Game', ['btn', 'btn-primary'], () => {
        // Clear the existing answer buttons
        clearAnswerButtons();
        // empty the arrays so that the next question can be fetched
        answerArray.splice(0, answerArray.length);
        shuffledAnswers.splice(0, shuffledAnswers.length);
        fetchTrivia();
    });

    triviaWrapper.appendChild(restartBtn);
};
const clearAnswerButtons = () => {  

    // Clear the existing buttons from the container after the user has selected an answer
    triviaAnswerList.innerHTML = ''; 
};
// Function to display current points on the screen
function displayPoints() {
    const pointsElement = document.getElementById('points'); 
    if (pointsElement) {
        pointsElement.innerText = `Points: ${points}`;
    };
    if(ruleSetWrapper.classList.contains('is-open')) {
        ruleSetWrapper.classList.remove('is-open');
    }else{
        ruleSetWrapper.classList.add('is-open');
    };
    ruleWrapper.classList.add('hide');
    if (pointWrapper.classList.contains('hide')) {
        pointWrapper.classList.remove('hide');
    };
};

