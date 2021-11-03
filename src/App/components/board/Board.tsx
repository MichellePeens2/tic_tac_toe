import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../components";
import { Player, Symbol } from "../../types";
import { evaluateRows, evaluateColumns, evaluateDiagonals } from "./helpers";
import "./Board.css";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Block({
  index,
  board,
  symbol,
  onClick,
}: {
  index: number;
  board: Symbol[];
  symbol: Symbol;
  onClick: (index: number) => void;
}) {
  return (
    <div
      id={`block${index}`}
      className={`Block${board[index] === "X" ? " XClass" : ""}${
        board[index] === "O" ? " OClass" : ""
      }${
        board[index] !== "X" && board[index] !== "O" ? ` ${symbol}Hover` : ""
      }`}
      onClick={() => onClick(index)}
    />
  );
}

export default function Board({
  playerOne,
  playerTwo,
  onRestart,
}: {
  playerOne: Player;
  playerTwo: Player;
  onRestart: () => void;
}) {
  const [board, setBoard] = useState<Symbol[]>(CELLS.map(() => ""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerOne);
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const onReset = () => {
    setBoard(CELLS.map(() => ""));
    setCurrentPlayer(playerOne);
    setWinner(null);
  };

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

  const evaluate = useCallback(
    (board: Symbol[]): void => {
      let ws = evaluateRows(board);
      if (!ws) ws = evaluateColumns(board);
      if (!ws) ws = evaluateDiagonals(board);

      if (ws && ws === playerOne.symbol) setWinner(playerOne);
      if (ws && ws === playerTwo.symbol) setWinner(playerTwo);
    },
    [playerOne, playerTwo]
  );

  const isGameOver = (winner: Player | null, board: Symbol[]): void => {
    setGameOver(!winner && board.indexOf("") === -1);
  };

  useEffect(() => {
    isGameOver(winner, board);
  }, [winner, board]);

  useEffect(() => {
    evaluate(board);
  }, [board, evaluate]);

  return (
    <>
      <div className="Player">
        <h1 className="PlayerSymbol">{playerOne.symbol}</h1>
        <p className="PlayerName">{playerOne.name}</p>
        {winner && winner === playerOne && <p className="Winner">WINNER</p>}
        {((winner && winner !== playerOne) || gameOver) && <p className="Loser">LOSER</p>}
      </div>

      <div className="Player">
        <h1 className="PlayerSymbol">{playerTwo.symbol}</h1>
        <p className="PlayerName">{playerTwo.name}</p>
        {winner && winner === playerTwo && <p className="Winner">WINNER</p>}
        {((winner && winner !== playerTwo) || gameOver) && <p className="Loser">LOSER</p>}
      </div>

      <div className="Board">
        {CELLS.map((_, index) => {
          return (
            <Block
              key={index}
              index={index}
              board={board}
              symbol={currentPlayer.symbol}
              onClick={onClick}
            />
          );
        })}
      </div>

      <Button type="primary" onClick={onReset}>
        Reset
      </Button>
      <Button type="secondary" onClick={onRestart}>
        Restart
      </Button>
    </>
  );
}
