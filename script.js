//sessiontoken needed for the api to work when fetching many requests in a short amount of time
let sessionToken = '&token=';
const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
const fetchSessionToken = async () => {
    const response = await fetch(sessionTokenUrl);
    const tokenData = await response.json();    
    sessionToken += tokenData.token.toString();
    return sessionToken;
};
fetchSessionToken();
//adding basic variables and nodes
const easyUrl = `https://opentdb.com/api.php?amount=1&difficulty=easy${sessionToken}`;
const mediumUrl = `https://opentdb.com/api.php?amount=1&difficulty=medium${sessionToken}`;
const hardUrl = `https://opentdb.com/api.php?amount=1&difficulty=hard${sessionToken}`;
const baseUrl = `https://opentdb.com/api.php?amount=1${sessionToken}`;
let apiUrl = baseUrl;
const  triviaWrapper = document.querySelector('#trivia-wrapper');
const triviagameWrapper = document.querySelector('.trivia-game-wrapper');
let answerArray = [];
const triviaAnswerList = document.querySelector('#answer-list');
const startBtn = document.querySelector('#start-btn');
const feedbackAlert = document.getElementById('feedback-alert');
const bodyHeader = document.querySelector('.body-header');
let shuffledAnswers = [];
let points = 0;
let correctAnswerGlobal = '';

//difficulty variables
const diffList = document.querySelector('#diff-list');
const diffBtn = document.querySelector('#fetch-cta');
diffBtn.innerText = 'SELECT DIFFICULTY';

//timer variables
let timeLeft = 10;
let timer = document.getElementById('timeLeft');
const timerBtn = document.querySelector('#timer-button');
const timerWrapper = document.querySelector('.timer-wrapper');
let timerEnabled = false;
let countdownTimer;

//Creating nodes and elements for the 'rule-set', css animation for the actual display
let ruleSetBtn = document.querySelector('#rule-set');
let ruleSetWrapper = document.querySelector('#rule-set-wrapper');
let ruleWrapper = document.querySelector('#rule-wrapper');
ruleWrapper.classList.add('hide')
ruleSetWrapper.classList.add('hide')
let pointWrapper = document.querySelector('#points-wrapper');
pointWrapper.classList.add('hide');

// Event listener for the selected difficulty element
diffList.addEventListener('change', () => {    
    const selectedDifficulty = diffList.value;

    // Set the correct URL/API endpoint based on the selected difficulty    
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

//toggle the rule-set animation
ruleSetBtn.addEventListener('click', toggleRules);

function toggleRules() {
    if(ruleSetWrapper.classList.contains('is-open')) {   
        ruleSetWrapper.classList.remove('is-open');     
        ruleSetWrapper.classList.add('hide');
    }else{
        ruleSetWrapper.classList.add('is-open');
        ruleSetWrapper.classList.remove('hide');
    };
    if (ruleWrapper.classList.contains('hide')) {
        ruleWrapper.classList.remove('hide');        
    }else{
        ruleWrapper.classList.add('hide');
    };
};

//fetching the trivia game, also alot of logic for the timer and the game itself
const fetchTrivia = async () => {    
    const response = await fetch(apiUrl);
    const data = await response.json();
    const question = data['results'][0];    
    displayTrivia(question);

    //storing the correct answer in a separate variable for to be able to compare it with the user input for correct/wrong
    const correctAnswer = question['correct_answer'];  
    correctAnswerGlobal = correctAnswer;  

    //pushing the correct answer and the incorrect answers to the answerArray
    answerArray.push(question['correct_answer']);    
    question['incorrect_answers'].forEach((answer) => {
        const incorrectAnswer = answer;
        answerArray.push(incorrectAnswer);
    });// I dont want the answer btns to be displayed after the user has selected an answer, so I hide them and show them here
    if (triviaAnswerList.classList.contains('hide')) {
        triviaAnswerList.classList.remove('hide');
    }
    //start the timer IF timer is enablad
    if(timerEnabled){        
        runTimer(timerWrapper);
    }      
    displayAnswers(answerArray,correctAnswer);
    //hide the start button after it has been clicked to avoid errors and multiple start buttons etc
    startBtn.classList.add('hide');
    //create the illusion of a new page during the actual gameplay
    bodyHeader.classList.add('hide');
    triviagameWrapper.classList.remove('hide');
    ruleSetWrapper.classList.add('hide');
};

//event listener for the start button, the callback function fetches the trivia game
startBtn.addEventListener('click', fetchTrivia);

//display the questions
const displayTrivia = (question) =>{
    triviaWrapper.innerHTML = `
    <h5 class="category">Category: ${question['category']}</h5>
    <h5 class="difficulty">Difficulty: ${question['difficulty']}</h5>
    <h2 class="question">${question['question']}</h2>
    `;    
};


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
        clearAnswerButtons();
        // User selected the correct answer OBS add a way to continue the game here
        showFeedback(`${selectedButton.innerText} is Correct!`, 'alert-success');
        points++;
        //reset timer for next question
        stopAndResetTimer();
        displayPoints();
        if(triviaAnswerList.classList.contains('hide')){
            triviaAnswerList.classList.remove('hide');
        }else{
            triviaAnswerList.classList.add('hide');
        }
        //get the next question
        displayNextQuestionButton();
        
    } else {
        clearAnswerButtons();
        // User selected the wrong answer OBS add a break to the game here
        showFeedback(`${selectedButton.innerText} is Wrong!`, 'alert-danger');
        points = 0;     
        if(ruleSetWrapper.classList.contains('is-open')){   
        ruleSetWrapper.classList.remove('is-open');
        };
        //reset timer for next question
        stopAndResetTimer();
        toggleBackground();
        if(triviaAnswerList.classList.contains('hide')){
            triviaAnswerList.classList.remove('hide');
        }else{
            triviaAnswerList.classList.add('hide');
        };
        if(bodyHeader.classList.contains('hide')){
        bodyHeader.classList.remove('hide');
            if(!triviagameWrapper.classList.contains('hide')){
            triviagameWrapper.classList.add('hide');    
            };
        };
        if(startBtn.classList.contains('hide')){
        startBtn.classList.remove('hide');
        //displayRestartButton();
        };
        // need to empty the arrays here aswell, so we can use the start button to restart the game without the olds answers. This is important becouse before with the displaynext button way the background stays even on startmenu wich we dont want
        answerArray.splice(0, answerArray.length);
        shuffledAnswers.splice(0, shuffledAnswers.length);
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
   //bring forth the timer animation
    if(timerWrapper.style.bottom === '0%'){
        timerWrapper.style.bottom = '-100%';
        showFeedback('Timer DEACTIVATED!', 'alert-danger');
        timerEnabled = false;
    }else {
        timerWrapper.style.bottom = '0%';
        showFeedback('Timer ACTIVATED', 'alert-success');
        timerEnabled = true;
    };
});

