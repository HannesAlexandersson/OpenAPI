const baseUrl = 'https://opentdb.com/api.php?amount=10';
const  triviaWrapper = document.querySelector('#trivia-wrapper');
const answerArray = [];
const triviaAnswerList = document.querySelector('#answer-list');

const fetchTrivia = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const question = data['results'][0];
    console.log(data['results'][0]);
    
    displayTrivia(question);
    answerArray = question['correct_answer'];
    question['incorrect_answers'].forEach((answer) => {
        const incorrectAnswer = answer;
        answerArray = incorrectAnswer;
    });
};

function displayAnswers(answerArray){
    answerArray.forEach((answer) => {
        const alternative = document.createElement('li');
        alternative.innerText = answer;
        triviaAnswerList.appendChild(alternative);
    });
    triviaWrapper.appendChild(triviaAnswerList);
};
fetchTrivia();
const displayTrivia = (question) =>{
    triviaWrapper.innerHTML = `
        <h2>${question['question']}</h2>        
    `;
    displayAnswers(answerArray);
};

