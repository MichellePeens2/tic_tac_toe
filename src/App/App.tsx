import React, { useEffect, useState } from "react";
import { Form, TextField, Button, Header, Board, Error } from "./components";
import "./App.css";

function App() {
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [displayBoard, setDisplayBoard] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [didSubmit, setDidSubmit] = useState(false);

  // Found a bug when the player names are the same
  const onPlay = () => {
    setErrors([]);

    if (playerX === "") setErrors(["Player X is blank."]);
    if (playerO === "")
      setErrors((prev) => [...prev, "Player O is blank."]);

    setDidSubmit(true);
  };

  useEffect(() => {
    setDisplayBoard(didSubmit && errors.length === 0);
  }, [errors, didSubmit]);

  const onRestart = () => {
    setPlayerX("");
    setPlayerO("");
    setErrors([]);
    setDisplayBoard(false);
    setDidSubmit(false);
  };

  return (
    <div className="App">
      <Header title="Tic Tac Toe" />

      {errors.map((error, index) => {
        return <Error key={index} message={error} />;
      })}

      {displayBoard ? (
        <Board 
          playerX={playerX}
          playerO={playerO} 
          onReset={onRestart} 
        />
      ) : (
        <Form>
          <TextField label="X" value={playerX} setValue={setPlayerX} />
          <TextField label="O" value={playerO} setValue={setPlayerO} />
          <Button type="primary" onClick={onPlay}>
            Play
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
