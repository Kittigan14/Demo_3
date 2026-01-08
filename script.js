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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      lenis.scrollTo(targetEl, {
        offset: -120,
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    }
  });
});

const arrowBtn = document.getElementById('arrowDownBtn');
let currentSection = 'home';

const navigationMap = {
  'home': null,
  'about': 'skills',
  'skills': 'experience',
  'experience': 'projects',
  'projects': 'contact',
  'contact': 'home'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.getAttribute('data-section');
      if (sectionName) {
        currentSection = sectionName;
        console.log('Current section:', currentSection);
        updateArrowButton();
      }
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-15% 0px -15% 0px'
});

document.querySelectorAll('[data-section]').forEach(section => {
  sectionObserver.observe(section);
});

function updateArrowButton() {
  if (!arrowBtn) return;
  
  if (currentSection === 'home' || window.innerWidth > 768) {
    arrowBtn.style.display = 'none';
  } else {
    arrowBtn.style.display = 'block';
  }
}

if (arrowBtn) {
  arrowBtn.addEventListener('click', () => {
    const nextSection = navigationMap[currentSection];
    
    if (nextSection) {
      const targetElement = document.querySelector(`[data-section="${nextSection}"]`);
      
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: nextSection === 'home' ? 0 : -80,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  });
}

function checkViewport() {
  updateArrowButton();
}

checkViewport();
window.addEventListener('resize', checkViewport);