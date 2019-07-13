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
    <button class="start-button">START</button>
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
  const response = $('input[name=\'option\']:checked').parent().text().trim();
  if (response === QUEST[CURRENT.answered - 1].correct) {
    CURRENT.correct++;
    updateCount();
    $('main').html(`
        <section class='feedback correct'>
            <h2>Correct!</h2>
            <p>You have a lot of potential</p>
            <button class="continue-button">NEXT QUESTION</button>
        </section>
    `);
  } else {
    $('main').html(`
        <section class='feedback incorrect'>
            <h2>Incorrect!</h2>
            <p>The correct answer was: ${QUEST[CURRENT.answered - 1].correct}</p>
            <button class="continue-button">NEXT QUESTION</button>
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
            <button class="restart-button">TRY AGAIN</button>
        </section>
    `);
  $('.restart-button').click(() => renderStart());
}

function quizApp() {
  // individual functions
  renderStart();
}

$(quizApp);
