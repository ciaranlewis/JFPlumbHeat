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
  