import React from 'react';
import { IAPIGameScore } from "../../util/types/APITypes"

interface IScorebugProps { 
    game: IAPIGameScore
    index: number
    cardClicked: (game: IAPIGameScore) => void
}

const Scorebug = (props : IScorebugProps) => {

    const IMG_SRC = "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/";

    return (
        <div key={props.index} className="card level-3" onClick={() => props.cardClicked(props.game)
        }>
            <div className="teams">
                <div className="team-display">
                  <img alt="away team logo" src={`${IMG_SRC}${props.game.awayTeamID}.svg`} className="scorebug-logo"></img>
                  <p className='team-name'>{props.game.awayTeamName}</p>
                </div>
                <div className="score">
                  <p>{props.game.awayTeamScore} - {props.game.homeTeamScore} </p>
                </div>
                <div className="team-display">
                  <img alt="home team logo" src={`${IMG_SRC}${props.game.homeTeamID}.svg`} className="scorebug-logo"></img>
                  <p className='team-name'>{props.game.homeTeamName}</p>
                </div>
            </div>
        </div>
    )
}

export default Scorebug;