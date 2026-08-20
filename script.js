const scenes = [...document.querySelectorAll(".scene")];
const track = document.querySelector("#track");
const progressFill = document.querySelector("#progressFill");
const counter = document.querySelector("#counter");
const dots = document.querySelector("#dots");
const story = document.querySelector("#story");

let currentScene = 0;
let locked = false;
let pointerStartY = 0;

function buildDots() {
  scenes.forEach((_, index) => {
    const button = document.createElement("button");
    button.className = "dot";
    button.type = "button";
    button.setAttribute("aria-label", `Go to scene ${index + 1}`);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      goToScene(index);
    });
    dots.appendChild(button);
  });
}

function renderScene(index, animate = true) {
  currentScene = Math.max(0, Math.min(scenes.length - 1, index));

  track.style.transition = animate
    ? "transform .9s cubic-bezier(.76,0,.18,1)"
    : "none";
  track.style.transform = `translateY(-${currentScene * 100}vh)`;

  scenes.forEach((scene, sceneIndex) => {
    scene.classList.toggle("active", sceneIndex === currentScene);
  });

  [...dots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentScene);
  });

  progressFill.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
  counter.textContent = `${String(currentScene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
}

function goToScene(index) {
  if (locked || index === currentScene) return;

  locked = true;
  renderScene(index);
  window.setTimeout(() => {
    locked = false;
  }, 720);
}

function nextScene() {
  if (currentScene < scenes.length - 1) goToScene(currentScene + 1);
}

function previousScene() {
  if (currentScene > 0) goToScene(currentScene - 1);
}

story.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (Math.abs(event.deltaY) < 18) return;
  event.deltaY > 0 ? nextScene() : previousScene();
}, { passive: false });

story.addEventListener("pointerdown", (event) => {
  pointerStartY = event.clientY;
});

story.addEventListener("pointerup", (event) => {
  const distance = event.clientY - pointerStartY;
  if (Math.abs(distance) < 50) return;
  distance < 0 ? nextScene() : previousScene();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "PageDown") nextScene();
  if (event.key === "ArrowUp" || event.key === "PageUp") previousScene();
  if (event.key === "Home") goToScene(0);
  if (event.key === "End") goToScene(scenes.length - 1);
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    nextScene();
  });
});

const openLetter = document.querySelector("#openLetter");
openLetter.addEventListener("click", (event) => {
  event.stopPropagation();
  goToScene(5);
});

document.querySelector("#restart").addEventListener("click", (event) => {
  event.stopPropagation();
  renderScene(0, false);
});

const stars = document.querySelector("#starField");
const hint = document.querySelector("#starHint");
let foundStars = 0;

for (let i = 0; i < 5; i += 1) {
  const star = document.createElement("button");
  star.className = "hidden-star";
  star.type = "button";
  star.textContent = "✦";
  star.style.left = `${12 + Math.random() * 76}%`;
  star.style.top = `${12 + Math.random() * 70}%`;
  star.setAttribute("aria-label", "Hidden star");

  star.addEventListener("click", (event) => {
    event.stopPropagation();
    if (star.classList.contains("found")) return;
    star.classList.add("found");
    foundStars += 1;
    hint.textContent = `${foundStars} / 5 found`;

    if (foundStars === 5) {
      hint.textContent = "You found them all. Okay, birthday legend. ♡";
      window.setTimeout(nextScene, 700);
    }
  });

  stars.appendChild(star);
}

buildDots();
renderScene(0, false);
