  const display = document.querySelector('.display'),
  timeElement = document.querySelector('.time'), 
  hidden = document.querySelector('.questions'),
  start = document.querySelector('.start'),
  next = document.querySelector('.next'), 
  restart =  document.querySelector('.restart'),
  submitForm = document.querySelector('.submit-form'),
  submit = document.querySelector('.submit');
  
  
  const questions = [
  { question: 'Apa ibu kota Indonesia?', answer: 'jakarta' },
  { question: 'Siapa penulis novel "Laskar Pelangi"?', answer: 'andrea hirata' },
  { question: 'Gunung tertinggi di Indonesia adalah?', answer: 'puncak jaya' },
  { question: 'Apa nama candi Buddha terbesar di dunia?', answer: 'borobudur' },
  { question: 'Siapa presiden pertama Indonesia?', answer: 'soekarno' },
  { question: 'Apa mata uang resmi Indonesia?', answer: 'rupiah' },
  { question: 'Pulau terbesar di Indonesia adalah?', answer: 'kalimantan' },
  { question: 'Danau terbesar di Indonesia adalah?', answer: 'toba' },
  { question: 'Tari Kecak berasal dari daerah?', answer: 'bali' },
  { question: 'Sungai terpanjang di Indonesia adalah?', answer: 'kapuas' }
];

  let questionIndex = 0;
  let check = false;
  let score = 0;
  let time = 15;
  let intervalId;
  
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      checkAnswer()
    } else if(event.key === 'ArrowRight'){
      nextQuestion()
    }
  });
  
  function seeRules() {
    document.querySelector('.rules').style.display = 'flex';
    document.querySelector('.title').textContent = 'Aturan dan Cara bermain !';
    start.style.display = 'none';
  }
  
  function quitQuiz(){
    hidden.style.display = 'none';
    restart.style.display = 'none';
    document.querySelector('.rules').style.display = 'none';
    document.querySelector('.quit').style.display = 'none'
    document.querySelector('.title').style.display = 'block';
    document.querySelector('.title').textContent = 'Quiz Game !';
    start.style.display = 'block';
  }
  
  function startQuiz() {
    questionIndex = 0;
    score = 0;
    display.textContent = '';
    timeElement.style.display = 'inline';
    next.style.display = 'inline';
    submitForm.style.display = 'flex';
    hidden.style.display = 'flex';
    document.querySelector('.rules').style.display = 'none';
    document.querySelector('.title').style.display = 'none';
    document.querySelector('.quit').style.display = 'none';
    start.style.display = 'none';
    restart.style.display = 'none';
    displayQuestion();
    countDown();
  }

  function displayQuestion() {
    const question = document.querySelector('.question');
    question.textContent = `${questionIndex + 1}. ${questions[questionIndex].question}`;
  }

  function nextQuestion() {
    document.querySelector('input').value = '';
    check = false;

    questionIndex++

    clearInterval(intervalId)
    time = 15
    countDown()
    
    display.textContent = '';
    display.classList.remove('score');
    
    if (questionIndex >= questions.length) {
      endQuiz()
      return;
    }
    
    displayQuestion();
    display.classList.remove('green');
    questions[questionIndex].answer;
  }
  
  function countDown() {
    timeElement.innerHTML = formatTime(time)
    intervalId = setInterval(() => {
      timeElement.innerHTML = formatTime(time)
      
      if(time === 0){
        clearInterval(intervalId)
        check = true;
        display.textContent = 'Waktu Habis !'
        display.classList.add('score')
        setTimeout(nextQuestion, 3000)
        return;
      }
      
      time--
    }, 1000);
  }

  function formatTime(num){
    return num < 10 ? `00:0${num}` : `00:${num}`;
  }

  function endQuiz() {
    clearInterval(intervalId);
    const question = document.querySelector('.question');
    question.textContent = 'Pertanyaan Habis!';
    display.innerHTML = `Skor : <span class="score">${score}</span> / 100`;
    if (score >= 70) {
      document.querySelector('.score').classList.add('green');
    }
    display.classList.remove('green');
    document.querySelector('.quit').style.display = 'block';
    restart.style.display = 'block';
    next.style.display = 'none';
    submitForm.style.display = 'none';
    timeElement.style.display = 'none';
  }


  function checkAnswer() {
    const input = document.querySelector('input');
    const inputValue = input.value;

    if (check) {
      return;
    }

    const totalQuestions = questions.length;
    const pointPerQuestion = Math.floor(100 / totalQuestions);

    if (inputValue.toLowerCase() === questions[questionIndex].answer) {
      score += pointPerQuestion;
    }
    check = true;
      
    clearInterval(intervalId);

    display.textContent = 'Kamu sudah menjawab!';
    display.classList.add('green');
  }

  function restartQuiz() {
    shuffleArray(questions);
    startQuiz();
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  start.addEventListener('click', seeRules);
  document.querySelector('.quit-quiz').addEventListener('click', quitQuiz);
  document.querySelector('.start-quiz').addEventListener('click', startQuiz);
  submitForm.addEventListener('submit',(event) => {
    event.preventDefault();
    checkAnswer();
  });
  next.addEventListener('click', nextQuestion);
  document.querySelector('.quit').addEventListener('click', quitQuiz);
  document.querySelector('.restart').addEventListener('click', restartQuiz);