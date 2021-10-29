import React, { useEffect, useState } from "react";
import { Form, TextField, Button, Header, Board, Error } from "./components";
import "./App.css";

function App() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [displayBoard, setDisplayBoard] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [didSubmit, setDidSubmit] = useState(false);

  const onPlay = () => {
    setErrors([]);

    if (playerOne === "") setErrors(["Player one is blank."]);
    if (playerTwo === "")
      setErrors((prev) => [...prev, "Player two is blank."]);

    setDidSubmit(true);
  };

  // specifying a dependency is a way to skip running effects to optimize for performance 
  
  useEffect(() => {
  }); // no_dependency: means it will run every single time

  useEffect(() => {
  }, []); // empty_dependency: means it will only run once at initial render

  useEffect(() => {
  }, []); // some_dependency: means it will only when the dependecy changes

  useEffect(() => {
    setDisplayBoard(didSubmit && errors.length === 0);
  }, [errors, didSubmit]);

  const onRestart = () => {
    setPlayerOne("");
    setPlayerTwo("");
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
        <Board onReset={onRestart} />
      ) : (
        <Form>
          <TextField label="X" value={playerOne} setValue={setPlayerOne} />
          <TextField label="O" value={playerTwo} setValue={setPlayerTwo} />
          <Button type="primary" onClick={onPlay}>
            Play
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
