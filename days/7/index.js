import fs from "fs";

const input = fs.readFileSync("input.txt", "utf8").split(",").map(Number);

const [min, max] = [Math.min(...input), Math.max(...input)];

const median = (arr) => {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const medianPosition = median(input);
const fuelRequired = input.reduce((acc, curr) => acc + Math.abs(curr - medianPosition), 0);

console.log(`Part 1: Position that expends the least amount of fuel is ${medianPosition}, with a fuel of ${fuelRequired}`);

const sumOfLen = (l) => (l * (l + 1)) / 2;
const optimal = {fuel: Infinity, pos: 0};
for (let i = min; i <= max; i++) {
  const fuelRequired = input.reduce((acc, curr) => acc + sumOfLen(Math.abs(curr - i)), 0);
  if (fuelRequired < optimal.fuel) {
    optimal.fuel = fuelRequired;
    optimal.pos = i;
  }
}

console.log(`Part 2: Position that expends the least amount of fuel is ${optimal.pos}, with a fuel of ${optimal.fuel}`);
