import React, { useEffect, useState } from "react";
import "./Board.css";
import { Button } from "../../components";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function Board({ playerX, playerO, onReset }: { playerX: string, playerO: string, onReset: () => void }) {
  const [blocks, setBlocks] = useState<('X' | 'O' | '')[]>(CELLS.map(() => ''));
  const [currentPlayer, setCurrentPlayer] = useState(playerX);
  const [winningPlayer, setWinningPlayer] = useState<null | string>(null);

  useEffect(() => {
    if(
        (blocks[0] !== '') && 
        (blocks[0] === blocks[1]) &&
        (blocks[1] === blocks[2])
      ){
        setWinner();
    }

    if(
      (blocks[3] !== '') && 
      (blocks[3] === blocks[4]) &&
      (blocks[4] === blocks[5])
    ){
      setWinner();
    }

    if(
      (blocks[6] !== '') && 
      (blocks[6] === blocks[7]) &&
      (blocks[7] === blocks[8])
    ){
      setWinner();
    }

    if(
      (blocks[0] !== '') && 
      (blocks[0] === blocks[3]) &&
      (blocks[3] === blocks[6])
    ){
      setWinner();
    }

    if(
      (blocks[1] !== '') && 
      (blocks[1] === blocks[4]) &&
      (blocks[4] === blocks[7])
    ){
      setWinner();
    }

    if(
      (blocks[2] !== '') && 
      (blocks[2] === blocks[5]) &&
      (blocks[5] === blocks[8])
    ){
      setWinner();
    }

    if(
      (blocks[0] !== '') && 
      (blocks[0] === blocks[4]) &&
      (blocks[4] === blocks[8])
    ){
      setWinner();
    }

    if(
      (blocks[2] !== '') && 
      (blocks[2] === blocks[4]) &&
      (blocks[4] === blocks[6])
    ){
      setWinner();
    }
  });

  const setWinner = () => {
    if(currentPlayer === playerX) setWinningPlayer(playerO); // because the currentPlayer has already moved on
    if(currentPlayer === playerO) setWinningPlayer(playerX); 
  }

  const onClick = (n: number) => {
    setBlocks(prevBlocks => {
        const newBlockState = [...prevBlocks]; 
        
        if(currentPlayer === playerX) newBlockState[n] = 'X'; 
        if(currentPlayer === playerO) newBlockState[n] = 'O';

        return newBlockState;
    })

    setCurrentPlayer(prevPlayer => {
      if(prevPlayer === playerX) {
        return playerO;
      } else {
        return playerX;
      }      
    })
  }
    
  return (
    <>
      <p>{winningPlayer}</p>

      <div className="Player">
        <p>{playerX}</p>
        <p>X</p>
        <p>_</p>
      </div>

      <div className="Player">
        <p>{playerO}</p>
        <p>O</p>
        <p>_</p>
      </div>

      <div className="Board">
        <div id="block0" className={`Block ${blocks[0] === 'X' && 'XClass'} ${blocks[0] === 'O' && 'OClass'}`} onClick={() => onClick(0)}></div>
        <div id="block1" className={`Block ${blocks[1] === 'X' && 'XClass'} ${blocks[1] === 'O' && 'OClass'}`} onClick={() => onClick(1)}></div>
        <div id="block2" className={`Block ${blocks[2] === 'X' && 'XClass'} ${blocks[2] === 'O' && 'OClass'}`} onClick={() => onClick(2)}></div>
        <div id="block3" className={`Block ${blocks[3] === 'X' && 'XClass'} ${blocks[3] === 'O' && 'OClass'}`} onClick={() => onClick(3)}></div>
        <div id="block4" className={`Block ${blocks[4] === 'X' && 'XClass'} ${blocks[4] === 'O' && 'OClass'}`} onClick={() => onClick(4)}></div>
        <div id="block5" className={`Block ${blocks[5] === 'X' && 'XClass'} ${blocks[5] === 'O' && 'OClass'}`} onClick={() => onClick(5)}></div>
        <div id="block6" className={`Block ${blocks[6] === 'X' && 'XClass'} ${blocks[6] === 'O' && 'OClass'}`} onClick={() => onClick(6)}></div>
        <div id="block7" className={`Block ${blocks[7] === 'X' && 'XClass'} ${blocks[7] === 'O' && 'OClass'}`} onClick={() => onClick(7)}></div>
        <div id="block8" className={`Block ${blocks[8] === 'X' && 'XClass'} ${blocks[8] === 'O' && 'OClass'}`} onClick={() => onClick(8)}></div>
      </div>

      <Button type="primary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
