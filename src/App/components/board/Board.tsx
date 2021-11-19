import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { Player, Character } from "../../types";
import { findWinner } from "./helpers";
import "./Board.css";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function Block({
  index,
  board,
  character,
  complete,
  onClick,
}: {
  index: number;
  board: Character[];
  character: Character;
  complete: Boolean;
  onClick: (index: number) => void;
}) {
  const classNames: string[] = [];
  if (board[index] === "X") {
    classNames.push("XClass");
  } else if (board[index] === "O") {
    classNames.push("OClass");
  } else {
    classNames.push(`${character}Hover`);
  }
  if (complete) classNames.push("Complete");

  return (
    <div
      id={`block${index}`}
      className={`Block ${classNames.join(" ")}`}
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
  const [board, setBoard] = useState<Character[]>(CELLS.map(() => ""));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerOne);
  const [winner, setWinner] = useState<Player | null>(null);
  const [complete, setComplete] = useState<Boolean>(false);
  const isFull = board.every((cell) => cell !== "");

  const onReset = () => {
    setBoard(CELLS.map(() => ""));
    setCurrentPlayer(playerOne);
    setWinner(null);
    setComplete(false);
  };

  const onClick = (index: number) => {
    setBoard((prevBoard) => {
      const newBoardState = [...prevBoard];
      newBoardState[index] = currentPlayer.character;

      if (currentPlayer.character === "X") {
        setCurrentPlayer(playerTwo);
      } else {
        setCurrentPlayer(playerOne);
      }
      return newBoardState;
    });
  };

  useEffect(() => {
    const wc = findWinner(board);
    if (wc === playerOne.character) setWinner(playerOne);
    if (wc === playerTwo.character) setWinner(playerTwo);

    setComplete(wc !== null || isFull);
  }, [board, playerOne, playerTwo, isFull]);

  const renderPlayerStatus = (player: Player) => {
    if (winner === player) return <p className="Winner">WINNER</p>;
    if (winner && winner !== player) return <p className="Loser">LOSER</p>;
    if (isFull) return <p className="Tie">TIE</p>;
  };

  return (
    <>
      <div className="Player">
        <h1 className="PlayerCharacter">{playerOne.character}</h1>
        <p className="PlayerName">{playerOne.name}</p>
        {complete && renderPlayerStatus(playerOne)}
      </div>

      <div className="Player">
        <h1 className="PlayerCharacter">{playerTwo.character}</h1>
        <p className="PlayerName">{playerTwo.name}</p>
        {complete && renderPlayerStatus(playerTwo)}
      </div>

      <div className="Board">
        {CELLS.map((_, index) => {
          return (
            <Block
              key={index}
              index={index}
              board={board}
              character={currentPlayer.character}
              complete={complete}
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
