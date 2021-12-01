import fs from "fs";

const inputFile = fs.readFileSync("input.txt", "utf8");
const input = inputFile.split("\n").map(Number);

// Setup for both parts
const countIncreases = (input) =>
	input
		.map((value, index) => {
			const nextValue = input[index + 1];
			return nextValue && value < nextValue;
		})
		.filter(Boolean).length;
// Setup for part 2
const windowOfThree = input.reduce((acc, value, index) => {
	const nextValue = input[index + 1];
	const nextNextValue = input[index + 2];
	if (nextValue && nextNextValue) {
		acc.push(value + nextValue + nextNextValue);
	}
	return acc;
}, []);

// Part 1
const increases = countIncreases(input);

// Part 2
const windowedIncreases = countIncreases(windowOfThree);

console.log(
	`Number of increases: ${increases}. Number of increases with a window size of 3: ${windowedIncreases}`
);
