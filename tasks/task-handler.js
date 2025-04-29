const questions = {
    1: [
        {
            question: "Fe²⁺ + HОН ⇄ ... + ... | pH?",
            answer: "Fe²⁺ + HОН ⇄ FeOH⁺ + H⁺ | pH˂7"
        },
        {
            question: "Cu²⁺ + HОН ⇄ ... + ... | pH?",
            answer: "Cu²⁺ + HОН ⇄ CuOH⁺ + H⁺ | pH˂7"
        },
        {
            question: "Al³⁺ + HОН ⇄ ... + ... | pH?",
            answer: "Al³⁺ + HОН ⇄ AlOH²⁺ + H⁺ | pH˂7"
        },
        {
            question: "Zn²⁺ + HОН ⇄ ... + ... | pH?",
            answer: "Zn²⁺ + HОН ⇄ ZnOH⁺ + H⁺ | pH˂7"
        },
        {
            question: "Ni²⁺ + HОН ⇄ ... + ... | pH?",
            answer: "Ni²⁺ + HОН ⇄ NiOH⁺ + H⁺ | pH˂7"
        }
    ],
    2: [
        {
            question: "SO₃²⁻ + HОН ⇄ ... + ... | pH?",
            answer: "SO₃²⁻ + HОН ⇄ HSO₃⁻ + OH⁻ | pH>7"
        },
        {
            question: "S²⁻ + HОН ⇄ ... + ... | pH?",
            answer: "S²⁻ + HОН ⇄ HS⁻ + OH⁻ | pH>7"
        },
        {
            question: "PO₄³⁻ + HОН ⇄ ... + ... | pH?",
            answer: "PO₄³⁻ + HОН ⇄ HPO₄²⁻ + OH⁻ | pH>7"
        },
        {
            question: "CH₃COO⁻ + HОН ⇄ ... + ... | pH?",
            answer: "CH₃COO⁻ + HОН ⇄ CH₃COOH + OH⁻ | pH>7"
        },
        {
            question: "CO₃²⁻ + HОН ⇄ ... + ... | pH?",
            answer: "CO₃²⁻ + HОН ⇄ HCO₃⁻ + OH⁻ | pH>7"
        }
    ],
    3: [
        {
            question: "NH₄⁺ + CH₃COO⁻ + HОН ⇄ ... + ... | pH?",
            answer: "NH₄⁺ + CH₃COO⁻ + HОН ⇄ CH₃COOH + NH₄OH | pH≈7"
        },
        {
            question: "NH₄⁺ + CO₃²⁻ + HОН ⇄ ... + ... | pH?",
            answer: "NH₄⁺ + CO₃²⁻ + HОН ⇄ NH₄OH + HCO₃⁻ | pH≈7"
        },
        {
            question: "Zn²⁺ + NO₂⁻ + HОН ⇄ ... + ... | pH?",
            answer: "Zn²⁺ + NO₂⁻ + HОН ⇄ ZnOH⁺ + HNO₂ | pH≈7"
        },
        {
            question: "Pb²⁺ + CH₃COO⁻ + HОН ⇄ ... + ... | pH?",
            answer: "Pb²⁺ + CH₃COO⁻ + HОН ⇄ PbOH⁺ + CH₃COOH | pH≈7"
        },
        {
            question: "NH₄⁺ + F⁻ + HОН ⇄ ... + ... | pH?",
            answer: "NH₄⁺ + F⁻ + HОН ⇄ NH₄OH + HF | pH≈7"
        }
    ],
    4: [
        {
            question: "NiBr₂ pH? Na₂SO₃ pH? KClO₄ pH?",
            answer: "NiBr₂ pH<7, Na₂SO₃ pH>7, KClO₄ pH≈7"
        },
        {
            question: "FeBr₂ pH? NaClO₄ pH? CH₃COOK pH?",
            answer: "FeBr₂ pH<7, NaClO₄ pH≈7, CH₃COOK pH>7"
        },
        {
            question: "CaBr₂ pH? NH₄NO₃ pH? Al₂(SO₄)₃ pH?",
            answer: "CaBr₂ pH≈7, NH₄NO₃ pH<7, Al₂(SO₄)₃ pH<7"
        },
        {
            question: "FeSO₄ pH? Li₂SO₄ pH? KHSiO₃ pH?",
            answer: "FeSO₄ pH<7, Li₂SO₄ pH=7, KHSiO₃ pH>7"
        },
        {
            question: "CuCl₂ pH? Ba(HS)₂ pH? CH₃COONa pH?",
            answer: "CuCl₂ pH<7, Ba(HS)₂ pH>7, CH₃COONa pH>7"
        }
    ]
};

// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
let currentTask = parseInt(urlParams.get('task')) || 1;
let currentQuestion = parseInt(urlParams.get('question')) || 0;

function updateQuestion() {
    const task = questions[currentTask];
    if (!task) return;
    
    const questionObj = task[currentQuestion];
    const container = document.getElementById('question-container');
    
    container.innerHTML = `
        <div class="question-text">${questionObj.question}</div>
        <input type="text" class="answer-input" placeholder="Введите ваш ответ">
        <button class="check-button" onclick="checkAnswer()">Проверить</button>
        <div class="result-message"></div>
    `;
    
    // Обновляем URL
    history.replaceState({}, '', `?task=${currentTask}&question=${currentQuestion}`);
}

function checkAnswer() {
    const userAnswer = document.querySelector('.answer-input').value.trim();
    const correctAnswer = questions[currentTask][currentQuestion].answer;
    const resultDiv = document.querySelector('.result-message');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultDiv.textContent = "✅ Верно! Правильный ответ: " + correctAnswer;
        resultDiv.className = "result-message correct";
    } else {
        resultDiv.textContent = "❌ Неверно. Правильный ответ: " + correctAnswer;
        resultDiv.className = "result-message incorrect";
    }
    resultDiv.style.display = 'block';
}

// Навигация
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestion < questions[currentTask].length - 1) {
        currentQuestion++;
        updateQuestion();
    }
});

// Инициализация
updateQuestion();