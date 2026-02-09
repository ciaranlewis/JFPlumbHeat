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
          // Skip if files is not an array
          if (!Array.isArray(files)) {
            console.warn(`Skipping ${galleryId}: files is not an array`, files);
            return;
          }
  
          const container = document.querySelector(`#${galleryId} swiper-container`);
          if (!container) return; // skip if container not found
  
          files.forEach(file => {
            const slide = document.createElement('swiper-slide');
            // encode file names to handle spaces/special characters
            const src = `static/gallery/${galleryId}/${encodeURIComponent(file)}`;
  
            if (/\.(mp4|webm)$/i.test(file)) {
              slide.innerHTML = `<video src="${src}" muted loop playsinline controls></video>`;
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
  