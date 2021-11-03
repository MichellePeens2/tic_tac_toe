import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../components";
import { Player, Symbol } from "../../types";
import "./Board.css";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Block({
  board,
  index,
  onClick,
}: {
  board: Symbol[];
  index: number;
  onClick: (index: number) => void;
}) {
  return (
    <div
      id={`block${index}`}
      className={`Block 
        ${board[index] === "X" ? "XClass" : ""} 
        ${board[index] === "O" ? "OClass" : ""}`}
      onClick={() => onClick(index)}
    />
  );
}

export default function Board({
  playerOne,
  playerTwo,
  onReset,
}: {
  playerOne: Player;
  playerTwo: Player;
  onReset: () => void;
}) {
  const [board, setBoard] = useState<Symbol[]>(CELLS.map(() => ""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerOne);
  const [winner, setWinner] = useState<Player | null>(null);

  const onClick = (index: number) => {
    setBoard((prevBoard) => {
      const newBoardState = [...prevBoard];
      newBoardState[index] = currentPlayer.symbol;
      currentPlayer.symbol === "X"
        ? setCurrentPlayer(playerTwo)
        : setCurrentPlayer(playerOne);
      return newBoardState;
    });
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

  const evaluateRows = useCallback((board: Symbol[]): Symbol | null => {
    let ws = null;
    [0, 3, 6].forEach((index) => {
      let tmp = eveluateCells(board, index, index + 1, index + 2);
      if(tmp){
        ws = tmp
        return;
      }
      return;
    });
    return ws;
  }, []);

  const evaluateColumns = useCallback((board: Symbol[]): Symbol | null => {
    let ws = null;
    [0, 1, 2].forEach((index) => {
      let tmp = eveluateCells(board, index, index + 3, index + 6);
      if(tmp){
        ws = tmp
        return;
      }
      return;
    });
    return ws;
  }, []);

  const evaluateDiagonals = useCallback((board: Symbol[]): Symbol | null => {
    let ws = eveluateCells(board, 0, 4, 8);
    if (!ws) ws = eveluateCells(board, 2, 4, 6);
    return ws;
  }, []);

  const evaluate = useCallback(
    (board: Symbol[]): void => {
      let ws = evaluateRows(board);
      if (!ws) ws = evaluateColumns(board);
      if (!ws) ws = evaluateDiagonals(board);

      if (playerOne.symbol === ws) setWinner(playerOne);
      if (playerTwo.symbol === ws) setWinner(playerTwo);
    },
    [playerOne, playerTwo, evaluateRows, evaluateColumns, evaluateDiagonals]
  );

  useEffect(() => {
    evaluate(board);
  }, [board, evaluate]);

  return (
    <>
      <div className="Player">
        <p>{playerOne.name}</p>
        <p>{playerOne.symbol}</p>
        <p className="Winner">{winner?.name === playerOne.name && "WINNER"}</p>
      </div>

      <div className="Player">
        <p>{playerTwo.name}</p>
        <p>{playerTwo.symbol}</p>
        <p className="Winner">{winner?.name === playerTwo.name && "WINNER"}</p>
      </div>

      <div className="Board">
        {CELLS.map((_, index) => {
          return (
            <Block key={index} index={index} onClick={onClick} board={board} />
          );
        })}
      </div>

      <Button type="primary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
