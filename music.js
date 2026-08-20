const music = document.querySelector("#bgMusic");
const musicButton = document.querySelector("#soundToggle");

let pausedByUser = false;

music.volume = 0.42;
music.loop = true;

function syncMusicButton() {
  const playing = !music.paused && !music.ended;
  musicButton.classList.toggle("active", playing);
  musicButton.textContent = playing ? "♫" : "♪";
  musicButton.setAttribute("aria-pressed", String(playing));
}

async function playMusic() {
  try {
    await music.play();
    pausedByUser = false;
  } catch (error) {
    // Browsers can require a user gesture before audio playback.
  }

  syncMusicButton();
}

function unlockMusic() {
  if (!pausedByUser && music.paused) {
    playMusic();
  }
}

musicButton.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

musicButton.addEventListener("touchstart", (event) => {
  event.stopPropagation();
}, { passive: true });

musicButton.addEventListener("click", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (music.paused) {
    await playMusic();
  } else {
    pausedByUser = true;
    music.pause();
    syncMusicButton();
  }
});

document.addEventListener("pointerdown", unlockMusic, { once: true, passive: true });
document.addEventListener("keydown", unlockMusic, { once: true });

music.addEventListener("play", syncMusicButton);
music.addEventListener("pause", syncMusicButton);
music.addEventListener("ended", syncMusicButton);
music.addEventListener("error", syncMusicButton);

syncMusicButton();
