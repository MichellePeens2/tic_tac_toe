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
      className={
        `Block 
        ${board[index] === "X" ? "XClass" : ""} 
        ${board[index] === "O" ? "OClass" : ""}`
      }
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

  const evaluateRows = (board: Symbol[]): Symbol | null => { 
    [0, 3, 6].forEach((value) => {
      let ws = eveluateCells(board, value, value+1, value+2);  
      if(ws) return ws;
    });
    return null;
  }

  const evaluate = useCallback(
    (board: Symbol[]): void => {
      let ws = eveluateCells(board, 0, 1, 2);
      if (!ws) ws = eveluateCells(board, 3, 4, 5);
      if (!ws) ws = eveluateCells(board, 6, 7, 8);

      if (!ws) ws = eveluateCells(board, 0, 3, 6);
      if (!ws) ws = eveluateCells(board, 1, 4, 7);
      if (!ws) ws = eveluateCells(board, 2, 5, 8);

      if (!ws) ws = eveluateCells(board, 0, 4, 8);
      if (!ws) ws = eveluateCells(board, 2, 4, 6);

      if (playerOne.symbol === ws) setWinner(playerOne);
      if (playerTwo.symbol === ws) setWinner(playerTwo);
    },
    [playerOne, playerTwo]
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
          return <Block index={index} onClick={onClick} board={board} />;
        })}
      </div>

      <Button type="primary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
