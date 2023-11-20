const baseUrl = 'https://opentdb.com/api.php?amount=10';
const  triviaWrapper = document.querySelector('#trivia-wrapper');
let answerArray = [];
const triviaAnswerList = document.querySelector('#answer-list');

const fetchTrivia = async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    const question = data['results'][0];
    console.log(data['results'][0]);    
    displayTrivia(question);
    //lägger in ALLA svar i en array både rätt och fel svar
    answerArray.push(question['correct_answer']);
    question['incorrect_answers'].forEach((answer) => {
        const incorrectAnswer = answer;
        answerArray.push(incorrectAnswer);
    });
    displayAnswers(answerArray);
};
fetchTrivia();

// displayar alla svarsalternativ
const displayAnswers = (answerArray) =>{
    answerArray.forEach((answer) => {
        const alternative = document.createElement('li');
        alternative.innerText = answer;
        triviaAnswerList.appendChild(alternative);
    });
    triviaWrapper.appendChild(triviaAnswerList);
};
//displayar frågan och svarsalernativen
const displayTrivia = (question) =>{
    triviaWrapper.innerHTML = `
        <h6>Category: ${question['category']}</h6>
        <h2>${question['question']}</h2> 

    `;
    
};
