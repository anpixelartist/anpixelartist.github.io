// Marquee: duplicate each track so the loop is seamless. Copies are hidden from screen readers.
document.querySelectorAll("[data-marquee]").forEach((marquee) => {
  const track = marquee.querySelector(".marquee__track");
  const copy = track.cloneNode(true);
  copy.setAttribute("aria-hidden", "true");
  copy.removeAttribute("aria-label");
  marquee.append(copy);
});

// Spotlight cards: move the glow with the pointer (mouse/pen only), at most once per frame.
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    let frame = 0;
    card.addEventListener("pointermove", (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
        frame = 0;
      });
    });
    card.addEventListener("pointerenter", () => card.style.setProperty("--spot", "1"));
    card.addEventListener("pointerleave", () => card.style.setProperty("--spot", "0"));
  });
}

// Pause looping animations while they are off screen.
const loops = document.querySelectorAll(".hero, .marquee, .shine");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle("is-offscreen", !entry.isIntersecting));
});
loops.forEach((el) => io.observe(el));

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
