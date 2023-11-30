/**
 * Apply styles to any element
 *
 * @param {HTMLElement} element
 * @param {Object} styles
 */
function applyStyles(element, styles = {}) {
  Object.keys(styles).forEach((styleName) => {
    const styleValue = styles[styleName];
    element.style[styleName] = styleValue;
  });
}

/**
 * Return a random number between a range
 * @param {number} min
 * @param {number} max
 * @returns number
 */
function getRandom(min = 0, max = 1) {
  return min + Math.random() * (max - min);
}

/**
 * Calculate distance between two co-ordinates
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns number
 */
function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * Generate random rgb value
 *
 * @returns string
 */
function generateRandomColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  // Construct the color string in the format "rgb(r, g, b)"
  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}

/**
 * calculate pixels from percent
 * 
 * @param {number} totalWidth 
 * @param {Number} percentage 
 * @returns number
 */
function calculatePercentage(totalWidth, percentage) {
  return (percentage / 100) * totalWidth;
}
