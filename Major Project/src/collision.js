/**
 * Checking collision
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} width1
 * @param {number} height1
 * @param {number} x2
 * @param {number} y2
 * @param {number} width2
 * @param {number} height2
 * @returns boolean
 */
export function rectangleOverlaps(
  x1,
  y1,
  width1,
  height1,
  x2,
  y2,
  width2,
  height2
) {
  return (
    x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2
  );
}

/**
 *
 * @param {Object} box1
 * @param Object} box2
 * @returns boolean
 */
export function boxOverlaps(box1, box2) {
  return rectangleOverlaps(
    box1.x,
    box1.y,
    box1.width,
    box1.height,
    box2.x,
    box2.y,
    box2.width,
    box2.height
  );
}

/**
 *
 * Getting the actual dimension of box passed
 *
 * @param {Object} position
 * @param {number} direction
 * @param {Object} box
 * @returns Object
 */
export function getActualBoxDimensions(position, direction, box) {
  const x1 =
    direction == 1
      ? position.x + box.x * direction
      : position.x - box.x * direction;
  const x2 =
    direction == 1 ? x1 + box.width * direction : x1 - box.width * direction;

  return {
    x: Math.min(x1, x2),
    y: position.y + box.y,
    width: box.width,
    height: box.height,
  };
}
