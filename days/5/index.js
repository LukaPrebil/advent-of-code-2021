import fs from "fs";

function Point(str) {
  const [x, y] = str.split(",").map(Number);
  this.x = x;
  this.y = y;


  this.isInlineWith = function(point) {
    return this.x === point.x || this.y === point.y;
  };
}

function pointsBetween(point1, point2) {
  const points = [point2];
  const xDiff = point2.x - point1.x;
  const yDiff = point2.y - point1.y;
  const xStep = xDiff / Math.abs(xDiff);
  const yStep = yDiff / Math.abs(yDiff);
  if (xDiff === 0) {
    for (let i = point1.y; i !== point2.y; i += yStep) {
      points.push(new Point(`${point1.x},${i}`));
    }
  } else if (yDiff === 0) {
    for (let i = point1.x; i !== point2.x; i += xStep) {
      points.push(new Point(`${i},${point1.y}`));
    }
  } else {
    let x = point1.x;
    let y = point1.y;
    while (x !== point2.x || y !== point2.y) {
      points.push(new Point(`${x},${y}`));
      x += xStep;
      y += yStep;
    }
  }
  return points;
}

const input = fs.readFileSync("input.txt", "utf8").split("\n").filter(l => !l.startsWith("#"));

const lines = input.map(line => line.split(" -> ")).map(([from, to]) => ({from: new Point(from), to: new Point(to)}));

const inLine = lines.filter(line => line.from.isInlineWith(line.to));

function generateField(lines) {
  const maxX = lines.reduce((max, line) => Math.max(max, line.from.x, line.to.x), 0);
  const maxY = lines.reduce((max, line) => Math.max(max, line.from.y, line.to.y), 0);

  const field = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0));

  lines.forEach(line => {
    const points = pointsBetween(line.from, line.to);
    points.forEach(point => {
        field[point.x][point.y]++;
    });
  });
  return field;
}
function countField(field) {
  return field.flat().map(Number).filter(n => n > 1).length;
}

const simpleField = generateField(inLine);
// simpleField.forEach(row => console.log(row.join("").replace(/0/g, ".")));

const field = generateField(lines);
// field.forEach(row => console.log(row.join("").replace(/0/g, ".")));



console.log(`Part 1: ${countField(simpleField)}, Part 2: ${countField(field)}`);