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