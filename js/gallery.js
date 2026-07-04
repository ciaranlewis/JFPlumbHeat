(function () {
  "use strict";

  // ---------- Config ----------
  const MANIFEST_PATH = "/static/gallery/media.json";
  const MEDIA_BASE = "/static/gallery/"; // + {key}/{filename}
  const CONTAINER_SELECTOR = "#gallery-grid";

  // Human-readable titles for manifest keys.
  // Edit these freely — this is the only place titles live.
  const TITLES = {
    gas_works: "Gas Works",
    bathroom: "Bathrooms",
    gas_safety: "Gas Safety Checks",
    boiler_service: "Boiler Servicing",
    ufh: "Underfloor Heating",
    plumb_inst: "Plumbing Installations",
    maintenance: "Maintenance",
    boiler_upgrades: "Boiler Upgrades",
  };

  function titleFor(key) {
    if (TITLES[key]) return TITLES[key];
    // Fallback: turn "some_key" into "Some Key" if a new category
    // gets added to the manifest before the TITLES map is updated.
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Extracts the number from filenames like "pic (12).jpg" so we can
  // sort 2, 10, 11, 12 correctly instead of alphabetically (2, 10, 11..).
  function fileNumber(filename) {
    const match = filename.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  function isVideo(filename) {
    return /\.mp4$/i.test(filename);
  }

  function sortedFiles(files) {
    return [...files].sort((a, b) => fileNumber(a) - fileNumber(b));
  }

  function mediaUrl(key, filename) {
    // encodeURIComponent handles the spaces/parentheses in filenames
    // like "pic (1).jpg" so the browser doesn't choke on the path.
    return MEDIA_BASE + encodeURIComponent(key) + "/" + encodeURIComponent(filename);
  }

  // ---------- Block building ----------
  function buildEmptyBlock(key) {
    const block = document.createElement("div");
    block.className = "gallery-block is-empty";
    block.innerHTML = `<h3 class="gallery-title">${titleFor(key)}</h3>`;
    return block;
  }

  function buildMediaElement(key, filename) {
    if (isVideo(filename)) {
      const video = document.createElement("video");
      video.className = "gallery-media";
      video.src = mediaUrl(key, filename);
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      return video;
    }
    const img = document.createElement("img");
    img.className = "gallery-media";
    img.src = mediaUrl(key, filename);
    img.alt = titleFor(key);
    return img;
  }

  function buildGalleryBlock(key, files) {
    const items = sortedFiles(files);
    let currentIndex = 0;

    const block = document.createElement("div");
    block.className = "gallery-block";

    const title = document.createElement("h3");
    title.className = "gallery-title";
    title.textContent = titleFor(key);

    const viewer = document.createElement("div");
    viewer.className = "gallery-viewer";
    if (items.length <= 1) viewer.classList.add("single-item");

    let mediaEl = buildMediaElement(key, items[currentIndex]);
    viewer.appendChild(mediaEl);

    function render() {
      const newMediaEl = buildMediaElement(key, items[currentIndex]);
      viewer.replaceChild(newMediaEl, mediaEl);
      mediaEl = newMediaEl;
    }

    if (items.length > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "gallery-arrow prev";
      prevBtn.setAttribute("aria-label", "Previous image");
      prevBtn.textContent = "‹";
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        render();
      });

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "gallery-arrow next";
      nextBtn.setAttribute("aria-label", "Next image");
      nextBtn.textContent = "›";
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length;
        render();
      });

      viewer.appendChild(prevBtn);
      viewer.appendChild(nextBtn);
    }

    block.appendChild(title);
    block.appendChild(viewer);
    return block;
  }

  // ---------- Init ----------
  async function initGallery() {
    const container = document.querySelector(CONTAINER_SELECTOR);
    if (!container) {
      console.error(`Gallery container "${CONTAINER_SELECTOR}" not found.`);
      return;
    }

    let manifest;
    try {
      const res = await fetch(MANIFEST_PATH);
      if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
      manifest = await res.json();
    } catch (err) {
      console.error("Could not load gallery manifest:", err);
      container.textContent = "Gallery is currently unavailable.";
      return;
    }

    Object.keys(manifest).forEach((key) => {
      const files = manifest[key] || [];
      const block =
        files.length === 0
          ? buildEmptyBlock(key)
          : buildGalleryBlock(key, files);
      container.appendChild(block);
    });
  }

  document.addEventListener("DOMContentLoaded", initGallery);
})();
