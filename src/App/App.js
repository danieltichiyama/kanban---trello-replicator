import React from "react";
import "./App.scss";
import Board from "../components/Board";
import BoardsList from "../components/BoardsList";

let App = () => {
  return (
    <div>
      <BoardsList></BoardsList>
      <Board></Board>
    </div>
  );
};

export default App;
