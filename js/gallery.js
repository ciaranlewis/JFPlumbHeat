document.addEventListener('DOMContentLoaded', () => {
    loadAllGalleries();
  });
  
  function loadAllGalleries() {
    fetch('static/gallery/media.json')
      .then(res => res.json())
      .then(data => {
        Object.entries(data).forEach(([galleryId, files]) => {
          const container = document.querySelector(`#${galleryId} swiper-container`);
          if (!container) return; // skip if container not found
  
          files.forEach(file => {
            const slide = document.createElement('swiper-slide');
            const src = `/static/gallery/${galleryId}/${file}`;
  
            if (/\.(mp4|webm)$/i.test(file)) {
              slide.innerHTML = `
                <video
                  src="${src}"
                  muted
                  loop
                  playsinline
                  controls
                ></video>
              `;
            } else {
              slide.innerHTML = `<img src="${src}" alt="">`;
            }
  
            container.appendChild(slide);
          });
  
          // Initialize Swiper Web Component after slides are added
          container.initialize();
        });
      })
      .catch(err => console.error('Gallery load failed:', err));
  }
  