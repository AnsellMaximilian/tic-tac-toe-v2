import React, { useState } from 'react';
import './App.css';

// Components
import StartPage from './components/StartPage';
import Board from './components/Board';
import GameOver from './components/GameOver';

// Types
import { Player, Computer, TileArray } from './types/types';

function App() {

  const [mode, setMode] = useState<'pvp' | 'pvc'>('pvp');
  const [playerOne, setPlayerOne] = useState<Player>({name: 'Player One', score: 0, tile: 'x'});
  const [playerTwo, setPlayerTwo] = useState<Player | Computer>({name: 'Player Two', score: 0, tile: 'o'});
  const [isGameOn, setIsGameOn] = useState<boolean>(false);
  const [tiles, setTiles] = useState<TileArray>(new Array(9).fill(null));
  const [winner, setWinner] = useState<Player | Computer | null>(null);
  const [winCombo, setWinCombo] = useState<Array<number>>([])
  const [draw, setDraw] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const setScore = (player: Player | Computer) => {
    if(player === playerOne){
      setPlayerOne(player => ({...player, score: player.score + 1}))
    }else{
      setPlayerTwo(player => ({...player, score: player.score + 1}))
    }
    
  }

  const reset = () => {
    setWinner(null);
    setWinCombo([]);
    setTiles(new Array(9).fill(null));
    setDraw(false);
    setGameOver(false);
  }

  if(draw || winner ) setTimeout(() => {
    setGameOver(true);
  }, 500);

  return (
    <div className="App">
     {
       isGameOn ?
       <Board 
        mode={mode}
        playerOne={playerOne}
        playerTwo={playerTwo}
        tiles={tiles}
        setTiles={setTiles}
        setWinner={setWinner}
        setWinCombo={setWinCombo}
        winCombo={winCombo}
        setDraw={setDraw}
        draw={draw}
        winner={winner}
        setScore={setScore}
       />
       :
       <StartPage 
        setMode={setMode} 
        mode={mode} 
        setPlayerOne={setPlayerOne} 
        setPlayerTwo={setPlayerTwo}
        setIsGameOn={setIsGameOn}
      />
     }
     {gameOver? <GameOver  reset={reset} winner={winner} draw={draw}/> : null}
    </div>
  );
}

export default App;
