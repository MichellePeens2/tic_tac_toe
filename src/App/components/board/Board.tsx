import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../components";
import { Player, Symbol } from "../../types";
import "./Board.css";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function Board({ playerOne, playerTwo, onReset }: { playerOne: Player, playerTwo: Player, onReset: () => void }) {
  const [board, setBoard] = useState<Symbol[]>(CELLS.map(() => ''));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(playerOne);

  const onClick = (index: number) => {
    setBoard(prevBoard => {
        const newBoardState = [...prevBoard];    
        newBoardState[index] = currentPlayer.symbol; 
        currentPlayer.symbol === 'X' ? 
          setCurrentPlayer(playerTwo) : 
          setCurrentPlayer(playerOne)
        return newBoardState;
    })
  }

  const evaluate = (board: Symbol[]) => {
    
  }

  useEffect(() => {
    evaluate(board);
  }, [board])
    
  return (
    <>
      <div className="Player">
        <p>{playerOne.name}</p>
        <p>{playerOne.symbol}</p>
        <p>_</p>
      </div>

      <div className="Player">
        <p>{playerTwo.name}</p>
        <p>{playerTwo.symbol}</p>
        <p>_</p>
      </div>

      <div className="Board">
        <div id="block0" className={`Block ${board[0] === 'X' && 'XClass'} ${board[0] === 'O' && 'OClass'}`} onClick={() => onClick(0)}></div>
        <div id="block1" className={`Block ${board[1] === 'X' && 'XClass'} ${board[1] === 'O' && 'OClass'}`} onClick={() => onClick(1)}></div>
        <div id="block2" className={`Block ${board[2] === 'X' && 'XClass'} ${board[2] === 'O' && 'OClass'}`} onClick={() => onClick(2)}></div>
        <div id="block3" className={`Block ${board[3] === 'X' && 'XClass'} ${board[3] === 'O' && 'OClass'}`} onClick={() => onClick(3)}></div>
        <div id="block4" className={`Block ${board[4] === 'X' && 'XClass'} ${board[4] === 'O' && 'OClass'}`} onClick={() => onClick(4)}></div>
        <div id="block5" className={`Block ${board[5] === 'X' && 'XClass'} ${board[5] === 'O' && 'OClass'}`} onClick={() => onClick(5)}></div>
        <div id="block6" className={`Block ${board[6] === 'X' && 'XClass'} ${board[6] === 'O' && 'OClass'}`} onClick={() => onClick(6)}></div>
        <div id="block7" className={`Block ${board[7] === 'X' && 'XClass'} ${board[7] === 'O' && 'OClass'}`} onClick={() => onClick(7)}></div>
        <div id="block8" className={`Block ${board[8] === 'X' && 'XClass'} ${board[8] === 'O' && 'OClass'}`} onClick={() => onClick(8)}></div>
      </div>

      <Button type="primary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
