import { Character } from "../../../types";

export const findWinner = (board: Character[]): Character | null => {
  let wc = evaluateRows(board);
  if (!wc) wc = evaluateColumns(board);
  if (!wc) wc = evaluateDiagonals(board);
  return wc;
};

const evaluateRows = (board: Character[]): Character | null => {
  for (let index of [0, 3, 6]) {
    let wc = evaluateCells(board, index, index + 1, index + 2);
    if (wc) return wc;
  }
  return null;
};

const evaluateColumns = (board: Character[]): Character | null => {
  for (let index of [0, 1, 2]) {
    let wc = evaluateCells(board, index, index + 3, index + 6);
    if (wc) return wc;
  }
  return null;
};

const evaluateDiagonals = (board: Character[]): Character | null => {
  let wc = evaluateCells(board, 0, 4, 8);
  if(wc) return wc;
  return evaluateCells(board, 2, 4, 6);
};

const evaluateCells = (
  board: Character[],
  c1: number,
  c2: number,
  c3: number
): Character | null => {
  if (board[c1] !== "" && board[c1] === board[c2] && board[c2] === board[c3])
    return board[c1];
  return null;
};
