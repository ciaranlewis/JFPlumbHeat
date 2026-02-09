document.addEventListener('DOMContentLoaded', () => {
  loadAllGalleries();
});

function loadAllGalleries() {
  fetch('static/gallery/media.json')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      Object.entries(data).forEach(([galleryId, files]) => {
        if (!Array.isArray(files)) {
          console.warn(`Skipping ${galleryId}: files is not an array`, files);
          return;
        }

        const container = document.querySelector(`#${galleryId} swiper-container`);
        if (!container) return;

        files.forEach(file => {
          const slide = document.createElement('swiper-slide');
          const src = `static/gallery/${galleryId}/${encodeURIComponent(file)}`;

          if (/\.(mp4|webm)$/i.test(file)) {
            slide.innerHTML = `
              <video src="${src}" muted loop playsinline controls loading="lazy"></video>
            `;
          } else {
            slide.innerHTML = `
              <img
                data-src="${src}"
                class="swiper-lazy"
                alt=""
              >
              <div class="swiper-lazy-preloader"></div>
            `;
          }

          container.appendChild(slide);
        });

        // Ensure Swiper initializes AFTER slides exist
        container.initialize();
      });
    })
    .catch(err => console.error('Gallery load failed:', err));
}
