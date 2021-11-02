import React, { useEffect, useState } from "react";
import { Form, TextField, Button, Header, Board, Error } from "./components";
import { Player } from "./types";
import "./App.css";

function App() {
  const [playerOne, setPlayerOne] = useState<Player | null>(null);
  const [playerTwo, setPlayerTwo] = useState<Player | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [displayBoard, setDisplayBoard] = useState(false);

  const onPlay = () => {
    setErrors([]);

    if (playerOne === null) setErrors(["Player one is blank."]);
    if (playerTwo === null) setErrors((prev) => [...prev, "Player two is blank."]);

      setSubmitted(true);
  };

  useEffect(() => {
    setDisplayBoard(submitted && errors.length === 0);
  }, [errors, submitted]);

  const onRestart = () => {
    setPlayerOne(null);
    setPlayerTwo(null);
    setErrors([]);
    setDisplayBoard(false);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <Header title="Tic Tac Toe" />

      {errors.map((error, index) => {
        return <Error key={index} message={error} />;
      })}

      {/* Question: Is there another way to avoid the argument type (Player | null) in Board? */}
      {displayBoard && playerOne && playerTwo ? (
        <Board 
          playerOne={playerOne}
          playerTwo={playerTwo} 
          onReset={onRestart} 
        />
      ) : (
        <Form>
          <TextField label="X" value={playerOne} setValue={setPlayerOne} />
          <br/><br/>
          <TextField label="O" value={playerTwo} setValue={setPlayerTwo} />
          <br/><br/>
          <Button type="primary" onClick={onPlay}>
            Play
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
