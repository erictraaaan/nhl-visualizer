import { IAPIGameDetails, IAPIGameScore, IAPIScoreResults, IGoalie, IPeriodPlay, IPlay, IPlayer, ITeamStats } from "./types/APITypes";
import axios from "axios";

const EVENT_IDS = ['GOAL','SHOT','MISSED_SHOT','BLOCKED_SHOT']

export const getScoresAPIData = async (date: string): Promise<IAPIScoreResults> => {

    return new Promise( (resolve, reject) => {
        const apiCall = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${date}&endDate=${date}`;

        axios.get(apiCall)
        .then( (json) => {
            console.log("raw: ", json);
            if (json.data.dates && json.data.dates.length == 1){
                console.log("in here")
                var games: IAPIGameScore[] = [];
                json.data.dates[0].games.forEach( (game : any) => {
                    const gamePk: number = game.gamePk;
                    const homeTeamID = game.teams.home.team.id;
                    const awayTeamID = game.teams.away.team.id;
                    const awayTeamScore = game.teams.away.score;
                    const homeTeamScore = game.teams.home.score;
                    const gameData: IAPIGameScore = {
                        gamePk: gamePk,
                        homeTeamID: homeTeamID,
                        homeTeamScore: homeTeamScore,
                        awayTeamID: awayTeamID,
                        awayTeamScore: awayTeamScore
                    }
                    games.push(gameData);
                });
                const output: IAPIScoreResults = {
                    date: date,
                    games: games
                }
                console.log("output: ", output);
                return resolve(output);
            }
            else {
                return reject(null);
            }
        })
        .catch( () => {
            return reject(null);
        })
    })   
}

export const getGameAPIData = async (gamePK: number) => {
    return new Promise( (resolve, reject) => {
        const apiCall = `https://statsapi.web.nhl.com/api/v1/game/${gamePK}/feed/live`;
        axios.get(apiCall)
        .then( (json) => {
            console.log("raw: ", json);
            const scoringPlays: number[] = json.data.liveData.plays.scoringPlays;
            const periodPlays: IPeriodPlay[] = json.data.liveData.plays.playsByPeriod;

            //only consider plays during regular time, i.e. 1st, 2nd, and 3rd period.
            const lastIndex: number = periodPlays[2].endIndex;

            const spStartIndex = periodPlays[1].startIndex;
            const spEndIndex = periodPlays[1].endIndex;

            var plays: IPlay[] = [];
            json.data.liveData.plays.allPlays.forEach( (play: any) => {
                // console.log("play: ", play);
                if (EVENT_IDS.includes(play.result.eventTypeId) && play.about.eventIdx <= lastIndex){

                    const eventIDx = play.about.eventIdx;

                    var coords;
                    //flip the coords if it's in the 2nd period
                    if ( spStartIndex <= eventIDx && eventIDx <= spEndIndex) {
                        // console.log("event in 2nd.");

                        var x = parseInt(play.coordinates.x);
                        var y = parseInt(play.coordinates.y);

                        // console.log("coords pre: " , { x, y} )
                        coords = {
                            x: - x,
                            y: - y
                        }
                        // console.log("coords new: ", coords);
                    }
                    else {
                        coords = play.coordinates;
                    }
                    const eventTypeID = play.result.eventTypeId;
                    const teamID = play.team.id;
                    var players: IPlayer[] = [];
                    play.players.forEach( (player: any) => {
                        const playerData: IPlayer = {
                            id : player.player.id,
                            fullName : player.player.fullName,
                            playerType : player.playerType
                        }
                        players.push(playerData);
                    });
                    const iPlay: IPlay = {
                        teamID : teamID,
                        coordinates : coords,
                        eventIDx : eventIDx,
                        eventTypeID : eventTypeID,
                        players: players
                    }
                    plays.push(iPlay);
                }
            });

            //get homeStats
            const homeStatsRaw = json.data.liveData.boxscore.teams.home.teamStats.teamSkaterStats;
            const homeID = json.data.gameData.teams.home.id;
            const homeGoals = homeStatsRaw.goals;
            const homeBlocks = homeStatsRaw.blocked;
            const homeShots = homeStatsRaw.shots;
            const homeRinkSide = json.data.liveData.linescore.periods[0].home.rinkSide;

            //get home goalie
            const homeGoalieIDs: number[] = json.data.liveData.boxscore.teams.home.goalies;
            var homeGoalies: IGoalie[] = [];
            homeGoalieIDs.forEach( (id: number) =>{
                const key = `ID${id}`;
                const goalieRaw = json.data.liveData.boxscore.teams.home.players[key];
                const goalie: IGoalie = {
                    id: goalieRaw.person.id,
                    saves: goalieRaw.stats.goalieStats.saves,
                    shots: goalieRaw.stats.goalieStats.shots
                }
                homeGoalies.push(goalie);
            });

            const homeStats: ITeamStats = {
                startingRinkSide: homeRinkSide,
                id : homeID,
                goals: homeGoals,
                shots : homeShots,
                blocks : homeBlocks,
                goalies : homeGoalies
            }


            //get awayStats
            const awayStatsRaw = json.data.liveData.boxscore.teams.away.teamStats.teamSkaterStats;
            const awayID = json.data.gameData.teams.away.id;
            const awayGoals = awayStatsRaw.goals;
            const awayBlocks = awayStatsRaw.blocked;
            const awayShots = awayStatsRaw.shots;
            const awayRinkSide = json.data.liveData.linescore.periods[0].away.rinkSide;

            //get away goalie
            const awayGoalieIDs: number[] = json.data.liveData.boxscore.teams.away.goalies;
            var awayGoalies: IGoalie[] = [];

            awayGoalieIDs.forEach( (id: number) =>{
                const key = `ID${id}`;
                const goalieRaw = json.data.liveData.boxscore.teams.away.players[key];
                const goalie: IGoalie = {
                    id: goalieRaw.person.id,
                    saves: goalieRaw.stats.goalieStats.saves,
                    shots: goalieRaw.stats.goalieStats.shots
                }
                awayGoalies.push(goalie);
            });

            const awayStats: ITeamStats = {
                startingRinkSide : awayRinkSide,
                id : awayID,
                goals: awayGoals,
                shots: awayShots,
                blocks: awayBlocks,
                goalies : awayGoalies
            }

            var details: IAPIGameDetails = {
                gamePK: gamePK,
                scoringPlays: scoringPlays,
                periodPlays: periodPlays,
                allPlays: plays,
                homeStats: homeStats,
                awayStats: awayStats
            }

            // console.log("details before: " , details);
            // details = prepCoordinates(details);
            console.log("details: " , details);
                return resolve(null);
        })
        .catch( () => {
            return reject(null);
        })
    }) 
}

const prepCoordinates = (data: IAPIGameDetails): IAPIGameDetails => {
    //flip the x and y coordinates of all events in the 2nd period
    const spStart = data.periodPlays[1].startIndex;
    const spEnd = data.periodPlays[1].endIndex;
    for (let i = 0 ; i< data.allPlays.length ; i++ ){
        if( spStart <= data.allPlays[i].eventIDx && data.allPlays[i].eventIDx <= spEnd ){
            console.log("data before: ", data.allPlays[i]);
            data.allPlays[i].coordinates.x = -data.allPlays[i].coordinates.x;
            data.allPlays[i].coordinates.y = -data.allPlays[i].coordinates.y;
            console.log("data after: " , data.allPlays[i]);
        }
    }
    return data;
}

export default {getScoresAPIData, getGameAPIData}