import {questions as originalQuestions} from './questions.js';
import {right, wrong} from './anwers.js';

const questions = originalQuestions.filter(q => q.options[0] === 0);

const Scene = {
  Home: document.querySelector("div#home"),
  Question: document.querySelector("div#question"),
  Answer: document.querySelector("div#answer"),
  Finale: document.querySelector("div#finale")
};

const Element = {
  Question: Scene.Question.querySelector('p'),
  Footer: document.querySelector('footer')
};

const Button = {
  Footer: document.querySelector('button#comecar'),
  A: document.querySelector('button.a'),
  B: document.querySelector('button.b')
};

const comecar = e => {
  // shuffle questions
  for (let i = 0; i < questions.length; i++) {
    const j = Math.floor(Math.random() * questions.length);
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  // console.log(questions.map(q => q.question));
  Button.Footer.removeEventListener('click', comecar);
  Button.Footer.addEventListener('click', nextQuestion);
  nextQuestion();
};

Scene.Home.classList.remove('hide');
Element.Footer.classList.remove('hide');
Button.Footer.addEventListener('click', comecar);

let q = -1;

function nextQuestion() {
  q += 1; // next question

  Scene.Home.classList.add('hide'); // hide Home
  Scene.Answer.classList.add('hide'); // hide answer
  Element.Footer.classList.add('hide'); // hide Footer
  
  if (q == questions.length) return finale();
  
  const question = questions[q]; // select a question
  Element.Question.textContent = question.question; // put the question into the frame

  if (question.options[0] === 0) {
    Button.A.classList.remove('descriptive');
    Button.B.classList.remove('descriptive');
    Button.A.textContent = '✗';
    Button.B.textContent = '✓';
  } else {
    Button.A.classList.add('descriptive');
    Button.B.classList.add('descriptive');
    Button.A.textContent = question.options[0];
    Button.B.textContent = question.options[1];
  }
  
  Scene.Question.classList.remove('hide'); // show question and options
}

let yes = 0;
let meh = 0;
let points = 0;

function answer(a) {
  
  Scene.Question.classList.add('hide');
  
  const icon = document.querySelector('div.assertive div');
  icon.classList.remove('right', 'wrong');
  icon.classList.add(questions[q].answer === 0 ? 'wrong' : 'right');
  icon.textContent = questions[q].answer === 0 ? '✗' : '✓';

  const assertive = document.querySelector('div.assertive p');
  assertive.textContent = questions[q].question;

  const explanation = document.querySelector('p.explanation');
  explanation.innerHTML = questions[q].explanation;

  const response = document.querySelector('p.response');
  if (a === questions[q].answer) {
    points++;
    meh = 0;
    response.textContent = right[yes++] || right[5];
  } else {
    yes = 0;
    response.textContent = wrong[meh++] || wrong[5];
  }

  Button.Footer.textContent = 'Próxima';
  Scene.Question.classList.add('hide');
  Scene.Answer.classList.remove('hide');
  Element.Footer.classList.remove('hide');
}

Button.A.addEventListener('click', e => answer(0));
Button.B.addEventListener('click', e => answer(1));

function finale() {

  const pontos = document.querySelector('div#finale div span:first-child');
  pontos.textContent = points;
  
  const total = document.querySelector('div#finale div span:last-child');
  total.textContent = `/${questions.length}`;

  const grade = questions.length / points;

  const box = document.querySelector('div#finale div');
  box.classList.add(grade >= 3 ? 'no-color' : (grade >= 1.5 ? 'so-color' : 'ok-color'));

  const okMsg = 'Muito bem! Você tem informações atualizadas. Compartilhe seus conhecimentos com as pessoas que estão próximas à você.'
  const soMsg = 'A COVID-19 é muito nova e precisamos ficar atualizados.'
  const noMsg = 'As informações sobre a COVID-19 estão sendo amplamente divulgadas, procure se atualizar.'

  const lastWord = document.querySelector('div#finale p:last-child');
  lastWord.textContent = grade >= 3 ?
    noMsg : (grade >= 1.5 ? soMsg : okMsg);
  
  Scene.Finale.classList.remove('hide');
  
  if (navigator.share) {
    Button.Footer.removeEventListener('click', nextQuestion);
    Button.Footer.textContent = 'Compartilhar este Quiz!'
    Button.Footer.classList.add('share');
    Button.Footer.addEventListener('click', function(e) {
      navigator.share({
        title: 'Quiz COVID-19 DAS/PROGEP/FURG',
        text: 'Faça o Quiz da DAS/PROGEP/FURG e teste seus conhecimentos sobre a COVID-19.',
        url: 'https://marciojrtorres.github.io/das/quiz/covid/',
      });
    });
    Element.Footer.classList.remove('hide');
  }

}
