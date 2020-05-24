import questions from './questions.js';
import {right, wrong} from './anwers.js';

const Scene = {
  Home: document.querySelector("div#home"),
  Question: document.querySelector("div#question"),
  Finale: document.querySelector("div#finale")
};

const Element = {
  Question: Scene.Question.querySelector('p')
};

const Footer = document.querySelector('footer');

const buttonComecar = document.querySelector('button#comecar');

const buttonA = document.querySelector('button.a');
const buttonB = document.querySelector('button.b');

let q = 0;

buttonComecar.addEventListener('click', e => {
  Scene.Home.style.display = 'none';
  Footer.style.display = 'none';
  Scene.Question.style.display = 'flex';

  for (let i = 0; i < questions.length; i++) {
    const j = Math.floor(Math.random() * questions.length);
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }


  nextQuestion();
});

function nextQuestion() {
  const question = questions[q];
  Element.Question.textContent = question.question;
  if (question.options[0] === 0) {
    buttonA.classList.remove('descriptive');
    buttonB.classList.remove('descriptive');
    buttonA.textContent = '✗';
    buttonB.textContent = '✓';
  } else {
    buttonA.classList.add('descriptive');
    buttonB.classList.add('descriptive');
    buttonA.textContent = question.options[0];
    buttonB.textContent = question.options[1];
  }
}

function answer(a) {
  if (a === questions[q].answer) {
    alert('RIGHT!');
  } else {
    alert('WRONG');
  }
}

buttonA.addEventListener('click', e => answer(0));
buttonB.addEventListener('click', e => answer(1));
