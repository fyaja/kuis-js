const display = document.querySelector('.display');
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

    function displayEnter(event) {
      if (event.key === 'Enter' && !document.querySelector('.submit').disabled) {
        checkAnswer();
      }
    };

    function startQuiz() {
      document.querySelector('.submit').style.display = 'inline';
      document.querySelector('.next').style.display = 'inline';
      document.querySelector('input').style.display = 'inline';
      document.querySelector('.start').style.display = 'none';
      document.querySelector('h1').style.display = 'none';
      document.querySelector('.next').disabled = true;
      displayQuestion();
    }

    function displayQuestion() {
      const question = document.querySelector('.question');
      question.textContent = `${questionIndex + 1}. ${questions[questionIndex].question}`;
    }

    function nextQuestion() {
      document.querySelector('input').value = '';
      check = false;
      document.querySelector('.next').disabled = true;
      document.querySelector('.submit').disabled = false;

      questionIndex++

      if (questionIndex >= questions.length) {
        const question = document.querySelector('.question');
        question.textContent = 'Pertanyaan Habis!';
        display.innerHTML = `Skor : <span>${score}</span> / 100`;
        if (score >= 70) {
          document.querySelector('span').classList.add('green');
        }
        display.classList.remove('green');
        document.querySelector('.restart').style.display = 'block';
        document.querySelector('.submit').style.display = 'none';
        document.querySelector('.next').style.display = 'none';
        document.querySelector('input').style.display = 'none';
        document.querySelector('.start').style.display = 'none';
        return;
      }

      display.textContent = '';

      displayQuestion();
      questions[questionIndex].answer;
    }


    function checkAnswer() {
      const input = document.querySelector('input');
      let inputValue = input.value;
      let result = '';

      const totalQuestions = questions.length;
      const pointPerQuestion = Math.floor(100 / totalQuestions);

      if (inputValue === '') {
        result = `Isi yang bener WOI !`
      } else if (inputValue.toLowerCase() === questions[questionIndex].answer) {
        result = 'Kamu sudah menjawab !'
        score += pointPerQuestion;
        check = true;
      } else {
        result = 'Kamu sudah menjawab !'
        check = true;
      }

      display.textContent = result;
      display.classList.add('green');

      if (check) {
        document.querySelector('.next').disabled = false;
        document.querySelector('.submit').disabled = true;
      }
    }

    function restartQuiz() {
      shuffleArray(questions);
      questionIndex = 0;
      score = 0;
      startQuiz();
      document.querySelector('.restart').style.display = 'none';
      display.textContent = '';
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }