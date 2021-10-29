import React, { useEffect, useState } from "react";
import { Form, TextField, Button, Header, Board, Error } from "./components";

// How to add SCSS
import "./App.css";

function App() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [displayBoard, setDisplayBoard] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [didSubmit, setDidSubmit] = useState(false);

  const play = () => {
    setErrors([]);

    if (playerOne === "") setErrors(["Player one is blank."]);
    if (playerTwo === "")
      setErrors((prev) => [...prev, "Player two is blank."]);

    setDidSubmit(true);
  };

  // useEffect(() => {
  //   document.addEvenetListener("onScroll", doSomething);
  //   console.log("hello");
  //   return () => {
  //     document.removeEventListener("onScroll", doSomething);
  //   };
  // }, []);

  useEffect(() => {
    setDisplayBoard(didSubmit && errors.length === 0);
  }, [errors, didSubmit]);

  // mount
  // add
  // // state change ->
  // // remove & add
  // // state change
  // // remove & add
  // unmount
  // remove

  const restart = () => {
    setPlayerOne("");
    setPlayerTwo("");
    setErrors([]);
    setDisplayBoard(false);
    setDidSubmit(false);
  };

  return (
    <div className="App">
      <Header title="Tic Tac Toe" />

      {/* Warning: Each child in a list should have a unique "key" prop. */}
      {errors.map((error, index) => {
        return <Error key={index} message={error} />;
      })}

      {displayBoard ? (
        <>
          <Board />
          <Button type="secondary" onClick={restart}>
            Restart
          </Button>
        </>
      ) : (
        <Form>
          <TextField label="X" value={playerOne} setValue={setPlayerOne} />
          <TextField label="O" value={playerTwo} setValue={setPlayerTwo} />
          <Button type="primary" onClick={play}>
            Play
          </Button>
        </Form>
      )}
    </div>
  );
}

export default App;
