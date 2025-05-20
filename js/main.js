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
  

  document.addEventListener("DOMContentLoaded", function () {
    const swipers = document.querySelectorAll(".mySwiper");
  
    swipers.forEach((swiperEl) => {
      new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: swiperEl.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: swiperEl.querySelector(".swiper-button-next"),
          prevEl: swiperEl.querySelector(".swiper-button-prev"),
        },
      });
    });
  });
  
 
  
  