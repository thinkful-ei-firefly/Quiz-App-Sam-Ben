/* eslint-disable no-undef */
'use strict';

const QUEST = [
  {
    question:
      'How much did it cost to "dust" a vampire using computer graphics?',
    answers: ['$1,000', '$5,000', '$10,000', '$20,000'],
    correct: '$5,000'
  },
  {
    question: 'Who voiced the Mutant Enemy mascot which says "Grrr...Arrgh"?',
    answers: [
      'Sarah Michelle Gellar',
      'Alyson Hannigan',
      'David Boreanaz',
      'Joss Whedon'
    ],
    correct: 'Joss Whedon'
  },
  {
    question:
      'Who introduced Joss Whedon to the band that wrote the theme song?',
    answers: [
      'Sarah Michelle Gellar',
      'Alyson Hannigan',
      'Nicholas Brendon',
      'Seth Green'
    ],
    correct: 'Alyson Hannigan'
  },
  {
    question: 'What has every main character done except Dawn and Anya?',
    answers: [
      'Wrecked an automobile',
      'Died',
      'Slain a vampire',
      'Turned evil'
    ],
    correct: 'Wrecked an automobile'
  },
  {
    question:
      'Which character\'s actor initially declined their role before being convinced by their agent to audition?',
    answers: ['Glory', 'Tara', 'Riley', 'Spike'],
    correct: 'Spike'
  }
];

const TOTAL = QUEST.length;
const CURRENT = { answered: 0, correct: 0 };

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
    <p>Here's the quiz, do it</p>
    <button class="start-button">start</button>
    </section>
`);
  $('.start-button').click(() => renderQuestion());
}

function renderQuestion() {
  CURRENT.answered++;
  updateCount();
  $('main').html(`
        <form>
            <h2>${QUEST[CURRENT.answered - 1].question}</h2>
            <fieldset>
                <label for='op1'>
                    <input type="radio" id="op1" name="option" required>
                    ${QUEST[CURRENT.answered - 1].answers[0]}
                </label>
                <label for='op2'>
                    <input type="radio" id="op2" name="option">
                    ${QUEST[CURRENT.answered - 1].answers[1]}
                </label>
                
                <label for='op3'>
                        <input type="radio" id="op3" name="option">
                        ${QUEST[CURRENT.answered - 1].answers[2]}
                </label>
                
                <label for='op4'>
                    <input type="radio" id="op4" name="option">
                    ${QUEST[CURRENT.answered - 1].answers[3]}
                </label>
            </fieldset>
            <button class="check-answer-button" type="submit" value="Answer">Check Your Answer</button>
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
  if (response === QUEST[CURRENT.answered - 1].correct) {
    CURRENT.correct++;
    updateCount();
    $('main').html(`
        <section class='pop-up correct'>
            <h3>Correct!</h3>
            <p>You have a lot of potential</p>
            <button class="continue-button">Continue</button>
        </section>
    `);
  } else {
    $('main').html(`
        <section class='pop-up incorrect'>
            <h3>Incorrect!</h3>
            <p>The correct answer was: ${QUEST[CURRENT.answered - 1].correct}</p>
            <button class="continue-button">Continue</button>
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
            <h2>How'd You Do?</h2>
            <p>${CURRENT.correct / CURRENT.answered * 100}%</p>
            <p>You answered ${CURRENT.correct}/${CURRENT.answered} questions correctly</p>
            <button class="restart-button">Try Again?</button>
        </section>
    `);
  $('.restart-button').click(() => renderStart());
}

function quizApp() {
  // individual functions
  renderStart();
}

$(quizApp);
