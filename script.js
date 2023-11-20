//creating base nodes and elements
const baseUrl = 'https://opentdb.com/api.php?amount=1';
//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
const  triviaWrapper = document.querySelector('#trivia-wrapper');
let answerArray = [];
const triviaAnswerList = document.querySelector('#answer-list');
const startBtn = document.querySelector('#start-btn');
const feedbackAlert = document.getElementById('feedback-alert');
//timer variables
let timeLeft = 10;
let timer = document.getElementById('timeLeft');
const timerBtn = document.querySelector('#timer-button');
const timerWrapper = document.querySelector('.timer-wrapper');

//Creating nodes and elements for the 'rule-set', css animation for the actuall display
let ruleSetBtn = document.querySelector('#rule-set');
let ruleSetWrapper = document.querySelector('#rule-set-wrapper');
//adding class'is-open' on button click
ruleSetBtn.addEventListener('click', toggleRules);
function toggleRules() {
    if(ruleSetWrapper.classList.contains('is-open')) {
        ruleSetWrapper.classList.remove('is-open');
    }else{
        ruleSetWrapper.classList.add('is-open');
    }
};
//fetching the trivia game
const fetchTrivia = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const question = data['results'][0];
    //display the question through the displayTrivia function    
    displayTrivia(question);
    //storing the correct answer in a separate variable for to be able to compare it with the user input for correct/wrong
    const correctAnswer = question['correct_answer'];
    //put all available answers in an array
    // both the correct
    answerArray.push(question['correct_answer']);
    // and the incorrect answers
    question['incorrect_answers'].forEach((answer) => {
        const incorrectAnswer = answer;
        answerArray.push(incorrectAnswer);
    });
    runTimer(document.querySelector('.timer'));
    displayAnswers(answerArray,correctAnswer);
    startBtn.classList.add('hide');
};

//display the question
const displayTrivia = (question) =>{
    triviaWrapper.innerHTML = `
        <h5>Category: ${question['category']}</h5>
        <h2>${question['question']}</h2>
    `;    
};

//event listener for the start button, the callback function fetches the trivia game
startBtn.addEventListener('click', fetchTrivia);


//display the answers
const displayAnswers = (answerArray, correctAnswer) => {
    //shuffle the array using the shuffleArray function
    const shuffledAnswers = shuffleArray(answerArray);
    
    shuffledAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer;
        
        // Storing the correct answer
        button.dataset.correct = (answer === correctAnswer).toString();

        // Adding an event listener to each button, the callback func sort out wrong from right answers
        button.addEventListener('click', handleAnswerClick);
        // Appending the buttons to the answer list
        triviaAnswerList.appendChild(button);
    });
    // Appending the answer list to the trivia wrapper
    triviaWrapper.appendChild(triviaAnswerList);
};
// Callback function for the event listeners of the answer buttons
const handleAnswerClick = (event) => {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    // Checking if the user selected the correct answer
    if (isCorrect) {
        // User selected the correct answer OBS change this to alert or something more eye catching
        showFeedback('Correct!', 'alert-success');
        console.log('Correct!');
    } else {
        // User selected the wrong answer OBS change this to alert or something more eye catching
        showFeedback('Wrong!', 'alert-danger');
        console.log('Wrong!');
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
    }else{
        timerWrapper.classList.add('hide');
        showFeedback('Timer DEACTIVATED!', 'alert-danger');
    }
});
function isTimeLeft() {
    return timeLeft > -1;
  }
function runTimer(timerElement) {
    const timerCircle = timerElement.querySelector('svg > circle + circle');
	timerElement.classList.add('animatable');
	timerCircle.style.strokeDashoffset = 1;
    
	let countdownTimer = setInterval(function(){
		if(isTimeLeft()){
			const timeRemaining = timeLeft--;
			const normalizedTime = (60 - timeRemaining) / 60;
      // for clockwise animation
      // const normalizedTime = (timeRemaining - 60) / 60;
			timerCircle.style.strokeDashoffset = normalizedTime;
            timer.innerHTML = timeRemaining;
		} else {
			clearInterval(countdownTimer);
			timerElement.classList.remove('animatable');
            //lägg in logic här som tar bort svarsalternativen och visar resultatet, samt en knapp för att starta om spelet
		}  
	}, 1000);
}



// bootsrtap logic: 

function showFeedback(message, alertClass) {
    feedbackAlert.textContent = message;
    feedbackAlert.className = `alert ${alertClass}`;
    feedbackAlert.style.display = 'block';

    
    
}