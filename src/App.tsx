import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.scss';
import { getCorsiForPercent, getPDO } from './util/AnalyticsUtils';
import { getGameAPIData, getScoresAPIData }from './util/APIUtils';
import { IAPIGameDetails, IAPIGameScore, IAPIScoreResults } from './util/types/APITypes';
import ShotVisualizer from './components/ShotVisualizer/ShotVisualizer';

const App = () => {

  const getGameData = async (gamePK: number) => {
    await getGameAPIData(gamePK)
    .then( (res) => {
      setGameData(res);
    })
  }
  const CURRENT_DATE = new Date();
  const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const IMG_SRC = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/";

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentGames, setCurrentGames] = useState<IAPIScoreResults|null>(null);
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [selectedGameData, setSelectedGameData] = useState<IAPIGameScore|null>(null);
  const [gameData, setGameData] = useState<IAPIGameDetails|null>(null);

  const getScores = async () => {
    const dateToString = selectedDate.toISOString().split('T')[0];
    await getScoresAPIData(dateToString)
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
    getScores();
  }, [])

  useEffect( () => {
    getScores();
  }, [selectedDate])

  const handlePrevButtonClicked = () => {
    const newDate = new Date(selectedDate.getTime() - 24*60*60*1000);
    setSelectedDate(newDate);
  }
  const handleNextButtonClicked = () => {
    const newDate = new Date(selectedDate.getTime() + 24*60*60*1000);
    setSelectedDate(newDate);
  }

  return (
    <div className="App">
    <h1>NHL Scoring Visualizer</h1>
    <p>Pick a game and see some interesting scoring stats.</p>

    <div className="day-selector">
      <div className="day-selector-btn" onClick={handlePrevButtonClicked}>Previous Day</div>
      <div className="date-display">
          <p>{`${WEEKDAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`}</p>
      </div>

      <div className={"day-selector-btn" + (selectedDate.setHours(0,0,0,0) === CURRENT_DATE.setHours(0,0,0,0) ?
       " hide" : "")}
        onClick={handleNextButtonClicked}>Next Day
        </div>

    </div>

    {currentGames && currentGames.games.map( (game, index) => 
    <div key={index} className="card level-3" onClick={() => {
      setSelectedGameData(game);
      setSelectedGame(game.gamePk);
      }}>
      <div className="teams">

        <div className="team-display">
        <img alt="away team logo" src={`${IMG_SRC}${game.awayTeamID}.svg`} className="scorebug-logo"></img>
        <p className='team-name'>{game.awayTeamName}</p>
        </div>
        <div className="score">
        <p>{game.awayTeamScore} - {game.homeTeamScore} </p>
      </div>
        <div className="team-display">
        <img alt="home team logo" src={`${IMG_SRC}${game.homeTeamID}.svg`} className="scorebug-logo"></img>
        <p className='team-name'>{game.homeTeamName}</p>
        </div>
        
        {/* <h5>{game.awayTeamName} vs {game.homeTeamName}</h5> */}
        
      </div>

    </div>
    )}

    {selectedGame !== 0 && gameData && selectedGameData && (
      <Modal open={selectedGame !== 0}
      onClose={ () => {setSelectedGame(0)}}>
        <div className="modal card">
          <p>{selectedGameData.awayTeamName} vs. {selectedGameData.homeTeamName}</p>
          <p>{selectedGameData.awayTeamScore} - {selectedGameData.homeTeamScore}</p>
          <p>Home Corsi: {getCorsiForPercent(gameData).home}%</p>
          <p>Away Corsi: {getCorsiForPercent(gameData).away}%</p>
          <p>Home PDO: {getPDO(gameData).home}</p>
          <p>Away PDO: {getPDO(gameData).away}</p>
          <ShotVisualizer data={gameData}/>
        </div>
      </Modal>
    )}

    <div className="footer">
      <p>Made by Eric Tran using public data available through the NHL API.</p>
    </div>
  </div>
  );
}

export default App;
