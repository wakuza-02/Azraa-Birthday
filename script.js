// --- PAGE FLIPPING LOGIC ---
let currentPage = 1;
const totalPages = 4;

const backButton = document.querySelector(".back-button");
const continueButton = document.querySelector(".continue-button");
const card = document.getElementById("card");

function updateButtonVisibility() {
  backButton.style.display = currentPage === 1 ? "none" : "inline-block";
  continueButton.style.display =
    currentPage === totalPages ? "none" : "inline-block";
}

function flipToNextPage() {
  if (currentPage < totalPages) {
    const currentPageEl = document.querySelector(`.page-${currentPage}`);
    const nextPageEl = document.querySelector(`.page-${currentPage + 1}`);
    currentPageEl.classList.add("flipping-out");
    setTimeout(() => {
      currentPageEl.classList.remove("active", "flipping-out");
      nextPageEl.classList.add("active");
      currentPage++;
      updateButtonVisibility();
    }, 600);
  }
}

function flipToPreviousPage() {
  if (currentPage > 1) {
    const currentPageEl = document.querySelector(`.page-${currentPage}`);
    const prevPageEl = document.querySelector(`.page-${currentPage - 1}`);
    currentPageEl.classList.remove("active");
    prevPageEl.classList.add("active", "flipping-in");
    currentPage--;
    updateButtonVisibility();
    setTimeout(() => {
      prevPageEl.classList.remove("flipping-in");
    }, 600);
  }
}

// Event Listeners for Buttons
continueButton.addEventListener("click", flipToNextPage);
backButton.addEventListener("click", flipToPreviousPage);

// --- SWIPE AND KEYBOARD CONTROLS ---
let touchStartX = 0;
card.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);
card.addEventListener(
  "touchend",
  (e) => {
    if (touchStartX - e.changedTouches[0].screenX > 50) flipToNextPage();
    else if (e.changedTouches[0].screenX - touchStartX > 50)
      flipToPreviousPage();
  },
  false
);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") flipToNextPage();
  if (e.key === "ArrowLeft") flipToPreviousPage();
});

// --- BACKGROUND SPARKLES ---
function createSparkles() {
  const sparkleContainer = document.querySelector(".background-sparkles");
  const numSparkles = 80;
  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    const size = Math.random() * 2.5 + 0.5;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 7}s`;
    sparkle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    sparkleContainer.appendChild(sparkle);
  }
}

// Initial setup on page load
document.addEventListener("DOMContentLoaded", () => {
  updateButtonVisibility();
  createSparkles();
});

// --- BACKGROUND AUDIO ---
const backgroundAudio = document.getElementById("birthdayAudio");
let hasInteracted = false;

// Play audio on the first user interaction
document.body.addEventListener(
  "click",
  () => {
    if (!hasInteracted) {
      backgroundAudio.play().catch((error) => {
        // Log any errors if the browser blocks the playback
        console.error("Audio playback failed:", error);
      });
      hasInteracted = true;
    }
  },
  { once: true }
);
