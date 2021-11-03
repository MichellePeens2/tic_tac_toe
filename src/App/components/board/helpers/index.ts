import { Symbol } from "../../../types";

export const evaluateRows = (board: Symbol[]): Symbol | null => {
  let ws = null;
  [0, 3, 6].forEach((index) => {
    let tmp = eveluateCells(board, index, index + 1, index + 2);
    if (tmp) {
      ws = tmp;
      return;
    }
    return;
  });
  return ws;
};

export const evaluateColumns = (board: Symbol[]): Symbol | null => {
  let ws = null;
  [0, 1, 2].forEach((index) => {
    let tmp = eveluateCells(board, index, index + 3, index + 6);
    if (tmp) {
      ws = tmp;
      return;
    }
    return;
  });
  return ws;
};

export const evaluateDiagonals = (board: Symbol[]): Symbol | null => {
  let ws = eveluateCells(board, 0, 4, 8);
  if (!ws) ws = eveluateCells(board, 2, 4, 6);
  return ws;
};

const eveluateCells = (
  board: Symbol[],
  c1: number,
  c2: number,
  c3: number
): Symbol | null => {
  if (board[c1] !== "" && board[c1] === board[c2] && board[c2] === board[c3])
    return board[c1];
  return null;
};
