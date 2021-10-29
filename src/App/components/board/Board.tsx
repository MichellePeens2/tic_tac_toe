import React, { useState } from "react";
import "./Board.css";
import { Button } from "../../components";

const CELLS = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function Board({ onReset }: { onReset: () => void }) {
  
  const [blocks, setBlocks] = useState<('X' | 'O' | '')[]>(CELLS.map(() => ''));   // ['', '', '', '', '', '', '', '', '']

  const onClick = (n: number) => {
    setBlocks(prevBlocks => {
        const newBlockState = [...prevBlocks]; // copy
        newBlockState[n] = 'X';
        return newBlockState;
    })
  }
    
  return (
    <>
      <div className="Board">
        <div id="block0" className={`Block ${blocks[0] === 'X' && 'Red'}`} onClick={() => onClick(0)}></div>
        <div id="block1" className={`Block ${blocks[1] === 'X' && 'Red'}`} onClick={() => onClick(1)}></div>
        <div id="block2" className={`Block ${blocks[2] === 'X' && 'Red'}`} onClick={() => onClick(2)}></div>
        <div id="block3" className={`Block ${blocks[3] === 'X' && 'Red'}`} onClick={() => onClick(3)}></div>
        <div id="block4" className={`Block ${blocks[4] === 'X' && 'Red'}`} onClick={() => onClick(4)}></div>
        <div id="block5" className={`Block ${blocks[5] === 'X' && 'Red'}`} onClick={() => onClick(5)}></div>
        <div id="block6" className={`Block ${blocks[6] === 'X' && 'Red'}`} onClick={() => onClick(6)}></div>
        <div id="block7" className={`Block ${blocks[7] === 'X' && 'Red'}`} onClick={() => onClick(7)}></div>
        <div id="block8" className={`Block ${blocks[8] === 'X' && 'Red'}`} onClick={() => onClick(8)}></div>
      </div>
      <Button type="secondary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
