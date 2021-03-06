import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.scss';
import { getGameAPIData, getScoresAPIData }from './util/APIUtils';
import { IAPIGameDetails, IAPIGameScore, IAPIScoreResults } from './util/types/APITypes';
import ShotVisualizer from './components/ShotVisualizer/ShotVisualizer';
import DataTable from './components/DataTable/DataTable';
import Scorebug from './components/Scorebug/Scorebug';
import PenaltyChart from './components/PenaltyChart/PenaltyChart';

const App = () => {

  const getGameData = async (gamePK: number) => {
    await getGameAPIData(gamePK)
    .then( (res) => {
      setGameData(res);
    })
  }
  const YESTERDAY = new Date(new Date().getTime() - 24*60*60*1000);
  const WEEKDAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const IMG_SRC = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/";

  const [selectedDate, setSelectedDate] = useState<Date>(YESTERDAY);
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

  const handleCardClicked = (game: IAPIGameScore) => {
    setSelectedGameData(game);
    setSelectedGame(game.gamePk);
  }

  return (
    <div className="App">
    <h1>NHL Scoring Visualizer</h1>
    <p>Pick a game to see some scoring stats.</p>

    <div className="day-selector">
      <div className="day-selector-btn" onClick={handlePrevButtonClicked}>Previous Day</div>
      <div className="date-display">
          <p>{`${WEEKDAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}`}</p>
      </div>

      <div className={"day-selector-btn" + (selectedDate.setHours(0,0,0,0) === YESTERDAY.setHours(0,0,0,0) ?
       " hide" : "")}
        onClick={handleNextButtonClicked}>Next Day
        </div>

    </div>

    {currentGames && currentGames.games.map( (game, index) => 
	<Scorebug
		game={game}
		index={index}
		cardClicked={handleCardClicked}
	/>
    )}

    {selectedGame !== 0 && gameData && selectedGameData && (
      <Modal open={selectedGame !== 0}
      onClose={ () => {
		  setGameData(null);
		  setSelectedGame(0);
		  }}>
        <div className="modal card">
			<div className="teams">
				<div className="team-display">
					<img alt="away team logo" src={`${IMG_SRC}${selectedGameData.awayTeamID}.svg`} className="scorebug-logo"></img>
				</div>
				<div className="score">
					<p>{selectedGameData.awayTeamScore} - {selectedGameData.homeTeamScore} </p>
				</div>
				<div className="team-display">
					<img alt="home team logo" src={`${IMG_SRC}${selectedGameData.homeTeamID}.svg`} className="scorebug-logo"></img>
				</div>
			</div>
			<ShotVisualizer data={gameData} game={selectedGameData}/>
      <PenaltyChart data={gameData} game={selectedGameData}/>
			<DataTable gameDetails={gameData} gameData={selectedGameData}/>
        </div>
      </Modal>
    )}

    <div className="footer">
      <p>Made by <a target="_blank" href="https://github.com/erictraaaan">Eric Tran</a> using public data available through the NHL API.</p>
    </div>
  </div>
  );
}

export default App;
