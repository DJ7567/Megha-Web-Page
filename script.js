const screens = document.querySelectorAll(".screen");
const music = document.getElementById("bgMusic");

const basket = document.getElementById("basket");
const popup = document.getElementById("memoryPopup");
const memoryImage = document.getElementById("memoryImage");
const memoryText = document.getElementById("memoryText");
const continueBtn = document.getElementById("continueBtn");

let gamePaused = false; // pause while popup shows

function showScreen(id) {
  screens.forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* Typing Effect */
let text = `Initializing Love System... 💻
Searching for: Megha ❤️
Nickname detected: Meghu 💕
Authentication Successful.`;

let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text[i];
    i++;
    setTimeout(typeWriter, 40);
  }
}
typeWriter();

/* Begin Button (Safari Safe Music Start) */
document.getElementById("beginBtn").addEventListener("click", () => {
  music.play().catch(() => {});
  showScreen("catch");
  spawnHeart();
});

/* Basket Movement (PC + Mobile) */
function moveBasket(x) {
  const gameWidth = window.innerWidth;

  let position = x;

  if (position < 30) position = 30;
  if (position > gameWidth - 30) position = gameWidth - 30;

  basket.style.left = position + "px";
}

document.addEventListener("mousemove", (e) => moveBasket(e.clientX));
document.addEventListener("touchmove", (e) => {
  e.preventDefault();
  moveBasket(e.touches[0].clientX);
}, { passive: false });

/* Heart Memories (Image + Message Together) */
let memories = [
  { img: "images/img1.jpg", text: "Your smile melts my heart every time 💕" },
  { img: "images/img2.jpg", text: "This was one of my favorite days with you ❤️" },
  { img: "images/img3.jpg", text: "How are you this beautiful? 😍" },
  { img: "images/img4.jpg", text: "You are my peace, my happiness 💖" },
  { img: "images/img5.jpg", text: "Forever starts and ends with you 💍" }
];

let caught = 0;

function spawnHeart() {
  let heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = "0px";
  document.getElementById("catch").appendChild(heart);

  let fall = setInterval(() => {

    if (gamePaused) return;

    heart.style.top = parseFloat(heart.style.top) + 3 + "px";

    let basketRect = basket.getBoundingClientRect();
    let heartRect = heart.getBoundingClientRect();

    if (
      heartRect.bottom >= basketRect.top &&
      heartRect.left < basketRect.right &&
      heartRect.right > basketRect.left
    ) {
      clearInterval(fall);
      heart.remove();

      gamePaused = true;
      showMemory();
    }

    if (parseFloat(heart.style.top) > window.innerHeight) {
      clearInterval(fall);
      heart.remove();
      spawnHeart();
    }

  }, 20);
}

function showMemory() {
  if (caught >= memories.length) {
    startQuiz();
    return;
  }

  memoryImage.src = memories[caught].img;
  memoryText.innerText = memories[caught].text;

  popup.classList.remove("hidden");
}

continueBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  caught++;
  gamePaused = false;

  if (caught < memories.length) {
    spawnHeart();
  } else {
    setTimeout(startQuiz, 500);
  }
});

/* Quiz */
let questions = [
  { q: "Who is my forever? 💖", correct: "Meghu", options: ["Meghu", "Someone else"] },
  { q: "Who loves more? ❤️", correct: "Meghu", options: ["Meghu", "Divyaraj"] },
  { q: "Who gets jealous more? 😏", correct: "Divyaraj", options: ["Meghu", "Divyaraj"] }
];

let current = 0;

function startQuiz() {
  showScreen("quiz");
  showQuestion();
}

function showQuestion() {
  let q = questions[current];
  document.getElementById("quizQuestion").innerText = q.q;
  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.options.forEach(o => {
    let btn = document.createElement("button");
    btn.innerText = o;

    if (o === q.correct) {
      btn.onclick = () => {
        current++;
        if (current < questions.length) {
          showQuestion();
        } else {
          showFinal();
        }
      };
    } else {
      btn.onmouseover = () => {
        btn.style.position = "absolute";
        btn.style.left = Math.random() * 70 + "%";
        btn.style.top = Math.random() * 70 + "%";
      };
    }

    optDiv.appendChild(btn);
  });
}

/* Final */
function showFinal() {
  showScreen("final");
  document.getElementById("finalText").innerText =
`From the first day you entered my life 💖

Everything started compiling perfectly.

No errors.
No crashes.
Just love running forever. ❤️

Meghu,
I choose you.
Always. 💍`;
}
