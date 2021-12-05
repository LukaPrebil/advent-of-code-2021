import fs from "fs";

const [numbersInput, ...boardsInput] = fs
  .readFileSync("test-input.txt", "utf8")
  .split("\n\n");
const numbers = numbersInput.split(",").map(Number);
const boards = boardsInput.map((board) =>
  board.split("\n").map((row) =>
    row
      .split(" ")
      .filter((e) => e)
      .map((e) => ({ value: Number(e), marked: false }))
  )
);

// play bingo
const play = (numbers, boards) => {
  const boardsToPlay = JSON.parse(JSON.stringify(boards));
  const results = [];
  for (const number of numbers) {
    if (!boardsToPlay.length) break;
    for (const [boardIndex, board] of boardsToPlay.entries()) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          // number === 16 && console.log(number, board[i][j], [boardIndex, i, j]);
          if (number === 16 && board[i][j].value === 16) {
            console.log(board, boardsToPlay, boardsToPlay.map(board => board[0][0].value));
          }
          if (board[i][j].value === number) {
            board[i][j].marked = true;
            if (
              board[i].every((e) => e.marked) ||
              board.map((row) => row[j]).every((e) => e.marked)
            ) {
              results.push([number, JSON.parse(JSON.stringify(board))]);
              boardsToPlay.splice(boardIndex, 1);
            }
          }
        }
      }
    }
  }
  return results;
};
const calculateScore = (board, number) =>
  number *
  board
    .flat()
    .filter((e) => !e.marked)
    .map((e) => e.value)
    .reduce((a, b) => a + b);

const bingoResults = play(numbers, boards);
const [winningBingoNumber, winningBingoBoard] = bingoResults[0];
const [losingBingoNumber, losingBingoBoard] = bingoResults[bingoResults.length - 1];

console.log(
  `Part 1: Number is ${winningBingoNumber}, Result is ${calculateScore(
    winningBingoBoard,
    winningBingoNumber
  )}`
);

console.log(
  `Part 2: Number is ${losingBingoNumber}, Result is ${calculateScore(
    losingBingoBoard,
    losingBingoNumber
  )}`
);

