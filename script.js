import Lenis from "https://cdn.skypack.dev/@studio-freight/lenis@0.1.12";
import Ukiyo from "https://cdn.skypack.dev/ukiyojs";

const els = document.querySelectorAll(".ukiyo");
els.forEach((el) => {
  new Ukiyo(el, {
    scale: el.dataset.uScale || 1.2,
    speed: el.dataset.uSpeed || 1.1,
    willChange: true,
  });
});

const lenis = new Lenis({
  lerp: 0.08,
  smooth: true,
  smoothTouch: false,
  direction: "vertical",
  gestureDirection: "vertical",
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on("scroll", (e) => {});

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
}, observerOptions);

const animateElements = document.querySelectorAll(".content-text, .content-image");
animateElements.forEach((el) => {
  observer.observe(el);
});