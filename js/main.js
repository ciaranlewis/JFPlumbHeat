// Mobile Nav Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-nav');
  
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }
  
    // Social Icons Toggle
    const btn = document.querySelector('.social-toggle');
    const icons = document.querySelector('.socials');
  
    if (btn && icons) {
      btn.addEventListener('click', () => {
        icons.classList.toggle('active');
      });
    }
  
    // Initialize AOS (Animate on Scroll)
    AOS.init({
      once: true // Animate only once per element
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const bgVideo = document.querySelector('.bg-video');
    if (bgVideo) {
      const playPromise = bgVideo.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started
          })
          .catch(err => {
            // Autoplay was prevented
            console.warn('iOS autoplay blocked. User must interact to play video.', err);
          });
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {

  const checkbox = document.getElementById('privacy-consent');
  const submitButton = document.getElementById('submit-button');

  // Enable/disable submit button based on checkbox
  checkbox.addEventListener('change', () => {
    submitButton.disabled = !checkbox.checked;
  });
  });
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;
let slideCount = slides.length

// slides.forEach((_, index) => {

// })

function goToSlide(index){
  currentSlide = (index + slideCount) % slideCount;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function handleNextSlide(){
  goToSlide(currentSlide + 1)
}

function handlePrevSlide(){
  goToSlide(currentSlide - 1)
}

prevButton.addEventListener("click", handlePrevSlide)
nextButton.addEventListener("click", handleNextSlide)