import fs from "fs";

const directions = {
  FORWARD: "forward",
  UP: "up",
  DOWN: "down",
};

const commands = fs.readFileSync("input.txt", "utf8").split("\n");

/**
 * @param {string[]} commands
 */
function getFinalPositionPart1(commands) {
  return commands.reduce(
    (acc, command) => {
      const [direction, steps] = command.split(" ");
      const step = parseInt(steps);

      switch (direction) {
        case directions.FORWARD:
          return {
            x: acc.x + step,
            y: acc.y,
          };
        case directions.UP:
          return {
            x: acc.x,
            y: acc.y - step,
          };
        case directions.DOWN:
          return {
            x: acc.x,
            y: acc.y + step,
          };
        default:
          return acc;
      }
    },
    { x: 0, y: 0 }
  );
}

/**
 *
 * @param {string[]} commands
 */
function getFinalPositionPart2(commands) {
  let aim = 0;
  return commands.reduce(
    (acc, command) => {
      const [direction, steps] = command.split(" ");
      const step = parseInt(steps);

      switch (direction) {
        case directions.FORWARD:
          return {
            x: acc.x + step,
            y: acc.y + aim * step,
          };
        case directions.UP:
          aim -= step;
          return acc;
        case directions.DOWN:
          aim += step;
          return acc;
        default:
          return acc;
      }
    },
    { x: 0, y: 0 }
  );
}

const simplePosition = getFinalPositionPart1(commands);
console.log(
  `Part 1 final position: (${simplePosition.x}, ${
    simplePosition.y
  }), puzzle result is ${simplePosition.x * simplePosition.y}`
);

const complexPosition = getFinalPositionPart2(commands);
console.log(
  `Part 2 final position: (${complexPosition.x}, ${
    complexPosition.y
  }), puzzle result is ${complexPosition.x * complexPosition.y}`
);
