// متغیرها
let score = 0;
let timeLeft = 20;
let highScore = localStorage.getItem('highScore') || 0;
let timerInterval;

// دسترسی به المان‌های HTML
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const timerElement = document.getElementById('timer');
const tapButton = document.getElementById('tap-button');
const restartButton = document.getElementById('restart-button');

// نمایش بالاترین امتیاز
highScoreElement.textContent = `بالاترین امتیاز: ${highScore}`;

// تابع افزایش امتیاز
function increaseScore() {
    score++;
    scoreElement.textContent = `امتیاز فعلی: ${score}`;
    moveButton();
}

// تابع حرکت دکمه به موقعیت تصادفی
function moveButton() {
    const containerWidth = window.innerWidth - tapButton.offsetWidth;
    const containerHeight = window.innerHeight - tapButton.offsetHeight;

    const randomX = Math.random() * containerWidth;
    const randomY = Math.random() * containerHeight;

    tapButton.style.left = `${randomX}px`;
    tapButton.style.top = `${randomY}px`;
}

// تابع شروع زمان‌سنج
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `زمان باقی‌مانده: ${timeLeft} ثانیه`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// تابع پایان بازی
function endGame() {
    clearInterval(timerInterval);
    tapButton.style.display = 'none';
    restartButton.style.display = 'inline-block';

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = `بالاترین امتیاز: ${highScore}`;
    }
}

// تابع شروع مجدد بازی
function restartGame() {
    score = 0;
    timeLeft = 20;
    scoreElement.textContent = `امتیاز فعلی: ${score}`;
    timerElement.textContent = `زمان باقی‌مانده: ${timeLeft} ثانیه`;
    tapButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
    startTimer();
}

// اضافه کردن رویداد کلیک به دکمه‌ها
tapButton.addEventListener('click', increaseScore);
restartButton.addEventListener('click', restartGame);

// شروع بازی
startTimer();

tapButton.addEventListener('touchstart', increaseScore);