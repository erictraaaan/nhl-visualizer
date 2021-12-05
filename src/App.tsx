import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.scss';
import { getCorsiForPercent, getPDO } from './util/AnalyticsUtils';
import { getGameAPIData, getScoresAPIData }from './util/APIUtils';
import { IAPIGameDetails, IAPIScoreResults } from './util/types/APITypes';
// import {getScores} from './util/ScorebugUtils';

const App = () => {

  const getGameData = async (gamePK: number) => {
    await getGameAPIData(gamePK)
    .then( (res) => {
      setGameData(res);
    })
  }

  const [currentGames, setCurrentGames] = useState<IAPIScoreResults|null>(null);
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [gameData, setGameData] = useState<IAPIGameDetails|null>(null);

  const getScores = async () => {
    await getScoresAPIData('2021-12-04')
    .then( (res) => {
      setCurrentGames(res);
    })
  }

  useEffect( () => {
    if (selectedGame !== 0){
      getGameData(selectedGame);
    }

  }, [selectedGame])

  useEffect( () => {
    // getData();
    getScores();
  }, [])

  return (
    <div className="App">

    {/* <header className="App-header"> */}
    <h1>NHL Scoring Visualizer</h1>
    <p>Pick a game and see some interesting scoring stats.</p>
    <p>Made using the public NHL API.</p>

    {currentGames && currentGames.games.map( (game, index) => 
    <div key={index} className="card level-3" onClick={() => {setSelectedGame(game.gamePk)}}>
      <h5>{game.awayTeamName} vs {game.homeTeamName}</h5>
      <p>{game.awayTeamScore} - {game.homeTeamScore} </p>
    </div>
    )}

    {selectedGame !== 0 && gameData && (
      <Modal open={selectedGame !== 0}
      onClose={ () => {setSelectedGame(0)}}>
        <div className="modal card" >
          <p>{gameData.gamePK}</p>
          <p>Home Corsi: {getCorsiForPercent(gameData).home}%</p>
          <p>Away Corsi: {getCorsiForPercent(gameData).away}%</p>
          <p>Home PDO: {getPDO(gameData).home}</p>
          <p>Away PDO: {getPDO(gameData).away}</p>
        </div>
      </Modal>
    )}

    {/* <div className="card level-3">
      <h5>Floating Card</h5>
    </div> */}
    {/* <a> */}
      {/* <div className="lets-go-btn">Let's go!</div> */}
    {/* </a> */}
    {/* </header> */}
  </div>
  );
}

export default App;
