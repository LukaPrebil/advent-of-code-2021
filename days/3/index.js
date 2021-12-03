import fs from "fs";

const binaryNumbers = fs.readFileSync("input.txt", "utf8").split("\n");

const { gammaRate, epsilonRate } = getGammaAndEpsilonRates(binaryNumbers);
const { oxygenGeneratorRating, CO2GeneratorRating } = getOxygenAndCO2GeneratorRatings(binaryNumbers, gammaRate, epsilonRate);

console.log(`Part 1 result: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`);
console.log(`Part 2 result: ${parseInt(oxygenGeneratorRating, 2) * parseInt(CO2GeneratorRating, 2)}`);

function getOxygenAndCO2GeneratorRatings(binaryNumbers, gammaRate, epsilonRate) {
  let oxygenGeneratorRating = "";
  let CO2GeneratorRating = "";
  let remainingNumbersOxygen = binaryNumbers;
  let remainingNumbersCO2 = binaryNumbers;
  let changingGammaRate = gammaRate;
  let changingEpsilonRate = epsilonRate;

  for (let i = 0; i < gammaRate.length; i++) {
    if (!oxygenGeneratorRating) {
      remainingNumbersOxygen = remainingNumbersOxygen.filter((binaryNumber) => binaryNumber[i] === changingGammaRate[i]);
      changingGammaRate = getGammaAndEpsilonRates(remainingNumbersOxygen).gammaRate;
    }
    if (!CO2GeneratorRating) {
      remainingNumbersCO2 = remainingNumbersCO2.filter((binaryNumber) => binaryNumber[i] === changingEpsilonRate[i]);
    } changingEpsilonRate = getGammaAndEpsilonRates(remainingNumbersCO2).epsilonRate;

    if (remainingNumbersOxygen.length === 1) {
      oxygenGeneratorRating = remainingNumbersOxygen[0];
    }
    if (remainingNumbersCO2.length === 1) {
      CO2GeneratorRating = remainingNumbersCO2[0];
    }
  }
  return { oxygenGeneratorRating, CO2GeneratorRating };
}

function getGammaAndEpsilonRates(binaryNumbers) {
  const bits = [];
  for (let i = 0; i < binaryNumbers[0].length; i++) {
    bits.push({ 0: 0, 1: 0 });
  }

  binaryNumbers.forEach((binaryNumber) => {
    const binaryNumberArray = binaryNumber.split("");
    for (let i = 0; i < binaryNumberArray.length; i++) {
      const bit = binaryNumberArray[i];
      bits[i][bit]++;
    }
  });

  const gammaRate = bits.map((bit) => (bit["0"] > bit["1"] ? "0" : "1")).join("");
  const epsilonRate = bits.map((bit) => (bit["0"] <= bit["1"] ? "0" : "1")).join("");
  return { gammaRate, epsilonRate };
}
