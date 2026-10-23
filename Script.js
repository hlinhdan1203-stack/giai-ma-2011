
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const categoryElement = document.getElementById("category");
const questionText = document.getElementById("question-text");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");

const resultTitle = document.getElementById("result-title");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startGame() {
  currentQuestion = 0;
  score = 0;
  answered = false;

  intro.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  questionNumber.textContent =
    `CÂU ${currentQuestion + 1} / ${questions.length}`;

  scoreElement.textContent = score;
  progressBar.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  categoryElement.textContent = q.category;
  questionText.textContent = q.question;
  feedbackElement.textContent = "";
  nextBtn.classList.add("hidden");
  answersElement.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = answer;

    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index, button));

    answersElement.appendChild(button);
  });
}

function selectAnswer(index, selectedButton) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = [...answersElement.querySelectorAll(".answer")];

  buttons.forEach(button => {
    button.disabled = true;
  });

  buttons[q.correct].classList.add("correct");

  if (index === q.correct) {
    score++;
    scoreElement.textContent = score;
    feedbackElement.textContent = "✓ Chính xác! " + q.explanation;
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent =
      "Chưa chính xác! " + q.explanation;
  }

  progressBar.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "XEM KẾT QUẢ →"
      : "CÂU TIẾP THEO →";

  nextBtn.classList.remove("hidden");
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  finalScore.textContent = `${score}/${questions.length}`;

  if (score >= 9) {
    resultTitle.textContent = "XUẤT SẮC!";
    resultMessage.textContent =
      "Bạn có kiến thức rất tốt. Hãy tiếp tục lan tỏa lòng biết ơn đến thầy cô!";
  } else if (score >= 7) {
    resultTitle.textContent = "RẤT TỐT!";
    resultMessage.textContent =
      "Bạn đã hoàn thành thử thách thật tốt. Còn vài điều thú vị để khám phá!";
  } else if (score >= 5) {
    resultTitle.textContent = "KHÁ LẮM!";
    resultMessage.textContent =
      "Bạn đã có những kiến thức hữu ích. Hãy thử lại để khám phá thêm nhé!";
  } else {
    resultTitle.textContent = "ĐỪNG NẢN NHÉ!";
    resultMessage.textContent =
      "Mỗi câu hỏi là một điều mới để học. Hãy thử sức thêm lần nữa!";
  }
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startGame);
  
