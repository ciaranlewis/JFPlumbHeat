// Lazily builds each gallery's slides only when that section is about to
// scroll into view, instead of building every slide on every gallery for
// the whole page up front. This is what actually keeps memory usage sane
// on mobile — native `loading="lazy"` on <img> only defers image bytes,
// it does nothing for <video>, and it doesn't stop the browser from having
// to hold hundreds of DOM nodes at once if they're all created immediately.

let mediaDataPromise = null;

function getMediaData() {
  if (!mediaDataPromise) {
    mediaDataPromise = fetch('static/gallery/media.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      });
  }
  return mediaDataPromise;
}

function buildGallery(galleryId, files) {
  const container = document.querySelector(`#${galleryId} swiper-container`);
  if (!container || container.dataset.built === 'true') return;
  container.dataset.built = 'true';

  files.forEach(file => {
    const slide = document.createElement('swiper-slide');
    const src = `static/gallery/${galleryId}/${encodeURIComponent(file)}`;

    if (/\.(mp4|webm)$/i.test(file)) {
      // preload="none" is the important part here: without it, mobile
      // browsers will start fetching video data for every <video> element
      // as soon as it exists in the DOM, regardless of lazy-loading on
      // images. With this, nothing downloads until the user taps play.
      slide.innerHTML = `
        <video src="${src}" muted loop playsinline controls preload="none"></video>
      `;
    } else {
      slide.innerHTML = `
        <img src="${src}" loading="lazy" alt="">
      `;
    }

    container.appendChild(slide);
  });

  container.initialize();
  setupVideoBehaviour(container);
}

function setupVideoBehaviour(container) {
  // Belt-and-braces mute enforcement: forcing muted = true on load/play
  // keeps every video silent even if a user finds a way to toggle the
  // native controls' unmute button.
  container.querySelectorAll('video').forEach(video => {
    video.muted = true;
    video.addEventListener('loadedmetadata', () => { video.muted = true; });
    video.addEventListener('play', () => { video.muted = true; });
  });

  // Pause + reset every video whenever the slide changes, so a video
  // doesn't keep playing in the background after you've swiped past it.
  container.addEventListener('swiperslidechange', () => {
    container.querySelectorAll('video').forEach(video => {
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  });
}

function loadAllGalleries() {
  getMediaData()
    .then(data => {
      const blocks = document.querySelectorAll('.gallery-block');

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const galleryId = entry.target.id;
          const files = data[galleryId];
          if (Array.isArray(files) && files.length) {
            buildGallery(galleryId, files);
          }
          obs.unobserve(entry.target);
        });
      }, {
        // Start building a section slightly before it's actually on
        // screen, so it's ready by the time the user scrolls to it.
        rootMargin: '400px 0px',
        threshold: 0.01
      });

      blocks.forEach(block => observer.observe(block));
    })
    .catch(err => console.error('Gallery load failed:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  loadAllGalleries();
});