const fx = document.querySelector("#fx");

const symbols = ["✦", "·", "♡", "✧"];

function spawnParticle() {
  const particle = document.createElement("span");
  particle.className = "fx-particle";
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${100 + Math.random() * 10}%`;
  particle.style.fontSize = `${8 + Math.random() * 10}px`;
  particle.style.color = `rgba(231, 169, 255, ${0.18 + Math.random() * 0.35})`;
  particle.style.animationDuration = `${8 + Math.random() * 8}s`;

  fx.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove(), { once: true });
}

for (let i = 0; i < 22; i += 1) {
  window.setTimeout(spawnParticle, i * 250);
}

window.setInterval(spawnParticle, 900);
