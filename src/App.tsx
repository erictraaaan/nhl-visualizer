import React, { useEffect } from 'react';
import './App.scss';
import {getScoresAPIData, getGameAPIData}from './util/APIUtils';
import {getScores} from './util/ScorebugUtils';

const App = () => {

  const getData = async () => {
    // await getScoresAPIData('2021-12-02')
    await getGameAPIData(2020030174)
    .catch( () => {})
    .then( (res) => {
      // parse the game data into a score bug object
    })
  }

  useEffect( () => {
    getData();
    // getScores();
  }, [])

  return (
    <div className="App">

    <header className="App-header">
    <h1>NHL API Visualizer</h1>
    <p>Pick a game from the 2021-2022 season and see some cool stats.</p>
    <a>
      {/* <div className="lets-go-btn">Let's go!</div> */}
    </a>
    </header>
  </div>
  );
}
// function App() {
//   return (
//     <div className="App">

//       <header className="App-header">
//       <h1>NHL API Visualizer</h1>
//       <p>Pick a game from the 2021-2022 season and see some cool stats.</p>
//       <a href="google.com">
//         <div className="lets-go-btn">Let's go!</div>
//       </a>
//       <Button></Button>
//       </header>
//     </div>
//   );
// }

export default App;
