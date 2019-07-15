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
    <h2>Are You A Buffy Trivia Slayer?</h2>
    <button class="start-button">SLAY!</button>
    </section>
`);
  $('.start-button').click(() => renderQuestion());
}

function renderQuestion() {
  CURRENT.answered++;
  updateCount();
  $('main').html(`
    <section>
        <form>
            <h2>${QUEST[CURRENT.answered - 1].question}</h2>
            <fieldset>
              <input type="radio" id="op1" name="option" value="${QUEST[CURRENT.answered - 1].answers[0]}" required>
              <label for='op1'>${QUEST[CURRENT.answered - 1].answers[0]}</label>
              <input type="radio" id="op2" name="option" value="${QUEST[CURRENT.answered - 1].answers[1]}">
              <label for='op2'>${QUEST[CURRENT.answered - 1].answers[1]}</label>
              <input type="radio" id="op3" name="option" value="${QUEST[CURRENT.answered - 1].answers[2]}">
              <label for='op3'>${QUEST[CURRENT.answered - 1].answers[2]}</label>
              <input type="radio" id="op4" name="option" value="${QUEST[CURRENT.answered - 1].answers[3]}">
              <label for='op4'>${QUEST[CURRENT.answered - 1].answers[3]}</label>
            </fieldset>
            <button class="check-answer-button" type="submit" value="Answer">SUBMIT</button>
        </form>
        </section>
    `);
  $('form').submit(event => {
    event.preventDefault();
    renderFeedback();
  });
  $('label').click(event => {
    $('label').removeClass('currently-selected');
    $(event.currentTarget).addClass('currently-selected');
  });
}

function renderFeedback() {
  const response = $('input[name=\'option\']:checked').val();
  if (response === QUEST[CURRENT.answered - 1].correct) {
    CURRENT.correct++;
    updateCount();
    $('main').html(`
        <section class='feedback correct'>
            <h2>CORRECT!</h2>
            <p>You make Giles proud.</p>
            <img src="https://eplcharliechat.files.wordpress.com/2015/04/giles.gif" alt="Rupert Giles">
            <button class="continue-button">NEXT</button>
        </section>
    `);
  } else {
    $('main').html(`
        <section class='feedback incorrect'>
            <h2>INCORRECT!</h2>
            <p>The correct answer was: "${QUEST[CURRENT.answered - 1].correct}."</p>
            <img src="https://buffy-boards.com/data/xfmg/thumbnail/3/3386-6ebef45ae6c28d8e482ec0d3872e4d64.jpg?1558567298" alt="Giles as a demon">
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
            <p>You slayed ${CURRENT.correct} out of ${CURRENT.answered} questions!</p>
            <button class="restart-button">SLAY AGAIN!</button>
        </section>
    `);
  $('.restart-button').click(() => renderStart());
}

function quizApp() {
  // individual functions
  renderStart();
}

$(quizApp);
