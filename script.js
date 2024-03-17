const quizData = [
    {
      question: `Evolutionary biologist Jonathan Calede may have discovered the oldest amphibious beaver species in the world. Calede first compared measurements of the beaver’s ankle to those of almost 350 other rodent species to learn more about how it moved. __________ Calede dated the species to approximately 30 million years ago based on its location between rock and ash layers.

      Which choice completes the text with the most logical transition?`,
      options: ["For example,", "In conclusion,", "Next,", " In fact,"],
      answer: "Next,",
      solution: `This is a transition question, so follow the basic approach. Highlight
      ideas that relate to each other. The previous sentence says Calede first
      compared measurements of the beaver’s ankle, and the next sentence
      says Calede dated the species to approximately 30 million years ago.
      These ideas are different steps Calede took, so a same-direction
      transition is needed. Make an annotation that says “agree.” Eliminate
      any answer that doesn’t match.
      (A) is wrong because for example introduces an example not stated
      in the text.
      (B) is wrong because in conclusion introduces a conclusion not
      present in the text.
      (C) is correct because next introduces another step in a sequence.
      (D) is wrong because in fact is used to give more detail, which is
      not present.`
    },
    {
      question: `Male and female American citizens had starkly different roles during World War II. Men served as soldiers or took part in the workforce to create weapons and other wartime materials. __________ women were responsible for maintaining the home and supporting the men. Some women also ventured into the workforce for the first time, and the famous “We Can Do It” poster featuring “Rosie the Riveter” was created to motivate women to pursue this new role.
      
      Which choice completes the text with the most logical transition?`,
      options: ["Besides,", "Instead,", "Likewise,", "Meanwhile,"],
      answer: "Meanwhile,",
      solution: `This is a transition question, so follow the basic approach. Highlight
      ideas that relate to each other. The previous part of the paragraph says
      Male and female American citizens had starkly different roles during
      World War II and lists the roles of men, and the sentence in question
      says women were responsible for maintaining the home and
      supporting the men. These ideas disagree, so an opposite-direction
      transition is needed. Make an annotation that says “disagree.”
      Eliminate any answer that doesn’t match.
      (A) and (C) are wrong because they are same-direction transitions.
      (B) is wrong because instead introduces an alternative, but the
      paragraph discusses the different roles of men and women, not
      alternative roles for men.
      (D) is correct because meanwhile shows that women had different
      roles during the same time period.`
    },
    {
    question: `While researching a topic, a student has taken the following notes: 
    A writing system for expressing numbers is a numeral system.
    Two examples of numeral systems from history are Babylonian
    cuneiform numerals and Roman numerals.
    The Babylonian cuneiform numeral system is a base-60 system
    and lacks a zero digit.
    It’s a positional numeral system in which the position of a digit
    affects its value.
    The Roman numeral system is a base-10 system and lacks a zero
    digit.
    It’s a non-positional numeral system in which the position of a
    digit does not affect its value.
    The student wants to emphasize a difference between the two numeral
    systems. Which choice most effectively uses relevant information
    from the notes to accomplish this goal?
    `,
    options: [
      `Babylonian cuneiform numerals and Roman
    numerals are two writing systems for
    expressing numbers.`,
      `The Roman numeral system is a base-10 nonpositional system that lacks a zero digit`,
      `One system for expressing numbers is
      Babylonian cuneiform; however, another one is
      the Roman numeral system.`,
      `The Babylonian cuneiform numeral system is
      base-60 and positional, while the Roman
      numeral system is base-10 and non-positional.`
  ],
    answer: `The Babylonian cuneiform numeral system is
    base-60 and positional, while the Roman
    numeral system is base-10 and non-positional.`,
    solution: `This is a Rhetorical Synthesis question, so follow the basic approach.
    Highlight the goal(s) stated in the question: emphasize a difference
    between the two numeral systems. Eliminate any answer that doesn’t
    fulfill this purpose.
    (A) is wrong because it states a similarity between the two numeral
    systems.
    (B) is wrong because it doesn’t mention both numeral systems.
    (C) is wrong because it doesn’t mention a difference between the
    systems.
    (D) is correct because it states differences between the two numeral
    systems and uses the contrast word while.`
    }
  ];
  
const quizContainer = document.getElementById('quiz'); 
const resultContainer = document.getElementById('result'); 
const submitButton = document.getElementById('submit'); 
const retryButton = document.getElementById('retry'); 
const showAnswerButton = document.getElementById('showAnswer'); 
let currentQuestion = 0; 
let score = 0; 
let incorrectAnswers = [];
function shuffleArray(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
  } 
  function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionContainer = document.createElement('div');
    questionContainer.className = 'question';

    const questionText = document.createElement('p');
    questionText.textContent = questionData.question;

    questionContainer.appendChild(questionText);

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    for (let i = 0; i < questionData.options.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = questionData.options[i];

        const optionText = document.createElement('span');
        optionText.textContent = questionData.options[i];

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionContainer);
    quizContainer.appendChild(optionsElement);
}
function checkAnswer(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение кнопки submit

    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}<br>
                <strong>Solution:</strong> ${quizData[i].solution}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
displayQuestion();