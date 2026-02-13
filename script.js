// 🔒 PASSWORD LOCK (only your wife can access)
const password = "Swifty@2003";  // Change this to your own password
let entered = prompt("Enter password to verify that it's Meghu:");

if (entered !== password) {
  document.body.innerHTML = "<h1 style='text-align:center; margin-top:50vh;'>Access Denied ❌</h1>";
  throw new Error("Access Denied");
}

/* ------------------ Screens ------------------ */
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
let text = `Hello to My lovely littel Meghu 💖. Click below to Start a Game 💞
you have to catch my Heart which are falling down 😲,
on each successful catch you'll see a memory from my heart 💕
and a Message attached to it.`;

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
  { img: "images/image1.png", text: "Long Road trip, with beautifull Maghu 💕" },
  { img: "images/image2.png", text: "My Darling Ramu driver, when you are with everyday feels valentain Day ❤️" },
  { img: "images/image3.png", text: "I am very proud of my Artist, you are very talented 💎" },
  { img: "images/image4.png", text: "My SuperWoman, the virat kohli of NIQ 💎" },
  { img: "images/image5.png", text: "Traveling whole world with you, is one of my Dream. 😍" },
  { img: "images/image6.png", text: "We help each other grow, share the work load, take care of each other ❤️" },
  { img: "images/image7.png", text: "I want to see you win. So start working hard, you are my 💎" }
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
  { q: "Who is your best friend ? ", correct: "Divyaraj", options: [" Divyaraj "," Amisha "," No Best friend"] },
  { q: "Who is more Nakhre baj ? ", correct: "Meghu", options: [" Meghu ", " Divyaraj ", " Both "] },
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
      btn.addEventListener("mouseover", () => {
        btn.style.position = "absolute";
        btn.style.left = Math.random() * 70 + "%";
        btn.style.top = Math.random() * 70 + "%";
      });

      btn.addEventListener("touchstart", () => {
        btn.style.position = "absolute";
        btn.style.left = Math.random() * 70 + "%";
        btn.style.top = Math.random() * 70 + "%";
      });
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



