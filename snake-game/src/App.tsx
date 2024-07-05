import React from 'react';
import './App.css';
import './Game.css';
import Game from './Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Snake Game</h1>
      <Game />
    </div>
  );
}

export default App;