//TIMER LOGIC START
function isTimeLeft() {
    return timeLeft > -1;
  }

function runTimer(timerElement) {
    const timerCircle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
	timerCircle.style.strokeDashoffset = 1;
    //adding some personal touches to the timer, like the amount from 1 min to 10 sec, and the color of the timer
	countdownTimer = setInterval(function(){
		if(timerEnabled && isTimeLeft()){
			const timeRemaining = timeLeft--;
			const normalizedTime = (10 - timeRemaining) / 10;      
			timerCircle.style.strokeDashoffset = normalizedTime;
            timer.innerHTML = timeRemaining;
		} else {
			clearInterval(countdownTimer);
			timerElement.classList.remove('animatable');
            showFeedback("TIME'S UP!", 'alert-danger');//adding alerts to show if time is up 
            triviaAnswerList.classList.add('hide');// if user runs out of time, we hide the answer buttons
            
            const restartBtn = document.createElement('button');//and offer the user a restart button
            restartBtn.innerText = 'Restart Game';
            restartBtn.classList.add('btn', 'btn-primary');//adding bootstrap classes to the button
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
function showFeedback(message, alertClass, autoDismissTime = 5000) {
    feedbackAlert.textContent = message;
    feedbackAlert.className = `alert ${alertClass}`;
    feedbackAlert.style.display = 'block';   
    //adding a timeout to the alert so it dissapears after a set amount of time to save space on the screen
    setTimeout(() => {
        feedbackAlert.style.display = 'none';
    }, autoDismissTime);
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
        //show the correct answer
        showFeedback(`the correct answer was ${correctAnswerGlobal}`, 'alert-danger');
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
        // show the correct answer
        showFeedback(`the correct answer was ${correctAnswerGlobal}`, 'alert-danger');
        // empty the arrays so that the next question can be fetched and the old questions aren't displayed
        answerArray.splice(0, answerArray.length);
        shuffledAnswers.splice(0, shuffledAnswers.length);
        fetchTrivia();
    });

    triviaWrapper.appendChild(restartBtn);
};
const clearAnswerButtons = () => {  

    // Clear the existing buttons from the container after the user has selected an answer so they dont get displayed again
    triviaAnswerList.innerHTML = ''; 
};
// Function to display current points on the screen OBS change this to alerts instead
function displayPoints() {
    const pointsElement = document.getElementById('points'); 
    if (pointsElement) {
        pointsElement.innerText = `Points: ${points}`;
        showFeedback(`Points: ${points}`, 'alert-success');
    };
    
};
//toggle the background image to create a more dynamic experience and a illusion of a new page
startBtn.addEventListener('click', toggleBackground);
function toggleBackground() {    
    var bodyElement = document.body;
    if(bodyElement.style.backgroundImage){
        bodyElement.style.backgroundImage = '';
    }else{    
    bodyElement.style.backgroundImage = 'url("assets/pink-ombre-gradient-blur-background_1048-16907.jpg")';
    };
};