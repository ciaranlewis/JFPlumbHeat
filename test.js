const fs = require('fs');
const path = require('path');

const STATIC_DIR = path.join(__dirname, 'static');
const OUTPUT_FILE = path.join(STATIC_DIR, 'media.json');

const media = {};

fs.readdirSync(STATIC_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const folderName = dirent.name;
    const folderPath = path.join(STATIC_DIR, folderName);

    const files = fs.readdirSync(folderPath)
      .filter(file =>
        /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file)
      );

    media[folderName] = files;
  });

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(media, null, 2));
console.log('✅ media.json generated');
