// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// add variables to reference DOM elements
// example is below
let questionsEl = document.getElementById('questions');
let feedbackEl = document.getElementById('feedback');
let timerEl = document.getElementById('timer');
let initialsEl = document.getElementById('initials');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submit');
let choices = document.getElementById('choices');


// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  // hide start screen
  document.getElementById('start-screen').style.display = 'none';


  // un-hide questions section
  questionsEl.style.display = 'block';

  // start timer
 timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  // call a function to show the next question
  getQuestion();
}

function getQuestion() {

  // get current question object from array
let currentQuestion = questions[currentQuestionIndex];

  // update title with current question
document.getElementById('question-title').textContent = currentQuestion.title;

  // clear out any old question choices
  choices.innerHTML = '';

  // loop over the choices for each question
  for (let i =0; i <currentQuestion.choices.length; i++)
  // get the number of questions

  let numberOfQuestions; // assign it the value of the length of the questions array
  for (let i = 0; i < numberOfQuestions; i++) {

    // create a new button for each choice, setting the label and value for the button
let choiceButton = document.createElement('button');
choiceButton.textContent = currentQuestion.choices[i];
choiceButton.setAttribute('value',currentQuestion.choices[i]);

    // display the choice button on the page
choices.appendChild(choiceButton);
  }
}

function questionClick(event) {
  // identify the targeted button that was clicked on
let clickedButton = event.target;

  // if the clicked element is not a choice button, do nothing.
if (!clickedButton.matches('button')){
  return;
}

  // check if user guessed wrong
  if (clickedButton.value !== questions[currentQuestionIndex].answer) {

  // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
time -= 15;

  // recall the timer is the score they get at the end

  // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz
if (time < 0) {
  time = 0;
}

  // display new time on page
  timerEl.textContent = time;

  // play "wrong" sound effect
  sfxWrong.play();

  // display "wrong" feedback on page
feedbackEl.textContent = 'wrong;'
} else {
  // play "right" sound effect
  sfxRight.play()

  // display "right" feedback on page by displaying the text "Correct!" in the feedback element
feedbackEl.textContent = 'correct';
}
// flash right/wrong feedback on page for half a second
// set the feedback element to have the class of "feedback"
feedbackEl.classList.add('feedback');


// after one second, remove the "feedback" class from the feedback element
setTimeout(function() {
  feedbackEl.classList.remove('feedback');

// move to next question
currentQuestionIndex++;

// check if we've run out of questions
// if the time is less than zero and we have reached the end of the questions array,
// call a function that ends the quiz (quizEnd function)
// or else get the next question
if (currentQuestionIndex === questions.length || time <=0) {
  quizEnd();
} else {
  getQuestion();
}
},1000);
}


// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId);

  // show end screen
  document.getElementById('end-screen').style.display = 'block;'

  // show final score
  document.getElementById('final-score').textContent = time;

  // hide the "questions" section
  questionsEl.style.display = 'none'
}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time
  time--;

  // update the element to display the new time value
  timerEl.textContent = time;

  // check if user ran out of time; if so, call the quizEnd() function
if (time <= 0) {
  quizEnd();
}
}

// complete the steps to save the high score
function saveHighScore() {

  // get the value of the initials input box
  let initials = initialsEl.value.trim();

  // make sure the value of the initials input box wasn't empty
if (initials !== '') {

  // if it is not, check and see if there is a value of high scores in local storage
let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  // if there isn't any, then create a new array to store the high score

  // add the new initials and high score to the array
highscores.push({initials: initials, score: time});

  // convert the array to a piece of text
highscores.push({initials: initials, score: time});
  // store the high score in local storage
localStorage.setItem('highscores', JSON.stringify(highscores));
  // otherwise, if there are high scores stored in local storage,
  // retrieve the local storage value that has the high scores,
  // convert it back to an array,
  // add the new initials and high score to the array,
  // then convert the array back to a piece of text,
  // then store the new array (converted to text) back in local storage

  // finally, redirect the user to the high scores page.
window.location.href = 'highscores.html';
}
}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
if (event.key === 'Enter') {
  saveHighScore();
}
}

// user clicks button to submit initials
submitBtn.onclick = saveHighScore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on an element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
