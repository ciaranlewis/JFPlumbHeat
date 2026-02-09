document.addEventListener('DOMContentLoaded', () => {
  loadAllGalleries();
});

function loadAllGalleries() {
  fetch('static/gallery/media.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      Object.entries(data).forEach(([galleryId, files]) => {
        if (!Array.isArray(files)) return;

        const container = document.querySelector(`#${galleryId} swiper-container`);
        if (!container) return;

        files.forEach(file => {
          const slide = document.createElement('swiper-slide');
          const src = `static/gallery/${galleryId}/${encodeURIComponent(file)}`;

          if (/\.(mp4|webm)$/i.test(file)) {
            slide.innerHTML = `
              <video src="${src}" muted loop playsinline controls></video>
            `;
          } else {
            slide.innerHTML = `
              <img src="${src}" loading="lazy" alt="">
            `;
          }

          container.appendChild(slide);
        });

        container.initialize();
      });
    })
    .catch(err => console.error('Gallery load failed:', err));
}
