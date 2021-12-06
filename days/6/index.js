import fs from "fs";

const fishArray = fs.readFileSync("input.txt", "utf8").split(",").map(Number);

/**
 * Instead of running through the array of fish, have an array of days, and how many fish are set to wait i days.
 * @param {number[]} fishArray
 * @param {number} iterations
 */
function pivotSimulateGrowth(fishArray, iterations) {
  for (let i = 0; i < iterations; i++) {
    const numOfNewFish = fishArray.shift();
    fishArray[6] += numOfNewFish;
    fishArray[8] = numOfNewFish;
  }
  return fishArray.reduce((acc, curr) => acc + curr, 0);
}

const pivotFishArray = Array(9).fill(0);
fishArray.forEach((fish) => pivotFishArray[fish]++);

console.log(
  `Part 1: ${pivotSimulateGrowth(
    [...pivotFishArray],
    80
  )}, Part 2: ${pivotSimulateGrowth([...pivotFishArray], 256)}`
);
