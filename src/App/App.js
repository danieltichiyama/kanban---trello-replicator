import React from "react";
import "./App.scss";
import Board from "../containers/Board";
import AddCard from "../containers/AddCard";
import EditCard from "../containers/EditCard/EditCard";

let App = () => {
  return (
    <div>
      <EditCard />
      <AddCard />
      <Board />
    </div>
  );
};

export default App;
