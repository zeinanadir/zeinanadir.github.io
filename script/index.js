import { debounce } from './util.js';

const NUM_PHOTOS = 16;
const MIN_PHOTO_SIZE_PX = 300;

const collage = document.querySelector('#collage');

let numColumns = null;
const calculateNumColumns = () => {
  const width = collage.offsetWidth;
  return Math.trunc(width / MIN_PHOTO_SIZE_PX) || 1;
};

const populateCollage = () => {
  // Get number of columns
  const newNumColumns = calculateNumColumns();

  // Only run update if number of columns has changed
  if (newNumColumns === numColumns) {
    return;
  }
  numColumns = newNumColumns;

  // Clear the collage
  while (collage.firstChild) {
    collage.removeChild(collage.firstChild);
  }

  // Create the columns
  const columns = Array(numColumns)
    .fill(null)
    .map((_) => document.createElement('div'));
  columns.forEach((column, i) => {
    column.classList.add('collage-column', i);
    collage.appendChild(column);
  });

  // Add images to columns
  for (let i = 1; i <= NUM_PHOTOS; i++) {
    // console.log(i % numColumns);
    const collageImage = document.createElement('img');
    collageImage.src = `assets/homePhotos/${i}.JPG`;
    collageImage.className = 'collage-img';
    columns[i % numColumns].appendChild(collageImage);
  }
};

const debouncedPopulateCollage = debounce((ev) => {
  populateCollage();
}, 150);

window.addEventListener('resize', debouncedPopulateCollage);

populateCollage();
