'use strict';

const QUEST = [
  {
    question: 'How much did it cost to "dust" a vampire using computer graphics?',
    answers: [
      '$1,000',
      '$5,000',
      '$10,000',
      '$20,000'
    ],
    correct: '$5,000',
  },
  {
    question: 'Who voiced the Mutant Enemy mascot which says "Grrr...Arrgh"?',
    answers: [
      'Sarah Michelle Gellar',
      'Alyson Hannigan',
      'David Boreanaz',
      'Joss Whedon'
    ],
    correct: 'Joss Whedon',
  },
  {
    question: 'Who introduced Joss Whedon to the band that wrote the theme song?',
    answers: [
      'Sarah Michelle Gellar',
      'Alyson Hannigan',
      'Nicholas Brendon',
      'Seth Green'
    ],
    correct: 'Alyson Hannigan',
  },
  {
    question: 'What has every main character done except Dawn and Anya?',
    answers: [
      'Wrecked an automobile',
      'Died',
      'Slain a vampire',
      'Turned evil'
    ],
    correct: 'Wrecked an automobile',
  },
  {
    question: 'Which character\'s actor initially declined their role before being convinced by their agent to audition?',
    answers: [
      'Glory',
      'Tara',
      'Riley',
      'Spike'
    ],
    correct: 'Spike',
  },
  {
    question: 'How many episodes don\'t feature any vampires?',
    answers: [
      '1',
      '3',
      '7',
      '19'
    ],
    correct: '7',
  },
  {
    question: 'What celebrity named their daughter Willow after the Buffy character?',
    answers: [
      'Beyoncé',
      'Pink',
      'Alanis Morissette',
      'Gwen Stefani'
    ],
    correct: 'Pink',
  },
  {
    question: 'What was Spike\'s original accent before they settled on British?',
    answers: [
      'Texan',
      'Boston',
      'Russian',
      'French'
    ],
    correct: 'Texan',
  },
  {
    question: 'Which role did Sarah Michelle Gellar audition for before being cast as Buffy?',
    answers: [
      'Willow',
      'Cordelia',
      'Darla',
      'Drusilla'
    ],
    correct: 'Cordelia',
  },
  {
    question: 'How many churches are there in Sunnydale?',
    answers: [
      '1',
      '8',
      '27',
      '43'
    ],
    correct: '43',
  }
];

const TOTAL = 5;
const CURRENT = { answered: 0, correct: 0 };
const usedQuestions = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)); 
}

function shuffle(array) {
  const newArray=array;
  var currentIndex = newArray.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

function getQuestion() {
  let chosenQuestion = getRandomInt(QUEST.length);
  while (usedQuestions.includes(chosenQuestion)) {
    chosenQuestion = getRandomInt(QUEST.length);
  }
  usedQuestions.push(chosenQuestion);
  return chosenQuestion;
}

function updateCount() {
  $('.total').text(TOTAL);
  $('.current-answered').text(CURRENT.answered);
  $('.current-correct').text(CURRENT.correct);
}

function renderStart() {
  CURRENT.answered = 0;
  CURRENT.correct = 0;
  updateCount();
  $('main').html(`
    <section>
    <h2>Are You a Buffy Trivia Slayer?</h2>
    <button class="start-button">BEGIN</button>
    </section>
`);
  $('.start-button').click(() => renderQuestion());
}

function labelGenerator(num, qIndex) {
  const output = [];
  const answerArray = shuffle(QUEST[qIndex].answers);
  for (let i=0; i < num; i++) {
    output.push(`
      <label for='op${i+1}'>
          <input type="radio" id="op${i+1}" name="option" required>
          ${answerArray[i]}
      </label>
  `);
  }
  return output.join('');
}

function renderQuestion() {
  CURRENT.answered++;
  updateCount();
  const questIndex = getQuestion();
  $('main').html(`
        <form data-correct='${QUEST[questIndex].correct}'>
            <h2>${QUEST[questIndex].question}</h2>
            <fieldset>
            ${labelGenerator(QUEST[questIndex].answers.length, questIndex)}
            </fieldset>
            <button class="check-answer-button" type="submit" value="Answer">SUBMIT</button>
        </form>
    `);
  $('input').focus((event) => {
    $('label').removeClass('currently-selected');
    let labelId = $(event.currentTarget).attr('id');
    $(`label[for='${labelId}'`).addClass('currently-selected');
  });
  $('form').submit(event => {
    event.preventDefault();
    renderFeedback();
  });
}

function renderFeedback() {
  const response = $('input[name=\'option\']:checked').parent().text().trim();
  const correctResponse = $('form').attr('data-correct');
  if (response === correctResponse) {
    CURRENT.correct++;
    updateCount();
    $('main').html(`
        <section class='pop-up correct'>
            <h2>Correct!</h2>
            <p>You have a lot of potential</p>
            <button class="continue-button">NEXT</button>
        </section>
    `);
  } else {
    $('main').html(`
        <section class='pop-up incorrect'>
            <h2>Incorrect!</h2>
            <p>The correct answer was: ${correctResponse}</p>
            <button class="continue-button">NEXT</button>
        </section>
    `);
  }
  if (CURRENT.answered !== TOTAL) {
    $('.continue-button').click(() => renderQuestion());
  } else {
    $('.continue-button').click(() => renderEnd());
  }
}

function renderEnd() {
  updateCount();
  $('main').html(`
        <section>
            <h2>RESULTS</h2>
            <p>${CURRENT.correct / CURRENT.answered * 100}%</p>
            <p>You answered ${CURRENT.correct}/${CURRENT.answered} questions correctly</p>
            <button class="restart-button">PLAY AGAIN</button>
        </section>
    `);
  $('.restart-button').click(() => renderStart());
  usedQuestions.length=0;
}

function quizApp() {
  // individual functions
  renderStart();
}

$(quizApp);
