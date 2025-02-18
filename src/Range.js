export function getHexesWithinRange(startX, startY, range) {
  const letters = 'ABCDEFGHIJ';
  const x = letters.indexOf(startX) + 1;
  const y = startY;

  if (x === -1 || isNaN(y) || range < 1) {
    throw new Error('Invalid tile format.');
  }

  let results = new Set();

  const centerColSpaces = 2 * range + 1;

  for (let col = -range; col <= range; col++) {
    let colSpaces = centerColSpaces - Math.abs(col);

    let halfSpaces = Math.floor(colSpaces / 2);
    let upperLim = halfSpaces;
    let lowerLim = halfSpaces;

    if (x % 2 === 0) {
      if (colSpaces % 2 === 0) {
        upperLim = halfSpaces - 1;
      } else {
        upperLim = halfSpaces;
      }
    } else {
      if (colSpaces % 2 === 0) {
        lowerLim = halfSpaces - 1;
      } else {
        lowerLim = halfSpaces;
      }
    }

    for (let row = -lowerLim; row <= upperLim; row++) {
      let newX = x + col - 1;
      let newY = y + row - 1;

      if (newX >= 0 && newX < 10 && newY >= 0 && newY < 10) {
        results.add(letters[newX] + (newY + 1));
      }
    }
  }

  return Array.from(results).sort();
}
